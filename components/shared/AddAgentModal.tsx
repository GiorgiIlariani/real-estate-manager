"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "../ui/button";
import AddAgentForm from "../forms/AddAgentForm";
import { AiOutlinePlus } from "react-icons/ai";

export function AddAgentModal() {
  return (
    <Dialog>
      <DialogTrigger>
        <Button className="bg-transparent text-[#F93B1D] border border-[#F93B1D] px-[10px] py-4 rounded-[10px] font-medium text-base gap-[2px]">
          <AiOutlinePlus /> აგენტის დამატება
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white min-w-[1009px] flex flex-col rounded-[20px] py-[58px] px-[105px]">
        <DialogHeader className="text-[#021526] font-medium text-[32px] text-center mt-[62px]">
          აგენტის დამატება
        </DialogHeader>
        <AddAgentForm />
      </DialogContent>
    </Dialog>
  );
}
