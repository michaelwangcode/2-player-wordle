import React, { useState } from 'react';
import LetterOpponent from './LetterOpponent';



// This is the component for the Opponent's Board
function BoardOpponent({currentBoard, secretWord}) {  

  return (    
    <div className='board'>
      <div className="row">
        <LetterOpponent board={currentBoard} letterPos={0} attemptVal={0} secretWord={secretWord}/>
        <LetterOpponent board={currentBoard} letterPos={1} attemptVal={0} secretWord={secretWord}/>
        <LetterOpponent board={currentBoard} letterPos={2} attemptVal={0} secretWord={secretWord}/>
        <LetterOpponent board={currentBoard} letterPos={3} attemptVal={0} secretWord={secretWord}/>
        <LetterOpponent board={currentBoard} letterPos={4} attemptVal={0} secretWord={secretWord}/>
      </div>
      <div className="row">
        <LetterOpponent board={currentBoard}letterPos={0} attemptVal={1} secretWord={secretWord}/>
        <LetterOpponent board={currentBoard}letterPos={1} attemptVal={1} secretWord={secretWord}/>
        <LetterOpponent board={currentBoard}letterPos={2} attemptVal={1} secretWord={secretWord}/>
        <LetterOpponent board={currentBoard}letterPos={3} attemptVal={1} secretWord={secretWord}/>
        <LetterOpponent board={currentBoard}letterPos={4} attemptVal={1} secretWord={secretWord}/>
      </div>
      <div className="row">
        <LetterOpponent board={currentBoard}letterPos={0} attemptVal={2} secretWord={secretWord}/>
        <LetterOpponent board={currentBoard}letterPos={1} attemptVal={2} secretWord={secretWord}/>
        <LetterOpponent board={currentBoard}letterPos={2} attemptVal={2} secretWord={secretWord}/>
        <LetterOpponent board={currentBoard}letterPos={3} attemptVal={2} secretWord={secretWord}/>
        <LetterOpponent board={currentBoard}letterPos={4} attemptVal={2} secretWord={secretWord}/>
      </div>
      <div className="row">
        <LetterOpponent board={currentBoard}letterPos={0} attemptVal={3} secretWord={secretWord}/>
        <LetterOpponent board={currentBoard}letterPos={1} attemptVal={3} secretWord={secretWord}/>
        <LetterOpponent board={currentBoard}letterPos={2} attemptVal={3} secretWord={secretWord}/>
        <LetterOpponent board={currentBoard}letterPos={3} attemptVal={3} secretWord={secretWord}/>
        <LetterOpponent board={currentBoard}letterPos={4} attemptVal={3} secretWord={secretWord}/>
      </div>
      <div className="row">
        <LetterOpponent board={currentBoard}letterPos={0} attemptVal={4} secretWord={secretWord}/>
        <LetterOpponent board={currentBoard}letterPos={1} attemptVal={4} secretWord={secretWord}/>
        <LetterOpponent board={currentBoard}letterPos={2} attemptVal={4} secretWord={secretWord}/>
        <LetterOpponent board={currentBoard}letterPos={3} attemptVal={4} secretWord={secretWord}/>
        <LetterOpponent board={currentBoard}letterPos={4} attemptVal={4} secretWord={secretWord}/>
      </div>
      <div className="row">
        <LetterOpponent board={currentBoard}letterPos={0} attemptVal={5} secretWord={secretWord}/>
        <LetterOpponent board={currentBoard}letterPos={1} attemptVal={5} secretWord={secretWord}/>
        <LetterOpponent board={currentBoard}letterPos={2} attemptVal={5} secretWord={secretWord}/>
        <LetterOpponent board={currentBoard}letterPos={3} attemptVal={5} secretWord={secretWord}/>
        <LetterOpponent board={currentBoard}letterPos={4} attemptVal={5} secretWord={secretWord}/>
      </div>
    </div>
  )
}

export default BoardOpponent