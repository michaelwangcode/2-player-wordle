import './App.css';
import io from 'socket.io-client';     // Import the socket.io-client library
import { useState } from "react";
import Chat from "./Chat";

// Specify the socket URL
const socket = io.connect("http://localhost:3001");


// The react component for the Join window
function Join() {

  // Add state hooks for username and room ID
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  // Hook that determines whether or not to show the chat
  const [showChat, setShowChat] = useState(false);


  // This function joins a room
  // It establishes a connection between the user and the socket.io room they want to enter
  const joinRoom = () => {

    // If the username and room are not blank, we can join a room
    if (username !== "" && room !== "") {

      // Emit an event named "join_room" to the server and pass it data (room)
      socket.emit("join_room", room);

      // Set showChat to true, which will display the chat component
      setShowChat(true);
    }
  };


  // Return the Join App component
  return (

    <div className="App">


      {/* If the chat is not being displayed, display the "Join" input fields */}
      { !showChat ? (

      <div className="joinChatContainer">

        <h3>Join A Chat</h3>

        {/* Create a text field for the username */}
        <input 
          type="text" 
          placeholder="Enter your name..."
          onChange={(event) => {
            // Set the username to the text in the input field
            setUsername(event.target.value);
          }}
        />

        {/* Create a text field for the room ID */}
        <input 
          type="text" 
          placeholder="Enter a room ID..."
          onChange={(event) => {
            // Set the room ID to the text in the input field
            setRoom(event.target.value);
          }}
        />

        {/* Button to join a room */}
        <button onClick={joinRoom}>Join A Room</button>
      </div>

      )
      
      // If the chat is being displayed, display the chat component
    : (

      /* Chat component */
      <Chat socket={socket} username={username} room={room} />

    )}
    </div>
  );



}


export default Join