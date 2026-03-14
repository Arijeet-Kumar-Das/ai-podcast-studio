import Session from "../models/Session.js";

// CREATE SESSION
export const createSession = async (req, res) => {
    try {
        const { title } = req.body;

        const hostId = req.user.userId;

        const session = await Session.create({
            title,
            host: hostId,
            participants: [
                {
                    user: hostId,
                    role: "host"
                }
            ]
        });

        res.status(201).json({
            message: "Session created successfully",
            session
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to create session"
        });
    }
};

// GET SESSION BY ID
export const getSessionById = async (req, res) => {
    try {
        const sessionId = req.params.id;

        const session = await Session.findById(sessionId)
            .populate("host", "name email")
            .populate("participants.user", "name email");

        if (!session) {
            return res.status(404).json({
                message: "Session not found"
            });
        }

        res.json(session);

    } catch (error) {
        res.status(500).json({
            message: "Error fetching session"
        });
    }
};