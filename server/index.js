const express = require('express');       // Import express
const app = express();                    // Set app variable to instance of express funciton
const http = require("http");             // Import http library to build server with socket.io
const cors = require('cors');             // Import cors because socket.io has cors issues
const { Server } = require("socket.io");  // Import from the socket.io library

// Use cors middleware to resolve issues
app.use(cors());


// Create a server and pass in the app variable
const server = http.createServer(app);


// Instantiate the socket.io server in this io variable
// Pass in the server and an object with cors settings
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",      // URL for react application
    methods: ["GET", "POST"],             // Accept GET and POST requests
  },
});


// Listen for a connection event
io.on("connection", (socket) => {

  // Print the socket id when the server is connected
  console.log(`User Connected: ${socket.id}`);

  // When an event named "join_room" is emitted, perform the following actions
  socket.on("join_room", (data) => {

    // Join the room in the joinRoom function from App.js
    socket.join(data);

    // Print the socket id and data
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });


  // When an event named "send_message" is emitted, perform the following actions
  socket.on("send_message", (data) => {

    // Emit the data to the specific room in the data
    socket.to(data.room).emit("recieve_message", data);
  });


  // When the server is disconnected
  socket.on("disconnect", () => {
    
    // Print a user disconnected message and the socket id
    console.log("User Disconnected", socket.id);
  });

});


// Add a server port to listen to
server.listen(3001, () => {

  // Print message when server is running
  console.log("SERVER RUNNING");
});
