import { Link } from "react-router-dom";
import { ArrowRight, Globe, Mail, MessageSquare } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-sidebar text-sidebar-foreground pt-20 pb-10">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* CTA Section */}
        <div className="text-center mb-24 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Ready to rewrite your career trajectory?
          </h2>
          <p className="text-lg text-sidebar-foreground/70 mb-10">
            Join thousands of professionals using Aria to land their dream roles faster.
          </p>
          <Link 
            to="/register" 
            className="group relative inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-base font-semibold text-sidebar shadow-xl transition-all hover:bg-white/90 hover:-translate-y-1"
          >
            Start for free today
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 border-t border-sidebar-foreground/10 pt-12">
          <div className="col-span-2 lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="h-8 w-8 rounded-lg bg-white/10 flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="font-bold text-xl tracking-tight">Aria</span>
            </Link>
            <p className="text-sm text-sidebar-foreground/60 max-w-xs mb-6">
              The AI-powered career assistant that helps you navigate your professional journey with precision and confidence.
            </p>
            <div className="flex gap-4">
              <a href="#" aria-label="Website" className="text-sidebar-foreground/60 hover:text-white transition-colors">
                <Globe className="h-5 w-5" />
              </a>
              <a href="#" aria-label="Email" className="text-sidebar-foreground/60 hover:text-white transition-colors">
                <Mail className="h-5 w-5" />
              </a>
              <a href="#" aria-label="Contact" className="text-sidebar-foreground/60 hover:text-white transition-colors">
                <MessageSquare className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-3 text-sm text-sidebar-foreground/60">
              <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Roadmaps</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Testimonials</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-3 text-sm text-sidebar-foreground/60">
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-3 text-sm text-sidebar-foreground/60">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-sidebar-foreground/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-sidebar-foreground/40">
          <p>© {new Date().getFullYear()} Aria Inc. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-success"></div>
            <span>All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
