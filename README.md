# AI Podcast Studio

An **AI-powered distributed podcast recording platform** that enables creators to record **studio-quality remote podcasts** directly from their browsers.

Inspired by tools like Riverside.fm, this platform uses **WebRTC for real-time communication** while each participant records **high-quality media locally** using the **MediaRecorder API**. The recordings are uploaded in **chunked format to AWS S3**, ensuring no data loss and preserving studio-level quality.

After the session ends, the backend processes the media using **FFmpeg** to assemble the final podcast and generate **AI-powered transcripts and highlight clips**.

---

# Features

### Real-Time Podcast Sessions

* Multi-participant podcast rooms with **host and guest roles**
* **WebRTC based video communication**
* Real-time signaling using **Socket.io**

### Studio-Quality Recording

* Each participant records **locally in the browser**
* Uses **MediaRecorder API** for high-bitrate recording
* Prevents quality loss caused by WebRTC compression

### Chunked Recording Uploads

* Recordings are split into **small chunks**
* Chunks are uploaded continuously to **AWS S3**
* Protects recordings from network failures or crashes

### Automated Media Processing

* Backend worker downloads chunks from S3
* Uses **FFmpeg** to assemble final podcast videos
* Supports **multi-track podcast layouts**

### AI-Powered Features

* **Automatic transcript generation**
* **Podcast summary generation**
* **Highlight clip detection**

### Episode Management Dashboard

* View and manage podcast sessions
* Access final recordings and transcripts
* Download or share episodes

---

# System Architecture

The platform follows a **distributed recording architecture**.

Frontend handles:

* WebRTC communication
* Local HD recording
* Chunk uploads to S3

Backend handles:

* Session management
* WebRTC signaling
* Media processing
* AI pipelines

High-level architecture:

```
Browser (React)
      │
      │ WebRTC
      ▼
Socket Signaling Server (Node + Socket.io)
      │
      ▼
Backend API (Express)
      │
      ▼
MongoDB Database
      │
      ▼
AWS S3 (Chunk Storage)
      │
      ▼
Media Processing Worker (FFmpeg)
      │
      ▼
AI Processing (Transcript + Highlights)

See the architecture diagrams in the docs folder.

- System Architecture
- Distributed Recording Pipeline
```

---

# Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS
* WebRTC
* MediaRecorder API
* Socket.io Client

### Backend

* Node.js
* Express.js
* Socket.io
* JWT Authentication

### Database

* MongoDB

### Cloud Infrastructure

* AWS S3 for recording storage

### Media Processing

* FFmpeg

### Optional Enhancements

* Redis (session state)
* Job queues for media processing
* AI APIs for transcript generation

---

# Project Structure

```
podcast-platform
│
├── client                # React frontend
│
├── server                # Node backend
│   ├── src
│   │   ├── config
│   │   ├── controllers
│   │   ├── middleware
│   │   ├── models
│   │   ├── routes
│   │   ├── services
│   │   ├── sockets
│   │   ├── utils
│   │   └── workers
│
└── docs                  # Architecture diagrams
```

---

# How It Works

### 1. Create a Podcast Session

The host creates a podcast room and shares the invite link with participants.

### 2. Real-Time Communication

Participants join the session and establish **WebRTC peer connections** using Socket.io signaling.

### 3. Local High-Quality Recording

Each browser records its own audio/video stream using **MediaRecorder**.

### 4. Chunk Uploading

Recorded media is split into chunks and uploaded directly to **AWS S3**.

### 5. Media Processing

After the session ends:

* Backend downloads chunks
* FFmpeg merges them
* Final podcast video is generated

### 6. AI Processing

AI services generate:

* Transcripts
* Summaries
* Highlight clips

---

# Future Improvements

* Multi-track editing interface
* Real-time transcription
* Video layout customization
* Podcast publishing integrations
* Noise reduction and audio enhancement
* Live streaming support

---

# Why This Project

Remote podcast recording tools often compress streams heavily, leading to poor quality recordings.

This project demonstrates a **distributed recording architecture** where each participant records locally and uploads their media independently, ensuring **studio-quality output even over unstable networks**.

It also showcases engineering concepts such as:

* Real-time communication with WebRTC
* Distributed media recording
* Cloud storage pipelines
* Media processing with FFmpeg
* AI-powered post-production

---

# License

MIT License
