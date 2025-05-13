"use client";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { FaFacebookF, FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const Footer = () => {
  return (
    <motion.div
      whileInView={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.7,
          ease: "easeOut",
        },
      }}
      viewport={{ once: true, amount: 0.5 }}
      initial={{ opacity: 0, y: 30 }}
    >
      <footer className="bg-gradient-to-b from-slate-800 to-slate-900 text-white py-12 backdrop-blur-lg">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Main Footer Wrapper */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start justify-items-center">
            {/* Hotel Info Section */}
            <Card className="bg-gradient-to-br from-slate-700/80 via-slate-800/80 to-slate-900/80 border-none shadow-2xl rounded-xl p-5 transform hover:scale-[1.02] transition-transform duration-300 w-full max-w-sm backdrop-blur-md">
              <CardHeader className="pb-3">
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-300 bg-clip-text text-transparent">
                  Hotel Name
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-slate-200 font-light">
                    Your home away from home.
                  </p>
                  <div className="space-y-2 text-slate-300">
                    <p className="flex items-center gap-2 hover:text-amber-300 transition-colors">
                      <span>📍</span> 123 Hotel Street, City, Country
                    </p>
                    <p className="flex items-center gap-2 hover:text-amber-300 transition-colors">
                      <span>📞</span> (123) 456-7890
                    </p>
                    <p className="flex items-center gap-2 hover:text-amber-300 transition-colors">
                      <span>✉️</span> contact@hotel.com
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Media Section */}
            <div className="flex flex-col items-center space-y-4 w-full max-w-sm">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-300 bg-clip-text text-transparent">
                Connect With Us
              </h3>
              <div className="flex space-x-6">
                <Link
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-slate-700/50 rounded-full hover:bg-amber-400/20 transform hover:scale-110 transition-all duration-300 backdrop-blur-sm"
                >
                  <FaFacebookF
                    size={20}
                    className="text-blue-300 hover:text-amber-300"
                  />
                </Link>
                <Link
                  href="https://github.com/abdelrhman-arfat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-slate-700/50 rounded-full hover:bg-amber-400/20 transform hover:scale-110 transition-all duration-300 backdrop-blur-sm"
                >
                  <FaGithub
                    size={20}
                    className="text-sky-300 hover:text-amber-300"
                  />
                </Link>
                <Link
                  href="https://www.instagram.com/abdo_yas.ser/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-slate-700/50 rounded-full hover:bg-amber-400/20 transform hover:scale-110 transition-all duration-300 backdrop-blur-sm"
                >
                  <FaInstagram
                    size={20}
                    className="text-pink-300 hover:text-amber-300"
                  />
                </Link>
                <Link
                  href="https://www.linkedin.com/in/abdo-yasser-946493221/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-slate-700/50 rounded-full hover:bg-amber-400/20 transform hover:scale-110 transition-all duration-300 backdrop-blur-sm"
                >
                  <FaLinkedin
                    size={20}
                    className="text-blue-300 hover:text-amber-300"
                  />
                </Link>
              </div>
            </div>

            {/* Footer Links Section */}
            <div className="flex flex-col space-y-4 w-full max-w-sm">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-300 bg-clip-text text-transparent text-center md:text-left">
                Quick Links
              </h3>
              <div className="flex flex-col space-y-3">
                <Link
                  href="/#"
                  className="text-slate-300 hover:text-amber-300 transition-colors duration-300 transform text-center md:text-left"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/#"
                  className="text-slate-300 hover:text-amber-300 transition-colors duration-300 transform text-center md:text-left"
                >
                  Terms & Conditions
                </Link>
                <Link
                  href="#"
                  className="text-slate-300 hover:text-amber-300 transition-colors duration-300 transform text-center md:text-left"
                >
                  FAQ
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-8 border-t border-slate-700/50">
          <div className="container mx-auto px-4">
            <p className="text-center py-6 text-slate-400 hover:text-amber-300 transition-colors">
              &copy; {new Date().getFullYear()} Hotel Name. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </motion.div>
  );
};

export default Footer;
