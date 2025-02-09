import { albumsModel } from "../models/album.model.js";
import { songssModel } from "../models/song.model.js";
import { usersModel } from "../models/user.model.js";

export const getAllStats = async (req, res) => {
  try {
    const [albumsCount, songsCount, usersCount] = await Promise.all([
      albumsModel.countDocuments({}),
      songssModel.countDocuments({}),
      usersModel.countDocuments({}),
    ]);

    const artistsCountAggregation = await songssModel.aggregate([
      {
        $group: {
          _id: "$artist",
        },
      },
      {
        $count: "uniqueArtists"
      }
    ]);

    const artistsCount = artistsCountAggregation[0] ? artistsCountAggregation[0].uniqueArtists : 0;

    res.status(200).json({
      data: {
        albumsCount,
        songsCount,
        usersCount,
        artistsCount,
      },
      success: true,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", success: false, error });
  }
};