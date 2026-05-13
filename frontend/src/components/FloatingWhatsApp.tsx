"use client";

import React, { useState, useEffect } from 'react';
import { MessageSquare, X } from 'lucide-react';
import { useTranslation } from '@/lib/i18n/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

export function FloatingWhatsApp() {
  const { isRtl } = useTranslation();
  const [showTooltip, setShowTooltip] = useState(false);
  const phoneNumber = "966555057689";
  const message = isRtl ? "مرحباً، أود الاستفسار عن خدمات ويكند جو" : "Hello, I'd like to inquire about Weekend Go services";
  
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`fixed bottom-8 ${isRtl ? 'left-8' : 'right-8'} z-50 flex flex-col items-end gap-4`}>
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white dark:bg-slate shadow-premium rounded-2xl p-4 border border-primary/10 relative max-w-[200px]"
          >
            <button 
              onClick={() => setShowTooltip(false)}
              className="absolute top-2 right-2 text-dark/20 dark:text-white/20 hover:text-primary transition-colors"
            >
              <X size={12} />
            </button>
            <p className={`text-xs font-bold text-dark dark:text-white leading-relaxed ${isRtl ? 'text-right pr-2' : 'text-left pl-2'}`}>
              {isRtl ? "كيف يمكننا مساعدتك اليوم في التخطيط لرحلتك؟" : "How can we help you plan your luxury getaway today?"}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        className="relative group"
        id="whatsapp-widget"
      >
        <div className="absolute inset-0 bg-[#25D366] rounded-full animate-ping opacity-20 group-hover:animate-none"></div>
        <div className="bg-[#25D366] text-white p-4 rounded-2xl shadow-[0_15px_30px_rgba(37,211,102,0.4)] relative z-10 transition-all duration-300 group-hover:rounded-[1.5rem]">
          <MessageSquare size={28} fill="currentColor" />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent border-2 border-white dark:border-slate rounded-full animate-pulse"></div>
        </div>
        
        <span className={`absolute ${isRtl ? 'right-full mr-4' : 'left-full ml-4'} top-1/2 -translate-y-1/2 bg-dark text-white px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none`}>
          {isRtl ? "تحدث معنا" : "WhatsApp Us"}
        </span>
      </motion.a>
    </div>
  );
}
