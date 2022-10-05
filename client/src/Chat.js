import React, { useEffect, useState } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';    // This library allows the chat to scroll up and down


// This is the Chat component of the app
// The socket, username and room in App.js are passed as props in the Chat component
function Chat({socket, username, room}) {

  
  // Add a hook for the message in the chat
  const [currentMessage, setCurrentMessage] = useState("");

  // Add a hook that represents the list of messages in the chat as an array
  const [messageList, setMessageList] = useState([]);


  // This function sends messages through the socket.io server
  const sendMessage = async () => {

    // If the current message is not blank, we can send it
    if (currentMessage !== "") {

      // Create a messageData object containing details about the message
      // This includes the date it was sent
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
      };

      // Send the message data to our socket server using the name "send_message"
      await socket.emit("send_message", messageData);

      // After we send a message, append the message to our own message list
      // This allows us to see the messages we sent and not just the other messages
      setMessageList((list) => [...list, messageData])

      // Set the current message to be blank, to clear the message field
      setCurrentMessage("");
    }
  };

  
  // The useEffect hook calls the following function whenever there is a change in the socket server
  useEffect(() => {

    // Listen for the recieve_message event and perform the following actions
    socket.on("recieve_message", (data) => {

      // Call the setMessageList function to append the new message to the message list
      setMessageList((list) => [...list, data])
    })

  }, [socket])
  


  // Return the Chat component
  return (

    // The entire chat window
    <div className="chat-window">

      <p>Room ID: {room}</p>

      {/* Header of the chat */}
      <div className="chat-header">
        <p>Live Chat for {username}</p>
      </div>

      {/* Body of chat where the messages appear */}
      <div className="chat-body">

        {/* Allow the chat to scroll up and down */}
        <ScrollToBottom className="message-container">

          {/* Loop through the messageList and display them in the chat */}
          {messageList.map((messageContent) => {
            return (
              <div 
                className="message"
                // Determine whether the message was sent by you or the other person
                // and display on the message on the appropriate side
                id={username === messageContent.author ? "you" : "other"}
              >
                <div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                    <p id="author">{messageContent.author}</p>
                  </div>
                </div>
              </div>
            );
          })}

        </ScrollToBottom>

      </div>

      {/* Footer of chat containing area to write and send messages */}
      <div className="chat-footer">
        <input 
          type="text" 
          value={currentMessage}
          placeholder="Hey..." 
          // Set the current message to the text in the input box
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          // Allow the user to click Enter to send the message
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  )
}


export default Chat;