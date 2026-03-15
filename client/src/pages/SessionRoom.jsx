import { useEffect, useRef } from "react";
import socket from "../services/socket";

const ICE_SERVERS = {
    iceServers: [
        { urls: "stun:stun.l.google.com:19302" },
        { urls: "stun:stun1.l.google.com:19302" }
    ]
};

const SessionRoom = ({ sessionId }) => {

    const localVideo = useRef(null);
    const remoteVideo = useRef(null);

    const peerConnection = useRef(null);
    const localStream = useRef(null);

    useEffect(() => {

        let ignore = false;

        const init = async () => {

            // get camera + mic
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true
            });

            // if cleanup ran while getUserMedia was pending, stop tracks and bail
            if (ignore) {
                stream.getTracks().forEach(track => track.stop());
                return;
            }

            localStream.current = stream;
            localVideo.current.srcObject = stream;

            // create peer connection with STUN servers
            const pc = new RTCPeerConnection(ICE_SERVERS);
            peerConnection.current = pc;

            // send tracks
            stream.getTracks().forEach(track => {
                pc.addTrack(track, stream);
            });

            // receive remote stream
            pc.ontrack = (event) => {
                if (remoteVideo.current) {
                    remoteVideo.current.srcObject = event.streams[0];
                }
            };

            // send ICE candidates
            pc.onicecandidate = (event) => {
                if (event.candidate) {
                    socket.emit("ice-candidate", {
                        targetSocketId: window.targetSocketId,
                        candidate: event.candidate
                    });
                }
            };

            // join socket room
            socket.emit("join-session", {
                sessionId,
                userId: "test-user"
            });

        };

        init();

        // when another user joins — create and send an offer
        const onUserJoined = async ({ socketId }) => {
            if (!peerConnection.current) return;

            window.targetSocketId = socketId;

            const offer = await peerConnection.current.createOffer();
            await peerConnection.current.setLocalDescription(offer);

            socket.emit("offer", {
                targetSocketId: socketId,
                offer
            });
        };

        // receive offer — create and send an answer
        const onOffer = async ({ offer, sender }) => {
            if (!peerConnection.current) return;

            window.targetSocketId = sender;

            await peerConnection.current.setRemoteDescription(offer);

            const answer = await peerConnection.current.createAnswer();
            await peerConnection.current.setLocalDescription(answer);

            socket.emit("answer", {
                targetSocketId: sender,
                answer
            });
        };

        // receive answer
        const onAnswer = async ({ answer }) => {
            if (!peerConnection.current) return;

            await peerConnection.current.setRemoteDescription(answer);
        };

        // receive ICE candidate
        const onIceCandidate = async ({ candidate }) => {
            if (!peerConnection.current) return;

            try {
                await peerConnection.current.addIceCandidate(candidate);
            } catch (err) {
                console.error("ICE candidate error:", err);
            }
        };

        socket.on("user-joined", onUserJoined);
        socket.on("offer", onOffer);
        socket.on("answer", onAnswer);
        socket.on("ice-candidate", onIceCandidate);

        // ── cleanup on unmount / re-render ──
        return () => {
            ignore = true;

            socket.off("user-joined", onUserJoined);
            socket.off("offer", onOffer);
            socket.off("answer", onAnswer);
            socket.off("ice-candidate", onIceCandidate);

            if (peerConnection.current) {
                peerConnection.current.close();
                peerConnection.current = null;
            }

            if (localStream.current) {
                localStream.current.getTracks().forEach(track => track.stop());
                localStream.current = null;
            }
        };

    }, [sessionId]);

    return (
        <div>

            <h2>Session: {sessionId}</h2>

            <div style={{ display: "flex", gap: "20px" }}>

                <video
                    ref={localVideo}
                    autoPlay
                    playsInline
                    muted
                    style={{ width: "300px" }}
                />

                <video
                    ref={remoteVideo}
                    autoPlay
                    playsInline
                    style={{ width: "300px" }}
                />

            </div>

        </div>
    );
};

export default SessionRoom;