"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { TReservation } from "../types/Reservation";
import { Calendar } from "lucide-react";

const ReservationTable = ({
  reservations,
  caption,
}: {
  reservations: TReservation[];
  caption: string;
}) => {
  return (
    <Card className="shadow-md">
      <CardContent className="p-0">
        <Table>
          <TableCaption>{caption}</TableCaption>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-[100px]">Room</TableHead>
              <TableHead>Details</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Dates</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-center">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reservations.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-10 text-muted-foreground"
                >
                  No reservations found
                </TableCell>
              </TableRow>
            ) : (
              reservations.map((reservation) => (
                <TableRow key={reservation.id} className="hover:bg-muted/50">
                  <TableCell>
                    <div className="relative h-16 w-24 rounded-md overflow-hidden">
                      <Image
                        src={reservation.room.main_image}
                        alt={reservation.room.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{reservation.room.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {reservation.days_count}{" "}
                      {reservation.days_count === 1 ? "night" : "nights"}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-muted-foreground">
                      {reservation?.user?.email || "Yours"}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {
                          new Date(reservation.start_date)
                            .toISOString()
                            .split("T")[0]
                        }{" "}
                        -{" "}
                        {
                          new Date(reservation.end_date)
                            .toISOString()
                            .split("T")[0]
                        }
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    ${reservation.total_price}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge
                      className={`${
                        // Check if reservation is currently active
                        reservation.is_active &&
                        new Date(reservation.start_date).toDateString() ===
                          new Date().toDateString()
                          ? "bg-green-500 text-white" // Active and current reservation
                          : new Date(reservation.start_date) < new Date()
                            ? "bg-red-500 text-white" // Past reservation
                            : "bg-yellow-500 text-white" // Future reservation
                      } h-[16px] w-[16px] rounded-full`}
                    ></Badge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ReservationTable;
