import { songssModel } from "../models/song.model.js";
import { albumsModel } from "../models/album.model.js";
import cloudinary from '../utils/cloudinary.js'
const uploadToCloudinary = async (file) => {
    try {
        const result = await cloudinary.uploader.upload(file.tempFilePath , {
            resource_type : 'auto',

        });
        return result.secure_url;
    } catch (error) {
        console.log('error in cloudinary upload => ' , error);
        throw new Error(error)
    }
}

export const addSong = async (req, res) => {
  try {
    if (!req.files || !req.files.audioFile || !req.files.imageFile) {
      return res
        .status(400)
        .json({ message: "Missing required fields", success: false });
    }
    const { title, artist, albumId, duration } = req.body;
    if (!title || !artist || !duration) {
      return res
        .status(400)
        .json({ message: "Missing required fields", success: false });
    }
    const audioFile = req.files.audioFile;
    const imageFile = req.files.imageFile;
    const audioUrl = uploadToCloudinary(audioFile);
    const imageUrl = uploadToCloudinary(imageFile);
    const song = new songssModel({
      title,
      artist,
      albumId: albumId || null,
      duration,
      audioUrl,
      imageUrl,
    });
    await song.save();
    if (albumId) {
      const album = await albumsModel.findByIdAndUpdate(albumId, {
        $push: { songs: song._id },
      });
      if (!album) {
        return res
          .status(404)
          .json({ message: "Album not found", success: false });
      }
    }
    res.status(201).json({
      message: "Song created successfully",
      song,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error,
    });
  }
};
