import AddListingForm from "@/components/forms/AddListingForm";
import { fetchCities } from "@/lib/actions";
import React from "react";

const AddListing = async () => {
  // const cities = await fetchCities();
  // console.log({ cities });

  return (
    <main className="flex flex-col">
      <h1 className="text-[#021526] font-medium text-[32px] text-center mt-[62px]">
        ლისთინგის დამატება
      </h1>
      <AddListingForm />
    </main>
  );
};

export default AddListing;
