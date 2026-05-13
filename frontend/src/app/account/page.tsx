"use client";

import { motion } from "framer-motion";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { Mail, Loader2, LogOut, User, Heart, Settings } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

// Mock user session for demo
const mockUser = {
  name: "Ahmed Al-Saadi",
  email: "ahmed@example.com",
  image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
};

export default function AccountPage() {
  const { t, isRtl } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = () => {
    setIsLoading(true);
    // Redirect to home after sign out
    setTimeout(() => {
      window.location.href = '/';
    }, 500);
  };

  return (
    <div className="min-h-screen bg-background pt-32 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {/* Profile Section */}
          <div className="md:col-span-1">
            <div className="bg-white dark:bg-slate rounded-3xl shadow-premium p-8 text-center sticky top-32">
              <img
                src={mockUser.image}
                alt={mockUser.name}
                className="w-24 h-24 rounded-full mx-auto mb-6 object-cover border-4 border-primary"
              />
              <h2 className="text-2xl h-font mb-2">{mockUser.name}</h2>
              <p className="text-dark/50 dark:text-white/50 mb-8">{mockUser.email}</p>
              
              <button
                onClick={handleSignOut}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-3 rounded-2xl font-bold transition-all disabled:opacity-50"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <LogOut size={18} />
                    {t.account.signOut}
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-2 space-y-8">
            {/* My Bookings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-slate rounded-3xl shadow-premium p-8"
            >
              <h3 className="text-2xl h-font mb-6 flex items-center gap-2">
                <User className="text-primary" size={24} />
                {t.account.myBookings}
              </h3>
              <div className="space-y-4">
                <div className="p-6 border border-dark/10 dark:border-white/10 rounded-2xl hover:bg-primary/5 transition-colors">
                  <p className="text-dark/50 dark:text-white/50 text-center">
                    {t.account.noBookings}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Wishlist */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-slate rounded-3xl shadow-premium p-8"
            >
              <h3 className="text-2xl h-font mb-6 flex items-center gap-2">
                <Heart className="text-accent" size={24} />
                {t.account.wishlist}
              </h3>
              <div className="space-y-4">
                <div className="p-6 border border-dark/10 dark:border-white/10 rounded-2xl hover:bg-primary/5 transition-colors">
                  <p className="text-dark/50 dark:text-white/50 text-center">
                    {t.account.noWishlist}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Settings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-slate rounded-3xl shadow-premium p-8"
            >
              <h3 className="text-2xl h-font mb-6 flex items-center gap-2">
                <Settings className="text-primary" size={24} />
                {t.account.settings}
              </h3>
              <div className="space-y-2">
                <button className={`w-full text-left p-4 hover:bg-primary/5 transition-colors rounded-2xl flex items-center gap-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
                  <span className="text-primary text-xl">🔐</span>
                  {t.account.changePassword}
                </button>
                <button className={`w-full text-left p-4 hover:bg-primary/5 transition-colors rounded-2xl flex items-center gap-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
                  <span className="text-primary text-xl">🔔</span>
                  {t.account.notificationSettings}
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
