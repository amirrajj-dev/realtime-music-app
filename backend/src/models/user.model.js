import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const usersModel =
  mongoose.models.user || mongoose.model("user", schema);
