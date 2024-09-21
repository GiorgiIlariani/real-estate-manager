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
import { validateArea, validatePrice } from "@/lib/utils";

export const Filters = ({
  regions,
  onSelectedRegionsChange,
  onSelectedPriceChange,
  onSelectedAreaChange,
  onSelectedBedroomChange,
}: {
  regions: RegionTypes[];
  onSelectedRegionsChange: (selectedRegions: RegionTypes[]) => void;
  onSelectedPriceChange: (selectedPriceRange: string) => void;
  onSelectedAreaChange: (selectedAreaRange: string) => void;
  onSelectedBedroomChange: (selectedBedroomCount: number | null) => void;
}) => {
  const [selectedRegionIds, setSelectedRegionIds] = useState<number[]>([]);
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [minArea, setMinArea] = useState<number | null>(null);
  const [maxArea, setMaxArea] = useState<number | null>(null);
  const [selectedBedrooms, setSelectedBedrooms] = useState<number | null>(null);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [priceError, setPriceError] = useState<string | null>(null);
  const [areaError, setAreaError] = useState<string | null>(null);

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
    if (
      minPrice === 0 ||
      (minPrice === null && maxPrice === 0) ||
      maxPrice === null
    )
      return; // Prevent submitting if both are zero
    const selectedPriceRange = `${minPrice ?? 0} - ${maxPrice ?? "∞"}`;
    onSelectedPriceChange(selectedPriceRange);
  };

  const handleAreaButtonClick = () => {
    if (
      minArea === 0 ||
      (minArea === null && maxArea === 0) ||
      maxArea === null
    )
      return; // Prevent submitting if both are zero
    const selectedAreaRange = `${minArea ?? 0} - ${maxArea ?? "∞"}`;
    onSelectedAreaChange(selectedAreaRange);
  };

  const handleBedroomSelect = (bedroomCount: number | null) => {
    setSelectedBedrooms(bedroomCount);
    onSelectedBedroomChange(bedroomCount);
  };

  const toggleMenu = (menuName: string) => {
    setOpenMenu((prev) => (prev === menuName ? null : menuName));
  };

  const isMenuOpen = (menuName: string) => openMenu === menuName;

  return (
    <Menubar className="border border-[#DBDBDB] p-[6px] rounded-[10px]">
      {/* Regions Menu */}
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
                    className="w-[20px] h-[20px] rounded-[2px] border-gray-300
                    data-[state=checked]:bg-[#45A849] data-[state=checked]:text-white 
                    data-[state=checked]:border-transparent"
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

      {/* Price Menu */}
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
                  <div className="relative">
                    <Input
                      type="number"
                      placeholder="დან"
                      value={minPrice !== null ? minPrice : ""}
                      onChange={(e) => {
                        const value = Number(e.target.value);
                        setMinPrice(value);
                        setPriceError(validatePrice(value, maxPrice));
                      }}
                      className="pr-8 input-class"
                    />
                    <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400">
                      ₾
                    </span>
                  </div>
                  <div className="relative">
                    <Input
                      type="number"
                      placeholder="მდე"
                      value={maxPrice !== null ? maxPrice : ""}
                      onChange={(e) => {
                        const value = Number(e.target.value);
                        setMaxPrice(value);
                        setPriceError(validatePrice(minPrice, value));
                      }}
                      className="pr-8 input-class"
                    />
                    <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400">
                      ₾
                    </span>
                  </div>
                </div>
                {priceError && <p className="text-red-500">{priceError}</p>}
                <Button
                  onClick={handlePriceButtonClick}
                  disabled={!!priceError} // Disable button if there's an error
                  className="w-[77px] bg-[#F93B1D] text-white py-2 px-[14px] mt-8">
                  არჩევა
                </Button>
              </div>
            </div>
          </MenubarContent>
        )}
      </MenubarMenu>

      {/* Area Menu */}
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
              <div className="relative">
                <Input
                  type="number"
                  placeholder="დან"
                  value={minArea !== null ? minArea : ""}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    setMinArea(value);
                    setAreaError(validateArea(value, maxArea));
                  }}
                  className="pr-8"
                />
                <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400">
                  მ²
                </span>
              </div>
              <div className="relative">
                <Input
                  type="number"
                  placeholder="მდე"
                  value={maxArea !== null ? maxArea : ""}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    setMaxArea(value);
                    setAreaError(validateArea(minArea, value));
                  }}
                  className="pr-8"
                />
                <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400">
                  მ²
                </span>
              </div>
            </div>
            {areaError && <p className="text-red-500">{areaError}</p>}
            <Button
              onClick={handleAreaButtonClick}
              disabled={!!areaError} // Disable button if there's an error
              className="w-[77px] bg-[#F93B1D] text-white py-2 px-[14px] mt-8">
              არჩევა
            </Button>
          </MenubarContent>
        )}
      </MenubarMenu>

      {/* Bedrooms Menu */}
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
                  }>
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
