"use client";

import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { AiOutlinePlus } from "react-icons/ai";
import { AddAgentModal } from "./AddAgentModal";
import Link from "next/link";
import { Filters } from "./Filters";
import { AiOutlineClose } from "react-icons/ai";
import { useRouter } from "next/navigation";

const Navbar = ({ regions }: { regions: RegionTypes[] }) => {
  const router = useRouter();

  const [selectedRegions, setSelectedRegions] = useState<RegionTypes[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string | null>(
    null
  );
  const [selectedAreaRange, setSelectedAreaRange] = useState<string | null>(
    null
  );
  const [selectedBedroomCount, setSelectedBedroomCount] = useState<
    number | null
  >(null);

  const handleRegionRemove = (regionId: number) => {
    setSelectedRegions((prev) =>
      prev.filter((region) => region.id !== regionId)
    );
  };

  const handlePriceRemove = () => {
    setSelectedPriceRange(null);
  };

  const handleAreaRemove = () => {
    setSelectedAreaRange(null);
  };

  const handleBedroomRemove = () => {
    setSelectedBedroomCount(null);
  };

  const handleClearFilters = () => {
    setSelectedRegions([]);
    setSelectedPriceRange(null);
    setSelectedAreaRange(null);
    setSelectedBedroomCount(null);
  };

  useEffect(() => {
    const query = new URLSearchParams();

    // Format regions (join with commas)
    if (selectedRegions.length) {
      query.set("regions", selectedRegions.map((r) => r.id).join(","));
    }

    // Format price range
    if (selectedPriceRange) {
      const [minPrice, maxPrice] = selectedPriceRange
        .split(" - ")
        .map((price) => price.replace("ლ", "").trim());
      query.set("price", `${minPrice}-${maxPrice}`);
    }

    // Format area range (only numbers)
    if (selectedAreaRange) {
      const [minArea, maxArea] = selectedAreaRange
        .split(" - ")
        .map((area) => area.replace("მ²", "").trim());
      query.set("area", `${minArea}-${maxArea}`);
    }

    // Format bedroom count
    if (selectedBedroomCount !== null) {
      query.set("bedrooms", selectedBedroomCount.toString());
    }

    // Push the formatted URL
    const formattedQuery = query.toString().replace(/%2C/g, ","); // Replace %2C with commas
    router.push(`?${formattedQuery}`);
  }, [
    selectedRegions,
    selectedPriceRange,
    selectedAreaRange,
    selectedBedroomCount,
  ]);

  return (
    <div className="wrapper mt-[77px]">
      <div className="w-full flex justify-between">
        <Filters
          regions={regions}
          onSelectedRegionsChange={setSelectedRegions}
          onSelectedPriceChange={setSelectedPriceRange}
          onSelectedAreaChange={setSelectedAreaRange}
          onSelectedBedroomChange={setSelectedBedroomCount}
        />
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

      {/* Display the selected filters */}
      <div className="mt-6 flex gap-2 flex-wrap">
        {selectedRegions.map((region) => (
          <div
            key={region.id}
            className="border border-[#DBDBDB] py-[6px] px-[10px] rounded-[43px] flex items-center gap-2 text-sm text-[#021526CC]">
            {region.name}
            <div className="w-[14px] h-[14px]">
              <AiOutlineClose
                className="cursor-pointer"
                onClick={() => handleRegionRemove(region.id)}
              />
            </div>
          </div>
        ))}

        {selectedPriceRange && (
          <div className="border border-[#DBDBDB] py-[6px] px-[10px] rounded-[43px] flex items-center gap-2 text-sm text-[#021526CC]">
            {selectedPriceRange}
            <div className="w-[14px] h-[14px]">
              <AiOutlineClose
                className="cursor-pointer"
                onClick={handlePriceRemove}
              />
            </div>
          </div>
        )}

        {selectedAreaRange && (
          <div className="border border-[#DBDBDB] py-[6px] px-[10px] rounded-[43px] flex items-center gap-2 text-sm text-[#021526CC]">
            {selectedAreaRange}
            <div className="w-[14px] h-[14px]">
              <AiOutlineClose
                className="cursor-pointer"
                onClick={handleAreaRemove}
              />
            </div>
          </div>
        )}

        {selectedBedroomCount !== null && (
          <div className="border border-[#DBDBDB] py-[6px] px-[10px] rounded-[43px] flex items-center gap-2 text-sm text-[#021526CC]">
            {selectedBedroomCount} საძინებელი
            <div className="w-[14px] h-[14px]">
              <AiOutlineClose
                className="cursor-pointer"
                onClick={handleBedroomRemove}
              />
            </div>
          </div>
        )}

        {/* Clear Filters Button */}
        {selectedRegions.length > 0 ||
        selectedPriceRange ||
        selectedAreaRange ||
        selectedBedroomCount !== null ? (
          <div
            className="py-[6px] px-[10px] rounded-[43px] flex items-center gap-2 text-sm text-[#021526] font-medium cursor-pointer hover:underline"
            onClick={handleClearFilters}>
            გასუფთავება
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Navbar;
