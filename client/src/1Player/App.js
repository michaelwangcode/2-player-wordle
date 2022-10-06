import './1PlayerApp.css';
import Board from './components/Board';
import Keyboard from './components/Keyboard';
import GameOver from './components/GameOver';
import { createContext, useEffect, useState } from "react";
import { boardDefault, generateWordSet } from './components/Words';

export const AppContext = createContext();



// The 1 Player Wordle App Component
function App() {

  // Add useState hooks for the variables in the App
  const [board, setBoard] = useState(boardDefault);
  const [currAttempt, setCurrAttempt] = useState({ attempt: 0, letterPos: 0 });
  const [wordSet, setWordSet] = useState(new Set());

  // Store an array of disabled, almost and correct letters for the keyboard
  const [disabledLetters, setDisabledLetters] = useState([]);
  const [almostLetters, setAlmostLetters] = useState([]);
  const [correctLetters, setCorrectLetters] = useState([]);

  // Store whether the game is over
  const [gameOver, setGameOver] = useState({ gameOver: false, guessedWord: false })

  // Store the correct word
  const [correctWord, setCorrectWord] = useState("")



  // This function starts a new game after a game has been played
  // It is passed to the GameOver component and called in the EnterPressed function
  const startNewGame = () => {

    // alert("NEW GAME STARTED");
    // console.log("NEW GAME STARTED");

    // Create a blank board
    const blankBoard =   
      [["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""]];

    // Reset all of the hooks to their default values
    setBoard(blankBoard);
    setCurrAttempt({attempt: 0, letterPos: 0});
    setWordSet(new Set());
    setDisabledLetters([]);
    setAlmostLetters([]);
    setCorrectLetters([]);
    setGameOver({ gameOver: false, guessedWord: false });

    // Generate a new secret word
    generateWordSet().then((words) => {
      setWordSet(words.wordSet);
      setCorrectWord(words.todaysWord)
    })
  }


  // The useEffect hook performs the following actions when the app first loads
  useEffect(() => {
    generateWordSet().then((words) => {
      setWordSet(words.wordSet);
      setCorrectWord(words.todaysWord)
    })
  }, [])


  // This function performs actions when a letter is typed
  const onSelectLetter = (keyVal) => {
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
    if (currAttempt.letterPos !== 5) return;

    let currentWord = "";
    for (let i = 0; i < 5; i++) {
      currentWord += board[currAttempt.attempt][i];
    }
    if (wordSet.has(currentWord.toLowerCase())) {
      setCurrAttempt({ attempt: currAttempt.attempt += 1, letterPos: currAttempt.letterPos = 0 })
    } else {
      alert("Word not found!")
    }

    if (currentWord.toLowerCase() === correctWord) {
      setGameOver({ gameOver: true, guessedWord: true })
    
      return;
    }

    if (currAttempt.attempt === 6) {
      setGameOver({ gameOver: true, guessedWord: false })
    }
  }



  // Return the 1 Player Wordle Component
  return (
    <div className="App">
      <nav>
        <h1>Wordle</h1>
      </nav>
      <AppContext.Provider value={{
        board,
        setBoard,
        currAttempt,
        setCurrAttempt,
        onSelectLetter,
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
          <Board />
          {gameOver.gameOver ? <GameOver startNewGame={startNewGame}/> : <Keyboard />}
        </div>

      </AppContext.Provider>
    </div>
  );
}

export default App;
