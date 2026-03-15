const initializeSocket = (io) => {

    io.on("connection", (socket) => {

        console.log("User connected:", socket.id);

        // join session room
        socket.on("join-session", ({ sessionId, userId }) => {

            const room = `session:${sessionId}`;

            socket.join(room);

            // store room info for disconnect cleanup
            socket.data.room = room;
            socket.data.userId = userId;

            console.log(`${userId} joined ${room}`);

            socket.to(room).emit("user-joined", {
                userId,
                socketId: socket.id
            });

        });

        // WebRTC offer
        socket.on("offer", ({ targetSocketId, offer }) => {

            io.to(targetSocketId).emit("offer", {
                offer,
                sender: socket.id
            });

        });

        // WebRTC answer
        socket.on("answer", ({ targetSocketId, answer }) => {

            io.to(targetSocketId).emit("answer", {
                answer,
                sender: socket.id
            });

        });

        // ICE candidates
        socket.on("ice-candidate", ({ targetSocketId, candidate }) => {

            io.to(targetSocketId).emit("ice-candidate", {
                candidate,
                sender: socket.id
            });

        });

        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);

            // notify remaining participants
            if (socket.data.room) {
                socket.to(socket.data.room).emit("user-left", {
                    userId: socket.data.userId,
                    socketId: socket.id
                });
            }
        });

    });

};

export default initializeSocket;