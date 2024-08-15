const exp = require('constants');
const express = require('express');
const app = express();
const path = require("path");

const http = require('http');

const socketio = require("socket.io");
const server = http.createServer(app);
const io = socketio(server);

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

io.on("connection", function (socket) {
    socket.on("send-location", function (data) {
        io.sockets.emit("receive-location", { id: socket.id, ...data });
    });
    console.log("connected");
    socket.on("disconnect",function(){
        console.log("User disconnected with id: " + socket.id);
        io.sockets.emit("user-disconnected", socket.id);  // notify all users about the disconnected user  // io.emit() sends a message to all connected clients  // io.to(socket.id).emit() sends a message to a specific client  // io.to(socket.id).broadcast.emit() sends a message to all clients except the sender  // io.to(socket.id).emit() and io.to(socket.id).broadcast.emit() can be used interchangeably.  // io.to(socket.id).emit() sends a message to a specific client, while io.emit() sends a message to all connected clients  // io.to(socket.id).broadcast.emit() sends a message to all clients except the sender  // io.to(socket.id).emit() and io.to(socket.
    })
});

app.get("/", (req, res) => {
    res.render("index")
})

server.listen(8080, () => {
    console.log("Server is running on http://localhost:8080");
})