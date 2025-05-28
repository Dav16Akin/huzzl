import Image from "next/image";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { FormFieldType } from "./forms/InformationForm";
import { Control } from "react-hook-form";
import { Select, SelectContent, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import PhoneInput from "react-phone-number-input";
import 'react-phone-number-input/style.css'

interface CustomProps {
  control: Control<any>;
  fieldType: FormFieldType;
  name: string;
  label?: string;
  placeholder?: string;
  iconSrc?: string;
  iconAlt?: string;
  disabled?: boolean;
  children?: React.ReactNode;
  renderSkeleton: (field: any) => React.ReactNode;
}

const RenderField = ({ field, props }: { field: any; props: CustomProps }) => {
  const {
    fieldType,
    iconAlt,
    iconSrc,
    placeholder,
    renderSkeleton,
  } = props;

  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="flex rounded-md border">
          {iconSrc && (
            <Image
              src={iconSrc}
              alt={iconAlt || "icon"}
              width={20}
              height={20}
              className="mx-2"
            />
          )}

          <FormControl className="h-full">
            <Input
              placeholder={placeholder}
              {...field}
              className="h-11 border-0 focus-visible:ring-0"
            />
          </FormControl>
        </div>
      );
    case FormFieldType.PHONE_INPUT:
      return (
        <FormControl className="flex">
          <PhoneInput
            defaultCountry="NG"
            placeholder={placeholder}
            international
            withCountryCallingCode
            value={field.value}
            onChange={field.onChange}
            className="h-11 rounded-md px-3 text-sm border"
          />
        </FormControl>
      );

    case FormFieldType.SKELETON:
      return renderSkeleton ? renderSkeleton(field) : null;
    case FormFieldType.SELECT:
      return (
        <FormControl className="w-full min-w-full">
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="shad-select-trigger w-full">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="shad-select-content w-full min-w-full">
              {props.children}
            </SelectContent>
          </Select>
        </FormControl>
      );
    case FormFieldType.TEXTAREA:
      return (
        <FormControl>
          <Textarea
            placeholder={placeholder}
            className="shad-textArea"
            {...field}
            disabled={props.disabled}
          />
        </FormControl>
      );
    case FormFieldType.CHECKBOX:
      return (
        <FormControl>
          <div className="flex items-center space-x-2">
            <Checkbox id={props.name} checked={field.value} onCheckedChange={field.onChange}/>
            <label htmlFor={props.name} className="cursor-pointer">{props.label}</label>
          </div>
        </FormControl>
      );
    default:
      break;
  }
};


const CustomFormField = (props: CustomProps) => {
  const { control, fieldType, name, label } = props;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          {fieldType != FormFieldType.CHECKBOX && label && (
            <FormLabel>{label}</FormLabel>
          )}

          <RenderField field={field} props={props} />

          <FormMessage className="text-red-500" />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
