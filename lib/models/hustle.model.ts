import mongoose from "mongoose";

const hustleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: [
        "Design",
        "Fashion",
        "Food",
        "Tech",
        "Art",
        "Craft",
        "Other",
        "Tutoring",
        "Photography",
      ],
    },
    price: [{ min: Number, max: Number }], // Optional, if it's a paid service/product
    images: [{ type: String }], // Store Cloudinary URLs or file paths
    tags: [{ type: String }], // Optional - for search and filtering

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Hustle = mongoose.models.Hustle || mongoose.model("Hustle", hustleSchema);

export default Hustle;
