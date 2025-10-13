import { Heart, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg gradient-hero flex items-center justify-center shadow-medium">
                <Heart className="w-6 h-6 text-white" fill="currentColor" />
              </div>
              <span className="text-xl font-bold">
                WasteLess <span className="text-primary">ServeMore</span>
              </span>
            </div>
            <p className="text-background/80 text-sm">
              Reducing food waste and feeding those in need, one meal at a time.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-background/80 hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/donate" className="text-background/80 hover:text-primary transition-colors">
                  Donate Food
                </Link>
              </li>
              <li>
                <Link to="/request" className="text-background/80 hover:text-primary transition-colors">
                  Request Food
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-background/80 hover:text-primary transition-colors">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-bold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-background/80 hover:text-primary transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#" className="text-background/80 hover:text-primary transition-colors">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="text-background/80 hover:text-primary transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-background/80 hover:text-primary transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-background/80">
                <Mail className="w-4 h-4" />
                support@wasteless.org
              </li>
              <li className="flex items-center gap-2 text-background/80">
                <Phone className="w-4 h-4" />
                +91 9876543210
              </li>
              <li className="flex items-center gap-2 text-background/80">
                <MapPin className="w-4 h-4" />
                Mumbai, India
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-background/20 text-center text-sm text-background/60">
          <p>&copy; 2025 WasteLess ServeMore. All rights reserved. Making a difference together.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
