import mongoose from "mongoose";
import { songssModel } from "../models/song.model.js";
import { albumsModel } from "../models/album.model.js";
import { config } from "dotenv";

config();

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        // Clear existing data
        await albumsModel.deleteMany({});
        await songssModel.deleteMany({});

        // First, create all songs
        const createdSongs = await songssModel.insertMany([
            {
                title: "Bad Guy",
                artist: "Billie Eilish",
                imageUrl: "/cover-images/7.jpg",
                audioUrl: "/songs/7.mp3",
                plays: Math.floor(Math.random() * 5000),
                duration: 194, // 3:14
            },
            {
                title: "Blinding Lights",
                artist: "The Weeknd",
                imageUrl: "/cover-images/5.jpg",
                audioUrl: "/songs/5.mp3",
                plays: Math.floor(Math.random() * 5000),
                duration: 200, // 3:20
            },
            {
                title: "thank u, next",
                artist: "Ariana Grande",
                imageUrl: "/cover-images/15.jpg",
                audioUrl: "/songs/15.mp3",
                plays: Math.floor(Math.random() * 5000),
                duration: 207, // 3:27
            },
            {
                title: "drivers license",
                artist: "Olivia Rodrigo",
                imageUrl: "/cover-images/13.jpg",
                audioUrl: "/songs/13.mp3",
                plays: Math.floor(Math.random() * 5000),
                duration: 242, // 4:02
            },
            {
                title: "Levitating",
                artist: "Dua Lipa",
                imageUrl: "/cover-images/4.jpg",
                audioUrl: "/songs/4.mp3",
                plays: Math.floor(Math.random() * 5000),
                duration: 203, // 3:23
            },
            {
                title: "Save Your Tears",
                artist: "The Weeknd",
                imageUrl: "/cover-images/9.jpg",
                audioUrl: "/songs/9.mp3",
                plays: Math.floor(Math.random() * 5000),
                duration: 215, // 3:35
            },
            {
                title: "Ocean Eyes",
                artist: "Billie Eilish",
                imageUrl: "/cover-images/16.jpg",
                audioUrl: "/songs/16.mp3",
                plays: Math.floor(Math.random() * 5000),
                duration: 200, // 3:20
            },
            {
                title: "7 rings",
                artist: "Ariana Grande",
                imageUrl: "/cover-images/10.jpg",
                audioUrl: "/songs/10.mp3",
                plays: Math.floor(Math.random() * 5000),
                duration: 178, // 2:58
            },
            {
                title: "good 4 u",
                artist: "Olivia Rodrigo",
                imageUrl: "/cover-images/1.jpg",
                audioUrl: "/songs/1.mp3",
                plays: Math.floor(Math.random() * 5000),
                duration: 178, // 2:58
            },
            {
                title: "Don't Start Now",
                artist: "Dua Lipa",
                imageUrl: "/cover-images/2.jpg",
                audioUrl: "/songs/2.mp3",
                plays: Math.floor(Math.random() * 5000),
                duration: 183, // 3:03
            },
            {
                title: "Watermelon Sugar",
                artist: "Harry Styles",
                imageUrl: "/cover-images/14.jpg",
                audioUrl: "/songs/14.mp3",
                plays: Math.floor(Math.random() * 5000),
                duration: 174, // 2:54
            },
            {
                title: "Therefore I Am",
                artist: "Billie Eilish",
                imageUrl: "/cover-images/3.jpg",
                audioUrl: "/songs/3.mp3",
                plays: Math.floor(Math.random() * 5000),
                duration: 174, // 2:54
            },
            {
                title: "In Your Eyes",
                artist: "The Weeknd",
                imageUrl: "/cover-images/17.jpg",
                audioUrl: "/songs/17.mp3",
                plays: Math.floor(Math.random() * 5000),
                duration: 235, // 3:55
            },
            {
                title: "Break Up with Your Girlfriend, I'm Bored",
                artist: "Ariana Grande",
                imageUrl: "/cover-images/12.jpg",
                audioUrl: "/songs/12.mp3",
                plays: Math.floor(Math.random() * 5000),
                duration: 214, // 3:34
            },
        ]);

        // Create albums with references to song IDs
        const albums = [
            {
                title: "Hit Collection",
                artist: "Various Artists",
                imageUrl: "/albums/1.jpg",
                releaseYear: 2025,
                songs: createdSongs.slice(0, 4).map((song) => song._id),
            },
            {
                title: "Top Charts",
                artist: "Various Artists",
                imageUrl: "/albums/2.jpg",
                releaseYear: 2025,
                songs: createdSongs.slice(4, 8).map((song) => song._id),
            },
            {
                title: "Pop Anthems",
                artist: "Various Artists",
                imageUrl: "/albums/3.jpg",
                releaseYear: 2025,
                songs: createdSongs.slice(8, 11).map((song) => song._id),
            },
            {
                title: "Trending Tunes",
                artist: "Various Artists",
                imageUrl: "/albums/4.jpg",
                releaseYear: 2025,
                songs: createdSongs.slice(11, 14).map((song) => song._id),
            },
        ];

        // Insert all albums
        const createdAlbums = await albumsModel.insertMany(albums);

        // Update songs with their album references
        for (let i = 0; i < createdAlbums.length; i++) {
            const album = createdAlbums[i];
            const albumSongs = albums[i].songs;

            await songssModel.updateMany({ _id: { $in: albumSongs } }, { albumId: album._id });
        }

        console.log("Database seeded successfully!");
    } catch (error) {
        console.error("Error seeding database:", error);
    } finally {
        mongoose.connection.close();
    }
};
seedDatabase();