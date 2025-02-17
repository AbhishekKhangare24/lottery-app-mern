import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
import connectDB from "./config/db.js";
import gameRoutes from "./routes/gameRoutes.js";

dotenv.config();
connectDB();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: [
      "https://lottery-app-mern.vercel.app/,",
      "http://localhost:5173",
      "http://localhost:5174",
    ],
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());

// Socket.io instance for controllers
global.io = io;

app.use("/", gameRoutes);

server.listen(5000, () => console.log("Server running on port 5000"));
