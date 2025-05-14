"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useUserSelector } from "@/app/hooks/appSelector";
import { ROLES } from "@/app/constants/Roles";
import { ReactNode } from "react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Hotel,
  CalendarDays,
  Users,
  Settings,
  Home,
} from "lucide-react";
import ProfileIfSamePath from "../ProfileIfSamePath";

const ProfileNav = ({ children }: { children: ReactNode }) => {
  const user = useUserSelector().user;

  if (!user) return null;

  const adminLinks = [
    {
      href: "/",
      label: "Home",
      icon: <Home className="w-4 h-4" />,
      available: [ROLES.MANAGER, ROLES.EMPLOYEE, ROLES.CUSTOMER],
    },
    {
      href: "/profile",
      label: "Settings",
      icon: <Settings className="w-4 h-4" />,
      available: [ROLES.MANAGER, ROLES.EMPLOYEE, ROLES.CUSTOMER],
    },
    {
      href: "/profile/dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard className="w-4 h-4" />,
      available: [ROLES.MANAGER, ROLES.EMPLOYEE],
    },
    {
      href: "/profile/users",
      label: "Users",
      icon: <Users className="w-4 h-4" />,
      available: [ROLES.MANAGER],
    },

    {
      href: "/profile/bookings",
      label: "Reservations",
      icon: <CalendarDays className="w-4 h-4" />,
      available: [ROLES.MANAGER, ROLES.EMPLOYEE],
    },
    {
      href: "/profile/rooms",
      label: "Rooms",
      icon: <Hotel className="w-4 h-4" />,
      available: [ROLES.MANAGER, ROLES.EMPLOYEE],
    },
  ];

  return (
    <motion.div
      className="w-full px-4 sm:px-6 py-8 min-h-screen bg-gray-50"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="w-full grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6">
        <Card className="h-fit p-6 bg-white w-full">
          <div className="flex flex-col items-center gap-4 w-full">
            <div className="relative group">
              <Image
                src={user.image}
                alt="Profile"
                width={120}
                height={120}
                className="rounded-full border-4 border-primary/10 shadow-xl transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button variant="ghost" className="text-white text-sm">
                  Change
                </Button>
              </div>
            </div>

            <div className="text-center space-y-2 w-full">
              <h1 className="text-2xl font-bold tracking-tight">
                {user.fullname}
              </h1>
              <p className="text-muted-foreground">{user.email}</p>
              <Badge
                variant={
                  user.role === ROLES.EMPLOYEE ? "destructive" : "default"
                }
                className="uppercase font-semibold"
              >
                {user.role}
              </Badge>
            </div>

            <>
              <Separator className="my-4 w-full" />
              <nav className="w-full space-y-2">
                {adminLinks
                  .filter((link) => link.available.includes(user.role))
                  .map((link) => (
                    <ProfileIfSamePath
                      key={link.href}
                      path={link.href}
                      className="w-full justify-start gap-3 font-normal"
                    >
                      {link.icon}
                      {link.label}
                    </ProfileIfSamePath>
                  ))}
              </nav>
            </>
          </div>
        </Card>

        <Card className="p-6 bg-white min-h-[500px] w-full">{children}</Card>
      </div>
    </motion.div>
  );
};

export default ProfileNav;
