"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Building2,
  BedDouble,
  ShieldCheck,
  Sparkles,
  LayoutDashboard,
  Star,
  Database,
  CreditCard,
  KeyRound,
  LockKeyhole,
} from "lucide-react";
import { motion } from "framer-motion";

// Data array (extended with new data)
const aboutSections = [
  {
    icon: <Building2 className="h-6 w-6 text-blue-600" />,
    title: "Hotel Booking Platform",
    description:
      "Demo platform with real-life booking logic, made for portfolio showcase with a real app experience.",
    color: "from-blue-100 to-blue-50",
  },
  {
    icon: <BedDouble className="h-6 w-6 text-green-600" />,
    title: "Dynamic Room Reservation",
    description:
      "Users can filter, book, and pay for available rooms based on flexible real-time filters.",
    color: "from-green-100 to-green-50",
  },
  {
    icon: <CreditCard className="h-6 w-6 text-indigo-600" />,
    title: "Stripe Integration",
    description:
      "Secure and fast payments handled via Stripe with full validation and success/failure handling.",
    color: "from-indigo-100 to-indigo-50",
  },
  {
    icon: <KeyRound className="h-6 w-6 text-amber-600" />,
    title: "Authentication with Passport.js",
    description:
      "Login system using Passport.js with token support, built for real-user logic.",
    color: "from-amber-100 to-amber-50",
  },
  {
    icon: <Database className="h-6 w-6 text-rose-600" />,
    title: "MySQL + Prisma ORM",
    description:
      "Robust relational DB built with Prisma for type-safe queries, migrations, and relations.",
    color: "from-rose-100 to-rose-50",
  },
  {
    icon: <ShieldCheck className="h-6 w-6 text-emerald-600" />,
    title: "Secure Reservations",
    description:
      "Backend ensures data validation and role-based access for reservations and admin actions.",
    color: "from-emerald-100 to-emerald-50",
  },
  {
    icon: <LayoutDashboard className="h-6 w-6 text-orange-600" />,
    title: "Clean & Modular UI",
    description:
      "Reusable components via Shadcn UI, powered by Tailwind, optimized for performance and UX.",
    color: "from-orange-100 to-orange-50",
  },
  {
    icon: <Sparkles className="h-6 w-6 text-yellow-500" />,
    title: "Framer Motion Effects",
    description:
      "Micro-interactions and staggered animations make the experience smooth and modern.",
    color: "from-yellow-100 to-yellow-50",
  },
  {
    icon: <LockKeyhole className="h-6 w-6 text-violet-600" />,
    title: "Protected Routes & Middleware",
    description:
      "Admin vs User roles with route protection using middleware for robust control flow.",
    color: "from-violet-100 to-violet-50",
  },
  {
    icon: <Star className="h-6 w-6 text-pink-600" />,
    title: "Open to Feedback",
    description:
      "Always improving — this project is a living demo to keep learning and building better.",
    color: "from-pink-100 to-pink-50",
  },
];

// Animation variant
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: () => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  }),
};

const AboutPage = () => {
  return (
    <div className="container mx-auto py-16 px-4 max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-blue-500 via-purple-600 to-pink-600 text-transparent bg-clip-text">
          About This Hotel Booking Demo
        </h1>
        <p className="text-muted-foreground text-base max-w-2xl mx-auto">
          A modern full-stack hotel booking application built for performance,
          scalability, and user experience.
        </p>
      </motion.div>

      <Separator className="my-10" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {aboutSections.map((section, index) => (
          <motion.div
            key={index}
            variants={fadeUp}
            whileInView="visible"
            viewport={{ once: true }}
            custom={index}
          >
            <Card
              className={`rounded-xl bg-gradient-to-br ${section.color} shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-[1.03]`}
            >
              <CardContent className="p-6 space-y-3">
                <div className="flex items-center gap-3">
                  {section.icon}
                  <h2 className="text-lg font-semibold text-gray-800">
                    {section.title}
                  </h2>
                </div>
                <p className="text-sm text-muted-foreground">
                  {section.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AboutPage;
