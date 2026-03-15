import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";

import app from "./src/app.js";
import connectDB from "./src/config/db.js";
import initializeSocket from "./src/sockets/signaling.js";

dotenv.config();

connectDB();

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

initializeSocket(io);

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});