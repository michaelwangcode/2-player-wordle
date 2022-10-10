import '../App.css';
import Board from './components/Board';
import BoardOpponent from './components/BoardOpponent';
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

  // Store the player and opponent's secret words
  const [correctWord, setCorrectWord] = useState("");
  const [opponentsWord, setOpponentsWord] = useState("");

  // Store the player and opponent's score
  const [yourScore, setYourScore] = useState(0);
  const [opponentsScore, setOpponentsScore] = useState(0);

  // Store whether the game is over
  const [gameOver, setGameOver] = useState({ gameOver: false, guessedWord: false });

  // Store the number of players (max 2)
  const [numberOfPlayers, setNumberOfPlayers] = useState(0);

  // Store whether the keyboard should be enabled
  const [enableKeyboard, setEnableKeyboard] = useState(false);

  // Store the header message
  const [startGameMessage, setStartGameMessage] = useState("Waiting for opponent...");

  // Store whether the entire match is over
  const [matchOver, setMatchOver] = useState(false);



  // This function starts a new game
  // It is passed to the GameOver component and called in the EnterPressed function
  const startNewGame = () => {

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

      // Scoring tiers
      // From 1 attempt to 6 attempts:
      // 100 80 60 40 20 10

      // The amount of points you get after each game
      let points = 0;

      // Calculate the amound of points the user gets
      if (currAttempt.attempt === 1) { points = 100; }
      else if (currAttempt.attempt === 2) { points = 80; }
      else if (currAttempt.attempt === 3) { points = 60; }
      else if (currAttempt.attempt === 4) { points = 40; }
      else if (currAttempt.attempt === 5) { points = 20; }
      else if (currAttempt.attempt === 6) { points = 10; }

      // Set the user's new score
      let yourNewScore = yourScore + points;
      setYourScore(yourNewScore);

      // Send your score to your opponent
      sendScoreToOpponent(yourNewScore);

      // Set the game to be over
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
      board: board,
      correctWord: correctWord
    }

    // Emit the message using the name send_message
    await socket.emit("send_message", messageData);

    // Print a message to the console
    console.log("DATA SENT: " + messageData.message)
  }
  

  // This function sends your current score to your opponent
  const sendScoreToOpponent = async (yourScore) => {

    // Store your score and the room ID
    const data = {
      score: yourScore,
      room: room
    }

    // Emit the score and room ID using the send_score_to_opponent function
    await socket.emit("send_score_to_opponent", data);
  }


  // The useEffect hook calls the following function whenever there is a change in the socket server
  useEffect(() => {

    // Listen for the recieve_message event and perform the following actions
    socket.on("recieve_message", (data) => {

      //------- SET THE SECOND BOARD TO THE RECIEVED DATA --------//
      // Set the second board on the screen to the opponent's board
      setBoard2(data.board);

      // Set the opponent's secret word
      setOpponentsWord(data.correctWord);

      // Print a message to the console
      console.log("DATA RECIEVED: " + data.message);
    });


    // Listen for the room_full event
    socket.on("room_full", (message) => {

      // Show an alert
      alert(message);

      // Reload the page
      window.location.reload();
    });


    // Listen for the number_of_players event
    socket.on("number_of_players", (numPlayers) => {

      // Set the number of players (max 2)
      setNumberOfPlayers(numPlayers);
    });


    // Recieve opponent's score
    socket.on("receive_opponents_score", (score) => {

      // Set the opponent's score
      setOpponentsScore(score);
    });

  }, [socket])

  //----------------------------//



  // This function is called whenever the number of players changes
  useEffect(() => {

    // If two players have joined, automatically start the game
    if (numberOfPlayers === 2) {
      
      // Set the countdown to 6 seconds
      let timeleft = 6;

      // Create a timer
      let downloadTimer = setInterval(function() {

        // Subtract 1 second
        timeleft--;

        // Set the header to the amount of seconds remaining
        setStartGameMessage("Game starting in " + timeleft + "...");
        
        // If the timer hits 0, 
        if(timeleft <= 0) {

          // Clear the timer
          clearInterval(downloadTimer);

          // Enable the Keyboard (This gets passed to keyboard component)
          setEnableKeyboard(true);

          //----- START THE GAME -----//

          // Start the game, and set the game duration to 61 seconds
          startNewGame();

          gameTimer(61);
        }

      },1000);
    }
  }, [numberOfPlayers])
  


  // This function starts the timer for the game
  // It takes the game duration (in seconds) as an argument
  function gameTimer(timeInSeconds) {

    // Store the game duration (in seconds)
    let timeleft = timeInSeconds;

    // Create a timer
    let downloadTimer = setInterval(function() {

      // Subtract 1 second
      timeleft--;

      // Print the time remaining in the header
      setStartGameMessage("Time Remaining: " + timeleft);
      
      // If the time hits 0, the game is over
      if(timeleft <= 0) {

        // Clear the timer
        clearInterval(downloadTimer);

        // Disable the keyboard (this gets passed to keyboard component)
        setEnableKeyboard(false);

        // Set the game to be over
        setGameOver({ gameOver: true, guessedWord: false })

        // Set the match to be over
        setMatchOver(true);
      }
    },1000);
  }


  // This function is called when the match is over
  useEffect(() => {

    // If the match is over, 
    if (matchOver) {

      // Display a Game Over message at the top to show who won
      if (yourScore > opponentsScore) {
        setStartGameMessage("Game Over: You Win!");
      } else if (yourScore < opponentsScore) {
        setStartGameMessage("Game Over: Opponent Wins!");
      } else if (yourScore === opponentsScore) {
        setStartGameMessage("Game Over: Tie!");
      }
    }

 }, [matchOver])




  // Return the 2 Player Wordle Component
  return (

    <div className="App">
      {/*<nav><h1>Wordle</h1></nav>*/}

      <nav>
        <h1> 
          { startGameMessage }
        </h1>
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

            <div>
            <span style={{"font-size": "25px", "font-weight":"bold"}}>Your Score: {yourScore}</span>

            <Board currentBoard={board}/>
            </div>

            <div>
            <span style={{"font-size": "25px", "font-weight":"bold"}}>Opponent's Score: {opponentsScore}</span>

            <BoardOpponent currentBoard={board2} secretWord={opponentsWord}/>
            </div>

          </div>

          {/* If the game is over, display the GameOver component. Otherwise, display the keyboard */}
          {gameOver.gameOver ? <GameOver startNewGame={startNewGame} matchOver={matchOver}/> : <Keyboard onSelectLetter={onSelectLetter} isEnabled={enableKeyboard}/>}
        </div>
        
      </AppContext.Provider>
    </div>

  );
}

export default App;
