import './2PlayerApp.css';
import Board from './components/Board';
import Keyboard from './components/Keyboard';
import GameOver from './components/GameOver';
import { createContext, useEffect, useState } from "react";
import { boardDefault, boardDefault2, generateWordSet } from './components/Words';

export const AppContext = createContext();


// The 2 Player Wordle App Component
function App() {


  // Add useState hooks for the variables in the App
  const [board, setBoard] = useState(boardDefault);
  const [board2, setBoard2] = useState(boardDefault2);
  const [currAttempt, setCurrAttempt] = useState({ attempt: 0, letterPos: 0 });
  const [wordSet, setWordSet] = useState(new Set());
  const [disabledLetters, setDisabledLetters] = useState([]);
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
    console.log("text", board)
    if (currAttempt.letterPos > 4) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letterPos] = keyVal;
    setBoard(newBoard);
    setCurrAttempt({ ...currAttempt, letterPos: currAttempt.letterPos += 1 })
  }
  

  // This function performs actions when a letter is deleted
  const onDelete = () => {
    if (currAttempt.letterPos === 0) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letterPos - 1] = "";
    setBoard(newBoard)
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
    // Otherwise tell the user that the word doesn't exist
    } else {
      alert("Word not found!")
    }
  
    // If the user guesses the corrext word, the game is over
    if (currentWord.toLowerCase() === correctWord) {
      setGameOver({ gameOver: true, guessedWord: true })
      return;
    }
  
    // If the user makes 6 guesses without guessing correctly, the game is over
    if (currAttempt.attempt === 6) {
      setGameOver({ gameOver: true, guessedWord: false })
    }
  }



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
