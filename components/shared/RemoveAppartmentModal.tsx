"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "../ui/button";
import { removeEachRealEstate } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function RemoveAppartmentModal({ id }: { id: number }) {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleDeleteRealEstate = async () => {
    setIsLoading(true);
    try {
      const status = await removeEachRealEstate(String(id));

      if (status === 200) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="text-[#676E76] text-xs p-[10px] rounded-[8px] mt-5 cursor-pointer border w-max">
        ლისტინგის წაშლა
      </DialogTrigger>
      <DialogContent className="bg-white min-w-[623px] flex flex-col rounded-[20px] py-[58px] px-[150px]">
        <DialogHeader className="text-xl text-[#2D3648]">
          გსურთ წაშალოთ ლისტინგი?
        </DialogHeader>

        <div className="flex items-center gap-[15px] mt-[35px]">
          <DialogClose>
            <Button
              className="bg-transparent border border-[#F93B1D] text-[#F93B1D] px-4 py-[10px] text-base font-medium"
              onClick={() => {}}>
              გაუქმება
            </Button>
          </DialogClose>
          <Button
            className="bg-[#F93B1D] border border-[#F93B1D] text-white px-4 py-[10px] text-base font-medium"
            onClick={handleDeleteRealEstate}>
            {isLoading ? "იშლება..." : "დადასტურება"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
