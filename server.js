import http from "http";
import express from "express";
import { WebSocketServer } from "ws";
import * as Y from "yjs";

const app = express();
const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

// simple in-memory doc store
const docs = new Map();

const wss = new WebSocketServer({ server });

wss.on("connection", (ws, req) => {
  const docName = "monaco"; // you can make this dynamic later

  let doc = docs.get(docName);
  if (!doc) {
    doc = new Y.Doc();
    docs.set(docName, doc);
  }

  ws.on("message", (message) => {
    try {
      const update = new Uint8Array(message);
      Y.applyUpdate(doc, update);
    } catch (err) {
      console.error(err);
    }
  });

  doc.on("update", (update) => {
    ws.send(update);
  });
});

app.get("/health", (req, res) => {
  res.json({ message: "OK" });
});

server.listen(PORT, () => {
  console.log("🚀 Running on", PORT);
});