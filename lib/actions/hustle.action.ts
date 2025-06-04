"use server";

import Hustle from "../models/hustle.model";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";

type CreateHustleParams = {
  title: string;
  description: string;
  category:
    | "Design"
    | "Fashion"
    | "Food"
    | "Tech"
    | "Art"
    | "Craft"
    | "Tutoring"
    | "Photography"
    | "Other";
  price?: { min: number; max: number };
  images: string[];
  tags?: string[];
  owner: string;
};

export const createHustle = async ({
  title,
  description,
  category,
  price,
  images,
  tags,
  owner,
}: CreateHustleParams) => {
  try {
    await connectToDB();
    const newHustle = await Hustle.create({
      title: title,
      description: description,
      category: category,
      price: price,
      images: images,
      tags: tags || [],
      owner: owner,
    });

    await User.findByIdAndUpdate(owner, {
      $push: { hustles: newHustle },
    });

    return JSON.parse(JSON.stringify(newHustle.toObject()));
  } catch (error) {
    throw new Error(`Error in creating hustle : ${error}`);
  }
};

export async function fetchUserHustles(userId: string) {
  try {
    await connectToDB();

    const hustles = await Hustle.find({ owner: userId });

    return JSON.parse(JSON.stringify(hustles));
  } catch (error) {
    throw new Error(`Error in fetching user hustle : ${error}`);
  }
}

export async function getAllHustles() {
  try {
    await connectToDB();

    const allHustles = await Hustle.find({})
      .populate({
        path: "owner",
        model: User,
        select: "_id fullname year businessname",
      })
      .sort({ createdAt: -1 })
      .lean();


    return JSON.parse(JSON.stringify(allHustles));
  } catch (error) {
    throw new Error(`Error in fetching all Hustles : ${error}`);
  }
}
