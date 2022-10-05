import './2PlayerApp.css';
import Board from './components/Board';
import Keyboard from './components/Keyboard';
import GameOver from './components/GameOver';
import { createContext, useEffect, useState } from "react";
import { boardDefault, boardDefault2, generateWordSet } from './components/Words';

export const AppContext = createContext();



// The 2 Player Wordle App Component
function App({socket, username, room}) {


  // Add useState hooks for the variables in the App
  const [board, setBoard] = useState(boardDefault);
  const [board2, setBoard2] = useState(boardDefault2);
  const [currAttempt, setCurrAttempt] = useState({ attempt: 0, letterPos: 0 });
  const [wordSet, setWordSet] = useState(new Set());

  // Store an array of disabled, almost and correct letters for the keyboard
  const [disabledLetters, setDisabledLetters] = useState([]);
  const [almostLetters, setAlmostLetters] = useState([]);
  const [correctLetters, setCorrectLetters] = useState([]);

  // Store whether the game is over
  const [gameOver, setGameOver] = useState({
    gameOver: false,
    guessedWord: false
  })
  const [correctWord, setCorrectWord] = useState("")


  // The useEffect hook performs the following actions when the app first loads
  useEffect(() => {

    // Get the word set and the secret word
    generateWordSet().then((words) => {
      setWordSet(words.wordSet);
      setCorrectWord(words.todaysWord)
    })
  }, [])


  // This function performs actions when a letter is typed
  const onSelectLetter = (keyVal) => {

    // Print the letter to the console
    console.log("text", board)

    // If there are 5 letters in the row already, return without doing anything
    if (currAttempt.letterPos > 4) return;

    // Create a copy of the board called newBoard
    const newBoard = [...board];

    // Set the board at [x,y] to the key value
    newBoard[currAttempt.attempt][currAttempt.letterPos] = keyVal;

    // Set the board to newBoard
    setBoard(newBoard);

    // Call the setCurrAttempt function to update the current attempt
    setCurrAttempt({ ...currAttempt, letterPos: currAttempt.letterPos += 1 })
  }
  

  // This function performs actions when a letter is deleted
  const onDelete = () => {

    // If there are no letters to delete, return without doing anything
    if (currAttempt.letterPos === 0) return;

    // Create a copy of the board called newBoard
    const newBoard = [...board];

    // Set the board at [x,y-1] to a blank character
    newBoard[currAttempt.attempt][currAttempt.letterPos - 1] = "";

    // Set the board to newBoard
    setBoard(newBoard);

    // Call the setCurrAttempt function to update the current attempt
    setCurrAttempt({ ...currAttempt, letterPos: currAttempt.letterPos -= 1 })
  }
  

  // This function performs actions when the Enter key is pressed
  const onEnter = () => {

    // If there are less than 5 letters typed, return without doing anything
    if (currAttempt.letterPos !== 5) return;
  
    // Store the current word
    let currentWord = "";
    for (let i = 0; i < 5; i++) {
      currentWord += board[currAttempt.attempt][i];
    }

    // If the word exists in the word bank, add it as an attempt
    if (wordSet.has(currentWord.toLowerCase())) {
      setCurrAttempt({ attempt: currAttempt.attempt += 1, letterPos: currAttempt.letterPos = 0 })
    
      //----- SOCKET FUNCTION CALL -----//
      // Call the socket function sendMessage to send the current word to the opponent
      sendMessage(currentWord);
    
    // Otherwise tell the user that the word doesn't exist
    } else {
      alert("Word not found!")
    }
  
    // If the user guesses the correct word, the game is over
    if (currentWord.toLowerCase() === correctWord) {
      setGameOver({ gameOver: true, guessedWord: true })
      return;
    }
  
    // If the user makes 6 guesses without guessing correctly, the game is over
    if (currAttempt.attempt === 6) {
      setGameOver({ gameOver: true, guessedWord: false })
    }
  }


  
  //----- SOCKET FUNCTIONS -----//
  
  // Send a message (object of data) through the socket.io server
  // It takes the currentWord as an argument
  const sendMessage = async (currentWord) => {

    // Store the room ID, username, currentWord and board state in a data object
    const messageData = {
      room: room,
      author: username,
      message: currentWord,
      board: board
    }

    // Emit the message using the name send_message
    await socket.emit("send_message", messageData);

    // Print a message to the console
    console.log("DATA SENT: " + messageData.message)
  }
  

  // The useEffect hook calls the following function whenever there is a change in the socket server
  useEffect(() => {

    // Listen for the recieve_message event and perform the following actions
    socket.on("recieve_message", (data) => {

      //------- SET THE SECOND BOARD TO THE RECIEVED DATA --------//
      // Set the second board on the screen to the opponent's board
      setBoard2(data.board);

      // Print a message to the console
      console.log("DATA RECIEVED: " + data.message);
    })
  }, [socket])
  



  // Return the 2 Player Wordle Component
  return (

    <div className="App">
      <nav>
        <h1>Wordle</h1>
      </nav>
      <AppContext.Provider value={{
        currAttempt,
        setCurrAttempt,
        onDelete,
        onEnter,
        correctWord,
        setDisabledLetters,
        disabledLetters,
        setAlmostLetters,
        almostLetters,
        setCorrectLetters,
        correctLetters,
        setGameOver,
        gameOver
      }}>

        <div className='game'>
          <div className='two-boards'>
            <Board currentBoard={board}/>
            <Board currentBoard={board2}/>
          </div>
          
          {gameOver.gameOver ? <GameOver /> : <Keyboard onSelectLetter={onSelectLetter}/>}
        </div>

      </AppContext.Provider>
    </div>

  );
}


export default App;
