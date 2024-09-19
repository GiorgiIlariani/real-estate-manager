"use client";

import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";

import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export const Filters = ({ regions }: { regions: RegionTypes[] }) => {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>რეგიონი</MenubarTrigger>
        <MenubarContent className="flex flex-col bg-white pl-6 pt-4 pr-7 pb-[89px] max-w-[731px] ">
          <h3 className="text-base font-medium">რეგიონის მიხედვით</h3>
          <div className="flex max-h-[128px] flex-wrap gap-y-4 gap-x-[50px] mt-6">
            {regions.map((region) => (
              <div
                className="flex gap-2 items-center text-sm font-normal"
                key={region.id}>
                <Checkbox id={String(region.id)} />
                {region.name}
              </div>
            ))}
          </div>

          <Button className="bg-[#F93B1D] text-white py-2 px-[14px]">
            არჩევა
          </Button>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>საფასო კატეგორია</MenubarTrigger>
        <MenubarContent className="flex flex-col bg-white pt-6 px-6 pb-8 max-w-[382px]">
          <h3 className="text-base font-medium">ფასის მიხედვით</h3>

          <div className="flex gap-[15px] mt-6">
            <Input type="number" placeholder="დან" className="input-class" />
            <Input type="number" placeholder="მდე" className="input-class" />
          </div>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>ფართობი</MenubarTrigger>
        <MenubarContent className="flex flex-col bg-white pl-6 pt-4 pr-7 pb-[89px] max-w-[382px]">
          <h3 className="text-base font-medium">ფართობის მიხედვით</h3>
          <div className="flex gap-[15px] mt-6">
            <Input type="number" placeholder="დან" className="input-class" />
            <Input type="number" placeholder="მდე" className="input-class" />
          </div>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>საძინებლების რაოდენობა</MenubarTrigger>
        <MenubarContent className="flex flex-col bg-white pl-6 pt-4 pr-7 pb-[89px] max-w-[282px]">
          <h3 className="text-base font-medium">საძინებლების რაოდენობა</h3>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};
