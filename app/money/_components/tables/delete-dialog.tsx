"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/index";
import { toast } from "sonner";
import { Trash2Icon } from "lucide-react";

import { Button } from "@/components/index";

export const DeleteDialog = ({ transactionId }: { transactionId: number }) => {
  const handleDeleteConfirm = async () => {
    console.log("delete", transactionId);
    // delete with error handling here
    toast.success(`Transaction ${transactionId} has been deleted.`);
    // refresh the list here
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive" size="icon">
          <Trash2Icon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This transaction will be permanently deleted.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>Cancel</DialogClose>
          <Button onClick={handleDeleteConfirm} variant="destructive">
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
