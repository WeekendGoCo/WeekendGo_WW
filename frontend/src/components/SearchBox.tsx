"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Calendar, Users, Loader2 } from 'lucide-react';
import { useTranslation } from '@/lib/i18n/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

export function SearchBox() {
  const { t, isRtl } = useTranslation();
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length < 2) {
        setSuggestions([]);
        return;
      }

      setIsLoading(true);
      try {
        const res = await fetch(`/api/locations/search?query=${encodeURIComponent(query)}`);
        const data = await res.json();
        setSuggestions(data);
        setShowSuggestions(true);
      } catch (error) {
        console.error("Suggestion fetch error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const debounce = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounce);
  }, [query]);

  const handleSelect = (item: any) => {
    setQuery(item.name);
    setSelectedId(item.id);
    setShowSuggestions(false);
  };

  const handleSearch = () => {
    if (!query) return;
    router.push(`/search?dest=${encodeURIComponent(query)}&destId=${selectedId}`);
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto z-30">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate rounded-[2.5rem] p-3 shadow-premium border border-dark/5 dark:border-white/5 flex flex-col lg:flex-row gap-2"
      >
        {/* Destination Input */}
        <div className="flex-1 relative" ref={dropdownRef}>
          <div className={`h-full flex items-center gap-4 px-6 py-4 rounded-[2rem] hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-text group ${showSuggestions ? 'bg-gray-50 dark:bg-white/5' : ''}`}>
            <MapPin className="text-primary w-6 h-6 group-hover:scale-110 transition-transform" />
            <div className="flex-1 text-left">
              <p className={`text-[10px] font-bold uppercase tracking-widest text-dark/40 dark:text-white/40 mb-1 ${isRtl ? 'text-right' : 'text-left'}`}>
                {t.search.destination}
              </p>
              <input 
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => query.length >= 2 && setShowSuggestions(true)}
                placeholder={t.search.searchPlaceholder} 
                className={`bg-transparent border-none outline-none w-full text-dark dark:text-white placeholder-dark/20 dark:placeholder-white/20 font-bold text-sm ${isRtl ? 'text-right' : 'text-left'}`}
              />
            </div>
            {isLoading && <Loader2 className="w-4 h-4 text-primary animate-spin" />}
          </div>

          {/* Suggestions Dropdown */}
          <AnimatePresence>
            {showSuggestions && suggestions.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-full left-0 right-0 mt-3 bg-white dark:bg-slate rounded-3xl shadow-2xl border border-dark/5 dark:border-white/5 overflow-hidden z-50"
              >
                {suggestions.map((item, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelect(item)}
                    className="w-full flex items-center gap-4 px-6 py-4 hover:bg-primary/5 transition-colors border-b border-dark/5 dark:border-white/5 last:border-0 group"
                  >
                    <div className="bg-primary/10 p-2 rounded-xl group-hover:bg-primary group-hover:text-white transition-colors text-primary">
                      <MapPin size={18} />
                    </div>
                    <div className={isRtl ? 'text-right' : 'text-left'}>
                      <p className="text-sm font-bold text-dark dark:text-white">{item.name}</p>
                      <p className="text-[10px] text-dark/40 dark:text-white/40 uppercase tracking-widest">{item.type} • {item.country}</p>
                    </div>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Date Picker (Static Placeholder for UI) */}
        <div className="flex-1">
          <div className="h-full flex items-center gap-4 px-6 py-4 rounded-[2rem] hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer group">
            <Calendar className="text-primary w-6 h-6 group-hover:scale-110 transition-transform" />
            <div className={`flex-1 ${isRtl ? 'text-right' : 'text-left'}`}>
              <p className="text-[10px] font-bold uppercase tracking-widest text-dark/40 dark:text-white/40 mb-1">
                {t.search.checkIn} — {t.search.checkOut}
              </p>
              <p className="text-sm font-bold text-dark dark:text-white">{t.search.datesPlaceholder}</p>
            </div>
          </div>
        </div>

        {/* Guests (Static Placeholder for UI) */}
        <div className="flex-1">
          <div className="h-full flex items-center gap-4 px-6 py-4 rounded-[2rem] hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer group">
            <Users className="text-primary w-6 h-6 group-hover:scale-110 transition-transform" />
            <div className={`flex-1 ${isRtl ? 'text-right' : 'text-left'}`}>
              <p className="text-[10px] font-bold uppercase tracking-widest text-dark/40 dark:text-white/40 mb-1">
                {t.search.guests}
              </p>
              <p className="text-sm font-bold text-dark dark:text-white">{t.search.guestsLabel}</p>
            </div>
          </div>
        </div>

        {/* Search Button */}
        <button 
          onClick={handleSearch}
          className="bg-primary hover:bg-secondary text-white px-10 py-4 rounded-[2rem] transition-all flex items-center justify-center gap-3 shadow-lg shadow-primary/30 group active:scale-95"
        >
          <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span className="font-bold uppercase tracking-widest text-xs">{t.search.searchButton}</span>
        </button>
      </motion.div>
    </div>
  );
}
