import { motion } from "framer-motion";
import { Shield, Lock, Eye, Scan, Server, Globe } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-32 pb-20 cyber-grid">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-extrabold text-foreground mb-6">About <span className="text-gradient-cyber">Ethicare</span></h1>

            <div className="space-y-8">
              <div className="glass rounded-xl p-8">
                <h2 className="text-xl font-bold text-foreground mb-3 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" /> Our Mission
                </h2>
                <p className="text-muted-foreground">
                  To empower individuals with AI-powered tools that protect their personal images from unauthorized
                  distribution, misuse, and exploitation across the internet.
                </p>
              </div>

              <div className="glass rounded-xl p-8">
                <h2 className="text-xl font-bold text-foreground mb-3 flex items-center gap-2">
                  <Eye className="w-5 h-5 text-primary" /> Our Vision
                </h2>
                <p className="text-muted-foreground">
                  A world where every person has full control over their digital identity and personal images,
                  free from fear of non-consensual use.
                </p>
              </div>

              <div className="glass rounded-xl p-8">
                <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <Scan className="w-5 h-5 text-primary" /> How It Works
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { icon: Lock, step: "1", title: "Upload & Lock", desc: "Upload your images and lock them with PIN, face, or eye recognition." },
                    { icon: Server, step: "2", title: "AI Analysis", desc: "Our AI classifies images and flags any risk content automatically." },
                    { icon: Globe, step: "3", title: "Monitor & Protect", desc: "Continuous monitoring detects misuse and alerts you instantly." },
                  ].map((s) => (
                    <div key={s.step} className="text-center p-4">
                      <div className="w-10 h-10 rounded-full gradient-cyber flex items-center justify-center mx-auto mb-3">
                        <span className="text-primary-foreground font-bold text-sm">{s.step}</span>
                      </div>
                      <h3 className="font-semibold text-foreground text-sm mb-1">{s.title}</h3>
                      <p className="text-xs text-muted-foreground">{s.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass rounded-xl p-8">
                <h2 className="text-xl font-bold text-foreground mb-3 flex items-center gap-2">
                  <Lock className="w-5 h-5 text-primary" /> Data Privacy Commitment
                </h2>
                <p className="text-muted-foreground">
                  Your data is encrypted at rest and in transit. We never share your images with third parties.
                  All scans are performed securely in isolated environments. You have full control to delete
                  your data at any time.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
