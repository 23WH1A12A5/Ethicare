import { useState, useEffect, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, Upload } from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import { allCountries, detectCountryFromPhone, getStatesForCountry, getCitiesForState } from "@/lib/locationData";

export default function SignupPage() {
  const [step, setStep] = useState<"form" | "otp">("form");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "", age: "", dob: "", phone: "", email: "", password: "",
    country: "", state: "", city: "", address: "", gender: "",
  });
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profilePreview, setProfilePreview] = useState<string>("");
  const [emailOtp, setEmailOtp] = useState("");
  const [phoneOtp, setPhoneOtp] = useState("");
  const [generatedEmailOtp, setGeneratedEmailOtp] = useState("");
  const [generatedPhoneOtp, setGeneratedPhoneOtp] = useState("");

  const updateForm = (key: string, value: string) => {
    setForm((f) => {
      const updated = { ...f, [key]: value };
      // Reset dependent fields
      if (key === "country") { updated.state = ""; updated.city = ""; }
      if (key === "state") { updated.city = ""; }
      return updated;
    });
  };

  // Auto-detect country from phone number
  useEffect(() => {
    const detected = detectCountryFromPhone(form.phone);
    if (detected && detected !== form.country) {
      updateForm("country", detected);
    }
  }, [form.phone]);

  const statesList = useMemo(() => getStatesForCountry(form.country), [form.country]);
  const citiesList = useMemo(() => getCitiesForState(form.country, form.state), [form.country, form.state]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image must be under 5MB");
        return;
      }
      setProfileImage(file);
      setProfilePreview(URL.createObjectURL(file));
    }
  };

  const validateForm = () => {
    if (!form.fullName.trim()) { toast.error("Full name is required"); return false; }
    const age = parseInt(form.age);
    if (isNaN(age) || age < 13 || age > 120) { toast.error("Valid age (13-120) is required"); return false; }
    if (!form.dob) { toast.error("Date of birth is required"); return false; }
    if (!/^\+?[\d\s-]{7,15}$/.test(form.phone)) { toast.error("Valid phone number is required"); return false; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) { toast.error("Valid email is required"); return false; }
    if (form.password.length < 6) { toast.error("Password must be at least 6 characters"); return false; }
    if (!form.country) { toast.error("Country is required"); return false; }
    if (!form.state.trim()) { toast.error("State is required"); return false; }
    if (!profileImage) { toast.error("Profile image is required"); return false; }
    return true;
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);

    try {
      // Sign up user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: { emailRedirectTo: window.location.origin },
      });
      if (authError) throw authError;
      if (!authData.user) throw new Error("Signup failed");

      // Upload profile image
      let profileImageUrl = "";
      if (profileImage) {
        const ext = profileImage.name.split(".").pop();
        const path = `${authData.user.id}/profile.${ext}`;
        const { error: uploadError } = await supabase.storage
          .from("user-uploads")
          .upload(path, profileImage, { upsert: true });
        if (uploadError) throw uploadError;
        const { data: urlData } = supabase.storage.from("user-uploads").getPublicUrl(path);
        profileImageUrl = urlData.publicUrl;
      }

      // Create profile
      const { error: profileError } = await supabase.from("profiles").insert({
        id: authData.user.id,
        full_name: form.fullName,
        age: parseInt(form.age),
        date_of_birth: form.dob,
        phone_number: form.phone,
        email: form.email,
        country: form.country,
        state: form.state,
        address: form.address || null,
        gender: form.gender || null,
        profile_image_url: profileImageUrl,
      });
      if (profileError) throw profileError;

      // Generate OTPs (simulated)
      const eOtp = String(Math.floor(100000 + Math.random() * 900000));
      const pOtp = String(Math.floor(100000 + Math.random() * 900000));
      setGeneratedEmailOtp(eOtp);
      setGeneratedPhoneOtp(pOtp);

      // Create notification for OTP
      await supabase.from("notifications").insert({
        user_id: authData.user.id,
        title: "OTP Verification Required",
        message: `Your email OTP is: ${eOtp} and phone OTP is: ${pOtp}`,
        type: "info",
      });

      toast.success(`Account created! Email OTP: ${eOtp}, Phone OTP: ${pOtp}`, { duration: 15000 });
      setStep("otp");
    } catch (err: any) {
      toast.error(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (emailOtp !== generatedEmailOtp) {
      toast.error("Invalid email OTP");
      return;
    }
    if (phoneOtp !== generatedPhoneOtp) {
      toast.error("Invalid phone OTP");
      return;
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase.from("profiles").update({
          email_verified: true,
          phone_verified: true,
        }).eq("id", user.id);
      }

      toast.success("Verification successful! Welcome to Ethicare.");
      navigate("/dashboard");
    } catch (err: any) {
      toast.error("Verification failed");
    }
  };

  if (step === "otp") {
    return (
      <div className="min-h-screen bg-background cyber-grid">
        <Navbar />
        <div className="pt-32 pb-20 flex items-center justify-center px-4">
          <div className="w-full max-w-md glass rounded-2xl p-8 cyber-glow">
            <div className="text-center mb-8">
              <div className="w-12 h-12 rounded-xl gradient-cyber flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-bold text-foreground">Verify Your Identity</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Enter the OTPs sent to your email and phone
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-foreground">Email OTP</Label>
                <Input
                  value={emailOtp}
                  onChange={(e) => setEmailOtp(e.target.value)}
                  placeholder="6-digit code"
                  maxLength={6}
                  className="mt-1 font-mono text-center text-lg tracking-widest"
                />
              </div>
              <div>
                <Label className="text-foreground">Phone OTP</Label>
                <Input
                  value={phoneOtp}
                  onChange={(e) => setPhoneOtp(e.target.value)}
                  placeholder="6-digit code"
                  maxLength={6}
                  className="mt-1 font-mono text-center text-lg tracking-widest"
                />
              </div>
              <Button onClick={handleVerifyOtp} className="w-full gradient-cyber text-primary-foreground border-0">
                Verify & Activate Account
              </Button>
            </div>

            <p className="text-xs text-muted-foreground text-center mt-4">
              OTPs are displayed in the toast notification above for demo purposes.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background cyber-grid">
      <Navbar />
      <div className="pt-24 pb-20 flex items-center justify-center px-4">
        <div className="w-full max-w-2xl glass rounded-2xl p-8 cyber-glow">
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-xl gradient-cyber flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Create Your Account</h1>
            <p className="text-sm text-muted-foreground mt-1">Join Ethicare to protect your digital identity</p>
          </div>

          <form onSubmit={handleSubmitForm} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-foreground">Full Name *</Label>
                <Input value={form.fullName} onChange={(e) => updateForm("fullName", e.target.value)} required className="mt-1" />
              </div>
              <div>
                <Label className="text-foreground">Age *</Label>
                <Input type="number" value={form.age} onChange={(e) => updateForm("age", e.target.value)} required className="mt-1" min={13} max={120} />
              </div>
              <div>
                <Label className="text-foreground">Date of Birth *</Label>
                <Input type="date" value={form.dob} onChange={(e) => updateForm("dob", e.target.value)} required className="mt-1" />
              </div>
              <div>
                <Label className="text-foreground">Phone Number *</Label>
                <Input value={form.phone} onChange={(e) => updateForm("phone", e.target.value)} required className="mt-1" placeholder="+1 234 567 8900" />
              </div>
              <div>
                <Label className="text-foreground">Email Address *</Label>
                <Input type="email" value={form.email} onChange={(e) => updateForm("email", e.target.value)} required className="mt-1" />
              </div>
              <div>
                <Label className="text-foreground">Password *</Label>
                <Input type="password" value={form.password} onChange={(e) => updateForm("password", e.target.value)} required className="mt-1" minLength={6} />
              </div>
              <div>
                <Label className="text-foreground">Country *</Label>
                <Select value={form.country} onValueChange={(v) => updateForm("country", v)}>
                  <SelectTrigger className="mt-1"><SelectValue placeholder="Select country" /></SelectTrigger>
                  <SelectContent className="max-h-60">
                    {allCountries.map((c) => <SelectItem key={c.name} value={c.name}>{c.name} ({c.code})</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-foreground">State *</Label>
                <Select value={form.state} onValueChange={(v) => updateForm("state", v)} disabled={!form.country}>
                  <SelectTrigger className="mt-1"><SelectValue placeholder={form.country ? "Select state" : "Select country first"} /></SelectTrigger>
                  <SelectContent className="max-h-60">
                    {statesList.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-foreground">City</Label>
                <Select value={form.city} onValueChange={(v) => updateForm("city", v)} disabled={!form.state}>
                  <SelectTrigger className="mt-1"><SelectValue placeholder={form.state ? "Select city" : "Select state first"} /></SelectTrigger>
                  <SelectContent className="max-h-60">
                    {citiesList.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-foreground">Address</Label>
                <Input value={form.address} onChange={(e) => updateForm("address", e.target.value)} className="mt-1" />
              </div>
              <div>
                <Label className="text-foreground">Gender</Label>
                <Select value={form.gender} onValueChange={(v) => updateForm("gender", v)}>
                  <SelectTrigger className="mt-1"><SelectValue placeholder="Select gender" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Non-binary">Non-binary</SelectItem>
                    <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label className="text-foreground">Profile Image *</Label>
              <div className="mt-1 flex items-center gap-4">
                {profilePreview ? (
                  <img src={profilePreview} alt="Profile" className="w-16 h-16 rounded-full object-cover border-2 border-primary/20" />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
                    <Upload className="w-6 h-6 text-muted-foreground" />
                  </div>
                )}
                <Input type="file" accept="image/*" onChange={handleImageChange} className="flex-1" />
              </div>
            </div>

            <Button type="submit" disabled={loading} className="w-full gradient-cyber text-primary-foreground border-0">
              {loading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline font-medium">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
