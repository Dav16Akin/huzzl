"use client";

import { ProfileFormValidation } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import CustomFormField from "../CustomFormField";
import { Form, FormControl } from "../ui/form";
import SubmitButton from "../SubmitButton";
import { FormFieldType } from "./InformationForm";
import { YearData } from "@/constants";
import { SelectItem } from "../ui/select";
import ProfileImageUpload from "../ProfileImageUpload";
import { updateUser } from "@/lib/actions/user.actions";

const ProfileForm = ({ userId }: { userId: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof ProfileFormValidation>>({
    resolver: zodResolver(ProfileFormValidation),
    defaultValues: {
      businessname: "",
      department: "",
      year: "",
      instagram: "",
      profileImage: "",
      whatsapp: "",
    },
  });

  async function onSubmit(values: z.infer<typeof ProfileFormValidation>) {
    const {
      businessname,
      department,
      year,
      instagram,
      profileImage,
      whatsapp,
    } = values;
    setIsLoading(true);
    try {
      await updateUser({
        userId,
        businessname: businessname,
        department: department,
        year: year,
        instagram: instagram ?? "",
        profileImage: profileImage,
        whatsapp: whatsapp,
      });
      
      router.push(`/dashboard/${userId}`);
      form.reset();
    } catch (error: any) {
      console.error("Error in creating profile: ", error);
    } finally {
      setIsLoading(false);
    }
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
          name="businessname"
          label="Business name"
          placeholder="Enter a username or buisness name"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />

        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.SKELETON}
          name="profileImage"
          label="Profile Image"
          renderSkeleton={(field) => (
            <FormControl>
              <ProfileImageUpload
                onUpload={(url) => form.setValue("profileImage", url)}
              />
            </FormControl>
          )}
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
          label="Whatsapp"
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
