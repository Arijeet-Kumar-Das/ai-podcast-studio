import mongoose from "mongoose";

const participantSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    role: {
        type: String,
        enum: ["host", "guest"],
        default: "guest"
    },

    joinedAt: {
        type: Date,
        default: Date.now
    }
});

const sessionSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        host: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        participants: [participantSchema],

        status: {
            type: String,
            enum: ["waiting", "recording", "processing", "completed"],
            default: "waiting"
        },

        startTime: {
            type: Date
        },

        endTime: {
            type: Date
        }
    },
    {
        timestamps: true
    }
);

const Session = mongoose.model("Session", sessionSchema);

export default Session;