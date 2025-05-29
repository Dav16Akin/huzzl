"use client";

import { CategoryFormValidation } from "@/lib/validation";
import { Form, FormControl, FormMessage } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from "react";
import SubmitButton from "../SubmitButton";
import CustomFormField from "../CustomFormField";
import { FormFieldType } from "./InformationForm";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { CategoryOptions } from "@/constants";
import { Label } from "../ui/label";
import { useRouter } from "next/navigation";
import { fetchUser, updateUserCategory } from "@/lib/actions/user.actions";

interface Props {
  userId: string;
}

const CategoryForm = ({ userId }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserClient = async () => {
      const data = await fetchUser(userId);
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data)); // ✅ stringified
    };

    fetchUserClient();
  }, [userId]);

  const form = useForm<z.infer<typeof CategoryFormValidation>>({
    resolver: zodResolver(CategoryFormValidation),
    defaultValues: {
      role: "hustler",
    },
  });

  const selectedRole = form.watch("role");

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof CategoryFormValidation>) {
    const { role } = values;
    setIsLoading(true);

    try {
      await updateUserCategory({ userId, role });

      if (role === "supporter") {
        router.push("/categories");
        return;
      }

      router.push(`/onboarding/${userId}/profile`);
    } catch (error: any) {
      console.error("Error in choosing category: ", error);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 flex-1 w-full max-w-md mx-auto"
      >
        <section className="mb-8 space-y-2 text-center">
          <h1 className="text-2xl font-extrabold text-gray-900">
            What Brings You to MyHustle? 🚀
          </h1>
          <p className="text-sm text-gray-600">
            Choose how you'll use the platform
          </p>
        </section>

        <div className="flex flex-col">
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.SKELETON}
            name="role"
            label="Role"
            renderSkeleton={(field) => (
              <FormControl>
                <RadioGroup
                  className="flex flex-col mb-4 xl:justify-between"
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  {CategoryOptions.map((option) => (
                    <div
                      key={option.role}
                      className={`flex border rounded-md p-4 items-center gap-2 cursor-pointer transition-colors ${
                        selectedRole === option.role
                          ? "bg-orange/10"
                          : "hover:bg-gray-50"
                      }`}
                      onClick={() =>
                        form.setValue(
                          "role",
                          option.role as "hustler" | "supporter"
                        )
                      }
                    >
                      <RadioGroupItem
                        value={option.role}
                        id={option.role}
                        className="text-current"
                      />
                      <Label htmlFor={option.role} className="cursor-pointer ">
                        {option.role} <span>( {option.text} )</span>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
            )}
          />
        </div>

        <FormMessage className="text-xs text-red-500">
          {form.formState.errors.role?.message}
        </FormMessage>

        <SubmitButton className="w-full mt-12" isLoading={isLoading}>
          Continue
        </SubmitButton>
      </form>
    </Form>
  );
};

export default CategoryForm;
