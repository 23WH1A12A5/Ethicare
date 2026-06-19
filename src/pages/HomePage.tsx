import { motion } from "framer-motion";
import { Shield, Lock, Eye, Search, FileWarning, Bell, ArrowRight, Scan } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const features = [
  { icon: Lock, title: "OTP Security", desc: "Dual OTP verification via email and phone for maximum account protection." },
  { icon: Shield, title: "Image Locking", desc: "Lock your images with PIN, Face Recognition, or Eye Recognition." },
  { icon: Eye, title: "Explicit Detection", desc: "AI-powered scanning categorizes images by content and risk level." },
  { icon: Search, title: "Online Misuse Detection", desc: "Reverse image search to find unauthorized use of your photos." },
  { icon: FileWarning, title: "Complaint Tracking", desc: "File and track complaints with real-time status updates." },
  { icon: Bell, title: "Real-time Alerts", desc: "Instant email, SMS, and in-app notifications for threats." },
];

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden cyber-grid">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 mb-6">
              <Scan className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">AI-Powered Protection</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
              <span className="text-foreground">Protecting Your</span>{" "}
              <span className="text-gradient-cyber">Identity</span>{" "}
              <span className="text-foreground">in the AI Era</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Ethicare uses advanced AI to detect, protect, and defend your personal images
              from unauthorized use across the internet.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => navigate("/signup")}
                className="gradient-cyber text-primary-foreground border-0 cyber-glow px-8"
              >
                Get Started
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate("/explore")}
                className="border-border text-foreground hover:bg-secondary"
              >
                Explore
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-cyber-surface/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">Comprehensive Protection</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              A complete suite of tools designed to safeguard your digital identity.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-xl p-6 hover:cyber-glow transition-shadow"
              >
                <div className="w-10 h-10 rounded-lg gradient-cyber flex items-center justify-center mb-4">
                  <f.icon className="w-5 h-5 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center glass rounded-2xl p-12 cyber-glow">
            <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Start Protecting Your Images Today
            </h2>
            <p className="text-muted-foreground mb-6">
              Join thousands of users who trust Ethicare to protect their digital identity.
            </p>
            <Button
              size="lg"
              onClick={() => navigate("/signup")}
              className="gradient-cyber text-primary-foreground border-0"
            >
              Create Free Account
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
