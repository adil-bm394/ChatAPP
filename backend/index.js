const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const colors = require("colors");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/dbConnection");

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(cors());

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
  },
});

app.get("/", (req, res) => {
  res.send("Server is running...");
});

io.on("connection", (socket) => {
  console.log("A User connected".bgCyan.white);

  socket.on("joinRoom", ({ username, room }) => {
    socket.join(room);
    console.log(`${username} joined ${room}`.bgYellow.black);
  });

  socket.on("sendMessage", ({ message, username, room }) => {
    const formattedMessage = `${username}: ${message}`;
    io.to(room).emit("receiveMessage", formattedMessage);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected".bgRed.white);
  });
});

app.use('/api/v1',require('./routes/authRoutes'));

const PORT = 4000;
server.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`.bgGreen.white)
);
