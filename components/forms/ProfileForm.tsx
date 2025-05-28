"use client";

import { ProfileFormValidation } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import CustomFormField from "../CustomFormField";
import { Form } from "../ui/form";
import SubmitButton from "../SubmitButton";
import { FormFieldType } from "./InformationForm";
import { YearData } from "@/constants";
import { SelectItem } from "../ui/select";


const ProfileForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof ProfileFormValidation>>({
    resolver: zodResolver(ProfileFormValidation),
    defaultValues: {
      fullname: "",
      department: "",
      year: "",
      instagram: "",
      whatsapp: "",
    },
  });

  function onSubmit(values: z.infer<typeof ProfileFormValidation>) {
    setIsLoading(true);
    console.log(values);
    form.reset();
    router.push("/dashboard");
    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 w-full max-w-md mx-auto"
      >
        <section className="mb-8 space-y-2 text-center">
          <h1 className="text-2xl font-extrabold text-gray-900">
            Complete Your Profile ✨
          </h1>
          <p className="text-sm text-gray-600">
            Help people connect with your hustle better.
          </p>
        </section>

        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="fullname"
          label="Full name"
          placeholder="John Doe"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />

        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="department"
          label="Department / Faculty"
          placeholder="Computer Science"
        />

        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.SELECT}
          name="year"
          label="Year"
          placeholder="Select your level"
        >
             {YearData.map((year, i) => (
            <SelectItem key={i} value={year.value}>
              <div className="cursor-pointer flex items-center gap-2">
                <p>{year.value}</p>
              </div>
            </SelectItem>
          ))}
        </CustomFormField>

        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="instagram"
          label="Instagram handle"
          placeholder="@yourhandle"
        />

        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.PHONE_INPUT}
          name="whatsapp"
          label="WhatsApp"
          placeholder="(555) 123-4567"
          iconSrc="/assets/icons/phone.svg"
          iconAlt="phone"
        />

        <SubmitButton isLoading={isLoading}>Continue</SubmitButton>
      </form>
    </Form>
  );
};

export default ProfileForm;
