/* eslint-disable no-unused-vars */
import Image from "next/image";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

import { Input } from "../ui/input";

import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { Textarea } from "../ui/textarea";

export enum FormFieldType {
  INPUT = "input",
  TEXTAREA = "textarea",
  RADIO = "radio",
  SELECT = "select",
  SKELETON = "skeleton",
}

const RenderInput = ({ field, props }: { field: any; props: CustomProps }) => {
  switch (props.fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="flex flex-col gap-2">
          {props.iconSrc && (
            <Image
              src={props.iconSrc}
              height={24}
              width={24}
              alt={props.iconAlt || "icon"}
              className="ml-2"
            />
          )}
          <FormControl>
            <Input
              {...field}
              className={`input-class ${
                props.error && "border border-red-500"
              }`}
              type={
                props.name === "password" || props.name === "confirmPassword"
                  ? "password"
                  : "text"
              }
              placeholder={props.placeholder}
            />
          </FormControl>
        </div>
      );
    case FormFieldType.TEXTAREA:
      return (
        <FormControl>
          <Textarea
            placeholder={props.placeholder}
            {...field}
            className="input-class"
            disabled={props.disabled}
            rows={4}
          />
        </FormControl>
      );
    case FormFieldType.RADIO:
      return (
        <FormControl>
          <RadioGroup
            defaultValue="იყიდება"
            className="flex items-center gap-8">
            {props.radioGroupValues?.map((item) => {
              return (
                <div className="flex items-center space-x-2" key={item.id}>
                  <RadioGroupItem value={item.name} id={item.name} />
                  <label
                    htmlFor={item.name}
                    className="text-base text-semibold">
                    {item.name}
                  </label>
                </div>
              );
            })}
          </RadioGroup>
        </FormControl>
      );
    case FormFieldType.SELECT:
      return (
        <FormControl>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="input-class">
                <SelectValue placeholder={props.placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="shad-select-content">
              {props.children}
            </SelectContent>
          </Select>
        </FormControl>
      );
    case FormFieldType.SKELETON:
      return props.renderSkeleton ? props.renderSkeleton(field) : null;
    default:
      return null;
  }
};

const CustomFormField = (props: CustomProps) => {
  const { control, name, label } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          {props.fieldType !== FormFieldType.RADIO && label && (
            <FormLabel className="font-normal text-black text-base">
              {label}
            </FormLabel>
          )}
          <RenderInput field={field} props={props} />

          <FormMessage className="form-message mt-2" />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
