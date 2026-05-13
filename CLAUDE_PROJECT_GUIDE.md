# Weekend Go - Project Documentation & Roadmap

This document provides a comprehensive overview of the **Weekend Go** platform, its current state, and the roadmap for future development. It is designed to bring any developer (like Claude) up to speed quickly.

---

## 1. Project Vision & Goals
**Weekend Go** is a premium luxury travel and booking platform. Unlike generic booking sites, it aims to provide a "curated" experience, focusing on:
- **Elite Aesthetics**: A high-end, dark-themed, glassmorphism-inspired UI that feels expensive and exclusive.
- **Exclusive Stays**: Featuring both global inventory (Booking.com) and "Local Contracts" (exclusive deals managed directly via our extranet).
- **Seamless Experience**: Multilingual support (Arabic/English) with RTL layout compatibility.
- **Performance**: Instant search, smooth transitions (Framer Motion), and optimized images.

---

## 2. Tech Stack
- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router).
- **Styling**: Tailwind CSS with custom premium components.
- **Animations**: Framer Motion for micro-interactions and smooth reveals.
- **Icons**: Lucide React.
- **Database**: PostgreSQL managed via [Prisma ORM](https://www.prisma.io/).
- **API Integrations**: 
  - **Booking.com**: Integrated via RapidAPI (in progress).
  - **Local Contracts**: Stored in our database for exclusive "Weekend Go Elite" pricing.
- **State Management**: React `useState`/`useEffect` and Context API for global settings (like Language).

---

## 3. Project Structure
```text
/frontend
├── prisma/                # Database schema and migrations
├── public/                # Static assets (hero images, logos)
├── src/
│   ├── app/               # Next.js App Router pages
│   │   ├── api/           # Backend API routes (Hotel Search, Booking)
│   │   ├── admin/         # Admin dashboard / Extranet (WIP)
│   │   ├── search/        # Main hotel search & filtering page
│   │   ├── layout.tsx     # Global layout with providers
│   │   └── page.tsx       # Luxury Landing Page
│   ├── components/        # Reusable UI components (Navbar, Footer, HotelCard)
│   ├── lib/               # Utility functions (i18n, API helpers)
│   └── styles/            # Global CSS and Tailwind configurations
```

---

## 4. Current Progress & Achievements
- [x] **Luxury Landing Page**: Completed with high-end animations, hero sections, and trending destinations.
- [x] **Search UI**: Responsive search page with advanced filters (Price, Star rating, Amenities).
- [x] **i18n Infrastructure**: Full support for English and Arabic (RTL).
- [x] **API Architecture**: Established the "Aggregator" pattern in `api/hotels/search` to merge data from multiple sources.
- [x] **Branding**: "Weekend Go" logo, primary colors (#A3E635 / Lime), and luxury typography.

---

## 5. Current Objectives (What we are working on now)
1. **Live API Integration**: Replacing the simulated "stubs" in `api/hotels/search` with real calls to the Booking.com RapidAPI.
2. **Hotel Details Page**: Creating a stunning page for individual hotels showing full descriptions, galleries, and room options.
3. **Local Contract Management**: Building the logic to prioritize local DB prices over API prices if they exist for the same hotel.
4. **Booking Flow**: Implementing a premium checkout experience.

---

## 6. Design Guidelines for Claude
When working on this project, please follow these rules:
- **Aesthetics First**: Every component must look "Premium". Use glassmorphism (`backdrop-blur`), subtle borders (`border-white/5`), and the lime accent color (`#A3E635`).
- **No Placeholders**: Use high-quality images and real-looking data.
- **RTL Support**: Always ensure that layouts work for both English (LTR) and Arabic (RTL).
- **Animation**: Use Framer Motion for entry animations. Don't let elements just "appear".
- **Clean Code**: Use TypeScript for all components and logic.

---

## 7. How to Start
1. Ensure your `.env` file in `frontend/` has the necessary `RAPID_API_KEY`.
2. Run `npm run dev` to start the frontend.
3. Navigate to `http://localhost:3000` to see the landing page or `/search` for the hotel list.

---

*This document is the source of truth for the Weekend Go project state as of May 13, 2026.*
