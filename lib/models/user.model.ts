import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    id: { type: String },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    fullname: { type: String, required: true },
    businessname: { type: String },
    department: { type: String },
    year: { type: String },
    instagram: { type: String },
    phone: { type: String, required: true },
    whatsapp: { type: String },
    profileImage: { type: String },
    roles: { type: String, enum: ["hustler", "supporter"], default: "hustler" },
    hustles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hustle",
      },
    ],
    onboarded: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
