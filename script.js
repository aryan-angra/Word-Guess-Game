const inputs = document.querySelector(".inputs"),
    resetBtn = document.querySelector(".reset-btn"),
    hint = document.querySelector(".hint span"),
    guessLeft = document.querySelector(".guess-left span")
    wrongLetter = document.querySelector(".wrong-letter span"),
    typingInput = document.querySelector(".typing-input");
let word,maxGuessess, incorrects = [], corrects = [];
function randomWord() {
    let ranObj = wordList[Math.floor(Math.random() * wordList.length)];
    word = ranObj.word;
    maxGuessess = 8;  incorrects = []; corrects = [];

    hint.innerText = ranObj.hint;
    guessLeft.innerText = maxGuessess;
    wrongLetter.innerText = incorrects;

    let html = "";
    for (let i = 0; i < word.length; i++) {
        html += `<input type="text" disabled>`;
    }
    inputs.innerHTML = html;
}
randomWord();
function initGame(e) {
    let key = e.target.value;
    if (key.match(/^[A-Za-z]+$/) && !incorrects.includes(` ${key} `) && !corrects.includes(key)) {
        if (word.includes(key)) {
            for (let i = 0; i < word.length; i++) {
                if (word[i] === key) {
                    corrects.push(key);
                    inputs.querySelectorAll("input")[i].value = key;
                }

            }
        }
        else {
            maxGuessess--;
            incorrects.push(` ${key} `);
        }
        guessLeft.innerText = maxGuessess;
        wrongLetter.innerText = incorrects;
    }
        typingInput.value = "";
    setTimeout(() =>{
        if(corrects.length == word.length){
            alert(`Congrats! You found the word ${word.toUpperCase()}`);
            randomWord();
        }
        else if(maxGuessess < 1){
            alert("Game over ! You don't have remaining guesses");
            for (let i = 0; i < word.length; i++) {
                
                    inputs.querySelectorAll("input")[i].value = word[i];
                }

            }
    });
        }
resetBtn.addEventListener("click", randomWord);
typingInput.addEventListener("input", initGame);
document.addEventListener("keydown", () => typingInput.focus());
inputs.addEventListener("click", () => typingInput.focus());
