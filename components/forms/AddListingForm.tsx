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
import { addRealEstate } from "@/lib/actions";
import { useRouter } from "next/navigation";
import DropdownMenuComponent from "../shared/DropdownMenu";
import { base64ToBlob } from "@/lib/utils";

const AddListingForm = ({ cities, regions, agents }: AddListingProps) => {
  const storedFormData = JSON.parse(
    (typeof window !== "undefined" && localStorage.getItem("formData")) || "{}"
  );
  const storedImage =
    (typeof window !== "undefined" && localStorage.getItem("image")) || null;

  const defaultValues = {
    transactionType: storedFormData.transactionType || "იყიდება",
    location: storedFormData.location || "",
    region: storedFormData.region || "",
    zip_code: storedFormData.zip_code || "",
    city: storedFormData.city || "",
    area: storedFormData.area || "",
    price: storedFormData.price || "",
    image: storedImage,
    agent: storedFormData.agent || "",
    bedrooms: storedFormData.bedrooms || "",
    description: storedFormData.description || "",
  };

  const form = useForm<z.infer<typeof AddListingFormSchema>>({
    resolver: zodResolver(AddListingFormSchema),
    defaultValues,
  });

  // Load the initial selected region from localStorage
  const initialSelectedRegion = JSON.parse(
    (typeof window !== "undefined" && localStorage.getItem("selectedRegion")) ||
      "null"
  );

  const [selectedRegion, setSelectedRegion] = useState<number | undefined>(
    initialSelectedRegion
  );

  const [filteredCities, setFilteredCities] = useState<CityTypes[]>(cities);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const subscription = form.watch((value) => {
      typeof window !== "undefined" &&
        localStorage.setItem("formData", JSON.stringify(value));
    });

    return () => subscription.unsubscribe();
  }, [form]);

  useEffect(() => {
    if (selectedRegion !== undefined) {
      typeof window !== "undefined" &&
        localStorage.setItem("selectedRegion", JSON.stringify(selectedRegion));
    }
  }, [selectedRegion]);

  const handleRegionChange = (value: string) => {
    const selectedRegionId = regions.find(
      (region) => region.name === value
    )?.id;
    setSelectedRegion(selectedRegionId);
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

  const onSubmit = async (values: z.infer<typeof AddListingFormSchema>) => {
    const region = regions.find((region) => region.name === values.region);
    const city = cities.find((city) => city.name === values.city);
    const agent = agents.find((agent) => agent.name === values.agent);

    try {
      setIsLoading(true);
      const formData = new FormData();

      const is_rental = values.transactionType === "იყიდება" ? "0" : "1";

      formData.append("price", values.price);
      formData.append("zip_code", values.zip_code);
      formData.append("description", values.description);
      formData.append("area", values.area);
      formData.append("bedrooms", values.bedrooms);

      let imageToUpload;
      if (
        typeof values.image === "string" &&
        values.image.startsWith("data:image")
      ) {
        imageToUpload = base64ToBlob(values.image, "image/jpeg");
      } else {
        imageToUpload = values.image;
      }

      formData.append("image", imageToUpload);

      formData.append("city_id", String(city?.id));
      formData.append("address", values.location);
      formData.append("agent_id", String(agent?.id));
      formData.append("region_id", String(region?.id));
      formData.append("is_rental", is_rental);

      const status = await addRealEstate(formData);

      if (status === 201) {
        form.reset();
        router.push("/");
        localStorage.removeItem("formData");
        localStorage.removeItem("selectedAgent");
        localStorage.removeItem("image");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const error = form.formState.errors;

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
                name="zip_code"
                label="საფოსტო ინდექსი*"
                error={error.zip_code}
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
                name="area"
                label="ფართობი*"
                error={error.area}
                bottomText="მხოლოდ რიცხვები"
              />
            </div>
            <div className="max-w-[385px]">
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="bedrooms"
                label="საძინებლების რაოდენობა*"
                error={error.bedrooms}
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
            <div className="max-w-[385px] flex flex-col gap-[5px]">
              <h5 className="font-medium text-sm">აირჩიე</h5>
              <DropdownMenuComponent
                agents={agents}
                //
                onSelectAgent={(agent) => form.setValue("agent", agent.name)} // Update agent value in the form
                error={error.agent}
              />
            </div>
          </section>

          {/* buttons */}
          <div className="w-full flex justify-end">
            <div className="flex gap-[15px]">
              <Button className="bg-transparent text-[#F93B1D] border border-[#F93B1D] px-[10px] py-4 rounded-[10px] font-normal text-base">
                გაუქმება
              </Button>
              <Button className="bg-[#F93B1D] text-white border border-[#F93B1D] px-[10px] py-4 rounded-[10px] font-normal text-base">
                {isLoading ? "ემატება..." : "დაამატე ლისთინგი"}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddListingForm;
