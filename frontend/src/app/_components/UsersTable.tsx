"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TUser } from "@/app/types/User";
import Image from "next/image";
import ChangeRoleBtn from "./ChangeRoleBtn";
import { useUserSelector } from "../hooks/appSelector";
import { User2 } from "lucide-react";

export default function UsersTable({
  users,
  refetch,
}: {
  users: TUser[];
  refetch: () => void;
}) {
  const me = useUserSelector().user;
  return (
    <div className="overflow-x-auto mt-5 rounded-lg shadow-md bg-white">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted">
            <TableHead className="w-[60px] text-center">#</TableHead>
            <TableHead>Profile</TableHead>
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className="">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={6}
                className="text-center py-6 text-muted-foreground"
              >
                No users found.
              </TableCell>
            </TableRow>
          ) : (
            users.map((user, index) => (
              <TableRow
                key={user.id}
                className="hover:bg-muted/50 transition-colors duration-200"
              >
                <TableCell className="text-center font-medium">
                  {index + 1}
                </TableCell>
                <TableCell>
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-muted">
                    <Image
                      src={user.image}
                      alt={user.full_name}
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                </TableCell>
                <TableCell className="font-medium">{user.full_name}</TableCell>
                <TableCell className="text-muted-foreground">
                  {user.email}
                </TableCell>
                <TableCell className="capitalize">{user.role}</TableCell>
                <TableCell className="space-y-2">
                  {user.email === me?.email ? (
                    <div className="flex items-center gap-1 text-sm text-muted-foreground italic">
                      <User2 className="h-4 w-4" />
                      You
                    </div>
                  ) : (
                    <ChangeRoleBtn
                      userId={user.id}
                      currentRole={user.role}
                      onConfirm={refetch}
                    />
                  )}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
