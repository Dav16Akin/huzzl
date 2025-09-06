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
import { signIn, signOut } from "next-auth/react";

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
      const existingUser = await userExists(email);

      if (existingUser) {
        form.setError("email", {
          type: "manual",
          message: "An account with this email already exists.",
        });
        return;
      }

      await signOut({ redirect: false });

      await new Promise((resolve) => setTimeout(resolve, 500));

      const userId = await createUser({ password, email, fullname, phone });

      if (!userId) {
        form.setError("root", {
          type: "manual",
          message: "Failed to create user account. Please try again.",
        });
        return;
      }

      const signInResult = await signIn("credentials", {
        email: email,
        password: password,
        redirect: false,
      });

      if (signInResult?.error) {
        console.error("Sign in error:", signInResult.error);
        form.setError("root", {
          type: "manual",
          message:
            "Account created but sign-in failed. Please try signing in manually.",
        });
        // Still redirect to sign-in page so they can try to login
        router.push("/sign-in");
        return;
      }

      if (signInResult?.ok) {
        // Step 5: Redirect to onboarding with the new user ID
        router.push(`/onboarding/${userId}/getting-started`);
        form.reset();
      } else {
        form.setError("root", {
          type: "manual",
          message: "Something went wrong. Please try signing in.",
        });
        router.push("/sign-in");
      }
    } catch (error: any) {
      console.error("Error creating user: ", error);
      form.setError("root", {
        type: "manual",
        message:
          "An error occurred while creating your account. Please try again.",
      });
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
