"use client";

import { InformationFormValidation } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import CustomFormField from "../CustomFormField";
import { Form } from "../ui/form";
import SubmitButton from "../SubmitButton";
import { createUser, userExists } from "@/lib/actions/user.actions";
import { signIn } from "next-auth/react";

export enum FormFieldType {
  INPUT = "input",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  CHECKBOX = "checkbox",
  SELECT = "select",
  SKELETON = "skeleton",
}

const InformationForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof InformationFormValidation>>({
    resolver: zodResolver(InformationFormValidation),
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
      phone: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof InformationFormValidation>) {
    const { email, password, fullname, phone } = values;
    setIsLoading(true);

    try {
      const user = await userExists(email);

      if (user) {
        form.setError("email", {
          type: "manual",
          message: "An account with this email already exists.",
        });
        return;
      }

      await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });

      const userId = await createUser({ password, email, fullname, phone });

      router.push(`/onboarding/${userId}/getting-started`);

      form.reset();
    } catch (error: any) {
      console.error("Error creating user: ", error);
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
            Let’s Set Up Your Hustle 🚀
          </h1>
          <p className="text-sm text-gray-600">
            Tell us a bit about yourself to get started.
          </p>
        </section>

        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="fullname"
          label="Full name"
          placeholder="John doe"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />

        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="password"
          label="Password"
          placeholder="Enter a secure password"
          iconSrc="/assets/icons/lock.svg"
          iconAlt="password"
        />

        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="email"
          label="Email address"
          placeholder="name@mail.com"
          iconSrc="/assets/icons/email.svg"
          iconAlt="email"
        />

        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.PHONE_INPUT}
          name="phone"
          label="Phone number "
          placeholder="(555) 123-4567"
        />

        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  );
};

export default InformationForm;
