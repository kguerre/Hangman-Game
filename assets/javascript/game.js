//make array of word options (all lowercase)
var wordsList = [
"yosemite",
"yellowstone",
"zion",
"arches",
"sequoia",
"everglades",
"badlands",
"redwood"];

var chosenWord = "";
var lettersInChosenWord = [];
var numBlanks = 0;
var blanksAndSuccesses = [];
var wrongGuesses = [];

var winCounter = 0;
var lossCounter = 0;
var numberOfGuesses = 10;

//startGame()
function startGame() {  
//Solution is chosen randomly form wordList (Like RPS)      
  chosenWord = wordsList[Math.floor(Math.random() * wordsList.length)];
//The word is broken into indiviudal letters. (convert string to array of letters)  
  lettersInChosenWord = chosenWord.split("");
//We count the number of letter in the word. (tells us number of numBlanks)  
  numBlanks = lettersInChosenWord.length;
//We print the solution in console (for testing).  
  console.log(chosenWord);
  console.log(numBlanks);
//reset the guess and success array at each round. Array of letters (first array, for successful guesses)
  numberOfGuesses = 10;
  blanksAndSuccesses = [];
//reset the wrong guesses from the previous round. Array of letters (second array, one for fails)
  wrongGuesses = [];
//Fill up the blanksAndSuccesses list with appropriate number of blanks.  
  for (var i = 0; i < numBlanks; i++) {
    blanksAndSuccesses.push("_ ");
  }
  console.log(blanksAndSuccesses);
//update html on the page
//set #guesses-left to numberOfGuesses
  document.getElementById("guesses-left").innerHTML = numberOfGuesses;
//set #word-blanks to the blanks at the beginning of each round in the HTML
  document.getElementById("word-blanks").innerHTML = blanksAndSuccesses.join("");
//set #wrong-guesses to empty/clear the wrong guesses from the previous round
  document.getElementById("wrong-guesses").innerHTML = wrongGuesses;
}
//checkLetters() function
function checkLetters(letter) {

  var letterInWord = false
//check if a letter exists in the array at all. (by looping thru the word as an array)
  for(var i = 0; i < numBlanks; i++){
//If the letter exists then toggle this boolean to true
    if(chosenWord[i] === letter) {
      letterInWord = true;
    }
  }
//If 'letterInWord', then figure out exactly where (which indices)  
  if(letterInWord) {
//Loop through the word, one letter at a time
//Populate the blanksAndSuccesses with every instance of the letter.
    for(var i = 0; i < numBlanks; i++) {
//if chosenWord letter is the same as letter
      if(chosenWord[i] === letter) {
//Here we set the specific space in blanks and letter equal to the letter when there is a match
        blanksAndSuccesses[i] = letter;
      }
    }
  }else {
    numberOfGuesses--
  }
//If the letter doesn't exist at all...  
  if(wrongGuesses.indexOf(letter) === -1) {
//...then we add the letter to the list of wrong letters
        wrongGuesses.push(letter);
//If letter guessed exists in wrongGuesses array, alert user that letter has already been guessed
  }else {
    (wrongGuesses.indexOf(letter) === wrongGuesses[i]) 
    alert("You already guessed this letter");
 }
}

//roundComplete() function
function roundComplete() {
//Update the HMTL to reflect the new number of guesses. Also update the correct guesses.
  document.getElementById("guesses-left").innerHTML = numberOfGuesses;
//Update #word-blanks to show any correct guesses
  document.getElementById("word-blanks").innerHTML = blanksAndSuccesses.join("");
//Update #wrong-guesses to show the wrong guesses
  document.getElementById("wrong-guesses").innerHTML = wrongGuesses.join("");
//If we have gotten all the letters to match the solution...  
  if(lettersInChosenWord.join("") === blanksAndSuccesses.join("")) {
//...add tot he win counter & give the user an alert    
    winCounter++
    alert("You win!")
//Update the win counter in the HTML & restart the game.
    document.getElementById("win-counter").innerHTML = winCounter;
    startGame();
//If we've run out of guesses...
  }else if(numberOfGuesses === 0) {
//Add to the loss counter
    lossCounter++;
//Give the user an alert
    alert("No guesses left!");
    wrongGuesses =[];
//Update the loss counter in the HTML
    document.getElementById("loss-counter").innerHTML = lossCounter;
    startGame();
  }
  
}
//on initial page load Starts the Game by running the startGame() function
startGame();
//Then initiate the function for capturing key clicks.
document.onkeyup = function(event) {
//Converts all key clicks to lowercase letters
  var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
//Runs the code to check for correctness
  checkLetters(letterGuessed);
//Runs the code after each round is done
  roundComplete();
}