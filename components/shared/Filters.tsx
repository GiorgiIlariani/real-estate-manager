"use client";

import React, { useState } from "react";
import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";

export const Filters = ({
  regions,
  onSelectedRegionsChange,
  onSelectedPriceChange,
  onSelectedAreaChange,
  onSelectedBedroomChange, // <-- Add this prop to pass selected bedroom count back to Navbar
}: {
  regions: RegionTypes[];
  onSelectedRegionsChange: (selectedRegions: RegionTypes[]) => void;
  onSelectedPriceChange: (selectedPriceRange: string) => void;
  onSelectedAreaChange: (selectedAreaRange: string) => void;
  onSelectedBedroomChange: (selectedBedroomCount: number | null) => void; // Expect a number for bedroom count
}) => {
  const [selectedRegionIds, setSelectedRegionIds] = useState<number[]>([]);
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [minArea, setMinArea] = useState<number | null>(null);
  const [maxArea, setMaxArea] = useState<number | null>(null);
  const [selectedBedrooms, setSelectedBedrooms] = useState<number | null>(null); // State for selected bedrooms
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const handleCheckboxChange = (
    regionId: number,
    isChecked: boolean | string
  ) => {
    const isCheckedBoolean = Boolean(isChecked);
    setSelectedRegionIds((prev) =>
      isCheckedBoolean
        ? [...prev, regionId]
        : prev.filter((id) => id !== regionId)
    );
  };

  const handleButtonClick = () => {
    const selected = regions.filter((region) =>
      selectedRegionIds.includes(region.id)
    );
    onSelectedRegionsChange(selected);
  };

  const handlePriceButtonClick = () => {
    if (minPrice !== null && maxPrice !== null) {
      const priceRange = `${minPrice} - ${maxPrice}ლ`;
      onSelectedPriceChange(priceRange);
    }
  };

  const handleAreaButtonClick = () => {
    if (minArea !== null && maxArea !== null) {
      const areaRange = `${minArea} - ${maxArea}მ²`;
      onSelectedAreaChange(areaRange);
    }
  };

  const handleBedroomSelect = (bedroomCount: number | null) => {
    setSelectedBedrooms(bedroomCount);
    onSelectedBedroomChange(bedroomCount); // Pass selected bedroom count back to Navbar
  };

  const toggleMenu = (menuName: string) => {
    setOpenMenu((prev) => (prev === menuName ? null : menuName));
  };

  const isMenuOpen = (menuName: string) => openMenu === menuName;

  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger
          onClick={() => toggleMenu("region")}
          className={`flex items-center justify-between ${
            isMenuOpen("region") ? "bg-gray-100" : ""
          }`}>
          რეგიონი
          {isMenuOpen("region") ? <FiChevronUp /> : <FiChevronDown />}
        </MenubarTrigger>
        {isMenuOpen("region") && (
          <MenubarContent className="flex flex-col bg-white pl-6 pt-4 pr-7 pb-6 max-w-[731px]">
            <h3 className="text-base font-medium">რეგიონის მიხედვით</h3>
            <div className="grid grid-cols-3 max-h-[128px] gap-y-4 gap-x-[50px] mt-6">
              {regions.map((region) => (
                <div
                  className="flex gap-2 items-center text-sm font-normal"
                  key={region.id}>
                  <Checkbox
                    id={String(region.id)}
                    checked={selectedRegionIds.includes(region.id)}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange(region.id, checked)
                    }
                  />
                  {region.name}
                </div>
              ))}
            </div>
            <Button
              onClick={handleButtonClick}
              className="w-[77px] bg-[#F93B1D] text-white py-2 px-[14px] mt-8">
              არჩევა
            </Button>
          </MenubarContent>
        )}
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger
          onClick={() => toggleMenu("price")}
          className={`flex items-center justify-between ${
            isMenuOpen("price") ? "bg-gray-100" : ""
          }`}>
          საფასო კატეგორია
          {isMenuOpen("price") ? <FiChevronUp /> : <FiChevronDown />}
        </MenubarTrigger>
        {isMenuOpen("price") && (
          <MenubarContent className="flex flex-col gap-6 bg-white p-6 max-w-[382px]">
            <h3 className="text-base font-medium">ფასის მიხედვით</h3>
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-6">
                <div className="flex gap-[15px]">
                  <Input
                    type="number"
                    placeholder="დან"
                    value={minPrice !== null ? minPrice : ""}
                    onChange={(e) => setMinPrice(Number(e.target.value))}
                  />
                  <Input
                    type="number"
                    placeholder="მდე"
                    value={maxPrice !== null ? maxPrice : ""}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                  />
                </div>
                <Button
                  onClick={handlePriceButtonClick}
                  className="w-[77px] bg-[#F93B1D] text-white py-2 px-[14px] mt-8">
                  არჩევა
                </Button>
              </div>
            </div>
          </MenubarContent>
        )}
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger
          onClick={() => toggleMenu("area")}
          className={`flex items-center justify-between ${
            isMenuOpen("area") ? "bg-gray-100" : ""
          }`}>
          ფართობი
          {isMenuOpen("area") ? <FiChevronUp /> : <FiChevronDown />}
        </MenubarTrigger>
        {isMenuOpen("area") && (
          <MenubarContent className="flex flex-col gap-6 bg-white p-6 max-w-[382px]">
            <h3 className="text-base font-medium">ფართობის მიხედვით</h3>
            <div className="flex gap-[15px]">
              <Input
                type="number"
                placeholder="დან"
                value={minArea !== null ? minArea : ""}
                onChange={(e) => setMinArea(Number(e.target.value))}
              />
              <Input
                type="number"
                placeholder="მდე"
                value={maxArea !== null ? maxArea : ""}
                onChange={(e) => setMaxArea(Number(e.target.value))}
              />
            </div>
            <Button
              onClick={handleAreaButtonClick}
              className="w-[77px] bg-[#F93B1D] text-white py-2 px-[14px] mt-8">
              არჩევა
            </Button>
          </MenubarContent>
        )}
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger
          onClick={() => toggleMenu("bedrooms")}
          className={`flex items-center justify-between ${
            isMenuOpen("bedrooms") ? "bg-gray-100" : ""
          }`}>
          საძინებლების რაოდენობა
          {isMenuOpen("bedrooms") ? <FiChevronUp /> : <FiChevronDown />}
        </MenubarTrigger>
        {isMenuOpen("bedrooms") && (
          <MenubarContent className="flex flex-col gap-6 bg-white p-6 max-w-[282px]">
            <h3 className="text-base font-medium">საძინებლების რაოდენობა</h3>
            <div className="flex flex-wrap gap-4 mt-6">
              {[1, 2, 3, 4, 5].map((count) => (
                <div
                  key={count}
                  className={`rounded-[6px] p-[10px] border border-[#808A93] cursor-pointer ${
                    selectedBedrooms === count ? "bg-[#F93B1D] text-white" : ""
                  }`}
                  onClick={() =>
                    handleBedroomSelect(
                      selectedBedrooms === count ? null : count
                    )
                  } // Toggle selection
                >
                  <div className="text-[#02152666] text-sm font-normal w-[21px] h-[17px] flex items-center justify-center">
                    {count}
                  </div>
                </div>
              ))}
            </div>
            <Button
              onClick={() => handleBedroomSelect(selectedBedrooms)}
              className="w-[77px] bg-[#F93B1D] text-white py-2 px-[14px] mt-8">
              არჩევა
            </Button>
          </MenubarContent>
        )}
      </MenubarMenu>
    </Menubar>
  );
};
