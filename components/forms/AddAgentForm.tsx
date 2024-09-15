import { AddAgentFormSchema } from "@/lib/validation";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import CustomFormField, { FormFieldType } from "../shared/CostumFormField";

const AddAgentForm = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof AddAgentFormSchema>>({
    resolver: zodResolver(AddAgentFormSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      phone_number: "",
      image: "",
    },
  });
  // 2. Define a submit handler.
  const onSubmit = async (data: z.infer<typeof AddAgentFormSchema>) => {};

  const error = form.formState.errors;

  return (
    <main className="flex flex-col">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-[28px] flex flex-col gap-20 mt-[61px]">
          <div className="flex gap-5">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="name"
              error={error.name}
              label="სახელი*"
            />
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="username"
              error={error.username}
              label="გვარი*"
            />
          </div>

          <div className="flex gap-5">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="email"
              error={error.email}
              label="ელ.ფოსტა*"
            />
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="phone_number"
              error={error.phone_number}
              label="ტელეფონის ნომერი*"
            />
          </div>

          <div className="w-full flex justify-end">
            <div className="flex gap-[15px]">
              <Button className="bg-transparent text-[#F93B1D] border border-[#F93B1D] px-[10px] py-4 rounded-[10px] font-normal text-base">
                გაუქმება
              </Button>
              <Button className="bg-[#F93B1D] text-white border border-[#F93B1D] px-[10px] py-4 rounded-[10px] font-normal text-base">
                დაამატე აგენტი
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </main>
  );
};

export default AddAgentForm;
