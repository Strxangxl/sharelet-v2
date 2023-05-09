import express from "express";
const app = express();
import http from "http";
const server = http.createServer(app);
import { Server } from "socket.io";
const io = new Server(server);

app.use(express.static("site"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("text-change-from-client", (data) => {
    socket.broadcast.emit("text-change-server", data);
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
