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
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

const RoomsTableSkeleton = () => {
  return (
    <Card className="shadow-md mt-5">
      <CardContent className="p-0">
        <Table>
          <TableCaption>Loading rooms...</TableCaption>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-[60px] text-center">#</TableHead>
              <TableHead className="w-[100px]">Image</TableHead>
              <TableHead>Room Details</TableHead>
              <TableHead>Capacity</TableHead>
              <TableHead>Count</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-center w-[80px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(5)].map((_, index) => (
              <TableRow key={index} className="hover:bg-muted/50">
                <TableCell className="text-center font-medium">
                  <Skeleton className="h-4 w-4 mx-auto" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-16 w-24 rounded-md" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-32 mb-2" />
                  <Skeleton className="h-3 w-40" />
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="font-normal">
                    <Skeleton className="h-3 w-16" />
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="font-normal">
                    <Skeleton className="h-3 w-16" />
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-medium">
                  <Skeleton className="h-4 w-16 ml-auto" />
                </TableCell>
                <TableCell className="text-center">
                  <Button variant="ghost" className="h-8 w-8 p-0" disabled>
                    <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default RoomsTableSkeleton;
