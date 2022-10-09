import React, { useContext, useEffect } from 'react'
import { AppContext } from "../App"



// This component is displayed when the game is over
function GameOver({startNewGame}) {

  // Store the game functions in a global state hook
  const { gameOver, correctWord } = useContext(AppContext)
  

  // Actions performed when the GameOver component first loads
  useEffect(() => {

    // This function performs actions when a specific key is pressed
    const keyDownHandler = (event) => {

      // If the Enter key is pressed call the enterPressed function
      if (event.key === 'Enter') {
        event.preventDefault();
        enterPressed();
      }

      // If the ESC key is pressed call the escapePressed function
      if (event.key === 'Escape') {
        event.preventDefault();
        escapePressed();
      }
    };

    // Add an event listener for key presses
    document.addEventListener('keydown', keyDownHandler);

    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, []);
  

  // Actions performed when the Enter key is pressed
  const enterPressed = () => {

    // Call the startNewGame function in App.js
    startNewGame();
  }


  // Actions performed when the ESC key is pressed
  const escapePressed = () => {
    
    console.log("ESCAPE");
    alert("Quit game");
  }
  
  
  
  // Return the GameOver component
  return (
    <div className='gameOver'>
      <h1>Correct Word: {correctWord.toUpperCase()}</h1>
      <h3>Press 'Enter' for the next word</h3>
    </div>
  )
}

export default GameOver