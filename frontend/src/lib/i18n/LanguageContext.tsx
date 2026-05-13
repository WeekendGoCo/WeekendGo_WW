"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ar';

interface Translations {
  navbar: {
    destinations: string;
    luxuryStays: string;
    experiences: string;
    signIn: string;
    about: string;
  };
  search: {
    destination: string;
    checkIn: string;
    checkOut: string;
    guests: string;
    explore: string;
    placeholder: string;
    curating: string;
    searchPlaceholder: string;
    datesPlaceholder: string;
    guestsLabel: string;
    searchButton: string;
  };
  home: {
    heroTitlePart1: string;
    heroTitlePart2: string;
    heroSub: string;
    trendingTitle: string;
    trendingSub: string;
    viewAll: string;
    packagesTitle: string;
    packagesSub: string;
  };
  // Add more translations as needed
}

const translations: Record<Language, Translations> = {
  en: {
    navbar: {
      destinations: "Destinations",
      luxuryStays: "Luxury Stays",
      experiences: "Experiences",
      signIn: "Sign In",
      about: "About Us"
    },
    search: {
      destination: "Destination",
      checkIn: "Check In",
      checkOut: "Check Out",
      guests: "Guests",
      explore: "Explore Stays",
      placeholder: "Where to?",
      curating: "Curating Experience...",
      searchPlaceholder: "Enter destination or hotel name",
      datesPlaceholder: "Select dates",
      guestsLabel: "Adults, Children",
      searchButton: "Search"
    },
    home: {
      heroTitlePart1: "Experience The World In",
      heroTitlePart2: "Unparalleled Luxury",
      heroSub: "Curated stays, exclusive experiences, and seamless bookings. Your ultimate getaway begins with Weekend Go.",
      trendingTitle: "Trending Destinations",
      trendingSub: "Discover our hand-picked selection of the most sought-after luxury locations around the globe.",
      viewAll: "View All",
      packagesTitle: "Exclusive Tour Packages",
      packagesSub: "Explore the world with our curated itineraries designed for the elite traveler."
    }
  },
  ar: {
    navbar: {
      destinations: "الوجهات",
      luxuryStays: "إقامات فاخرة",
      experiences: "تجارب",
      signIn: "تسجيل الدخول",
      about: "من نحن"
    },
    search: {
      destination: "الوجهة",
      checkIn: "وصول",
      checkOut: "مغادرة",
      guests: "الضيوف",
      explore: "استكشاف الإقامات",
      placeholder: "إلى أين؟",
      curating: "جاري البحث...",
      searchPlaceholder: "أدخل الوجهة أو اسم الفندق",
      datesPlaceholder: "اختر التواريخ",
      guestsLabel: "بالغين، أطفال",
      searchButton: "بحث"
    },
    home: {
      heroTitlePart1: "اختبر العالم بفخامة",
      heroTitlePart2: "لا مثيل لها",
      heroSub: "إقامات مختارة، تجارب حصرية، وحجوزات سلسة. عطلتك المثالية تبدأ مع ويكند جو.",
      trendingTitle: "وجهات رائجة",
      trendingSub: "اكتشف مجموعتنا المختارة من أرقى المواقع الفاخرة حول العالم.",
      viewAll: "عرض الكل",
      packagesTitle: "برامج سياحية حصرية",
      packagesSub: "استكشف العالم من خلال مساراتنا المنسقة والمصممة للمسافرين النخبة."
    }
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  isRtl: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const isRtl = language === 'ar';

  useEffect(() => {
    document.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [isRtl, language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language], isRtl }}>
      <div className={isRtl ? 'font-arabic' : 'font-sans'}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
};
