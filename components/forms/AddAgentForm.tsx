import { AddAgentFormSchema } from "@/lib/validation";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import CustomFormField, { FormFieldType } from "../shared/CostumFormField";
import { AddAgent } from "@/lib/actions";
import { useState } from "react";

const AddAgentForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  // 1. Define your form.
  const form = useForm<z.infer<typeof AddAgentFormSchema>>({
    resolver: zodResolver(AddAgentFormSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      phone_number: "",
      image: undefined,
    },
    // mode: "onChange",
  });

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof AddAgentFormSchema>) => {
    try {
      setIsLoading(true);
      const status = await AddAgent(values);

      if (status === 201) {
        form.reset();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const error = form.formState.errors;

  return (
    <main className="flex flex-col">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-[28px]">
          <div className="flex gap-5">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="name"
              error={error.name}
              label="სახელი*"
              bottomText="მინიმუმ ორი სიმბოლო"
            />
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="username"
              error={error.username}
              label="გვარი*"
              bottomText="მინიმუმ ორი სიმბოლო"
            />
          </div>

          <div className="flex gap-5">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="email"
              error={error.email}
              label="ელ.ფოსტა*"
              bottomText="გამოიყენეთ @redberry.ge ფოსტა"
            />
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="phone_number"
              error={error.phone_number}
              label="ტელეფონის ნომერი*"
              bottomText="მხოლოდ რიცხვები"
            />
          </div>

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

          <div className="w-full flex justify-end mt-[66px]">
            <div className="flex gap-[15px]">
              <Button className="bg-transparent text-[#F93B1D] border border-[#F93B1D] px-[10px] py-4 rounded-[10px] font-normal text-base">
                გაუქმება
              </Button>
              <Button className="bg-[#F93B1D] text-white border border-[#F93B1D] px-[10px] py-4 rounded-[10px] font-normal text-base">
                {isLoading ? "ემატება..." : "დაამატე აგენტი"}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </main>
  );
};

export default AddAgentForm;
