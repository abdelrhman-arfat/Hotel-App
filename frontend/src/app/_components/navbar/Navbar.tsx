import React from "react";
import Link from "next/link";

import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import LoginForm from "./LoginForm";

const Navbar = () => {
  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Contact", href: "/contact" },
  ];
  const logo = "HTEL";
  return (
    <header className="flex h-20 w-full items-center px-4 md:px-6 border-b border-gray-200 dark:border-gray-800">
      {/* Mobile Menu */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="lg:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="px-4 pt-6">
          <Link href="/" className="flex items-center gap-2 mb-6">
            <span className="text-xl font-bold">{logo}</span>
          </Link>
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-base font-medium hover:text-primary underline-offset-4"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-6 border-t pt-4">
            <LoginForm />
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Logo */}
      <Link href="/" className="flex items-center gap-2 ml-4 lg:ml-0 mr-8">
        <span className="text-xl font-bold hidden lg:inline">{logo}</span>
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex gap-6 items-center flex-1">
        {navLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="text-sm font-medium hover:text-primary duration-300 hover:underline underline-offset-4"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Desktop Auth Buttons */}
      <div className="hidden lg:flex items-center gap-4">
        <LoginForm />
      </div>
    </header>
  );
};

export default Navbar;
