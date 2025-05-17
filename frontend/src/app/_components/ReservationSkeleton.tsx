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

const SkeletonBox = ({ className }: { className?: string }) => (
  <div className={`animate-pulse bg-muted rounded ${className || ""}`} />
);

const ReservationSkeleton = ({
  caption = "Loading reservations...",
}: {
  caption?: string;
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
            {[...Array(3)].map((_, idx) => (
              <TableRow key={idx} className="hover:bg-muted/50">
                <TableCell>
                  <SkeletonBox className="h-16 w-24" />
                </TableCell>
                <TableCell>
                  <SkeletonBox className="h-4 w-24 mb-2" />
                  <SkeletonBox className="h-3 w-16" />
                </TableCell>
                <TableCell>
                  <SkeletonBox className="h-3 w-20" />
                </TableCell>
                <TableCell>
                  <SkeletonBox className="h-3 w-28" />
                </TableCell>
                <TableCell className="text-right font-medium">
                  <SkeletonBox className="h-4 w-12 ml-auto" />
                </TableCell>
                <TableCell className="text-center">
                  <Badge variant="secondary">
                    <SkeletonBox className="h-4 w-16 mx-auto" />
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ReservationSkeleton;
