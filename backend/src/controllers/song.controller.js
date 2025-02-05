import { songssModel } from "../models/song.model.js";

const getRandomSongs = async (size, projection) => {
  return await songssModel.aggregate([
    {
      $sample: { size },
    },
    {
      $project: projection,
    },
  ]);
};

export const getSongs = async (req, res) => {
  try {
    const songs = await songssModel.find({}).sort({ _id: -1 });
    res.status(200).json({ data: songs, success: true });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false, error });
  }
};

export const getFeaturedSongs = async (req, res) => {
  try {
    const projection = {
      _id: 1,
      title: 1,
      artist: 1,
      imageUrl: 1,
      audioUrl: 1,
      duration : 1
    };
    const songs = await getRandomSongs(6, projection);
    res.status(200).json({ data: songs, success: true });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false, error });
  }
};

export const getMadeForYouSongs = async (req, res) => {
  try {
    const projection = {
      _id: 1,
      title: 1,
      artist: 1,
      imageUrl: 1,
      audioUrl: 1,
    };
    const songs = await getRandomSongs(4, projection);
    res.status(200).json({ data: songs, success: true });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false, error });
  }
};

export const getTrendingSongs = async (req, res) => {
  try {
    const projection = {
      _id: 1,
      title: 1,
      artist: 1,
      imageUrl: 1,
      audioUrl: 1,
    };
    const songs = await getRandomSongs(4, projection);
    res.status(200).json({ data: songs, success: true });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false, error });
  }
};