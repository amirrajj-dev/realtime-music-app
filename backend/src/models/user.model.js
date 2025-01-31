import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email : {
      type: String,
      required: true,
      unique: true,
    },
    password: {
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
