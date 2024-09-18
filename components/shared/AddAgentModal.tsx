"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";

import AddAgentForm from "../forms/AddAgentForm";
import { AiOutlinePlus } from "react-icons/ai";

export function AddAgentModal() {
  return (
    <Dialog>
      <DialogTrigger className="bg-transparent text-[#F93B1D] border border-[#F93B1D] px-[10px] py-2 rounded-[10px] font-medium text-base gap-[2px] flex items-center">
        <AiOutlinePlus /> აგენტის დამატება
      </DialogTrigger>
      <DialogContent className="bg-white min-w-[1009px] max-h-[784px] flex flex-col rounded-[20px] px-[81px] gap-[61px] py-[63px]">
        <h1 className="text-[#021526] font-medium text-[32px] text-center">
          აგენტის დამატება
        </h1>
        <AddAgentForm />
      </DialogContent>
    </Dialog>
  );
}
