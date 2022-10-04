import './App.css';
import Join from "./Join";
import { useState } from "react";



// The main application component
function App() {


  // Hook that determines whether or not to show the home buttons
  const [showJoin, setShowJoin] = useState(false);


  const select2PlayerGame = () => {

    console.log("2 Player game selected");

    setShowJoin(true);
  };


  const backToHome = () => {

    console.log("Back to home");

    setShowJoin(false);
  };




  // Return the main App component
  return (

    <div className="App">
      
      { !showJoin ? (

      <div>
        <br/><br/>
        <button><h1>1 player game</h1></button>
        <br/><br/>
        <button onClick={select2PlayerGame}><h1>2 player game</h1></button>
        <br/><br/>
        <button><h1>4 player tournament</h1></button>
        <br/><br/>
        <button><h1>8 player tournament</h1></button>
      </div>
      ) 
      : (
        <div>
          {/* Back to Home Button */}
          <button onClick={backToHome}><h1>Back</h1></button>

          {/* Display the Join window component */}
          <Join />
        </div>
      )}


    </div>
  );
}

export default App;
