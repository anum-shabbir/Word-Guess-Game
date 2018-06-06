var countryList = ["canada", "pakistan", "italy"];

var total_guess = 9;
var user_guess = [];
var word_guess = [];
var rem_guess = 0;
var reset_game = false;
var game_over = false;
var wins = 0;
var word_guess_num;


function resetGame() {

    rem_guess = total_guess;
    reset_game = false;
    user_guess = [];
    word_guess = [];

    // Select random word
    word_guess_num = Math.floor(Math.random() * (countryList.length));

    // display dashes for the word to guess
    for (var i = 0; i < countryList[word_guess_num].length; i++) {
        word_guess.push("_");
    }
    // hide messages 
    document.getElementById("play_again").style.cssText = "display: none";
    document.getElementById("win_msg").style.cssText = "display: none";
    document.getElementById("lose_msg").style.cssText = "display: none";

    updateDisplay();

};

function updateDisplay() {
    document.getElementById("totalWins").innerText = wins;
    document.getElementById("currentWord").innerText = "";
    for (var j = 0; j < word_guess.length; j++) {
        document.getElementById("currentWord").innerText += word_guess[j];

    }
    document.getElementById("remainingGuesses").innerText = rem_guess;
    document.getElementById("guessedLetters").innerText = user_guess;

    if (rem_guess <= 0) {
        document.getElementById("lose_msg").style.cssText = "display: block";
        document.getElementById("play_again").style.cssText = "display: block";
        game_over = true;
    }

};

document.onkeydown = function (event) {
    // keystroke to start the game 
    if (game_over) {
        resetGame();
        game_over = false;
    }
    else {
        // Get input letters only 
        if(event.keyCode >= 65 && event.keyCode <= 90) {
            guessLetter(event.key.toLowerCase());
        }
    }
};


function guessLetter(letter) {
    if (rem_guess > 0) {
        if (!reset_game) {
            reset_game = true;
        }
// Check if the letter guessed is not already used
        if (user_guess.indexOf(letter) === -1) {
            user_guess.push(letter);
            checkGuess(letter);
        }
    }
    updateDisplay();
    checkWin();
};

// Checks all instances for letter position and replace them
function checkGuess(letter) {
    var position = [];

    //loop to find all instances and store the index
    for (var k = 0; k < countryList[word_guess_num].length; k++) {
        if (countryList[word_guess_num][k] === letter) {
            position.push(k);
        }
    }

    //if wrong guess then subtract the remaining guesses
    if (position.length <= 0) {
        rem_guess--;
    }
    else {
        // Loop and replace dashes with letter
        for (var x = 0; x < position.length; x++) {
            word_guess[position[x]] = letter;
        }
    }
};

function checkWin() {
    if (word_guess.indexOf("_") === -1) {
        wins++;
        document.getElementById("win_msg").style.cssText = "display: block";
        document.getElementById("play_again").style.cssText = "display: block";
        game_over = true;
    }

};



