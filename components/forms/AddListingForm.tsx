"use client";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { AddListingFormSchema } from "@/lib/validation";
import CustomFormField, { FormFieldType } from "../shared/CostumFormField";
import { transactionTypeConstants } from "@/constants";
import { SelectGroup, SelectItem } from "../ui/select";
import { useEffect, useState } from "react";

const AddListingForm = ({ cities, regions, agents }: AddListingProps) => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof AddListingFormSchema>>({
    resolver: zodResolver(AddListingFormSchema),
    defaultValues: {
      transactionType: "იყიდება",
      location: "",
      region: "",
      postalIndex: "",
      city: "",
      goods: "",
      price: "",
      image: undefined,
      agent: "",
    },
  });

  const [selectedRegion, setSelectedRegion] = useState<number | undefined>(
    undefined
  );
  const [filteredCities, setFilteredCities] = useState<CityTypes[]>(cities);

  const handleRegionChange = (value: string) => {
    const selectedRegionId = regions.find(
      (region) => region.name === value
    )?.id; // Get the ID based on the selected name
    setSelectedRegion(selectedRegionId); // Set the selected region ID
    form.setValue("city", ""); // Reset city when region changes
  };

  useEffect(() => {
    if (selectedRegion) {
      setFilteredCities(
        cities.filter((city) => city.region_id === selectedRegion)
      );
    } else {
      setFilteredCities(cities);
    }
  }, [selectedRegion, cities]);

  // 2. Define a submit handler.
  const onSubmit = async (data: z.infer<typeof AddListingFormSchema>) => {};

  const error = form.formState.errors;

  console.log(form.getValues(), error);

  return (
    <div className="w-[790px] mx-auto mt-[62px] mb-[87px]">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 flex flex-col gap-20">
          {/* გარიგების ტიპი */}
          <section className="flex flex-col gap-[22px]">
            <h4 className="text-base font-normal text-left">გარიგების ტიპი</h4>

            <CustomFormField
              fieldType={FormFieldType.RADIO}
              control={form.control}
              name="transactionType"
              error={error.location}
              radioGroupValues={transactionTypeConstants}
            />
          </section>

          {/* მდებარეობა */}
          <section className="flex flex-col gap-[22px]">
            <h4 className="text-base font-normal text-left">მდებარეობა</h4>
            <div className="flex gap-5">
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="location"
                label="მისამართი*"
                error={error.location}
                bottomText="მინიმუმ ორი სიმბოლო"
              />
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="postalIndex"
                label="საფოსტო ინდექსი*"
                error={error.postalIndex}
                bottomText="მხოლოდ რიცხვები"
              />
            </div>
            <div className="flex gap-5">
              <div className="max-w-[385px] flex-1">
                <CustomFormField
                  fieldType={FormFieldType.SELECT}
                  control={form.control}
                  name="region"
                  label="რეგიონი*"
                  error={error.region}
                  onChange={(value) => handleRegionChange(value)}>
                  <SelectGroup>
                    {regions.map((region) => (
                      <SelectItem
                        value={region.name}
                        key={region.id}
                        className="bg-white p-[10px] text-sm font-normal cursor-pointer">
                        {region.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </CustomFormField>
              </div>

              {selectedRegion && (
                <CustomFormField
                  fieldType={FormFieldType.SELECT}
                  control={form.control}
                  name="city"
                  label="ქალაქი*"
                  error={error.city}>
                  <SelectGroup>
                    {filteredCities.map((city) => (
                      <SelectItem
                        value={city.name}
                        key={city.id}
                        className="bg-white p-[10px] text-sm font-normal cursor-pointer">
                        {city.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </CustomFormField>
              )}
            </div>
          </section>

          {/* ბინის დეტალები */}
          <section className="flex flex-col gap-[22px]">
            <h4 className="text-base font-normal text-left">ბინის დეტალები</h4>
            <div className="flex gap-5">
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="price"
                label="ფასი*"
                error={error.price}
                bottomText="მხოლოდ რიცხვები"
              />

              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="goods"
                label="ფართობი*"
                error={error.goods}
                bottomText="მხოლოდ რიცხვები"
              />
            </div>
            <div className="max-w-[385px]">
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="numberOfBedroom"
                label="საძინებლების რაოდენობა*"
                error={error.numberOfBedroom}
                bottomText="მხოლოდ რიცხვები"
              />
            </div>

            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="description"
              label="აღწერა*"
              error={error.description}
              bottomText="მინიმუმ 5 სიტყვა"
            />

            <div className="w-full">
              <CustomFormField
                fieldType={FormFieldType.FILE}
                control={form.control}
                name="image"
                error={error.image}
                label="ატვირთეთ ფოტო*"
                setValue={form.setValue}
              />
            </div>
          </section>

          {/* აგენტი */}
          <section className="flex flex-col gap-[22px]">
            <h4 className="text-base font-normal text-left">აგენტი</h4>
            <div className="max-w-[385px]">
              <CustomFormField
                fieldType={FormFieldType.SELECT}
                control={form.control}
                name="agent"
                label="აირჩიე"
                error={error.agent}>
                <SelectGroup>
                  {agents.map((agent) => (
                    <SelectItem
                      value={agent.name}
                      key={agent.id}
                      className="bg-white p-[10px] text-sm font-normal cursor-pointer">
                      {agent.name} {agent.surname}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </CustomFormField>
            </div>
          </section>

          {/* buttons */}
          <div className="w-full flex justify-end">
            <div className="flex gap-[15px]">
              <Button className="bg-transparent text-[#F93B1D] border border-[#F93B1D] px-[10px] py-4 rounded-[10px] font-normal text-base">
                გაუქმება
              </Button>
              <Button className="bg-[#F93B1D] text-white border border-[#F93B1D] px-[10px] py-4 rounded-[10px] font-normal text-base">
                დაამატე ლისთინგი
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddListingForm;
