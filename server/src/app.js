import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import sessionRoutes from "./routes/sessionRoutes.js";
const app = express();

app.use(cors());
app.use(express.json());

// Health check route
app.get("/api/health", (req, res) => {
    res.json({
        status: "ok",
        message: "Podcast platform backend running"
    });
});

app.use("/api/auth", authRoutes);
app.use("/api/sessions", sessionRoutes);


export default app;