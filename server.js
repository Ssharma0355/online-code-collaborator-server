import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { YSocketIO } from "y-socket.io/server";

const app = express();
app.use(express.static("public"));

const PORT = process.env.PORT || 3000;

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

const ySocketIO = new YSocketIO(io);
ySocketIO.initialize();

app.get("/health", (req, res) => {
  res.json({ message: "OK" });
});

httpServer.listen(PORT, () => {
  console.log("🚀 Running on", PORT);
});