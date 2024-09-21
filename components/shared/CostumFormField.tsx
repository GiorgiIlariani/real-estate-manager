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
import { Label } from "../ui/label";

export enum FormFieldType {
  INPUT = "input",
  TEXTAREA = "textarea",
  RADIO = "radio",
  SELECT = "select",
  SKELETON = "skeleton",
  FILE = "file",
}

const RenderInput = ({ field, props }: { field: any; props: CustomProps }) => {
  const fileSelectorHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageData = e.target.files?.[0];

    if (imageData) {
      props.setValue("image", imageData); // Assuming this is for file input
    } else {
      props.setValue("image", null); // Set to null if no file is selected
    }
  };

  const handleImageRemove = () => {
    props.setValue("image", null); // Reset the image value to null
  };

  switch (props.fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="flex flex-col gap-2">
          <FormControl>
            <Input
              {...field}
              className={`input-class ${
                props.error ? "border-[#F93B1D]" : "border-[#808A93]"
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
            className={`input-class ${
              props.error ? "border-[#F93B1D]" : "border-[#808A93]"
            }`}
            disabled={props.disabled}
            rows={5}
          />
        </FormControl>
      );
    case FormFieldType.RADIO:
      return (
        <FormControl>
          <RadioGroup
            defaultValue="იყიდება"
            className="flex items-center gap-8"
            onValueChange={field.onChange}>
            {props.radioGroupValues?.map((item) => {
              return (
                <div className="flex items-center gap-1" key={item.id}>
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
          <Select
            onValueChange={(value) => {
              field.onChange(value); // Call the field's onChange
              if (props.onChange) {
                props.onChange(value); // Call the custom onChange if provided
              }
            }}
            defaultValue={field.value}>
            <FormControl>
              <SelectTrigger
                className={`input-class ${
                  props.error ? "border-[#F93B1D]" : "border-[#808A93]"
                }`}>
                <SelectValue placeholder={props.placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>{props.children}</SelectContent>
          </Select>
        </FormControl>
      );
    case FormFieldType.FILE:
      return (
        <FormControl>
          <Label
            className={`w-full h-[120px] flex items-center justify-center border-dashed border-2 rounded-lg ${
              props.error && !field.value
                ? "border-[#F93B1D]"
                : "border-gray-400"
            } ${field.value ? "cursor-not-allowed" : "cursor-pointer"}`}>
            <Input
              type="file"
              onChange={(e) => fileSelectorHandler(e)}
              className="hidden"
              disabled={!!field.value}
            />
            {field.value ? (
              <div className="relative">
                <Image
                  src={URL.createObjectURL(field.value)}
                  alt="uploaded image"
                  width={92}
                  height={84}
                  className="rounded-[4px] w-[92px] h-[84px] object-cover"
                />
                <div
                  className="absolute -bottom-1 -right-1 cursor-pointer"
                  onClick={handleImageRemove}>
                  <Image
                    src="/assets/icons/delete-icon.png"
                    alt="delete icon"
                    width={24}
                    height={24}
                  />
                </div>
              </div>
            ) : (
              <Image
                src="/assets/icons/plus-circle.png"
                alt="add photo"
                width={24}
                height={24}
              />
            )}
          </Label>
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
      render={({ field, fieldState }) => (
        <FormItem className="flex-1">
          {props.fieldType !== FormFieldType.RADIO && label && (
            <FormLabel className="font-normal text-black text-base">
              {label}
            </FormLabel>
          )}
          <RenderInput field={field} props={props} />

          {/* Only render confirmation image if the field type is not FILE or SELECT */}
          {props.fieldType !== FormFieldType.FILE &&
            props.fieldType !== FormFieldType.SELECT &&
            props.fieldType !== FormFieldType.RADIO && (
              <div className="flex gap-1 items-center">
                <Image
                  src={
                    props.error
                      ? "/assets/icons/confirm-error.png"
                      : field.value && fieldState.isTouched
                      ? "/assets/icons/confirm-success.png"
                      : "/assets/icons/confirm-default.png"
                  }
                  alt="confirm"
                  width={10}
                  height={8}
                />

                {props.bottomText ? (
                  <p
                    className={`text-sm font-normal ${
                      props.error
                        ? "text-[#F93B1D]"
                        : field.value && fieldState.isTouched
                        ? "text-[#45A849]"
                        : "text-black"
                    }`}>
                    {props.bottomText}
                  </p>
                ) : (
                  <FormMessage className="form-message" />
                )}
              </div>
            )}
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
