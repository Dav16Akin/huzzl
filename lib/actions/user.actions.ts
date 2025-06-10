"use server";

import User from "../models/user.model";
import { connectToDB } from "../mongoose";
import bcrypt from "bcrypt";

export async function userExists(email: string) {
  try {
    await connectToDB();

    const user = await User.findOne({email}).select("_id")

    return JSON.parse(JSON.stringify(user))
  } catch (error: any) {
    throw new Error("Failed to check if user exists.", error);
  }
}

interface CreateUserProps {
  password: string;
  email: string;
  fullname: string;
  phone: string;
}

export async function createUser({
  password,
  email,
  fullname,
  phone,
}: CreateUserProps) {
  try {
    await connectToDB();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("Email already in use");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      email,
      password: hashedPassword,
      fullname,
      phone,
    });

    return newUser._id.toString();
  } catch (error: any) {
    throw new Error(`Failed to create user : ${error.message}`);
  }
}

export async function fetchUser(userId: string) {
  try {
    await connectToDB();

    const user = await User.findOne({ _id: userId });

    return JSON.parse(JSON.stringify(user));
  } catch (error: any) {
    throw new Error(`Failed to fetch user: ${error.message}`);
  }
}

export async function fetchUserByEmail(email: string) {
  try {
    await connectToDB();

    return await User.findOne({ email: email });
  } catch (error: any) {
    throw new Error(`Failed to fetch user: ${error.message}`);
  }
}

export async function updateUserCategory({
  userId,
  role,
}: {
  userId: string;
  role: string;
}) {
  try {
    await connectToDB();

    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { roles: role },
      { new: true }
    );

    if (!updatedUser) {
      throw new Error("User not found.");
    }

    return updatedUser._id.toString();
  } catch (error: any) {
    throw new Error(`Failed to update user category: ${error.message}`);
  }
}

interface UpdateUserProps {
  userId: string;
  businessname: string;
  department: string;
  year: string;
  instagram: string;
  whatsapp: string;
  profileImage: string;
}

export async function updateUser({
  userId,
  businessname,
  department,
  year,
  instagram,
  whatsapp,
  profileImage,
}: UpdateUserProps) {
  try {
    await connectToDB();

    await User.findOneAndUpdate(
      { _id: userId },
      {
        businessname: businessname.toLowerCase(),
        department,
        year,
        instagram,
        whatsapp,
        profileImage,
        onboarded: true,
      },
      { new: true }
    );
  } catch (error: any) {
    throw new Error(`Failed to update user: ${error.message}`);
  }
}

export async function updateUserProfilePicture({
  userId,
  imageUrl,
}: {
  userId: string;
  imageUrl: string;
}) {
  try {
    await connectToDB();
    await User.findByIdAndUpdate(userId, { profileImage: imageUrl });
  } catch (error) {
    console.error("Failed to update profile picture:", error);
  }
}
