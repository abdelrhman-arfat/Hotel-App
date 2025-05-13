// components/HomeFourthSection.tsx

"use client";

import { motion } from "framer-motion";
import { FaWifi, FaBed, FaMapMarkedAlt, FaCalendarCheck } from "react-icons/fa";
import { MdOutlineCleaningServices } from "react-icons/md";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const benefits = [
  {
    icon: <FaWifi size={28} />,
    title: "Free Wi-Fi",
    description: "Stay connected with fast and secure internet.",
  },
  {
    icon: <FaBed size={28} />,
    title: "Comfy Rooms",
    description: "Experience premium comfort and cozy beds.",
  },
  {
    icon: <FaMapMarkedAlt size={28} />,
    title: "Great Location",
    description: "Located in the heart of the city.",
  },
  {
    icon: <MdOutlineCleaningServices size={28} />,
    title: "Clean & Hygienic",
    description: "Daily cleaning and top hygiene standards.",
  },
  {
    icon: <FaCalendarCheck size={28} />,
    title: "Easy Booking",
    description: "Book instantly with simple steps.",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const HomeFourthSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-muted/40 to-white w-full">
      <div className="text-center mb-12 px-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
          Why Choose Us?
        </h2>
        <p className="text-muted-foreground mt-2 text-sm sm:text-base">
          Discover what makes us your best stay option
        </p>
      </div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.2 }}
      >
        {benefits.map((benefit, index) => (
          <motion.div key={index} variants={item}>
            <Card className="group transition-all duration-300 hover:scale-[1.015] hover:shadow-xl bg-background border-none rounded-2xl relative overflow-hidden">
              {/* Hover gradient glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 via-transparent to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <CardHeader className="flex flex-col items-center text-center gap-3">
                <div className="text-indigo-600 dark:text-indigo-400">
                  {benefit.icon}
                </div>
                <h3 className="font-semibold text-lg text-gray-800 dark:text-white">
                  {benefit.title}
                </h3>
              </CardHeader>

              <CardContent className="text-sm text-gray-500 dark:text-gray-300 text-center">
                {benefit.description}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default HomeFourthSection;
