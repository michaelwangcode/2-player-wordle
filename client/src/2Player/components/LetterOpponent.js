import React, { useContext, useEffect } from 'react';



// This is the Opponent's Letter Component for a the Board
// It takes a letter position (in row), attempt value (row number) a board array and the opponent's secret word as props
function LetterOpponent({ letterPos, attemptVal, board, secretWord }) {


  // Store the letter
  const letter = board[attemptVal][letterPos];

  
  // Return true if the letter is correct (green)
  const correct = secretWord.toUpperCase()[letterPos] === letter;

  // Returns true if the letter is almost correct (yellow)
  const almost = !correct && letter !== "" && secretWord.toUpperCase().includes(letter);

  // Return true if the letter is not correct, not almost correct and not blank (gray)
  const error = !correct && !almost && letter !== "";
  

  // Set the default letter state to a blank string
  let letterState = "";

  // Set letterState to the right state (colour)
  if (correct) {
    letterState = "correct";
  } else if (almost) {
    letterState = "almost";
  } else if (error) {
    letterState = "error";
  }


  // Return the Letter component
  return (

    // The letterState is the colour of the Letter
    // The letter is commented out so you can't see your opponent's guesses
    <div className='letter' id={letterState}>{/*letter*/}</div>
  )
}

export default LetterOpponent