import './2PlayerApp.css';
import Board from './components/Board';
import Keyboard from './components/Keyboard';
import GameOver from './components/GameOver';
import { createContext, useEffect, useState } from "react";
import { boardDefault, boardDefault2, generateWordSet } from './components/Words';

export const AppContext = createContext();

function App() {
  const [board, setBoard] = useState(boardDefault);
  const [board2, setBoard2] = useState(boardDefault2);
  console.log("text", board)
  console.log("12312", board2)
  const [currAttempt, setCurrAttempt] = useState({ attempt: 0, letterPos: 0 });
  const [wordSet, setWordSet] = useState(new Set());
  const [disabledLetters, setDisabledLetters] = useState([]);
  const [gameOver, setGameOver] = useState({
    gameOver: false,
    guessedWord: false
  })
  const [correctWord, setCorrectWord] = useState("")

  useEffect(() => {
    generateWordSet().then((words) => {
      setWordSet(words.wordSet);
      setCorrectWord(words.todaysWord)
    })
  }, [])
  const onSelectLetter = (keyVal) => {
    console.log("text", board)
    if (currAttempt.letterPos > 4) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letterPos] = keyVal;
    setBoard(newBoard);
    setCurrAttempt({ ...currAttempt, letterPos: currAttempt.letterPos += 1 })
  }
  
  const onDelete = () => {
    if (currAttempt.letterPos === 0) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letterPos - 1] = "";
    setBoard(newBoard)
    setCurrAttempt({ ...currAttempt, letterPos: currAttempt.letterPos -= 1 })
  }
  
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
