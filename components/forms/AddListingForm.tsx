"use client";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { AddListingFormSchema } from "@/lib/validation";
import CustomFormField, { FormFieldType } from "../shared/CostumFormField";
import { transactionTypeConstants } from "@/constants";

const AddListingForm = () => {
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
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (data: z.infer<typeof AddListingFormSchema>) => {};

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

          {/* მისამართი */}
          <section className="flex flex-col gap-[22px]">
            <h4 className="text-base font-normal text-left">მდებარეობა</h4>
            <div className="flex gap-5">
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="location"
                label="მისამართი*"
                error={error.location}
              />
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="postalIndex"
                label="საფოსტო ინდექსი*"
                error={error.postalIndex}
              />
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
              />
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="goods"
                label="ფართობი*"
                error={error.goods}
              />
            </div>
            <div className="max-w-[385px]">
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="numberOfBedroom"
                label="საძინებლების რაოდენობა*"
                error={error.numberOfBedroom}
              />
            </div>

            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="description"
              label="აღწერა*"
              error={error.description}
            />
          </section>

          {/* აგენტი */}
          <section className="flex flex-col gap-[22px]">
            <h4 className="text-base font-normal text-left">აგენტი</h4>
            <div></div>
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
