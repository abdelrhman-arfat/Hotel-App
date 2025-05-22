"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronDown, ChevronUp, CalendarDays } from "lucide-react";
import { useGetAvailableReservationDatesQuery } from "../_RTK/RTK-query/query";
import BookingForm from "./forms/BookingForm";

const ValidDate = ({ id }: { id: number }) => {
  const { data, isLoading } = useGetAvailableReservationDatesQuery({
    roomId: id,
  });
  const [date, setDate] = useState<{
    startDate: Date;
    endDate: Date;
  }>({
    startDate: new Date(),
    endDate: new Date(),
  });
  const [openMonths, setOpenMonths] = useState<Record<string, boolean>>({});

  const [isFromOpen, setIsFromOpen] = useState<boolean>(false);
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Separator className="mb-6" />
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        📅 Available Dates
      </h2>

      <div className="flex flex-col gap-4">
        {data?.data?.data.map((month) => {
          const isOpen = openMonths[month.month] || false;

          return (
            <Card
              key={month.month}
              className="border border-gray-200 shadow-md hover:shadow-lg transition-all rounded-2xl overflow-hidden"
            >
              <div
                className="p-5 cursor-pointer flex justify-between items-center"
                onClick={() =>
                  setOpenMonths((prev) => ({
                    ...prev,
                    [month.month]: !prev[month.month],
                  }))
                }
              >
                <h3 className="text-lg font-semibold text-gray-800">
                  {month.month}
                </h3>
                {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>

              {isOpen && (
                <div className="overflow-hidden px-5 pb-5 space-y-4">
                  {month.ranges.map((range, rIdx) => (
                    <div
                      key={rIdx}
                      className="p-4 bg-white border border-gray-100 rounded-xl shadow-sm flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <CalendarDays className="text-blue-500" size={20} />
                        <p className="text-sm text-gray-700">
                          {range.start} → {range.end}
                        </p>
                      </div>
                      <Button
                        size="sm"
                        className="bg-neutral-600 hover:bg-neutral-700 text-white rounded-full px-4"
                        onClick={() => {
                          setIsFromOpen((p) => !p);
                          const startParts = (range.start || "").split("/");
                          const endParts = (range.end || "").split("/");
                          if (
                            startParts.length === 3 &&
                            endParts.length === 3
                          ) {
                            const [dayStart, monthStart, yearStart] =
                              startParts;
                            const [dayEnd, monthEnd, yearEnd] = endParts;
                            if (
                              dayStart &&
                              monthStart &&
                              yearStart &&
                              dayEnd &&
                              monthEnd &&
                              yearEnd
                            ) {
                              setDate({
                                startDate: new Date(
                                  `${yearStart}-${monthStart.padStart(2, "0")}-${dayStart.padStart(2, "0")}`
                                ),
                                endDate: new Date(
                                  `${yearEnd}-${monthEnd.padStart(2, "0")}-${dayEnd.padStart(2, "0")}`
                                ),
                              });
                            }
                          }
                        }}
                      >
                        Book
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          );
        })}
      </div>
      {isFromOpen && (
        <BookingForm
          roomId={id}
          setIsOpen={setIsFromOpen}
          endDate={date.endDate}
          startDate={date.startDate}
        />
      )}
    </div>
  );
};

export default ValidDate;
