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
      gmail: "",
      phone_number: "",
      image: "",
    },
  });
  // 2. Define a submit handler.
  const onSubmit = async (data: z.infer<typeof AddAgentFormSchema>) => {};

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 flex flex-col gap-20"></form>
    </Form>
  );
};

export default AddAgentForm;
