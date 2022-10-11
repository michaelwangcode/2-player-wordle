import './App.css';
import { useState } from "react";
import Join from "./Join";
import OnePlayerApp from "./1Player/App";



// The main application component
function App() {

  // List of different hooks:
  // 1. Home
  // 2. Single Player
  // 3. Two Player
  // 4. How To Play


  // These hooks are used to hide or display a component
  const [showHome, setShowHome] = useState(true);
  const [show1PlayerGame, setShow1PlayerGame] = useState(false);
  const [show2PlayerGame, setShow2PlayerGame] = useState(false);
  const [showHowToPlay, setShowHowToPlay] = useState(false);


  // This function displays a 1 Player Game
  const select1PlayerGame = () => {
    console.log("1 Player game selected");
    setShowHome(false);
    setShow1PlayerGame(true);
  };

  // This function displays a 2 Player Game
  const select2PlayerGame = () => {
    console.log("2 Player game selected");
    setShowHome(false);
    setShow2PlayerGame(true);
  };

  // This function displays the How To Play page
  const selectHowToPlay = () => {
    console.log("My Stats");
    setShowHome(false);
    setShowHowToPlay(true);
  };

  const backToHome = () => {
    console.log("Back to home");
    setShow1PlayerGame(false);
    setShow2PlayerGame(false);
    setShowHowToPlay(false);
    setShowHome(true);
  };



  // Return the main App component
  return (

    <div className="App">
      
      {/* If showHome is true, display the Home Page with Buttons */}
      {showHome && (
        <div>
          <h1 className='wave'>
            <span style={{"--i":1}}>W</span>
            <span style={{"--i":2}}>O</span>
            <span style={{"--i":3}}>R</span>
            <span style={{"--i":4}}>D</span>
            <span style={{"--i":5}}>L</span>
            <span style={{"--i":6}}>E</span>
          </h1>
          <br /><br />
          <button onClick={select1PlayerGame}><h1>1 Player Game</h1></button>
          <br /><br />
          <button onClick={select2PlayerGame}><h1>2 Player Game</h1></button>
          <br /><br />
          <button onClick={selectHowToPlay}><h1>How To Play</h1></button>
          <br /><br />
        </div>
      )}

      {/* If show1PlayerGame is true, display a 1 Player Game */}
      {show1PlayerGame && (
        <div>
          {/* Display a 1 Player Game */}
          <OnePlayerApp />
        </div>
      )}

      {/* If show2PlayerGame is true, display a 2 Player Game */}
      {show2PlayerGame && (
        <div>
          {/* Display the Join 2 Player Game Socket component */}
          <Join/>
        </div>
      )}

      {/* If showStats is true, display an 8 Person Tournament */}
      {showHowToPlay && (
        <div className='no-highlight'>
          <h1>How To Play</h1>
          <p>Wordle is a word guessing game.</p>
          <p>You have 6 chances to guess a secret 5-letter word.</p>

          <img src={require('./images/react.png')} alt="react"/>

          <p>After each guess, letters will turn green, yellow or gray.</p>
          <p>
            Green: The letter is in the word, and in the correct position. <br/>
            Yellow: The letter is in the word, but not in the correct position. <br/>
            Gray: The letter is not in the word.
          </p>
          <p>Each guess must be a valid 5-letter word.</p>
          <br/>

          <h2>Two Player Mode</h2>
          <p>To start a 2-player game, send a friend a room code (ex: 123). <br/>
            Once you both join the room, the game will start.
          </p>
          <p>
            Guess as many words as you can before the time runs out. <br/>
            The earlier you guess the word, the more points you will get. 
          </p>
          <br/>

          {/* Back to Home Button */}
          <button onClick={backToHome} style={{width: "100px"}}>
            <h3>Go Back</h3>
          </button>
          <br/><br/><br/><br/>
        </div>
      )}

    </div>
  );
}



export default App;
