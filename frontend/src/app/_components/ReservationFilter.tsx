import React from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
interface ReservationFilterProps {
  filter: { limit: string; isActive: string };
  setFilter: React.Dispatch<
    React.SetStateAction<{ limit: string; isActive: string }>
  >;
}

const ReservationFilter: React.FC<ReservationFilterProps> = ({
  filter,
  setFilter,
}) => {
  const handleChange = (name: keyof typeof filter, value: string) => {
    setFilter((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <nav className="w-full bg-white shadow-lg rounded-lg p-4">
      <div className="flex flex-wrap gap-4 items-end">
        {/* Limit Filter */}
        <div>
          <Label htmlFor="limit" className="text-sm font-medium text-gray-700">
            Limit
          </Label>
          <Select
            value={filter.limit}
            onValueChange={(value) => handleChange("limit", value)}
          >
            <SelectTrigger id="limit" className="mt-1">
              <SelectValue placeholder="Select limit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {/* isActive Filter */}
        <div>
          <Label
            htmlFor="isActive"
            className="text-sm font-medium text-gray-700"
          >
            Active Status
          </Label>
          <Select
            value={filter.isActive}
            onValueChange={(value) => handleChange("isActive", value)}
          >
            <SelectTrigger id="isActive" className="mt-1">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="true">Active</SelectItem>
              <SelectItem value="false">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </nav>
  );
};

export default ReservationFilter;
