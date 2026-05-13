"use client";

import { Plane, Globe, X, MessageSquare } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[#0D1B2A] pt-20 pb-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-3 mb-8">
              <Plane className="w-8 h-8 text-primary" />
              <span className="text-2xl font-black tracking-tighter text-white">
                WEEKEND <span className="text-primary">GO</span>
              </span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed mb-8">
              Redefining luxury travel for the modern explorer. Exclusive stays, curated experiences, and unparalleled service.
            </p>
            <div className="flex gap-4">
              <SocialIcon icon={<Globe size={20} />} />
              <SocialIcon icon={<X size={20} />} />
              <SocialIcon icon={<MessageSquare size={20} />} />
            </div>
          </div>

          <div>
            <h4 className="text-white font-black text-xs uppercase tracking-[0.2em] mb-8">Quick Links</h4>
            <ul className="space-y-4 text-white/40 text-sm font-medium">
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/destinations" className="hover:text-primary transition-colors">Destinations</Link></li>
              <li><Link href="/experiences" className="hover:text-primary transition-colors">Experiences</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black text-xs uppercase tracking-[0.2em] mb-8">Support</h4>
            <ul className="space-y-4 text-white/40 text-sm font-medium">
              <li><Link href="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
              <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="/help" className="hover:text-primary transition-colors">Help Center</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black text-xs uppercase tracking-[0.2em] mb-8">Newsletter</h4>
            <p className="text-white/40 text-sm mb-6">Join our elite travel community for exclusive offers.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary/50 flex-1"
              />
              <button className="bg-primary text-background p-3 rounded-xl hover:bg-white transition-colors">
                <Plane size={20} className="rotate-45" />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/20 text-xs font-bold uppercase tracking-widest">
            © 2026 Weekend Go. All Rights Reserved.
          </p>
          <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-white/20">
            <span>Security</span>
            <span>Cookies</span>
            <span>Accessibility</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ icon }: { icon: any }) {
  return (
    <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-primary hover:border-primary/30 transition-all">
      {icon}
    </button>
  );
}
