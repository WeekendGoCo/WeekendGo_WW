"use client";

import { motion } from "framer-motion";
import { Clock, Users, Star } from "lucide-react";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import Image from "next/image";
import Link from "next/link";

const tours = [
  {
    id: 1,
    name_en: "Swiss Alps & Lakes Grand Tour",
    name_ar: "جولة جبال الألب السويسرية والبحيرات",
    destination_en: "Switzerland",
    destination_ar: "سويسرا",
    duration: 7,
    price: "$4,500",
    group: "2-12",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1531310197839-ccf54634509e?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: 2,
    name_en: "Traditional Japan Magic",
    name_ar: "سحر اليابان التقليدي",
    destination_en: "Japan",
    destination_ar: "اليابان",
    duration: 10,
    price: "$6,200",
    group: "2-8",
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: 3,
    name_en: "Maldives Paradise Week",
    name_ar: "أسبوع الجنة في المالديف",
    destination_en: "Maldives",
    destination_ar: "المالديف",
    duration: 5,
    price: "$3,800",
    group: "2-6",
    rating: 4.95,
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: 4,
    name_en: "Bali Cultural Experience",
    name_ar: "تجربة ثقافية في بالي",
    destination_en: "Indonesia",
    destination_ar: "إندونيسيا",
    duration: 6,
    price: "$2,900",
    group: "2-10",
    rating: 4.85,
    image: "https://images.unsplash.com/photo-1537225228614-56cc30651b8e?auto=format&fit=crop&q=80&w=600"
  }
];

export function InternationalToursSection() {
  const { t, isRtl } = useTranslation();

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl h-font mb-4">
          {t.tours.title}
        </h2>
        <p className="text-dark/50 dark:text-white/50 max-w-2xl mx-auto">
          {t.tours.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {tours.map((tour, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: isRtl ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group rounded-3xl overflow-hidden shadow-premium cursor-pointer"
          >
            <div className="relative h-80 w-full overflow-hidden bg-dark">
              <Image
                src={tour.image}
                alt={isRtl ? tour.name_ar : tour.name_en}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/50 to-transparent" />
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <p className="text-accent text-sm font-bold mb-2 uppercase tracking-widest">
                {t.tours.exclusive}
              </p>
              <h3 className="text-2xl h-font mb-4">
                {isRtl ? tour.name_ar : tour.name_en}
              </h3>

              <div className={`grid grid-cols-3 gap-4 mb-6 ${isRtl ? 'text-right' : 'text-left'}`}>
                <div className="flex items-center gap-2">
                  <Clock size={18} className="text-primary" />
                  <span className="text-sm">{tour.duration}D</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={18} className="text-primary" />
                  <span className="text-sm">{tour.group}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star size={18} className="text-accent fill-accent" />
                  <span className="text-sm">{tour.rating}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-accent">{tour.price}</span>
                <button className="bg-white text-dark px-6 py-2 rounded-full font-bold hover:bg-accent transition-all">
                  {t.tours.details}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
