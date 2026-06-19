import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, Sun, Moon, LogOut, Users, Image, FileWarning, Eye, AlertTriangle, Scan } from "lucide-react";
import { toast } from "sonner";

interface AdminProfile {
  id: string;
  full_name: string;
  email: string;
  role: string;
  created_at: string;
  profile_image_url: string | null;
}

interface AdminImage {
  id: string;
  user_id: string;
  file_name: string;
  image_url: string;
  category: string;
  risk_level: string;
  flag_status: string;
  misuse_detected: boolean;
}

interface AdminComplaint {
  id: string;
  complaint_id: string;
  user_id: string;
  description: string;
  detected_url: string | null;
  status: string;
  created_at: string;
}

type AdminTab = "users" | "images" | "complaints";

export default function AdminPage() {
  const { user, profile, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [tab, setTab] = useState<AdminTab>("users");
  const [users, setUsers] = useState<AdminProfile[]>([]);
  const [images, setImages] = useState<AdminImage[]>([]);
  const [complaints, setComplaints] = useState<AdminComplaint[]>([]);

  useEffect(() => {
    if (!user || !profile) return;
    if (profile.role !== "admin") {
      toast.error("Access denied. Admin only.");
      navigate("/dashboard");
      return;
    }
    loadAdminData();
  }, [user, profile]);

  const loadAdminData = async () => {
    const [uRes, iRes, cRes] = await Promise.all([
      supabase.from("profiles").select("*"),
      supabase.from("user_images").select("*").eq("flag_status", "Flagged"),
      supabase.from("complaints").select("*").order("created_at", { ascending: false }),
    ]);
    if (uRes.data) setUsers(uRes.data as AdminProfile[]);
    if (iRes.data) setImages(iRes.data as AdminImage[]);
    if (cRes.data) setComplaints(cRes.data as AdminComplaint[]);
  };

  const updateComplaintStatus = async (id: string, status: string) => {
    await supabase.from("complaints").update({ status }).eq("id", id);

    // Get complaint to find user
    const complaint = complaints.find(c => c.id === id);
    if (complaint) {
      await supabase.from("notifications").insert({
        user_id: complaint.user_id,
        title: "Complaint Status Updated",
        message: `Your complaint ${complaint.complaint_id} status has been updated to: ${status}`,
        type: status === "Resolved" ? "success" : "info",
      });
    }

    toast.success("Status updated");
    await loadAdminData();
  };

  const simulateMisuseDetection = async (imageId: string, userId: string) => {
    const sites = [
      "https://suspicious-site.example.com/stolen",
      "https://fake-profile.example.com/user123",
    ];
    const url = sites[Math.floor(Math.random() * sites.length)];

    await supabase.from("user_images").update({
      misuse_detected: true,
      misuse_url: url,
      misuse_date: new Date().toISOString(),
    }).eq("id", imageId);

    await supabase.from("notifications").insert({
      user_id: userId,
      title: "⚠️ Image Misuse Detected",
      message: `Your image was found on: ${url}. Please review and file a complaint if necessary.`,
      type: "alert",
    });

    toast.success("Misuse detection simulated");
    await loadAdminData();
  };

  if (!profile || profile.role !== "admin") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Scan className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  const tabs: { id: AdminTab; label: string; icon: typeof Users; count: number }[] = [
    { id: "users", label: "Users", icon: Users, count: users.length },
    { id: "images", label: "Flagged Images", icon: Image, count: images.length },
    { id: "complaints", label: "Complaints", icon: FileWarning, count: complaints.length },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 left-0 right-0 z-50 glass-strong h-16 flex items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg gradient-cyber flex items-center justify-center">
            <Shield className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-bold text-foreground">Ethicare Admin</span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="text-muted-foreground">
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>
          <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard")} className="text-muted-foreground">
            Dashboard
          </Button>
          <Button variant="ghost" size="icon" onClick={() => { signOut(); navigate("/"); }} className="text-muted-foreground">
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </header>

      <div className="pt-20 px-4 md:px-8 max-w-7xl mx-auto">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`glass rounded-xl p-5 text-left transition-all ${tab === t.id ? "cyber-glow border-primary/30" : ""}`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{t.label}</p>
                  <p className="text-3xl font-bold text-foreground">{t.count}</p>
                </div>
                <t.icon className={`w-8 h-8 ${tab === t.id ? "text-primary" : "text-muted-foreground"}`} />
              </div>
            </button>
          ))}
        </div>

        {/* Users */}
        {tab === "users" && (
          <div className="glass rounded-xl overflow-hidden">
            <div className="p-4 border-b border-border">
              <h3 className="font-bold text-foreground">All Users</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-secondary/50">
                  <tr>
                    <th className="text-left p-3 text-muted-foreground font-medium">User</th>
                    <th className="text-left p-3 text-muted-foreground font-medium">Email</th>
                    <th className="text-left p-3 text-muted-foreground font-medium">Role</th>
                    <th className="text-left p-3 text-muted-foreground font-medium">Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.id} className="border-t border-border">
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          {u.profile_image_url ? (
                            <img src={u.profile_image_url} className="w-8 h-8 rounded-full object-cover" />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-secondary" />
                          )}
                          <span className="text-foreground font-medium">{u.full_name}</span>
                        </div>
                      </td>
                      <td className="p-3 text-muted-foreground">{u.email}</td>
                      <td className="p-3">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${u.role === "admin" ? "bg-primary/10 text-primary" : "bg-secondary text-muted-foreground"}`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="p-3 text-muted-foreground">{new Date(u.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Flagged Images */}
        {tab === "images" && (
          <div className="glass rounded-xl overflow-hidden">
            <div className="p-4 border-b border-border">
              <h3 className="font-bold text-foreground">Flagged Images</h3>
            </div>
            {images.length === 0 ? (
              <div className="p-12 text-center text-muted-foreground">No flagged images</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                {images.map((img) => (
                  <div key={img.id} className="rounded-lg border border-border p-3">
                    <img src={img.image_url} className="w-full h-32 object-cover rounded mb-2" />
                    <p className="text-sm font-medium text-foreground truncate">{img.file_name}</p>
                    <p className="text-xs text-muted-foreground">{img.category}</p>
                    <p className="text-xs text-cyber-danger">{img.risk_level}</p>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => simulateMisuseDetection(img.id, img.user_id)}
                      className="mt-2 w-full text-xs"
                    >
                      <AlertTriangle className="w-3 h-3 mr-1" /> Simulate Misuse
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Complaints */}
        {tab === "complaints" && (
          <div className="glass rounded-xl overflow-hidden">
            <div className="p-4 border-b border-border">
              <h3 className="font-bold text-foreground">All Complaints</h3>
            </div>
            {complaints.length === 0 ? (
              <div className="p-12 text-center text-muted-foreground">No complaints</div>
            ) : (
              <div className="divide-y divide-border">
                {complaints.map((c) => (
                  <div key={c.id} className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-sm text-primary font-semibold">{c.complaint_id}</span>
                      <Select value={c.status} onValueChange={(v) => updateComplaintStatus(c.id, v)}>
                        <SelectTrigger className="w-40 h-8 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Submitted">Submitted</SelectItem>
                          <SelectItem value="Under Review">Under Review</SelectItem>
                          <SelectItem value="Action Taken">Action Taken</SelectItem>
                          <SelectItem value="Resolved">Resolved</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <p className="text-sm text-foreground">{c.description}</p>
                    {c.detected_url && (
                      <p className="text-xs text-muted-foreground mt-1">URL: {c.detected_url}</p>
                    )}
                    <p className="text-xs text-muted-foreground mt-1">
                      Filed: {new Date(c.created_at).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
