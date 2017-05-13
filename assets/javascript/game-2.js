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
var numberOfGuesses = 9;

function startGame() {	
  		
  chosenWord = wordsList[Math.floor(Math.random() * wordsList.length)];
  lettersInChosenWord = chosenWord.split("");
  numBlanks = lettersInChosenWord.length;
  console.log(chosenWord);
  console.log(numBlanks);

  numberOfGuesses = 9;
  blanksAndSuccesses = [];
  wrongGuesses = [];
  
  for (var i = 0; i < numBlanks; i++) {
  	blanksAndSuccesses.push("_ ");
  }
  console.log(blanksAndSuccesses);
  document.getElementById("guesses-left").innerHTML = numberOfGuesses;
  document.getElementById("word-blanks").innerHTML = blanksAndSuccesses.join("");
  document.getElementById("wrong-guesses").innerHTML = wrongGuesses;
}

function checkLetters(letter) {

  var letterInWord = false
  for(var i = 0; i < numBlanks; i++){
  	if(chosenWord[i] === letter) {
  		letterInWord = true;
  	}
  }

  if(letterInWord) {
    for(var i = 0; i < numBlanks; i++) {
      if(chosenWord[i] === letter) {
        blanksAndSuccesses[i] = letter;
      }
    }

  }else{
  	numberOfGuesses--
    wrongGuesses.push(letter)
  }
}


function roundComplete() {
  document.getElementById("guesses-left").innerHTML = numberOfGuesses;
  document.getElementById("word-blanks").innerHTML = blanksAndSuccesses.join("");
  document.getElementById("wrong-guesses").innerHTML = wrongGuesses.join("");
  
  if(lettersInChosenWord.join("") === blanksAndSuccesses.join("")) {
    winCounter++
    alert("You win!")
    document.getElementById("win-counter").innerHTML = winCounter;
    startGame();

  }else if(numberOfGuesses === 0) {
  	lossCounter++;
    alert("No guesses left!");
  	wrongGuesses =[];
  	document.getElementById("loss-counter").innerHTML = lossCounter;
    startGame();
  }
  
}

startGame();

document.onkeyup = function(event) {
  var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
  checkLetters(letterGuessed);
  roundComplete();
};