"use client";
import React, { useCallback, useMemo } from "react";
import { useFilterSelector } from "../../../hooks/appSelector";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X, ChevronDown } from "lucide-react";
import { clearFilter, setFilter } from "../../../_RTK/redux-slices/FilterSlice";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { AnimatePresence, motion } from "framer-motion";
import { useAppDispatch } from "@/app/hooks/appDispatch";

const priceRanges = [
  { min: 0, max: 100, label: "Under $100" },
  { min: 100, max: 300, label: "$100 - $300" },
  { min: 300, max: 500, label: "$300 - $500" },
  { min: 500, max: 1000, label: "$500 - $1000" },
  { min: 1000, max: 99999, label: "Over $1000" },
];

const familyCounts = [
  { count: 1, label: "1 Person" },
  { count: 2, label: "2 People" },
  { count: 3, label: "3 People" },
  { count: 4, label: "4 People" },
  { count: 5, label: "5 People" },
  { count: 6, label: "6 People" },
];

const FilteringBar = () => {
  const filter = useFilterSelector();
  const dispatch = useAppDispatch();

  const handleNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setFilter({ title: e.target.value }));
    },
    [dispatch]
  );

  const handlePriceSelect = useCallback(
    (min: number, max: number) => {
      dispatch(setFilter({ minPrice: min, maxPrice: max }));
    },
    [dispatch]
  );

  const handleFamilyCountSelect = useCallback(
    (count: number) => {
      dispatch(setFilter({ familyCount: count }));
    },
    [dispatch]
  );

  const handleClear = useCallback(() => {
    dispatch(clearFilter());
  }, [dispatch]);

  const currentPriceRange = useMemo(
    () =>
      priceRanges.find(
        (range) =>
          range.min === filter.minPrice && range.max === filter.maxPrice
      ),
    [filter.minPrice, filter.maxPrice]
  );

  const currentFamilyCount = useMemo(
    () => familyCounts.find((item) => item.count === filter.familyCount),
    [filter.familyCount]
  );

  return (
    <nav className="w-full border-b bg-background/95 backdrop-blur py-3 rounded-xl supports-[backdrop-filter]:bg-background/60">
      <div className="container flex flex-col sm:flex-row flex-wrap items-center gap-4 h-auto py-4 px-4 sm:h-14">
        <div className="relative w-full sm:flex-1">
          <Input
            placeholder="Search rooms..."
            value={filter.title || ""}
            onChange={handleNameChange}
            className="w-full pr-8"
          />
          {filter.title && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => dispatch(setFilter({ title: "" }))}
              className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        <div className="flex w-full sm:w-auto gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="flex gap-2 flex-1 sm:flex-none"
              >
                {currentPriceRange ? currentPriceRange.label : "Price Range"}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {priceRanges.map((range) => (
                <DropdownMenuItem
                  key={range.label}
                  onClick={() => handlePriceSelect(range.min, range.max)}
                  className={`cursor-pointer ${
                    currentPriceRange?.label === range.label ? "bg-accent" : ""
                  }`}
                >
                  {range.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="flex gap-2 flex-1 sm:flex-none"
              >
                {currentFamilyCount ? currentFamilyCount.label : "Family Size"}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {familyCounts.map((item) => (
                <DropdownMenuItem
                  key={item.label}
                  onClick={() => handleFamilyCountSelect(item.count)}
                  className={`cursor-pointer ${
                    currentFamilyCount?.count === item.count ? "bg-accent" : ""
                  }`}
                >
                  {item.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <AnimatePresence>
          {(filter.title ||
            filter.minPrice ||
            filter.maxPrice ||
            filter.familyCount) && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClear}
                className="text-muted-foreground"
              >
                Clear filters
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default FilteringBar;
