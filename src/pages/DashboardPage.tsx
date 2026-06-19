import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, Sun, Moon, LogOut, User, Image, FileWarning, Bell, Upload, Lock, Search, Trash2, Eye, Scan, AlertTriangle, CheckCircle, X } from "lucide-react";
import { toast } from "sonner";
import { classifyImage, simulateReverseImageSearch, type ClassificationResult, type MisuseResult } from "@/lib/imageClassifier";
import { motion, AnimatePresence } from "framer-motion";

type Tab = "profile" | "images" | "complaints" | "notifications";

interface UserImage {
  id: string;
  image_url: string;
  file_name: string;
  category: string;
  risk_level: string;
  flag_status: string;
  is_locked: boolean;
  lock_type: string | null;
  misuse_detected: boolean;
  misuse_url: string | null;
  misuse_date: string | null;
  created_at: string;
}

interface Complaint {
  id: string;
  complaint_id: string;
  description: string;
  detected_url: string | null;
  status: string;
  created_at: string;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  is_read: boolean;
  created_at: string;
}

export default function DashboardPage() {
  const { user, profile, signOut, refreshProfile } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>("profile");
  const [images, setImages] = useState<UserImage[]>([]);
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [uploading, setUploading] = useState(false);
  const [scanning, setScanning] = useState<string | null>(null);
  const [editingProfile, setEditingProfile] = useState(false);
  const [editForm, setEditForm] = useState<Record<string, string>>({});

  // Lock dialog
  const [lockingImage, setLockingImage] = useState<string | null>(null);
  const [lockType, setLockType] = useState<string>("pin");
  const [lockPin, setLockPin] = useState("");

  // Complaint dialog
  const [filingComplaint, setFilingComplaint] = useState<string | null>(null);
  const [complaintDesc, setComplaintDesc] = useState("");
  const [complaintUrl, setComplaintUrl] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    loadData();
  }, [user]);

  const loadData = async () => {
    if (!user) return;
    const [imgRes, compRes, notifRes] = await Promise.all([
      supabase.from("user_images").select("*").eq("user_id", user.id).order("created_at", { ascending: false }),
      supabase.from("complaints").select("*").eq("user_id", user.id).order("created_at", { ascending: false }),
      supabase.from("notifications").select("*").eq("user_id", user.id).order("created_at", { ascending: false }),
    ]);
    if (imgRes.data) setImages(imgRes.data as UserImage[]);
    if (compRes.data) setComplaints(compRes.data as Complaint[]);
    if (notifRes.data) setNotifications(notifRes.data as Notification[]);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    if (images.length >= 5) {
      toast.error("Maximum 5 images allowed. Delete an image to upload a new one.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error("Image must be under 10MB");
      return;
    }

    setUploading(true);
    try {
      const ext = file.name.split(".").pop();
      const path = `${user.id}/images/${Date.now()}.${ext}`;
      const { error: upErr } = await supabase.storage.from("user-uploads").upload(path, file);
      if (upErr) throw upErr;

      const { data: urlData } = supabase.storage.from("user-uploads").getPublicUrl(path);
      const imageUrl = urlData.publicUrl;

      // Classify image
      toast.info("Analyzing image with AI...");
      const classification = await classifyImage(file, URL.createObjectURL(file));

      const { error: insertErr } = await supabase.from("user_images").insert({
        user_id: user.id,
        image_url: imageUrl,
        file_name: file.name,
        category: classification.category,
        risk_level: classification.riskLevel,
        flag_status: classification.flagStatus,
      });
      if (insertErr) throw insertErr;

      if (classification.flagStatus === "Flagged") {
        await supabase.from("notifications").insert({
          user_id: user.id,
          title: "Image Flagged",
          message: `Your image "${file.name}" was classified as "${classification.category}" with ${classification.riskLevel} risk.`,
          type: "warning",
        });
        toast.warning(`Image flagged: ${classification.category} (${classification.riskLevel})`);
      } else {
        toast.success(`Image classified: ${classification.category} (${classification.riskLevel})`);
      }

      await loadData();
    } catch (err: any) {
      toast.error(err.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteImage = async (img: UserImage) => {
    if (!user) return;
    try {
      // Extract path from URL
      const urlParts = img.image_url.split("/user-uploads/");
      if (urlParts[1]) {
        await supabase.storage.from("user-uploads").remove([decodeURIComponent(urlParts[1])]);
      }
      await supabase.from("user_images").delete().eq("id", img.id);
      toast.success("Image deleted");
      await loadData();
    } catch (err: any) {
      toast.error("Failed to delete image");
    }
  };

  const handleLockImage = async () => {
    if (!lockingImage || !user) return;
    if (lockType === "pin" && (lockPin.length < 4 || lockPin.length > 6)) {
      toast.error("PIN must be 4-6 digits");
      return;
    }

    try {
      await supabase.from("user_images").update({
        is_locked: true,
        lock_type: lockType,
        lock_pin: lockType === "pin" ? lockPin : null,
      }).eq("id", lockingImage);

      await supabase.from("notifications").insert({
        user_id: user.id,
        title: "Image Locked",
        message: `Your image has been locked using ${lockType === "pin" ? "PIN" : lockType === "face" ? "Face Recognition" : "Eye Recognition"}.`,
        type: "success",
      });

      toast.success("Image locked successfully");
      setLockingImage(null);
      setLockPin("");
      await loadData();
    } catch (err: any) {
      toast.error("Failed to lock image");
    }
  };

  const handleScanForMisuse = async (img: UserImage) => {
    if (!user) return;
    setScanning(img.id);
    try {
      const result = await simulateReverseImageSearch();
      if (result.detected) {
        await supabase.from("user_images").update({
          misuse_detected: true,
          misuse_url: result.url,
          misuse_date: result.dateDetected,
        }).eq("id", img.id);

        await supabase.from("notifications").insert({
          user_id: user.id,
          title: "⚠️ Image Misuse Detected!",
          message: `Your image "${img.file_name}" was found on: ${result.url}. Severity: ${result.severity}. Please file a complaint.`,
          type: "alert",
        });

        toast.error(`Misuse detected on: ${result.url}`);
      } else {
        toast.success("No misuse detected at this time.");
      }
      await loadData();
    } catch {
      toast.error("Scan failed");
    } finally {
      setScanning(null);
    }
  };

  const handleFileComplaint = async () => {
    if (!filingComplaint || !complaintDesc || !user) return;
    try {
      const complaintId = `EC-${Date.now().toString(36).toUpperCase()}`;
      const img = images.find((i) => i.id === filingComplaint);

      await supabase.from("complaints").insert({
        user_id: user.id,
        image_id: filingComplaint,
        complaint_id: complaintId,
        description: complaintDesc,
        detected_url: complaintUrl || img?.misuse_url || null,
      });

      await supabase.from("notifications").insert({
        user_id: user.id,
        title: "Complaint Filed",
        message: `Complaint ${complaintId} has been submitted and is under review.`,
        type: "info",
      });

      toast.success(`Complaint ${complaintId} filed successfully`);
      setFilingComplaint(null);
      setComplaintDesc("");
      setComplaintUrl("");
      await loadData();
    } catch (err: any) {
      toast.error("Failed to file complaint");
    }
  };

  const handleEditProfile = async () => {
    if (!user) return;
    try {
      const updates: Record<string, any> = {};
      if (editForm.full_name) updates.full_name = editForm.full_name;
      if (editForm.phone_number) updates.phone_number = editForm.phone_number;
      if (editForm.country) updates.country = editForm.country;
      if (editForm.state) updates.state = editForm.state;
      if (editForm.address !== undefined) updates.address = editForm.address;
      if (editForm.gender) updates.gender = editForm.gender;

      await supabase.from("profiles").update(updates).eq("id", user.id);
      toast.success("Profile updated");
      setEditingProfile(false);
      await refreshProfile();
    } catch {
      toast.error("Failed to update profile");
    }
  };

  const markNotificationRead = async (id: string) => {
    await supabase.from("notifications").update({ is_read: true }).eq("id", id);
    await loadData();
  };

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  const tabs: { id: Tab; label: string; icon: typeof User; badge?: number }[] = [
    { id: "profile", label: "Profile", icon: User },
    { id: "images", label: "Images", icon: Image, badge: images.length },
    { id: "complaints", label: "Complaints", icon: FileWarning, badge: complaints.length },
    { id: "notifications", label: "Alerts", icon: Bell, badge: unreadCount },
  ];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Safe": return "text-cyber-success bg-cyber-success/10 border-cyber-success/20";
      case "Moderate Risk": return "text-cyber-warning bg-cyber-warning/10 border-cyber-warning/20";
      case "High Privacy Risk": return "text-cyber-danger bg-cyber-danger/10 border-cyber-danger/20";
      case "Explicit Risk": return "text-cyber-danger bg-cyber-danger/10 border-cyber-danger/20";
      default: return "text-muted-foreground bg-muted";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Submitted": return "text-primary bg-primary/10";
      case "Under Review": return "text-cyber-warning bg-cyber-warning/10";
      case "Action Taken": return "text-cyber-accent bg-cyber-accent/10";
      case "Resolved": return "text-cyber-success bg-cyber-success/10";
      default: return "text-muted-foreground bg-muted";
    }
  };

  if (!profile) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Scan className="w-8 h-8 text-primary animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-strong h-16 flex items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg gradient-cyber flex items-center justify-center">
            <Shield className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-bold text-foreground">Ethicare</span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="text-muted-foreground">
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>
          <Button variant="ghost" size="icon" onClick={() => { signOut(); navigate("/"); }} className="text-muted-foreground">
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </header>

      <div className="pt-16 flex">
        {/* Sidebar */}
        <aside className="hidden md:flex flex-col w-64 min-h-[calc(100vh-4rem)] border-r border-border bg-card/50 p-4">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50 mb-6">
            {profile.profile_image_url ? (
              <img src={profile.profile_image_url} alt="Profile" className="w-10 h-10 rounded-full object-cover" />
            ) : (
              <div className="w-10 h-10 rounded-full gradient-cyber flex items-center justify-center">
                <User className="w-5 h-5 text-primary-foreground" />
              </div>
            )}
            <div className="min-w-0">
              <p className="font-medium text-foreground text-sm truncate">{profile.full_name}</p>
              <p className="text-xs text-muted-foreground truncate">{profile.email}</p>
            </div>
          </div>

          <nav className="space-y-1">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === t.id
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                }`}
              >
                <t.icon className="w-4 h-4" />
                {t.label}
                {t.badge ? (
                  <span className="ml-auto text-xs bg-primary/20 text-primary px-1.5 py-0.5 rounded-full">
                    {t.badge}
                  </span>
                ) : null}
              </button>
            ))}
          </nav>
        </aside>

        {/* Mobile tabs */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass-strong border-t border-border flex">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`flex-1 flex flex-col items-center gap-1 py-3 text-xs ${
                activeTab === t.id ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <div className="relative">
                <t.icon className="w-5 h-5" />
                {t.badge ? (
                  <span className="absolute -top-1 -right-2 text-[10px] bg-primary text-primary-foreground rounded-full w-4 h-4 flex items-center justify-center">
                    {t.badge}
                  </span>
                ) : null}
              </div>
              {t.label}
            </button>
          ))}
        </div>

        {/* Main content */}
        <main className="flex-1 p-4 md:p-8 pb-24 md:pb-8 min-h-[calc(100vh-4rem)]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {/* PROFILE TAB */}
              {activeTab === "profile" && (
                <div className="max-w-2xl">
                  <h2 className="text-2xl font-bold text-foreground mb-6">Your Profile</h2>
                  <div className="glass rounded-xl p-6 space-y-6">
                    <div className="flex items-center gap-4">
                      {profile.profile_image_url ? (
                        <img src={profile.profile_image_url} alt="Profile" className="w-20 h-20 rounded-full object-cover border-2 border-primary/20" />
                      ) : (
                        <div className="w-20 h-20 rounded-full gradient-cyber flex items-center justify-center">
                          <User className="w-8 h-8 text-primary-foreground" />
                        </div>
                      )}
                      <div>
                        <h3 className="text-xl font-bold text-foreground">{profile.full_name}</h3>
                        <p className="text-sm text-muted-foreground">{profile.email}</p>
                        <div className="flex gap-2 mt-1">
                          <span className={`text-xs px-2 py-0.5 rounded-full ${profile.email_verified ? "bg-cyber-success/10 text-cyber-success" : "bg-cyber-warning/10 text-cyber-warning"}`}>
                            {profile.email_verified ? "Email Verified" : "Email Unverified"}
                          </span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${profile.phone_verified ? "bg-cyber-success/10 text-cyber-success" : "bg-cyber-warning/10 text-cyber-warning"}`}>
                            {profile.phone_verified ? "Phone Verified" : "Phone Unverified"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {!editingProfile ? (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {[
                            { label: "Full Name", value: profile.full_name },
                            { label: "Age", value: profile.age },
                            { label: "Date of Birth", value: profile.date_of_birth },
                            { label: "Phone", value: profile.phone_number },
                            { label: "Email", value: profile.email },
                            { label: "Country", value: profile.country },
                            { label: "State", value: profile.state },
                            { label: "Address", value: profile.address || "—" },
                            { label: "Gender", value: profile.gender || "—" },
                            { label: "Member Since", value: new Date(profile.created_at).toLocaleDateString() },
                          ].map((f) => (
                            <div key={f.label}>
                              <p className="text-xs text-muted-foreground">{f.label}</p>
                              <p className="text-sm font-medium text-foreground">{f.value}</p>
                            </div>
                          ))}
                        </div>
                        <Button onClick={() => { setEditingProfile(true); setEditForm({ full_name: profile.full_name, phone_number: profile.phone_number, country: profile.country, state: profile.state, address: profile.address || "", gender: profile.gender || "" }); }} variant="outline">
                          Edit Profile
                        </Button>
                      </>
                    ) : (
                      <div className="space-y-4">
                        {["full_name", "phone_number", "country", "state", "address", "gender"].map((key) => (
                          <div key={key}>
                            <Label className="text-foreground capitalize">{key.replace(/_/g, " ")}</Label>
                            <Input value={editForm[key] || ""} onChange={(e) => setEditForm((f) => ({ ...f, [key]: e.target.value }))} className="mt-1" />
                          </div>
                        ))}
                        <div className="flex gap-2">
                          <Button onClick={handleEditProfile} className="gradient-cyber text-primary-foreground border-0">Save</Button>
                          <Button variant="outline" onClick={() => setEditingProfile(false)}>Cancel</Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* IMAGES TAB */}
              {activeTab === "images" && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-foreground">Your Images</h2>
                      <p className="text-sm text-muted-foreground">{images.length}/5 images uploaded</p>
                    </div>
                    {images.length < 5 && (
                      <label className="cursor-pointer">
                        <div className="flex items-center gap-2 px-4 py-2 rounded-lg gradient-cyber text-primary-foreground text-sm font-medium">
                          <Upload className="w-4 h-4" />
                          {uploading ? "Uploading..." : "Upload Image"}
                        </div>
                        <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploading} />
                      </label>
                    )}
                  </div>

                  {images.length === 0 ? (
                    <div className="glass rounded-xl p-12 text-center">
                      <Image className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">No images uploaded yet. Upload your first image to get started.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {images.map((img) => (
                        <div key={img.id} className="glass rounded-xl overflow-hidden">
                          <div className="relative h-48">
                            <img src={img.image_url} alt={img.file_name} className="w-full h-full object-cover" />
                            {img.is_locked && (
                              <div className="absolute top-2 left-2 bg-primary/90 text-primary-foreground px-2 py-1 rounded-md flex items-center gap-1 text-xs">
                                <Lock className="w-3 h-3" /> Locked
                              </div>
                            )}
                            {img.misuse_detected && (
                              <div className="absolute top-2 right-2 bg-cyber-danger/90 text-primary-foreground px-2 py-1 rounded-md flex items-center gap-1 text-xs">
                                <AlertTriangle className="w-3 h-3" /> Misuse
                              </div>
                            )}
                          </div>
                          <div className="p-4 space-y-3">
                            <p className="text-sm font-medium text-foreground truncate">{img.file_name}</p>
                            <div className="space-y-1">
                              <div className="flex justify-between text-xs">
                                <span className="text-muted-foreground">Category:</span>
                                <span className="text-foreground font-medium">{img.category}</span>
                              </div>
                              <div className="flex justify-between text-xs">
                                <span className="text-muted-foreground">Risk Level:</span>
                                <span className={`px-2 py-0.5 rounded-full border text-xs ${getRiskColor(img.risk_level)}`}>
                                  {img.risk_level}
                                </span>
                              </div>
                              <div className="flex justify-between text-xs">
                                <span className="text-muted-foreground">Flag Status:</span>
                                <span className={img.flag_status === "Flagged" ? "text-cyber-danger" : "text-cyber-success"}>
                                  {img.flag_status}
                                </span>
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-1.5">
                              {!img.is_locked && (
                                <Button size="sm" variant="outline" onClick={() => setLockingImage(img.id)} className="text-xs h-7">
                                  <Lock className="w-3 h-3 mr-1" /> Lock
                                </Button>
                              )}
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleScanForMisuse(img)}
                                disabled={scanning === img.id}
                                className="text-xs h-7"
                              >
                                <Search className="w-3 h-3 mr-1" />
                                {scanning === img.id ? "Scanning..." : "Scan"}
                              </Button>
                              {img.misuse_detected && (
                                <Button size="sm" variant="outline" onClick={() => { setFilingComplaint(img.id); setComplaintUrl(img.misuse_url || ""); }} className="text-xs h-7 text-cyber-danger border-cyber-danger/20">
                                  <FileWarning className="w-3 h-3 mr-1" /> Complaint
                                </Button>
                              )}
                              <Button size="sm" variant="outline" onClick={() => handleDeleteImage(img)} className="text-xs h-7 text-destructive border-destructive/20">
                                <Trash2 className="w-3 h-3 mr-1" /> Delete
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Lock Dialog */}
                  {lockingImage && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
                      <div className="glass rounded-2xl p-6 w-full max-w-md cyber-glow">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="font-bold text-foreground">Lock Image</h3>
                          <Button variant="ghost" size="icon" onClick={() => setLockingImage(null)}>
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <Label className="text-foreground">Security Method</Label>
                            <Select value={lockType} onValueChange={setLockType}>
                              <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pin">Secure PIN (4-6 digits)</SelectItem>
                                <SelectItem value="face">Face Recognition (Simulated)</SelectItem>
                                <SelectItem value="eye">Eye Recognition (Simulated)</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          {lockType === "pin" && (
                            <div>
                              <Label className="text-foreground">Enter PIN</Label>
                              <Input type="password" value={lockPin} onChange={(e) => setLockPin(e.target.value.replace(/\D/g, "").slice(0, 6))} placeholder="4-6 digit PIN" className="mt-1 font-mono text-center tracking-widest" />
                            </div>
                          )}
                          {lockType === "face" && (
                            <div className="text-center py-4">
                              <Eye className="w-12 h-12 text-primary mx-auto mb-2 animate-pulse" />
                              <p className="text-sm text-muted-foreground">Face recognition simulation ready</p>
                            </div>
                          )}
                          {lockType === "eye" && (
                            <div className="text-center py-4">
                              <Scan className="w-12 h-12 text-cyber-accent mx-auto mb-2 animate-pulse" />
                              <p className="text-sm text-muted-foreground">Eye recognition simulation ready</p>
                            </div>
                          )}
                          <Button onClick={handleLockImage} className="w-full gradient-cyber text-primary-foreground border-0">
                            <Lock className="w-4 h-4 mr-2" /> Lock Image
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Complaint Dialog */}
                  {filingComplaint && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
                      <div className="glass rounded-2xl p-6 w-full max-w-md cyber-glow">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="font-bold text-foreground">File Complaint</h3>
                          <Button variant="ghost" size="icon" onClick={() => setFilingComplaint(null)}>
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <Label className="text-foreground">Issue Description *</Label>
                            <Textarea value={complaintDesc} onChange={(e) => setComplaintDesc(e.target.value)} placeholder="Describe the misuse..." className="mt-1" />
                          </div>
                          <div>
                            <Label className="text-foreground">Detected URL</Label>
                            <Input value={complaintUrl} onChange={(e) => setComplaintUrl(e.target.value)} placeholder="https://..." className="mt-1" />
                          </div>
                          <Button onClick={handleFileComplaint} className="w-full gradient-cyber text-primary-foreground border-0">
                            Submit Complaint
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* COMPLAINTS TAB */}
              {activeTab === "complaints" && (
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-6">Complaint Tracking</h2>
                  {complaints.length === 0 ? (
                    <div className="glass rounded-xl p-12 text-center">
                      <CheckCircle className="w-12 h-12 text-cyber-success mx-auto mb-4" />
                      <p className="text-muted-foreground">No complaints filed. Your images are safe!</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {complaints.map((c) => (
                        <div key={c.id} className="glass rounded-xl p-5">
                          <div className="flex items-center justify-between mb-3">
                            <span className="font-mono text-sm text-primary font-semibold">{c.complaint_id}</span>
                            <span className={`text-xs px-3 py-1 rounded-full font-medium ${getStatusColor(c.status)}`}>
                              {c.status}
                            </span>
                          </div>
                          <p className="text-sm text-foreground mb-2">{c.description}</p>
                          {c.detected_url && (
                            <p className="text-xs text-muted-foreground">URL: {c.detected_url}</p>
                          )}
                          <p className="text-xs text-muted-foreground mt-2">
                            Filed: {new Date(c.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* NOTIFICATIONS TAB */}
              {activeTab === "notifications" && (
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-6">Notifications</h2>
                  {notifications.length === 0 ? (
                    <div className="glass rounded-xl p-12 text-center">
                      <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">No notifications yet.</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {notifications.map((n) => (
                        <div
                          key={n.id}
                          className={`glass rounded-xl p-4 cursor-pointer transition-opacity ${n.is_read ? "opacity-60" : ""}`}
                          onClick={() => markNotificationRead(n.id)}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                              n.type === "alert" ? "bg-cyber-danger" :
                              n.type === "warning" ? "bg-cyber-warning" :
                              n.type === "success" ? "bg-cyber-success" : "bg-primary"
                            }`} />
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-start">
                                <p className="font-medium text-foreground text-sm">{n.title}</p>
                                <span className="text-xs text-muted-foreground ml-2 flex-shrink-0">
                                  {new Date(n.created_at).toLocaleDateString()}
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground mt-1">{n.message}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
