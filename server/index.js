const express = require('express');       // Import express
const app = express();                    // Set app variable to instance of express funciton
const http = require("http");             // Import http library to build server with socket.io
const cors = require('cors');             // Import cors because socket.io has cors issues
const { Server } = require("socket.io");  // Import from the socket.io library
const { emit } = require("process");


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



  //----- USER JOINS A ROOM -----//

  // When an event named "join_room" is emitted, perform the following actions
  socket.on("join_room", (roomId) => {

    // If the room is empty, that means this is the first user to join
    if (io.sockets.adapter.rooms.get(roomId) === undefined) {

      // Join the room in the joinRoom function from App.js
      socket.join(roomId);

      // Print the socket id and data
      console.log(`User with ID: ${socket.id} has joined room: ${roomId}`);

      // Use emit to tell the App that there is only 1 player
      io.sockets.in(roomId).emit('number_of_players', 1);
    
    // Otherwise if the room has 1 player in it,
    } else if (io.sockets.adapter.rooms.get(roomId).size === 1) {

      // Join the room in the joinRoom function from App.js
      socket.join(roomId);

      // Print the socket id and data
      console.log(`User with ID: ${socket.id} has joined room: ${roomId}`);
      
      // Use emit to tell the App that there are 2 players
      io.sockets.in(roomId).emit('number_of_players', 2);

    // Otherwise if there are more than two players, the room is full
    } else if (io.sockets.adapter.rooms.get(roomId).size >= 2) {

      // Emit a "room is full message" to the user that just entered
      io.to(socket.id).emit("room_full", "Room is full");
    }
  });



  //----- SEND OPPONENT YOUR USERNAME -----//

  // When an event named "send_username" is emitted, perform the following actions
  socket.on("send_username", (data) => {

    // Emit your username to the specific room in the data
    socket.to(data.room).emit("receive_username", data);
  });


  //----- USER TYPES A WORD, WORD IS SENT TO OTHER USER -----//
  
  // When an event named "send_message" is emitted, perform the following actions
  socket.on("send_message", (data) => {

    // Emit the data to the specific room in the data
    socket.to(data.room).emit("receive_message", data);
  });


  //----- YOUR SCORE IS SENT TO THE OPPONENT -----//

  // When the "send_score_to_opponent" event is emitted, perform the following actions
  socket.on("send_score_to_opponent", (data) => {

    // Emit the score to the specific room in the data
    socket.to(data.room).emit("receive_opponents_score", data.score);
  });


  //----- USER LEAVES THE ROOM -----//

  // When the server is disconnected
  socket.on("disconnect", () => {
    
    // Print a user disconnected message and the socket id
    console.log("User Disconnected", socket.id);
  });

});




//----- SERVER RUNNING -----//

// Add a server port to listen to
server.listen(3001, () => {

  // Print message when server is running
  console.log("SERVER RUNNING");
});
