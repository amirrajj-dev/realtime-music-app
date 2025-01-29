import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    artist: { type: String, required: true },
    releaseYear: { type: Number, required: true },
    imageURL: { type: String, required: true },
    songs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "song",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const albumsModel =
  mongoose.models.album || mongoose.model("album", schema);
