import { motion } from "framer-motion";
import { Scan, Shield, AlertTriangle, CheckCircle, Eye, Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const steps = [
  {
    icon: Scan,
    title: "Image Upload",
    desc: "User uploads an image to the platform. Our system accepts JPEG, PNG, and WebP formats up to 10MB.",
    color: "text-primary",
  },
  {
    icon: Eye,
    title: "AI Content Analysis",
    desc: "The AI scans the image for face detection and content classification using deep learning models.",
    color: "text-cyber-accent",
  },
  {
    icon: AlertTriangle,
    title: "Risk Classification",
    desc: "Images are categorized: Normal Selfie, Diagram/Educational, Blurred Explicit, Face + Explicit, or Explicit without Face.",
    color: "text-cyber-warning",
  },
  {
    icon: Shield,
    title: "Image Locking",
    desc: "Users lock their images using PIN, Face Recognition, or Eye Recognition for enhanced security.",
    color: "text-primary",
  },
  {
    icon: Search,
    title: "Reverse Image Search",
    desc: "The system continuously monitors the internet for unauthorized copies of your locked images.",
    color: "text-cyber-accent",
  },
  {
    icon: CheckCircle,
    title: "Alert & Action",
    desc: "If misuse is detected, instant notifications are sent and complaint filing is enabled.",
    color: "text-cyber-success",
  },
];

export default function ExplorePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-32 pb-20 cyber-grid">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-extrabold text-foreground mb-4">
                How <span className="text-gradient-cyber">AI Scanning</span> Works
              </h1>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Explore the pipeline that powers Ethicare's image protection system.
              </p>
            </div>

            <div className="space-y-6">
              {steps.map((step, i) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass rounded-xl p-6 flex gap-4 items-start"
                >
                  <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                    <step.icon className={`w-5 h-5 ${step.color}`} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono text-muted-foreground">STEP {i + 1}</span>
                    </div>
                    <h3 className="font-semibold text-foreground mb-1">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Demo Preview */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-16 glass rounded-xl p-8"
            >
              <h2 className="text-xl font-bold text-foreground mb-6 text-center">Classification Demo Preview</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { label: "Normal Selfie", risk: "Safe", flag: "Not Flagged", color: "bg-cyber-success/10 border-cyber-success/20 text-cyber-success" },
                  { label: "Blurred Explicit", risk: "Moderate Risk", flag: "Flagged", color: "bg-cyber-warning/10 border-cyber-warning/20 text-cyber-warning" },
                  { label: "Face + Explicit", risk: "High Privacy Risk", flag: "Flagged", color: "bg-cyber-danger/10 border-cyber-danger/20 text-cyber-danger" },
                ].map((demo) => (
                  <div key={demo.label} className={`rounded-lg border p-4 ${demo.color}`}>
                    <div className="w-full h-24 rounded bg-secondary/50 mb-3 flex items-center justify-center">
                      <Scan className="w-8 h-8 opacity-30" />
                    </div>
                    <p className="font-semibold text-sm">{demo.label}</p>
                    <p className="text-xs mt-1">Risk: {demo.risk}</p>
                    <p className="text-xs">Status: {demo.flag}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
