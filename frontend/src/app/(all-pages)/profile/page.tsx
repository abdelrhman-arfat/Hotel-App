"use client";
import React from "react";
import { Separator } from "@/components/ui/separator";
import { History, CreditCard } from "lucide-react";
import SettingCard from "@/app/_components/sections/profile/SettingCard";

const settingsData = [
  {
    icon: History,
    title: "Booking History",
    description: "View your past and upcoming bookings",
    buttonText: "View All",
    onClick: () => {},
  },
  {
    icon: CreditCard,
    title: "Payment Methods",
    description: "Manage your payment options",
    buttonText: "Manage",
    onClick: () => {},
  },
];

const Page = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold tracking-tight">
          Account Settings
        </h2>
      </div>

      <Separator />

      <div className="grid gap-6">
        {settingsData.map((setting) => (
          <SettingCard
            key={setting.title}
            icon={setting.icon}
            title={setting.title}
            description={setting.description}
            buttonText={setting.buttonText}
            onClick={setting.onClick}
          />
        ))}
      </div>
    </div>
  );
};

export default Page;
