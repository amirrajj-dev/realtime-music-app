import { Server } from "socket.io";
import { messagesModel } from "../models/message.model.js";

export const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL || "http://localhost:4000",
      credentials: true
    },
    transports: ["websocket", "polling"]
  });  

  const userSockets = new Map();
  const userActivities = new Map(); 

  io.on("connection", (socket) => {
    socket.on("user_connected", (userId) => {
      userSockets.set(userId, socket.id);
      userActivities.set(userId, "Idle"); 


      io.emit("user_connected", userId);
      socket.emit("online_users", Array.from(userSockets.keys()));

      io.emit(
        "activities",
        Array.from(userActivities.entries()).map(([userId, activity]) => ({
          userId,
          activity,
        }))
      );
    });

    socket.on("update_activities", ({ userId, activity }) => {
      if (userActivities.has(userId)) {
        userActivities.set(userId, activity);
        io.emit("activities_updated", { userId, activity });
      }
   });   

    socket.on("send_message", async (data) => {
      try {
        const { senderId, receiverId, content } = data;
        if (!senderId || !receiverId || !content) {
          return socket.emit("error", "Invalid data");
        }

        const message = await messagesModel.create({
          senderId,
          receiverId,
          message: content,
        });

        const receiverSocketId = userSockets.get(receiverId);
        if (receiverSocketId) {
          io.to(receiverSocketId).emit("new_message", message);
        }

        socket.emit("message_sent", message);
      } catch (error) {
        console.log(error);
      }
    });

    socket.on("disconnect", () => {
      let disconnectedUser = null;
      for (const [userId, socketId] of userSockets.entries()) {
        if (socketId === socket.id) {
          disconnectedUser = userId;
          userSockets.delete(userId);
          userActivities.delete(userId);
          break;
        }
      }

      if (disconnectedUser) {
        io.emit("user_disconnected", disconnectedUser);
      }
    });
  });
};