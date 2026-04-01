import http from "http";
import express from "express";
import { WebSocketServer } from "ws";
import * as Y from "yjs";

const app = express();
const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

// in-memory docs
const docs = new Map();

const wss = new WebSocketServer({ server });

wss.on("connection", (ws, req) => {
  const docName = "monaco";

  let doc = docs.get(docName);
  if (!doc) {
    doc = new Y.Doc();
    docs.set(docName, doc);
  }

  ws.on("message", (message) => {
    const update = new Uint8Array(message);
    Y.applyUpdate(doc, update);
  });

  doc.on("update", (update) => {
    ws.send(update);
  });
});

// health check
app.get("/health", (req, res) => {
  res.json({ message: "OK" });
});

server.listen(PORT, () => {
  console.log("🚀 Running on", PORT);
});