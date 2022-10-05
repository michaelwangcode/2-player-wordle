import wordBank from "../wordle-bank.txt";                  // Possible starting words
import completeWordBank from "../complete-word-bank.txt"    // Every 5 letter word


// The default starting board
export const boardDefault = [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""]
];


// The opponent's default starting board in 2 Player mode
export const boardDefault2 = [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""]
];


// Generate an array of words as well as secret word to guess
export const generateWordSet = async () => {

  // The array of possible words
  let wordSet;

  // The secret word to guess
  let todaysWord;
  

  // Fetch the secret word from the smaller word set
  await fetch(wordBank)
    .then((response) => response.text())
    .then((result) => {
      const wordArr = result.split("\n");

      // Store the secret word
      todaysWord = wordArr[Math.floor(Math.random() * wordArr.length)]
    });


  // Fetch the complete word set
  await fetch(completeWordBank)
    .then((response) => response.text())
    .then((result) => {
      const wordArr = result.split("\n");

      // Store the complete word array
      wordSet = new Set(wordArr)
    });

  return { wordSet, todaysWord };
};