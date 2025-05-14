import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const ProfileIfSamePath = ({
  path,
  className,
  children,
}: {
  path: string;
  className?: string;
  children?: React.ReactNode | string;
}) => {
  const pathName = usePathname();
  return (
    <Link href={path}>
      <Button
        className={`${
          pathName === path
            ? "bg-neutral-500 text-white"
            : "bg-white text-neutral-500 "
        } hover:text-white my-1 cursor-pointer ${className}`}
      >
        {children}
      </Button>
    </Link>
  );
};

export default ProfileIfSamePath;
