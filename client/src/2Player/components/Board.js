import React, { useState } from 'react';
import Letter from './Letter';



// This is the component for the your Board
function Board({currentBoard}) {  

  return (    
    <div className='board'>
      <div className="row">
        <Letter board={currentBoard} letterPos={0} attemptVal={0} />
        <Letter board={currentBoard} letterPos={1} attemptVal={0} />
        <Letter board={currentBoard} letterPos={2} attemptVal={0} />
        <Letter board={currentBoard} letterPos={3} attemptVal={0} />
        <Letter board={currentBoard} letterPos={4} attemptVal={0} />
      </div>
      <div className="row">
        <Letter board={currentBoard}letterPos={0} attemptVal={1} />
        <Letter board={currentBoard}letterPos={1} attemptVal={1} />
        <Letter board={currentBoard}letterPos={2} attemptVal={1} />
        <Letter board={currentBoard}letterPos={3} attemptVal={1} />
        <Letter board={currentBoard}letterPos={4} attemptVal={1} />
      </div>
      <div className="row">
        <Letter board={currentBoard}letterPos={0} attemptVal={2} />
        <Letter board={currentBoard}letterPos={1} attemptVal={2} />
        <Letter board={currentBoard}letterPos={2} attemptVal={2} />
        <Letter board={currentBoard}letterPos={3} attemptVal={2} />
        <Letter board={currentBoard}letterPos={4} attemptVal={2} />
      </div>
      <div className="row">
        <Letter board={currentBoard}letterPos={0} attemptVal={3} />
        <Letter board={currentBoard}letterPos={1} attemptVal={3} />
        <Letter board={currentBoard}letterPos={2} attemptVal={3} />
        <Letter board={currentBoard}letterPos={3} attemptVal={3} />
        <Letter board={currentBoard}letterPos={4} attemptVal={3} />
      </div>
      <div className="row">
        <Letter board={currentBoard}letterPos={0} attemptVal={4} />
        <Letter board={currentBoard}letterPos={1} attemptVal={4} />
        <Letter board={currentBoard}letterPos={2} attemptVal={4} />
        <Letter board={currentBoard}letterPos={3} attemptVal={4} />
        <Letter board={currentBoard}letterPos={4} attemptVal={4} />
      </div>
      <div className="row">
        <Letter board={currentBoard}letterPos={0} attemptVal={5} />
        <Letter board={currentBoard}letterPos={1} attemptVal={5} />
        <Letter board={currentBoard}letterPos={2} attemptVal={5} />
        <Letter board={currentBoard}letterPos={3} attemptVal={5} />
        <Letter board={currentBoard}letterPos={4} attemptVal={5} />
      </div>
    </div>
  )
}

export default Board
