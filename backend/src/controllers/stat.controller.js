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
    //get all artists from songs model by aggregate
    const artistsCount = await songssModel.aggregate([
      {
        $unionWith: {
          coll: "albums",
          pipeline: [],
        },
      },
      { $group: { _id: "$artist", count: { $sum: 1 } } },
    ]);
    res.status(200).json({
      data: {
        albumsCount,
        songsCount,
        usersCount,
        artistsCount: artistsCount[0].count || 0,
      },
      success: true,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false, error });
  }
};