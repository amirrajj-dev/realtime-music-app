import mongoose from "mongoose";
import { songssModel } from "../models/song.model.js";
import { config } from "dotenv";

config();

const songs = [
  {
    title: "Bad Guy",
    artist: "Billie Eilish",
    imageUrl: "/cover-images/1.jpg",
    audioUrl: "/songs/1.mp3",
    duration: 194, // 3:14
  },
  {
    title: "Uptown Funk",
    artist: "Mark Ronson ft. Bruno Mars",
    imageUrl: "/cover-images/2.jpg",
    audioUrl: "/songs/2.mp3",
    duration: 269, // 4:29
  },
  {
    title: "Ocean Eyes",
    artist: "Billie Eilish",
    imageUrl: "/cover-images/3.jpg",
    audioUrl: "/songs/3.mp3",
    duration: 199, // 3:19
  },
  {
    title: "Superstition",
    artist: "Stevie Wonder",
    imageUrl: "/cover-images/4.jpg",
    audioUrl: "/songs/4.mp3",
    duration: 289, // 4:49
  },
  {
    title: "Blinding Lights",
    artist: "The Weeknd",
    imageUrl: "/cover-images/5.jpg",
    audioUrl: "/songs/5.mp3",
    duration: 200, // 3:20
  },
  {
    title: "Therefore I Am",
    artist: "Billie Eilish",
    imageUrl: "/cover-images/6.jpg",
    audioUrl: "/songs/6.mp3",
    duration: 174, // 2:54
  },
  {
    title: "Get Lucky",
    artist: "Daft Punk ft. Pharrell Williams",
    imageUrl: "/cover-images/7.jpg",
    audioUrl: "/songs/7.mp3",
    duration: 369, // 6:09
  },
  {
    title: "Lovely",
    artist: "Billie Eilish & Khalid",
    imageUrl: "/cover-images/8.jpg",
    audioUrl: "/songs/8.mp3",
    duration: 201, // 3:21
  },
  {
    title: "September",
    artist: "Earth, Wind & Fire",
    imageUrl: "/cover-images/9.jpg",
    audioUrl: "/songs/9.mp3",
    duration: 215, // 3:35
  },
  {
    title: "When the Party's Over",
    artist: "Billie Eilish",
    imageUrl: "/cover-images/10.jpg",
    audioUrl: "/songs/10.mp3",
    duration: 196, // 3:16
  },
  {
    title: "Can't Feel My Face",
    artist: "The Weeknd",
    imageUrl: "/cover-images/11.jpg",
    audioUrl: "/songs/11.mp3",
    duration: 213, // 3:33
  },
  {
    title: "U Know What's Up",
    artist: "Donell Jones",
    imageUrl: "/cover-images/12.jpg",
    audioUrl: "/songs/12.mp3",
    duration: 269, // 4:29
  },
  {
    title: "Everything I Wanted",
    artist: "Billie Eilish",
    imageUrl: "/cover-images/13.jpg",
    audioUrl: "/songs/13.mp3",
    duration: 245, // 4:05
  },
  {
    title: "Levitating",
    artist: "Dua Lipa",
    imageUrl: "/cover-images/14.jpg",
    audioUrl: "/songs/14.mp3",
    duration: 203, // 3:23
  },
  {
    title: "Blame It on the Boogie",
    artist: "The Jacksons",
    imageUrl: "/cover-images/15.jpg",
    audioUrl: "/songs/15.mp3",
    duration: 203, // 3:23
  },
  {
    title: "Bury a Friend",
    artist: "Billie Eilish",
    imageUrl: "/cover-images/16.jpg",
    audioUrl: "/songs/16.mp3",
    duration: 193, // 3:13
  },
  {
    title: "Treasure",
    artist: "Bruno Mars",
    imageUrl: "/cover-images/17.jpg",
    audioUrl: "/songs/17.mp3",
    duration: 178, // 2:58
  },
  {
    title: "Virtual Insanity",
    artist: "Jamiroquai",
    imageUrl: "/cover-images/18.jpg",
    audioUrl: "/songs/18.mp3",
    duration: 221, // 3:41
  },
];

const seedSongs = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    // Clear existing songs
    await songssModel.deleteMany({});

    // Insert new songs
    await songssModel.insertMany(songs);

    console.log("Songs seeded successfully!");
  } catch (error) {
    console.error("Error seeding songs:", error);
  } finally {
    mongoose.connection.close();
  }
};

seedSongs();