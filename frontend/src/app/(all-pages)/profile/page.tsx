"use client";
import React from "react";
import { Separator } from "@/components/ui/separator";
import { User, Shield } from "lucide-react";
import SettingCard from "@/app/_components/sections/profile/SettingCard";

const settingsData = [
  {
    icon: <User />,

    title: "Profile Information",
    description: "Edit your personal information and preferences",
    buttonText: "Edit",
  },
  {
    icon: <Shield />,
    title: "Security Settings",
    description: "Update your password and security preferences",
    buttonText: "Update",
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
          />
        ))}
      </div>
    </div>
  );
};

export default Page;
