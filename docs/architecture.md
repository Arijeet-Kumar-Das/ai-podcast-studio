High-Level Architecture

The platform follows a client-server architecture with peer-to-peer media streaming.

The React frontend communicates with the backend API for authentication and session management. The backend uses MongoDB to store users and podcast session data.

For real-time communication, the backend runs a Socket.io signaling server, which helps participants exchange WebRTC connection data.

Once the WebRTC connection is established, video and audio streams flow directly between participants, reducing server load and latency.