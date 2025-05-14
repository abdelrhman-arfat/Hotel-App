"use client";

import React from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { ROLES } from "@/app/constants/Roles";
import { TUserQuery } from "@/app/types/QueryUsers";

const NavUsersFilter = ({
  userInfo,
  setUserInfo,
}: {
  userInfo: TUserQuery;
  setUserInfo: React.Dispatch<React.SetStateAction<TUserQuery>>;
}) => {
  const handleChange = (name: keyof TUserQuery, value: string) => {
    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const clearAll = () => {
    setUserInfo({});
  };

  const hasFilters = userInfo.role || userInfo.orderBy;

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full bg-white shadow-lg rounded-lg p-4"
    >
      <div className="flex flex-wrap gap-4 items-end">
        {/* Role Filter */}
        <motion.div whileHover={{ scale: 1.02 }} className="">
          <Label htmlFor="role" className="text-sm font-medium text-gray-700">
            Role
          </Label>
          <Select
            value={userInfo.role || ""}
            onValueChange={(value) => handleChange("role", value)}
          >
            <SelectTrigger id="role" className="mt-1">
              <SelectValue placeholder="Select a role" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(ROLES).map((role) => (
                <SelectItem key={role} value={role}>
                  {role}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </motion.div>

        {/* Order By Filter */}
        <motion.div whileHover={{ scale: 1.02 }} className="">
          <Label
            htmlFor="orderBy"
            className="text-sm font-medium text-gray-700"
          >
            Order By
          </Label>
          <Select
            value={userInfo.orderBy || ""}
            onValueChange={(value) => handleChange("orderBy", value)}
          >
            <SelectTrigger id="orderBy" className="mt-1">
              <SelectValue placeholder="Select order" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">Ascending</SelectItem>
              <SelectItem value="desc">Descending</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>

        {/* Clear Filters Button */}
        {hasFilters && (
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="destructive"
              size="icon"
              onClick={clearAll}
              title="Clear all filters"
              className="mt-1"
            >
              <Trash2 className="h-5 w-5" />
            </Button>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default NavUsersFilter;
