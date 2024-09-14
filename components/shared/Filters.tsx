import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";

const Filters = () => {
  return (
    <div className="wrapper mt-[77px]">
      <div className="w-full flex justify-between">
        <div></div>
        <div className="flex gap-4">
          <div className="w-full flex justify-end">
            <Button className="bg-transparent text-[#F93B1D] border border-[#F93B1D] px-[10px] py-4 rounded-[10px] font-normal text-base">
              {/* <Image /> */}
              ლისთინგის დამატება
            </Button>
            <Button className="bg-[#F93B1D] text-white border border-[#F93B1D] px-[10px] py-4 rounded-[10px] font-normal text-base">
              <Image />
              აგენტის დამატება
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;
