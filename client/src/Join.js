import './App.css';
import io from 'socket.io-client';     // Import the socket.io-client library
import { useState } from "react";
// import Chat from "./Chat";
import TwoPlayerApp from "./2Player/App";



// Specify the socket URL
const socket = io.connect("http://localhost:3001");


// The react component for the Join window
function Join() {

  // Add state hooks for username and room ID
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  // Hook that determines whether or not to show the 2 Player game
  const [showGame, setShowGame] = useState(false);


  // This function joins a room
  // It establishes a connection between the user and the socket.io room they want to enter
  const joinRoom = () => {

    // If the username and room are not blank, we can join a room
    if (username !== "" && room !== "") {

      // Emit an event named "join_room" to the server and pass it data (room)
      socket.emit("join_room", room);

      // Set showGame to true, which will display the game component
      setShowGame(true);

    // Otherwise if the 
    } else {

      // Display an alert
      alert("Enter a name and room number")
    }
  };


  // Reload page when the back button is clicked
  function back() {

    // Reload the page (acts as a back button)
    window.location.reload();
  }



  // Return the Join App component
  return (

    <div className="App">

      {/* If the game is not being displayed, display the "Join" input fields */}
      { !showGame ? (

      <div className="joinChatContainer">

        <h3>Join A Game</h3>

        {/* Create a text field for the username */}
        <input 
          type="text" 
          placeholder="Enter Your Name"
          onChange={(event) => {
            // Set the username to the text in the input field
            setUsername(event.target.value);
          }}
        />

        {/* Create a text field for the room ID */}
        <input 
          type="text" 
          placeholder="Enter a Room ID"
          onChange={(event) => {
            // Set the room ID to the text in the input field
            setRoom(event.target.value);
          }}
        />

        {/* Button to join a room */}
        <button onClick={joinRoom}>Join A Room</button>
        <br/>
        <button onClick={back} style={{background: "gray"}}>Go Back</button>

      </div>

      )
      
      // If the game is being displayed, display the game component
    : (

      <div>
        {/* Two Player Wordle component */}
        <TwoPlayerApp socket={socket} username={username} room={room}/>

        {/* Chat component */}
        {/* <Chat socket={socket} username={username} room={room} /> */}
      </div>
    )}
    </div>
  );

}


export default Join