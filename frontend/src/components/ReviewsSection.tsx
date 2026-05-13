"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useTranslation } from "@/lib/i18n/LanguageContext";

const reviews = [
  {
    name: "أحمد السعيدي",
    location: "الرياض",
    rating: 5,
    text: "تجربة رائعة جداً، الخدمة ممتازة والتطبيق سهل الاستخدام",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100"
  },
  {
    name: "Sarah Johnson",
    location: "Dubai",
    rating: 5,
    text: "Best booking experience I've had. Highly recommended!",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100"
  },
  {
    name: "محمد الأحمد",
    location: "جدة",
    rating: 5,
    text: "الأسعار رائعة والخدمة العملاء محترفة جداً",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100"
  },
  {
    name: "Emma Wilson",
    location: "London",
    rating: 4,
    text: "Great service, very professional team!",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100"
  }
];

export function ReviewsSection() {
  const { t, isRtl } = useTranslation();

  return (
    <section className="py-24 px-6 bg-dark text-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl h-font mb-4">
            {t.reviews.title}
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm hover:bg-white/10 transition-all"
            >
              <div className="flex gap-4 mb-6">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-accent fill-accent" />
                ))}
              </div>
              <p className="text-white/80 mb-6 leading-relaxed">"{review.text}"</p>
              <div className="flex items-center gap-4">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-bold text-white">{review.name}</p>
                  <p className="text-sm text-white/50">{review.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
