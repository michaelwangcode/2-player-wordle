import './App.css';
import { useState } from "react";

import Join from "./Join";
import OnePlayerApp from "./1Player/App";
import TwoPlayerApp from "./2Player/App";



// The main application component
function App() {

  // List of different hooks:
  // 1. Home
  // 2. Single Player
  // 3. Two Player
  // 4. 4 Person Tournament
  // 5. 8 Person Tournament
  // 6. Stats

  // These hooks are used to hide or display a component
  const [showHome, setShowHome] = useState(true);
  const [show1PlayerGame, setShow1PlayerGame] = useState(false);
  const [show2PlayerGame, setShow2PlayerGame] = useState(false);
  const [show4PlayerTournament, setShow4PlayerTournament] = useState(false);
  const [show8PlayerTournament, setShow8PlayerTournament] = useState(false);
  const [showStats, setShowStats] = useState(false);


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

  // This function displays a 4 Player Tournament
  const select4PlayerTournament = () => {
    console.log("4 Player tournament selected");
    setShowHome(false);
    setShow4PlayerTournament(true);
  };

  // This function displays an 8 Player Tournament
  const select8PlayerTournament = () => {
    console.log("8 Player tournament selected");
    setShowHome(false);
    setShow8PlayerTournament(true);
  };

  // This function displays the user's stats
  const selectStats = () => {
    console.log("My Stats");
    setShowHome(false);
    setShowStats(true);
  };

  const backToHome = () => {
    console.log("Back to home");
    setShow1PlayerGame(false);
    setShow2PlayerGame(false);
    setShow4PlayerTournament(false);
    setShow8PlayerTournament(false);
    setShowStats(false);
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
          <button onClick={select4PlayerTournament}><h1>4 Player Tournament</h1></button>
          <br/><br/>
          <button onClick={select8PlayerTournament}><h1>8 Player Tournament</h1></button>
          <br/><br/>
          <button onClick={selectStats}><h1>My Stats</h1></button>
          <br/><br/>
        </div>
      )}

      {/* If show1PlayerGame is true, display a 1 Player Game */}
      {show1PlayerGame && (
        <div>
          {/* Back to Home Button */}
          <button onClick={backToHome}>Back</button>

          {/* Display a 1 Player Game */}
          <OnePlayerApp />
        </div>
      )}

      {/* If show2PlayerGame is true, display a 2 Player Game */}
      {show2PlayerGame && (
        <div>
          {/* Back to Home Button */}
          <button onClick={backToHome}>Back</button>

          {/* Display the Join window component */}
        {/*<TwoPlayerApp />*/}
          <Join/>
        </div>
      )}

      {/* If show4PersonTournament is true, display a 4 Person Tournament */}
      {show4PlayerTournament && (
        <div>
          {/* Back to Home Button */}
          <button onClick={backToHome}>Back</button>

          <h1>Create a 4 Person Tournament</h1>
        </div>
      )}

      {/* If show8PersonTournament is true, display an 8 Person Tournament */}
      {show8PlayerTournament && (
        <div>
          {/* Back to Home Button */}
          <button onClick={backToHome}>Back</button>

          <h1>Create an 8 Person Tournament</h1>
        </div>
      )}

      {/* If showStats is true, display an 8 Person Tournament */}
      {showStats && (
        <div>
          {/* Back to Home Button */}
          <button onClick={backToHome}>Back</button>

          <h1>My Stats</h1>
        </div>
      )}

    </div>
  );
}



export default App;
