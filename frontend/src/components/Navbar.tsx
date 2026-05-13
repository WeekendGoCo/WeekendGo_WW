"use client";

import { Plane, Globe, User } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { motion, useScroll, useTransform } from "framer-motion";

export function Navbar() {
  const { language, setLanguage, isRtl, t } = useTranslation();
  const { scrollY } = useScroll();
  
  const navBg = useTransform(scrollY, [0, 50], ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.8)"]);
  const navPadding = useTransform(scrollY, [0, 50], ["1.5rem", "1rem"]);
  const shadow = useTransform(scrollY, [0, 50], ["none", "0 10px 30px -10px rgba(13, 27, 42, 0.1)"]);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  return (
    <motion.nav 
      style={{ backgroundColor: navBg, paddingBlock: navPadding, boxShadow: shadow }}
      className="fixed w-full z-50 px-6 backdrop-blur-md transition-all duration-300 border-b border-transparent dark:border-white/5"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="bg-primary p-2 rounded-xl group-hover:rotate-12 transition-transform shadow-lg shadow-primary/20">
            <Plane className={`w-6 h-6 text-white ${isRtl ? '-rotate-90' : 'rotate-45'}`} />
          </div>
          <span className="text-xl h-font tracking-tighter text-dark dark:text-white flex items-center gap-1">
            {isRtl ? (
              <>ويكند <span className="text-primary">جو</span></>
            ) : (
              <>WEEKEND <span className="text-primary">GO</span></>
            )}
          </span>
        </Link>

        <div className="hidden md:flex gap-8 items-center text-xs font-bold uppercase tracking-widest text-dark/70 dark:text-white/70">
          <Link href="/destinations" className="hover:text-primary transition-colors">{t.navbar.destinations}</Link>
          <Link href="/luxury-stays" className="hover:text-primary transition-colors">{t.navbar.luxuryStays}</Link>
          <Link href="/experiences" className="hover:text-primary transition-colors">{t.navbar.experiences}</Link>
          <Link href="/about" className="hover:text-primary transition-colors">{t.navbar.about}</Link>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={toggleLanguage}
            className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-dark/80 dark:text-white/80 hover:text-primary transition-colors bg-white/50 dark:bg-white/5 px-3 py-2 rounded-full border border-dark/5 dark:border-white/10"
          >
            <Globe size={14} className="text-primary" />
            {language === 'en' ? 'العربية' : 'English'}
          </button>
          
          <Link 
            href="/login"
            className="hidden sm:flex items-center gap-2 bg-dark dark:bg-white text-white dark:text-dark px-6 py-2.5 rounded-full font-bold text-[10px] uppercase tracking-widest hover:bg-primary dark:hover:bg-primary hover:text-white transition-all shadow-xl shadow-dark/10"
          >
            <User size={14} />
            {t.navbar.signIn}
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}
