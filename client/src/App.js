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
          <h1>Wordle</h1>
          <br/><br/>
          <button onClick={select1PlayerGame}><h1>1 Player Game</h1></button>
          <br/><br/>
          <button onClick={select2PlayerGame}><h1>2 Player Game</h1></button>
          <br/><br/>
          <button onClick={selectHowToPlay}><h1>How To Play</h1></button>
          <br/><br/>
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
        <div>
          <h1>How To Play</h1>

          {/* Back to Home Button */}
          <button onClick={backToHome}>Back</button>
        </div>
      )}

    </div>
  );
}



export default App;
