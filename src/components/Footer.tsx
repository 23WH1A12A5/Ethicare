import { Shield } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg gradient-cyber flex items-center justify-center">
                <Shield className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-bold text-foreground">Ethicare</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Protecting Your Identity in the AI Era
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-3 text-sm">Product</h4>
            <div className="space-y-2">
              <Link to="/explore" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Explore</Link>
              <Link to="/about" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">About</Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-3 text-sm">Legal</h4>
            <div className="space-y-2">
              <span className="block text-sm text-muted-foreground">Privacy Policy</span>
              <span className="block text-sm text-muted-foreground">Terms of Service</span>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-3 text-sm">Contact</h4>
            <p className="text-sm text-muted-foreground">support@ethicare.ai</p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Ethicare. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
