"use client";

import { SignInValidation } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import CustomFormField from "../CustomFormField";
import { Form } from "../ui/form";
import SubmitButton from "../SubmitButton";
import { FormFieldType } from "./InformationForm";
import { getSession, signIn } from "next-auth/react";

const SignInForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof SignInValidation>>({
    resolver: zodResolver(SignInValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SignInValidation>) {
    const { email, password } = values;
    setIsLoading(true);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (!res?.ok) {
        form.setError("email", {
          type: "manual",
          message: "Invalid credentials",
        });
        return;
      }

      const session = await getSession();


      if (session?.user?.role === "hustler") {
        router.push(`/dashboard/${session?.user?.id}`);
      } else {
        form.setError("email", {
          type: "manual",
          message: "Only Hustlers can access the dashboard.",
        });
      }

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
            Welcome Back 👋
          </h1>
          <p className="text-sm text-gray-600">
            Sign in to manage your hustle or support others in theirs.
          </p>
        </section>

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
          fieldType={FormFieldType.INPUT}
          name="password"
          label="Password"
          placeholder="Enter a secure password"
          iconSrc="/assets/icons/lock.svg"
          iconAlt="password"
        />

        <SubmitButton isLoading={isLoading}>Sign in</SubmitButton>
      </form>
    </Form>
  );
};

export default SignInForm;
