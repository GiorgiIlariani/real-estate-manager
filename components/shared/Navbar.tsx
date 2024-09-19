import React from "react";
import { Button } from "../ui/button";
import { AiOutlinePlus } from "react-icons/ai";
import { AddAgentModal } from "./AddAgentModal";
import Link from "next/link";
import { Filters } from "./Filters";
import { fetchRegions } from "@/lib/actions";

const Navbar = async () => {
  const regions = await fetchRegions();

  return (
    <div className="wrapper mt-[77px]">
      <div className="w-full flex justify-between">
        <Filters regions={regions} />
        <div className="flex gap-4">
          <div className="w-full flex justify-end gap-4">
            <Link href="/add-listing">
              <Button className="bg-[#F93B1D] text-white border border-[#F93B1D] px-[10px] py-4 rounded-[10px] font-medium text-base gap-[2px]">
                <AiOutlinePlus />
                ლისთინგის დამატება
              </Button>
            </Link>

            <AddAgentModal type="from-home" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
