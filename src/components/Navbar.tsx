import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Shield, Sun, Moon, Menu, X, LogOut } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { user, signOut } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/explore", label: "Explore" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-strong">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-lg gradient-cyber flex items-center justify-center">
            <Shield className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-bold text-lg text-foreground">Ethicare</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="text-muted-foreground hover:text-foreground"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>

          {user ? (
            <>
              <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard")} className="hidden md:flex">
                Dashboard
              </Button>
              <Button variant="ghost" size="icon" onClick={handleSignOut} className="hidden md:flex text-muted-foreground">
                <LogOut className="w-4 h-4" />
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" onClick={() => navigate("/login")} className="hidden md:flex">
                Login
              </Button>
              <Button size="sm" onClick={() => navigate("/signup")} className="hidden md:flex gradient-cyber text-primary-foreground border-0">
                Get Started
              </Button>
            </>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-muted-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden glass-strong border-t border-border p-4 space-y-2">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setMobileOpen(false)}
              className="block py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
          {user ? (
            <>
              <Link to="/dashboard" onClick={() => setMobileOpen(false)} className="block py-2 text-sm font-medium text-foreground">
                Dashboard
              </Link>
              <button onClick={handleSignOut} className="block py-2 text-sm font-medium text-destructive">
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setMobileOpen(false)} className="block py-2 text-sm font-medium text-foreground">
                Login
              </Link>
              <Link to="/signup" onClick={() => setMobileOpen(false)} className="block py-2 text-sm font-medium text-primary">
                Get Started
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
