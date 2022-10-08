import React, { useContext, useEffect, useCallback } from 'react';
import { AppContext } from '../App';
import Key from './Key';



// This is the on-screen Keyboard component
function Keyboard() {

  // Store the keyboard commands and arrays of guessed letters in a global state hook (useContext)
  const { onEnter, onDelete, onSelectLetter, disabledLetters, almostLetters, correctLetters } = useContext(AppContext);

  // Store the rows of the keyboard in arrays
  const keys1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const keys2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const keys3 = ["Z", "X", "C", "V", "B", "N", "M"];


  // This function handles the keyboard commands
  const handleKeyboard = useCallback((event) => {

    if (event.key === "Enter") {
      onEnter();
    } else if (event.key === "Backspace") {
      onDelete();
    } else {
      keys1.forEach((key) => {
        if (event.key.toLowerCase() === key.toLowerCase()) {
          onSelectLetter(key)
        }
      })
      keys2.forEach((key) => {
        if (event.key.toLowerCase() === key.toLowerCase()) {
          onSelectLetter(key)
        }
      })
      keys3.forEach((key) => {
        if (event.key.toLowerCase() === key.toLowerCase()) {
          onSelectLetter(key)
        }
      })
    }
  })


  // Actions performed every time the handleKeyboard function changes
  useEffect(() => {
    document.addEventListener("keydown", handleKeyboard)

    return () => {
      document.removeEventListener("keydown", handleKeyboard)
    };
  }, [handleKeyboard])



  // Return the Keyboard Component
  return (

    <div className='keyboard' onKeyDown={handleKeyboard}>
      
      <div className='line1'>

        {keys1.map((key) => {

          // Apply the correct color for each key
          let styling = "";

          if (disabledLetters.includes(key)) {
            styling = "disabled";
          }
          if (almostLetters.includes(key)){
            styling = "almost";
          }
          if (correctLetters.includes(key)){
            styling = "correct";
          }

          // Return the key component with value and styling (colour)
          return <Key keyVal={key} styling={styling}/>;
        })}
      </div>

      <div className='line2'>

        {keys2.map((key) => {

          // Apply the correct color for each key
          let styling = "";

          if (disabledLetters.includes(key)) {
            styling = "disabled";
          }
          if (almostLetters.includes(key)){
            styling = "almost";
          }
          if (correctLetters.includes(key)){
            styling = "correct";
          }

          // Return the key component with value and styling (colour)
          return <Key keyVal={key} styling={styling}/>;
        })}
      </div>

      <div className='line3'>

        <Key keyVal={"ENTER"} bigKey />
        {keys3.map((key) => {

          // Apply the correct color for each key
          let styling = "";

          if (disabledLetters.includes(key)) {
            styling = "disabled";
          }
          if (almostLetters.includes(key)){
            styling = "almost";
          }
          if (correctLetters.includes(key)){
            styling = "correct";
          }

          // Return the key component with value and styling (colour)
          return <Key keyVal={key} styling={styling}/>;
        })}
        <Key keyVal={"DELETE"} bigKey />
      </div>
      
    </div>
  )
}

export default Keyboard