import Image from "next/image";
import React from "react";

const HeroHomeSection = () => {
  return (
    <section
      className="relative rounded-xl overflow-hidden w-full mt-4 h-screen bg-cover bg-center"
      style={{ backgroundImage: 'url("/hotel-image.jpg")' }}
    >
      {/* Gradient Overlay for a more sophisticated feel */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>

      {/* Content */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white px-4">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-4 leading-tight tracking-wide">
          Welcome to Our Hotel
        </h1>
        <p className="text-lg sm:text-xl mb-8 max-w-2xl mx-auto">
          Your perfect getaway awaits in the heart of luxury and comfort.
          Unwind, relax, and enjoy a world-class experience.
        </p>
        <a
          href="#booking"
          className="bg-yellow-500 text-gray-900 py-3 px-8 rounded-full text-lg font-semibold shadow-lg hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105"
        >
          Book Your Stay
        </a>
      </div>

      {/* Optional: Image Accent/Additional Design Element */}
      <div className="absolute bottom-10 right-10 opacity-40">
        <Image
          fill
          sizes="100%"
          src="/hotel-logo-icon.png"
          alt="Hotel Logo"
          className="h-24 w-24"
        />
      </div>
    </section>
  );
};

export default HeroHomeSection;
