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
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { TRoom } from "../types/Room";
import UpdateRoomForm from "./UpdateRoomForm";

interface RoomsTableProps {
  rooms: TRoom[];
  refetch: () => void;
  deleteFunc: (id: number) => void;
}

const RoomsTable = ({ rooms, refetch, deleteFunc }: RoomsTableProps) => {
  const [selectedRoom, setSelectedRoom] = React.useState<TRoom | null>(null);

  return (
    <>
      <Card className="shadow-md mt-5">
        <CardContent className="p-0">
          <Table>
            <TableCaption>List of Available Rooms</TableCaption>
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
              {rooms.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center py-10 text-muted-foreground"
                  >
                    No rooms found
                  </TableCell>
                </TableRow>
              ) : (
                rooms.map((room, index) => (
                  <TableRow key={room.id} className="hover:bg-muted/50">
                    <TableCell className="text-center font-medium">
                      {index + 1}
                    </TableCell>
                    <TableCell>
                      <div className="relative h-16 w-24 rounded-md overflow-hidden">
                        <Image
                          src={room.main_image}
                          alt={room.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{room.title}</div>
                      <div className="text-sm text-muted-foreground line-clamp-1">
                        {room.description}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-normal">
                        {room.family_count}{" "}
                        {room.family_count === 1 ? "Person" : "People"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={room.room_count > 0 ? "default" : "secondary"}
                        className="font-normal"
                      >
                        {room.room_count}{" "}
                        {room.room_count === 1 ? "Room" : "Rooms"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      ${room.price_per_day}
                      <span className="text-xs text-muted-foreground">
                        /night
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            className="cursor-pointer"
                            onClick={() => setSelectedRoom(room)}
                          >
                            <Pencil className="mr-2 h-4 w-4" />
                            Update
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => deleteFunc(room.id)}
                            className="cursor-pointer text-destructive focus:text-destructive"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {selectedRoom && (
        <UpdateRoomForm
          room={selectedRoom}
          refetch={refetch}
          onCancel={() => setSelectedRoom(null)}
        />
      )}
    </>
  );
};

export default RoomsTable;
