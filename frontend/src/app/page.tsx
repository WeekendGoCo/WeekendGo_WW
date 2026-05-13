"use client";

import { motion } from "framer-motion";
import { Star, ArrowRight, ShieldCheck, Globe2, Clock, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SearchBox } from "@/components/SearchBox";
import { useTranslation } from "@/lib/i18n/LanguageContext";

export default function Home() {
  const { t, isRtl } = useTranslation();

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[95vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-dark/60 via-dark/40 to-background z-10" />
          <Image 
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=2070" 
            alt="Luxury Resort" 
            fill 
            className="object-cover"
            priority
          />
        </div>

        <div className="relative z-20 max-w-6xl mx-auto px-6 text-center pt-20">
          <motion.div {...fadeIn}>
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/20 backdrop-blur-md text-primary text-[10px] font-bold uppercase tracking-[0.3em] mb-6 border border-primary/20">
              {isRtl ? "مرحباً بكم في ويكند جو" : "Welcome to Weekend Go"}
            </span>
            <h1 className="text-5xl md:text-8xl h-font mb-6 leading-[1.1] text-white">
              {t.home.heroTitlePart1} <br />
              <span className="lux-gradient">{t.home.heroTitlePart2}</span>
            </h1>
            <p className="text-lg md:text-xl text-white/70 mb-12 max-w-2xl mx-auto font-medium">
              {t.home.heroSub}
            </p>
          </motion.div>

          <SearchBox />
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className={`flex flex-col md:flex-row justify-between items-end mb-16 gap-6 ${isRtl ? 'md:flex-row-reverse' : ''}`}>
          <div className={isRtl ? 'text-right' : 'text-left'}>
            <h2 className="text-3xl md:text-5xl h-font mb-4">{t.home.trendingTitle}</h2>
            <p className="text-dark/50 dark:text-white/50 max-w-xl font-medium">{t.home.trendingSub}</p>
          </div>
          <button className="flex items-center gap-2 text-primary hover:text-secondary font-bold uppercase tracking-widest text-xs transition-colors group">
            {t.home.viewAll} <ArrowRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${isRtl ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { name: isRtl ? "المالديف" : "Maldives", image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=800", price: "$1,200", rating: 4.9 },
            { name: isRtl ? "سانتوريني" : "Santorini", image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&q=80&w=800", price: "$850", rating: 4.8 },
            { name: isRtl ? "دبي" : "Dubai", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=800", price: "$950", rating: 4.9 }
          ].map((dest, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group rounded-[2.5rem] overflow-hidden bg-white dark:bg-slate shadow-premium relative cursor-pointer"
            >
              <div className="h-[28rem] relative w-full overflow-hidden">
                <Image src={dest.image} alt={dest.name} fill className="object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/20 to-transparent opacity-80" />
              </div>
              <div className="absolute bottom-0 left-0 w-full p-8">
                <div className="flex justify-between items-end">
                  <div className={isRtl ? 'text-right' : 'text-left'}>
                    <h3 className="text-2xl font-bold mb-3 text-white">{dest.name}</h3>
                    <div className={`flex items-center gap-2 text-sm text-white/60 ${isRtl ? 'flex-row-reverse' : ''}`}>
                      <Star className="w-4 h-4 text-accent fill-accent" />
                      <span>{dest.rating}</span>
                    </div>
                  </div>
                  <div className={isRtl ? 'text-left' : 'text-right'}>
                    <p className="text-[10px] text-white/40 uppercase tracking-widest mb-1">{isRtl ? "يبدأ من" : "Starting from"}</p>
                    <p className="text-2xl font-bold text-accent">{dest.price} <span className="text-xs font-normal text-white/40">{isRtl ? "/ ليلة" : "/night"}</span></p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-dark text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 rounded-l-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl h-font mb-6">{isRtl ? "لماذا ويكند جو؟" : "Why Weekend Go?"}</h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {[
              { icon: ShieldCheck, title: isRtl ? "أمان تام" : "Secure Booking", desc: isRtl ? "نضمن لك أعلى مستويات الأمان والخصوصية في كافة معاملاتك." : "Highest security standards for all your transactions." },
              { icon: Globe2, title: isRtl ? "وجهات عالمية" : "Global Network", desc: isRtl ? "الوصول إلى آلاف الفنادق والوجهات الفاخرة حول العالم." : "Access to thousands of luxury hotels and destinations worldwide." },
              { icon: Clock, title: isRtl ? "دعم ٢٤/٧" : "24/7 Support", desc: isRtl ? "فريق عمل مختص جاهز لمساعدتك في أي وقت وأي مكان." : "Dedicated team ready to assist you anytime, anywhere." },
              { icon: MapPin, title: isRtl ? "تجارب فريدة" : "Unique Stays", desc: isRtl ? "نبحث عن التميز لنقدم لك تجارب لا تُنسى بعيداً عن المألوف." : "Curated experiences that go beyond the ordinary." }
            ].map((feature, i) => (
              <div key={i} className="text-center group">
                <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:bg-primary/20 transition-colors duration-500">
                  <feature.icon className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Exclusive Packages */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl h-font mb-4">{t.home.packagesTitle}</h2>
          <p className="text-dark/50 dark:text-white/50 max-w-2xl mx-auto font-medium">{t.home.packagesSub}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {[
            { 
              title: isRtl ? "جولة في جبال الألب السويسرية" : "Swiss Alps Grand Tour",
              duration: isRtl ? "٧ أيام / ٦ ليالي" : "7 Days / 6 Nights",
              price: "$4,500",
              image: "https://images.unsplash.com/photo-1531310197839-ccf54634509e?auto=format&fit=crop&q=80&w=1200"
            },
            { 
              title: isRtl ? "سحر اليابان التقليدي" : "Traditional Japan Magic",
              duration: isRtl ? "١٠ أيام / ٩ ليالي" : "10 Days / 9 Nights",
              price: "$6,200",
              image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=1200"
            }
          ].map((pkg, i) => (
            <div key={i} className="relative group rounded-[3rem] overflow-hidden shadow-premium cursor-pointer">
              <div className="h-[35rem] relative">
                <Image src={pkg.image} alt={pkg.title} fill className="object-cover transition-transform duration-1000 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-r from-dark/90 via-dark/40 to-transparent" />
              </div>
              <div className={`absolute inset-0 flex flex-col justify-center px-12 ${isRtl ? 'text-right' : 'text-left'}`}>
                <span className="text-accent text-[10px] font-bold uppercase tracking-widest mb-4 inline-block">{isRtl ? "باقة حصرية" : "Exclusive Package"}</span>
                <h3 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight max-w-xs">{pkg.title}</h3>
                <div className={`flex items-center gap-6 mb-8 text-white/70 font-medium ${isRtl ? 'flex-row-reverse' : ''}`}>
                  <div className="flex items-center gap-2">
                    <Clock size={18} className="text-primary" />
                    <span>{pkg.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star size={18} className="text-accent fill-accent" />
                    <span>5.0</span>
                  </div>
                </div>
                <div>
                  <button className="bg-white text-dark px-10 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-primary hover:text-white transition-all shadow-xl">
                    {isRtl ? "احجز الآن" : "Book Now"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
