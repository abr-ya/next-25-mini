"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

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
import { deleteTransaction } from "@money/_data/crudTransaction";

export const DeleteDialog = ({ transactionId }: { transactionId: number }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleDeleteConfirm = async () => {
    setOpen(false);
    console.log("delete", transactionId);
    const result = await deleteTransaction(transactionId);

    if (!result) {
      toast.error("Something went wrong. Please try again.");
    } else if (result.error) {
      toast.error(result.message);
    } else {
      toast.success(`Transaction ${transactionId} has been deleted.`);
      router.refresh();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
