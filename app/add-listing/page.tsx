import AddListingForm from "@/components/forms/AddListingForm";
import { fetchAgents, fetchCities, fetchRegions } from "@/lib/actions";
import React from "react";

const AddListing = async () => {
  const cities = await fetchCities();
  const regions = await fetchRegions();
  const agents = await fetchAgents();

  return (
    <main className="flex flex-col">
      <h1 className="text-[#021526] font-medium text-[32px] text-center mt-[62px]">
        ლისთინგის დამატება
      </h1>
      <AddListingForm cities={cities} regions={regions} agents={agents} />
    </main>
  );
};

export default AddListing;
