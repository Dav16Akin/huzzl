"use client";

import { CreateFormValidation, HustleCategories } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import CustomFormField from "../CustomFormField";
import { Form, FormControl } from "../ui/form";
import SubmitButton from "../SubmitButton";
import { FormFieldType } from "./InformationForm";
import { SelectItem } from "../ui/select";
import CreateHustleImageUpload from "../CreateHustleImageUpload";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { createHustle } from "@/lib/actions/hustle.action";

const CreateHustleForm = ({ userId }: { userId: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  const form = useForm<z.infer<typeof CreateFormValidation>>({
    resolver: zodResolver(CreateFormValidation),
    defaultValues: {
      title: "",
      description: "",
      category: "Food",
      tags: [],
      images: [],
      price: { min: 0, max: 0 },
    },
  });

  async function onSubmit(values: z.infer<typeof CreateFormValidation>) {
    const { title, description, category, images, price, tags } = values;

    console.log(values);

    setIsLoading(true);
    try {
      await createHustle({
        owner: userId,
        title,
        description,
        category,
        images: images ?? "",
        price: { min: price.min, max: price.max }, // Pass both min and max as an object
        tags,
      });

      router.push(`/dashboard/${userId}`);
      form.reset();
    } catch (error: any) {
      console.error("Error in creating profile: ", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    form.setValue("tags", tags);
  }, [tags]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 w-full max-w-md mx-auto"
      >
        <section className="mb-8 space-y-2 text-center">
          <h1 className="text-2xl font-extrabold text-gray-900">
            Create New Hustle
          </h1>
        </section>

        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="title"
          label="Title"
          placeholder="Title of your hustle"
        />

        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.TEXTAREA}
          name="description"
          label="Description"
          placeholder="Describe your hustle..."
        />

        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.SKELETON}
          name="images"
          label="Images"
          renderSkeleton={(field) => (
            <FormControl>
              <CreateHustleImageUpload
                onUpload={(url) => form.setValue("images", url)}
              />
            </FormControl>
          )}
        />

        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.SKELETON}
          name="tags"
          label="Tags"
          renderSkeleton={(field) => (
            <FormControl>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    id="tags"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && tagInput.trim()) {
                        e.preventDefault();
                        if (!tags.includes(tagInput.trim())) {
                          setTags((prev) => [...prev, tagInput.trim()]);
                        }
                        setTagInput("");
                      }
                    }}
                    placeholder="Type a tag and press Enter"
                    className="flex-1 border rounded px-3 py-2 text-sm"
                  />
                  <Button
                    type="button"
                    onClick={() => {
                      if (tagInput.trim() && !tags.includes(tagInput.trim())) {
                        setTags((prev) => [...prev, tagInput.trim()]);
                        setTagInput("");
                      }
                    }}
                    className="px-3 py-2 bg-black text-white rounded text-sm"
                  >
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {tags.map((tag, idx) => (
                    <Badge
                      key={idx}
                      className="bg-orange px-3 py-1 text-sm rounded-full  flex items-center gap-2"
                    >
                      {tag}
                      <Button
                        className=""
                        type="button"
                        onClick={() =>
                          setTags((prev) => prev.filter((_, i) => i !== idx))
                        }
                      >
                        x
                      </Button>
                    </Badge>
                  ))}
                </div>
              </div>
            </FormControl>
          )}
        />

        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.SELECT}
          name="category"
          label="Category"
          placeholder="Select a category"
        >
          {HustleCategories.map((data, i) => (
            <SelectItem key={i} value={data}>
              <div className="cursor-pointer flex items-center gap-2">
                <p>{data}</p>
              </div>
            </SelectItem>
          ))}
        </CustomFormField>

        <div className="flex gap-4">
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.SKELETON}
            name="price.min"
            label="Minimum Price"
            renderSkeleton={(field) => (
              <FormControl>
                <Input
                  type="number"
                  min={0}
                  placeholder="e.g. 1000"
                  {...field}
                />
              </FormControl>
            )}
          />
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.SKELETON}
            name="price.max"
            label="Maximum Price"
            renderSkeleton={(field) => (
              <FormControl>
                <Input
                  type="number"
                  min={0}
                  placeholder="e.g. 5000"
                  {...field}
                />
              </FormControl>
            )}
          />
        </div>

        <SubmitButton isLoading={isLoading}>Continue</SubmitButton>
      </form>
    </Form>
  );
};

export default CreateHustleForm;
