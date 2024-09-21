"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import AddAgentForm from "../forms/AddAgentForm";
import { AiOutlinePlus } from "react-icons/ai";
import Image from "next/image";

export function AddAgentModal({
  type,
}: {
  type: "from-home" | "from-addListing";
}) {
  return (
    <Dialog>
      {type === "from-home" ? (
        <DialogTrigger className="bg-transparent text-[#F93B1D] border border-[#F93B1D] px-[10px] py-2 rounded-[10px] font-medium text-base gap-[2px] flex items-center">
          <AiOutlinePlus /> აგენტის დამატება
        </DialogTrigger>
      ) : (
        <DialogTrigger className="flex gap-2 items-center bg-white py-[10px] px-[5px] text-sm font-normal cursor-pointer">
          <Image
            src="/assets/icons/plus-circle.png"
            alt="add photo"
            width={24}
            height={24}
          />

          <p className="text-sm font-normal">დაამატე აგენტი</p>
        </DialogTrigger>
      )}

      <DialogContent className="bg-white min-w-[1009px] max-h-[784px] flex flex-col rounded-[20px] px-[81px] gap-[61px] py-[63px]">
        <h1 className="text-[#021526] font-medium text-[32px] text-center">
          აგენტის დამატება
        </h1>
        <AddAgentForm />
      </DialogContent>
    </Dialog>
  );
}
