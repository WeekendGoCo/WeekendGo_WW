"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { 
  MapPin, Star, Wifi, Coffee, 
  WavesLadder as Pool, Search as SearchIcon, 
  Filter, ChevronRight, Loader2, Calendar,
  ArrowUpDown, SlidersHorizontal
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useTranslation } from "@/lib/i18n/LanguageContext";

function SearchResults() {
  const { t, isRtl } = useTranslation();
  const searchParams = useSearchParams();
  const initialDest = searchParams.get("destination") || "Dubai";
  const initialDestId = searchParams.get("destId") || "";
  const initialCheckIn = searchParams.get("checkIn") || "2026-10-15";
  const initialCheckOut = searchParams.get("checkOut") || "2026-10-22";

  const [destination, setDestination] = useState(initialDest);
  const [destId, setDestId] = useState(initialDestId);
  const [checkIn, setCheckIn] = useState(initialCheckIn);
  const [checkOut, setCheckOut] = useState(initialCheckOut);
  const [hotels, setHotels] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (targetDestId?: string) => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/hotels/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          destination, 
          destId: targetDestId || destId,
          checkIn, 
          checkOut, 
          guests: 2 
        }),
      });
      
      const result = await response.json();
      if (result.success) {
        setHotels(result.data);
      } else {
        setError("Unable to retrieve luxury stays at the moment.");
      }
    } catch (err) {
      setError("A connection error occurred.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialDest) {
      handleSearch(initialDestId);
    }
  }, []);

  return (
    <div className={`flex-1 text-white pt-32 pb-20 font-sans ${isRtl ? 'font-arabic' : ''}`}>
      <Navbar />
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Premium Search Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#1F2937]/60 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-3 mb-20 shadow-2xl"
        >
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-2 p-2">
            <div className="flex-[1.5] flex items-center gap-4 px-8 py-5 bg-white/5 rounded-[2rem] border border-transparent focus-within:border-[#A3E635]/50 group transition-all">
              <MapPin className="text-[#A3E635] group-hover:scale-110 transition-transform" size={24} />
              <div className="flex-1">
                <p className="text-[9px] uppercase tracking-widest text-[#22C7F2] font-black mb-1">{t.search.destination}</p>
                <input 
                  type="text" 
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className={`w-full bg-transparent border-none p-0 focus:ring-0 text-white placeholder:text-white/20 font-bold text-base ${isRtl ? 'text-right' : ''}`}
                  placeholder={t.search.placeholder}
                />
              </div>
            </div>

            <div className="flex-1 flex items-center gap-4 px-8 py-5 bg-white/5 rounded-[2rem] border border-transparent focus-within:border-[#A3E635]/50 group transition-all">
              <Calendar className="text-[#22C7F2]" size={22} />
              <div className="flex-1">
                <p className="text-[9px] uppercase tracking-widest text-[#22C7F2] font-black mb-1">{t.search.checkIn}</p>
                <input 
                  type="date" 
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="bg-transparent border-none p-0 focus:ring-0 text-sm text-white w-full [color-scheme:dark] font-bold"
                />
              </div>
            </div>

            <div className="flex-1 flex items-center gap-4 px-8 py-5 bg-white/5 rounded-[2rem] border border-transparent focus-within:border-[#A3E635]/50 group transition-all">
              <Calendar className="text-[#22C7F2]" size={22} />
              <div className="flex-1">
                <p className="text-[9px] uppercase tracking-widest text-[#22C7F2] font-black mb-1">{t.search.checkOut}</p>
                <input 
                  type="date" 
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="bg-transparent border-none p-0 focus:ring-0 text-sm text-white w-full [color-scheme:dark] font-bold"
                />
              </div>
            </div>

            <button 
              onClick={() => handleSearch()}
              disabled={loading}
              className="bg-[#A3E635] hover:bg-white disabled:bg-slate-800 text-[#0D1B2A] px-12 rounded-[2rem] font-black text-[10px] uppercase tracking-[0.2em] transition-all h-full min-h-[70px] flex items-center justify-center gap-3 shadow-[0_15px_30px_rgba(163,230,53,0.3)]"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : <SearchIcon size={20} strokeWidth={3} />}
              {loading ? t.search.curating : t.search.explore}
            </button>
          </div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Enhanced Filters Sidebar */}
          <aside className="w-full lg:w-80 flex-shrink-0 space-y-8">
            <div className="bg-[#1F2937]/30 border border-white/5 rounded-[2.5rem] p-10 sticky top-32">
              <div className={`flex items-center gap-3 font-black text-xs uppercase tracking-[0.2em] mb-10 pb-4 border-b border-white/5 ${isRtl ? 'flex-row-reverse' : ''}`}>
                <SlidersHorizontal size={18} className="text-[#A3E635]" />
                {isRtl ? 'تصفية النتائج' : 'Refine Results'}
              </div>
              
              <div className="space-y-10">
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-[#22C7F2]">{isRtl ? 'السعر لليلة' : 'Nightly Rate'}</h4>
                    <span className="text-[10px] font-bold text-white/40">$2,000+</span>
                  </div>
                  <input type="range" className="w-full accent-[#A3E635] h-1 bg-white/10 rounded-full appearance-none cursor-pointer" />
                </div>

                <div className="pt-8 border-t border-white/5">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-[#22C7F2] mb-6">{isRtl ? 'تصنيف الفندق' : 'Curation Level'}</h4>
                  <div className="space-y-4">
                    {[5, 4, 3].map(star => (
                      <label key={star} className={`flex items-center gap-4 cursor-pointer group ${isRtl ? 'flex-row-reverse' : ''}`}>
                        <div className="w-5 h-5 rounded-lg border-2 border-white/10 group-hover:border-[#A3E635] transition-all flex items-center justify-center">
                          <div className="w-2 h-2 bg-[#A3E635] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <span className="flex items-center gap-2 text-sm font-bold text-white/60 group-hover:text-white">
                          {star} <Star size={14} className="fill-[#A3E635] text-[#A3E635]" />
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="pt-8 border-t border-white/5">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-[#22C7F2] mb-6">{isRtl ? 'المرافق المختارة' : 'Curated Amenities'}</h4>
                  <div className="space-y-4">
                    {(isRtl ? ['مسبح خاص', 'سبا فاخر', 'إطلالة بحرية', 'إفطار VIP'] : ['Private Pool', 'Luxury Spa', 'Ocean View', 'VIP Breakfast']).map(amenity => (
                      <label key={amenity} className={`flex items-center gap-4 cursor-pointer group ${isRtl ? 'flex-row-reverse' : ''}`}>
                         <div className="w-5 h-5 rounded-lg border-2 border-white/10 group-hover:border-[#22C7F2] transition-all" />
                        <span className="text-sm font-bold text-white/60 group-hover:text-white">{amenity}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Luxury Results Area */}
          <main className="flex-1">
            <div className="flex justify-between items-end mb-10">
              <div className={isRtl ? 'text-right' : 'text-left'}>
                <h2 className="text-4xl font-black tracking-tighter mb-2">
                  {loading ? (isRtl ? 'جاري البحث...' : 'Searching...') : (isRtl ? `${hotels.length} إقامة مختارة في ${destination}` : `${hotels.length} curated stays in ${destination}`)}
                </h2>
                <div className={`h-1 w-20 bg-[#A3E635] rounded-full ${isRtl ? 'ml-auto' : ''}`} />
              </div>
              <div className="hidden md:flex items-center gap-4 text-white/40 text-[10px] font-black uppercase tracking-widest">
                <ArrowUpDown size={14} /> {isRtl ? 'ترتيب حسب: الموصى به' : 'Sort by: Recommended'}
              </div>
            </div>

            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-40"
                >
                  <div className="relative">
                    <Loader2 className="animate-spin text-[#A3E635]" size={80} strokeWidth={1} />
                    <div className="absolute inset-0 blur-3xl bg-[#A3E635]/20" />
                  </div>
                  <p className="mt-12 text-[#22C7F2] uppercase tracking-[0.5em] text-[10px] font-black animate-pulse">
                    {isRtl ? 'جاري استشارة المخزون العالمي' : 'Consulting global inventory'}
                  </p>
                </motion.div>
              ) : hotels.length > 0 ? (
                <div className="space-y-12">
                  {hotels.map((hotel, idx) => (
                    <HotelCard key={hotel.providerId || idx} hotel={hotel} index={idx} />
                  ))}
                </div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-40 bg-[#1F2937]/20 rounded-[3rem] border border-white/5 border-dashed"
                >
                  <div className="bg-white/5 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8">
                    <MapPin size={32} className="text-white/20" />
                  </div>
                  <p className="text-xl font-black text-white/40 uppercase tracking-widest">{isRtl ? 'لم يتم العثور على إقامات تطابق المعايير' : 'No destinations found matching your criteria'}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0D1B2A] flex items-center justify-center text-white font-black tracking-widest uppercase text-xs">Curating Luxury...</div>}>
      <div className="min-h-screen bg-[#0D1B2A] flex flex-col">
        <SearchResults />
        <Footer />
      </div>
    </Suspense>
  );
}

function HotelCard({ hotel, index }: { hotel: any, index: number }) {
  const { isRtl } = useTranslation();
  const hotelId = hotel.providerId?.replace('BKG_', '');

  return (
    <motion.div 
      initial={{ opacity: 0, x: isRtl ? -20 : 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative dynamic-card bg-[#1F2937]/40 backdrop-blur-md rounded-[2.5rem] overflow-hidden border border-white/5 hover:border-[#A3E635]/30 transition-all duration-500"
    >
      <div className="flex flex-col lg:flex-row">
        {/* Image Section */}
        <div className="relative w-full lg:w-[450px] h-[350px] lg:h-auto overflow-hidden">
          <Image 
            src={hotel.image || '/dest-dubai.png'} 
            alt={hotel.name || 'Luxury Stay'} 
            fill 
            className="object-cover group-hover:scale-110 transition-transform duration-[1.5s]" 
            sizes="(max-width: 768px) 100vw, 450px" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2A] via-transparent to-transparent lg:bg-gradient-to-r lg:from-[#0D1B2A]/40" />
          
          {hotel.isExclusive && (
            <div className={`absolute top-8 ${isRtl ? 'right-8' : 'left-8'} bg-[#A3E635] text-[#0D1B2A] text-[9px] font-black px-4 py-2 rounded-full uppercase tracking-widest shadow-xl`}>
              Weekend Go Elite
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-10 lg:p-12 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex flex-col md:flex-row justify-between items-start gap-6">
              <div className="flex-1">
                <h3 className="text-3xl lg:text-4xl font-black text-white mb-3 tracking-tighter leading-tight group-hover:text-[#A3E635] transition-colors">{hotel.name}</h3>
                <p className="text-white/40 flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest">
                  <MapPin size={14} className="text-[#A3E635]" /> {hotel.location}
                </p>
              </div>
              <div className="flex flex-col items-end shrink-0">
                <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-5 py-3 rounded-[1.2rem] group-hover:bg-[#A3E635]/10 group-hover:border-[#A3E635]/30 transition-all">
                  <span className="text-xl font-black text-white">{hotel.rating?.toFixed(1) || 4.5}</span>
                  <div className="w-2 h-2 rounded-full bg-[#A3E635] animate-pulse" />
                </div>
                <p className="text-[9px] uppercase font-black text-white/30 mt-2 tracking-widest">{hotel.reviews || 0} Verified Reviews</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-5 mt-10">
              <Amenity icon={<Pool size={16} />} text={isRtl ? "مسبح إنفينيتي" : "Infinite Pool"} />
              <Amenity icon={<Wifi size={16} />} text={isRtl ? "إنترنت فائق" : "Ultra Wifi"} />
              <Amenity icon={<Coffee size={16} />} text={isRtl ? "مطعم فاخر" : "Fine Dining"} />
            </div>
          </div>

          <div className="mt-12 pt-10 border-t border-white/5 flex flex-col sm:flex-row justify-between items-end gap-8">
            <div className="w-full sm:w-auto">
              <p className="text-[9px] uppercase font-black tracking-[0.4em] text-[#22C7F2] mb-2">{isRtl ? 'تبدأ الأسعار من' : 'Starting From'}</p>
              <p className="text-5xl font-black text-white flex items-baseline gap-3 tracking-tighter">
                ${hotel.price} <span className="text-sm font-bold text-white/30 tracking-widest uppercase">USD</span>
              </p>
            </div>
            <Link 
              href={`/hotel/${hotelId}`}
              className="w-full sm:w-auto bg-[#A3E635] text-[#0D1B2A] font-black px-12 py-5 rounded-[1.5rem] hover:bg-white hover:scale-105 transition-all flex items-center justify-center gap-3 group/btn shadow-[0_15px_30px_rgba(163,230,53,0.2)] uppercase text-[11px] tracking-widest"
            >
              {isRtl ? 'عرض التفاصيل' : 'View Experience'} <ChevronRight size={18} className="group-hover/btn:translate-x-1 transition-transform" strokeWidth={3} />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function Amenity({ icon, text }: { icon: any, text: string }) {
  return (
    <div className="flex items-center gap-3 px-4 py-2.5 bg-white/5 rounded-xl border border-white/5 text-white/60 hover:text-[#A3E635] hover:border-[#A3E635]/30 transition-all cursor-default text-xs font-bold uppercase tracking-wider">
      {icon}
      <span>{text}</span>
    </div>
  );
}
