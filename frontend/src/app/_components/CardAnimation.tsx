import React from "react";
import { motion } from "framer-motion";
const CardAnimation = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      className="review-card"
      whileInView={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.7,
          ease: "easeOut",
        },
      }}
      initial={{ opacity: 0, y: 30 }}
      viewport={{ once: false, amount: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

export default CardAnimation;
