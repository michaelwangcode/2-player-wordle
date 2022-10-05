import React, { useContext, useEffect } from 'react';
import { AppContext } from '../App';



// This is the Letter Component for a the Board
// It takes a letter position (in row), attempt value (row number) and a board array as props
function Letter({ letterPos, attemptVal, board }) {


  const { correctWord, currAttempt, disabledLetters, setDisabledLetters } = useContext(AppContext);

  const letter = board[attemptVal][letterPos];

  const correct = correctWord.toUpperCase()[letterPos] === letter;

  const almost = !correct && letter !== "" && correctWord.toUpperCase().includes(letter);

  
  const letterState =  currAttempt.attempt > attemptVal &&
  (correct ? "correct" : almost ? "almost" : "error");

  useEffect(() => {
    if (letter !== "" && !correct && !almost) {
      setDisabledLetters((prev) => [...prev, letter])
    }
  }, [currAttempt.attempt])

  return (
    <div className='letter' id={letterState}>{letter}</div>
  )
}

export default Letter