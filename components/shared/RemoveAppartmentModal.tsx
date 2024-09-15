"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "../ui/button";

export function RemoveAppartmentModal() {
  return (
    <Dialog>
      <DialogTrigger className="text-[#676E76] px-[10px] rounded-[8px] mt-5 cursor-pointer border">
        <Button>ლისტინგის წაშლა</Button>
      </DialogTrigger>
      <DialogContent className="bg-white min-w-[623px] flex flex-col rounded-[20px] py-[58px] px-[150px]">
        <DialogHeader className="text-xl text-[#2D3648]">
          გსურთ წაშალოთ ლისტინგი?
        </DialogHeader>

        <div className="flex items-center gap-[15px] mt-[35px]">
          <Button
            className="bg-transparent border border-[#F93B1D] text-[#F93B1D] px-4 py-[10px] text-base font-medium"
            onClick={() => {}}>
            გაუქმება
          </Button>
          <Button className="bg-[#F93B1D] border border-[#F93B1D] text-white px-4 py-[10px] text-base font-medium">
            დადასტურება
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
