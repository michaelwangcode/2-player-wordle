import React, { useContext } from 'react';
import { AppContext } from '../App';



// This is the Key component for the Keyboard
function Key({ keyVal, bigKey, styling }) {

  // Store the keyboard commands in a global state hook
  const { onSelectLetter, onDelete, onEnter } = useContext(AppContext);

  // The selectLetter function
  const selectLetter = () => {
    if (keyVal === "ENTER") {
      onEnter();
    } else if (keyVal === "DELETE") {
      onDelete();
    } else {
      onSelectLetter(keyVal)
    }
  }


  // Return the Key component
  return (

    // Give the key the appropriate styling (colour)
    <div className='key' id={bigKey ? "big" : styling} onClick={selectLetter}>
      {keyVal}
    </div>
  )
}

export default Key