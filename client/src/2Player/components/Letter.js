import React, { useContext, useEffect } from 'react';
import { AppContext } from '../App';



// This is the Letter Component for a the Board
// It takes a letter position (in row), attempt value (row number) and a board array as props
function Letter({ letterPos, attemptVal, board }) {

  // Store the keyboard commands and arrays of guessed letters in a global state hook (useContext)
  const { correctWord, currAttempt, setDisabledLetters, setAlmostLetters, setCorrectLetters } = useContext(AppContext);

  // Store the letter
  const letter = board[attemptVal][letterPos];

  // Return true if the letter is correct (green)
  const correct = correctWord.toUpperCase()[letterPos] === letter;

  // Returns true if the letter is almost correct (yellow)
  const almost = !correct && letter !== "" && correctWord.toUpperCase().includes(letter);


  // Store the state for the current letter
  const letterState =  currAttempt.attempt > attemptVal &&
  (correct ? "correct" : almost ? "almost" : "error");


   // This hook is called every time currAttempt.attempt is changed
  useEffect(() => {

    // Add the current letter to the appropriate array
    if (letter !== "" && !correct && !almost) {
      setDisabledLetters((prev) => [...prev, letter])
    }
    else if (letterState === "almost") {
      setAlmostLetters((prev) => [...prev, letter])
    }
    else if (letterState === "correct") {
      setCorrectLetters((prev) => [...prev, letter])
    }

  }, [currAttempt.attempt])

  

  // Return the Letter component
  return (

    // The letterState is the colour of the Letter
    <div className='letter' id={letterState}>{letter}</div>
  )
}

export default Letter