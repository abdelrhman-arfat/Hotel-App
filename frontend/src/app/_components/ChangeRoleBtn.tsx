"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import { Pencil } from "lucide-react";
import axiosInstance from "@/lib/API/axiosInstance";
import { roles } from "../constants/Roles";

const ChangeRoleBtn = ({
  userId,
  currentRole,
  onConfirm,
}: {
  userId?: number;
  currentRole: string;
  onConfirm: () => void;
}) => {
  const [editMode, setEditMode] = useState(false);
  const [selectedRole, setSelectedRole] = useState(currentRole);

  const handleUpdate = async () => {
    await toast.promise(
      axiosInstance.put("/manager/update-user-role", {
        userId,
        role: selectedRole,
      }),
      {
        loading: "Updating role...",
        success: (res) =>
          res.data.message || `Role updated to "${selectedRole}"`,
        error: (err) => err.response.data.message || "Failed to update role.",
      }
    );

    setEditMode(false);
    onConfirm();
  };

  if (editMode) {
    return (
      <div className="space-y-2">
        <select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          className="w-full px-2 py-1 rounded-md border text-sm"
        >
          {roles.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            onClick={handleUpdate}
            disabled={selectedRole === currentRole}
          >
            Confirm
          </Button>
          <Button size="sm" variant="ghost" onClick={() => setEditMode(false)}>
            Cancel
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => setEditMode(true)}
      className="flex items-center gap-1"
    >
      <Pencil className="h-4 w-4" />
      <span className="hidden sm:inline">Update Role</span>
    </Button>
  );
};

export default ChangeRoleBtn;
