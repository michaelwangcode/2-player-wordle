import React, { useContext, useEffect } from 'react'
import { AppContext } from "../App"



// This component is displayed when the game is over
function GameOver({startNewGame, matchOver}) {

  // Store the game functions in a global state hook
  const { correctWord } = useContext(AppContext)
  

  // Actions performed when the GameOver component first loads
  useEffect(() => {

    // This function performs actions when a specific key is pressed
    const keyDownHandler = (event) => {

      // If the Enter key is pressed call the enterPressed function
      if (event.key === 'Enter') {
        event.preventDefault();
        enterPressed();
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

    // IF the match is not over
    if (!matchOver) {

      // Call the startNewGame function in App.js
      startNewGame();
    }
  }


  
  // Return the GameOver component
  return (
    <div className='gameOver'>

    { !matchOver ?
      <span>
        <h1>Correct Word: {correctWord.toUpperCase()}</h1>
        <h3>Press 'Enter' for the next word</h3>
      </span>
      :
      <span>
        <h1>Correct Word: {correctWord.toUpperCase()}</h1>
      </span>
    } 

    </div>
  )
}

export default GameOver