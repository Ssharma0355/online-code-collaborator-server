import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { YSocketIO } from "y-socket.io/dist/server";

const app = express();
app.use(express.static("public"));

const PORT = process.env.PORT || 3000;

// ✅ CREATE HTTP SERVER (missing in your code)
const httpServer = createServer(app);

// ✅ Attach socket.io to http server
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// ✅ Yjs setup
const ySocketIO = new YSocketIO(io);
ySocketIO.initialize();

// ✅ Health route
app.get("/health", (req, res) => {
  res.status(200).json({
    message: "Health is Ok",
    success: true,
  });
});

// ✅ Start server
httpServer.listen(PORT, () => {
  console.log("🚀 Server Running at", PORT);
});