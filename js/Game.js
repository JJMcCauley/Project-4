/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

class Game {
    constructor() {
        this.missed = 0;
        this.phrases = [
            'The Wizard of Oz',
            'Twelve Angry Men',
            'Citizen Kane',
            'Casablanca',
            'Gone With The Wind'
        ];
        this.activePhrase = null;
        this.gameWon = false;
    }

    startGame() {
        // hides start screen overlay, calls getRandomPhrase(), sets activePhrase to chosen phrase, calls addPhraseToDisplay(activePhrase);
        const overlay = document.querySelector('#overlay');
        overlay.style.display = 'none';
        this.activePhrase = this.getRandomPhrase()
        this.activePhrase.addPhraseToDisplay();

    }

    getRandomPhrase() {
        // randomly retrieves one of the phrases stored in phrases array
        const randomInt = Math.floor(Math.random() * 5);
        const phrase = new Phrase(this.phrases[randomInt])
        return phrase;
    }

    handleInteraction(btnElement) {
        // handles most game logic, checks to see if button clicked by player matches a letter in phrase, and then directs game based on correct or incorrect guess
            // disable selected letter's onscreen keyboard button
            // if phrase does not include guessed letter, add wrong CSS class to seelected leter's keyboard button and call the removeLife() method
            // if phrase includes the guessed letter add the chosen CSS class to the selectred letter's keyboard button, call the showMatchedLetter() method on the prase and then call the checkForWin() method, if player has won the game also call the gameOver method
        btnElement.disabled = true;
        if (!this.activePhrase.checkLetter(btnElement.innerText)) {
            btnElement.classList.add('wrong')
            this.removeLife()
        }
        else {
            btnElement.classList.add('chosen')
            this.activePhrase.showMatchedLetter(btnElement.innerText);
            this.checkForWin()
        }
    }

    removeLife() {
        // removes a life from the scoreboasrd byreplacing a liveHeart.png with a lostHeart.png and increment missed property by one, if player has missed five guesses then call gameOver()
        const lives = document.querySelectorAll(`#scoreboard ol li img`)
        lives[4 - this.missed].src = `images/lostheart.png`;
        this.missed++;
        if (this.missed === 5) {
            this.gameOver();
        }
    }

    checkForWin() {
        // method checks to see if the player has revealed all the letters in the active phrase,f if so call gameOver()
        const letters = document.querySelectorAll('.letter')
        for (let i = 0; i < letters.length; i++) {
            if (letters[i].classList.contains('hide')){
                return
            }
        }
        this.gameWon = true;
        this.gameOver();
    }

    gameOver() {
        // method displays the original start screen overlay and, depending on outcome of the game, updates the overlay  h1 elment with a friendly win or loss message and replace the overlays start CSS class with either the win or lose CSS class
        const startScreen = document.getElementById('overlay');
        const h1Element = document.getElementById('game-over-message')

        startScreen.style.display = 'inherit';

        if (startScreen.classList.contains('lose')) {
            startScreen.classList.remove('lose');
        }
        else if (startScreen.classList.contains('win')) {
            startScreen.classList.remove('win');
        }
        
        if (this.gameWon) {
            h1Element.innerText = 'Congratulations, you won! Play again?';
            startScreen.classList.add('win');
        }
        else {
            h1Element.innerText = 'Sorry, you lost, care to try again?';
            startScreen.classList.add('lose');
        }

        this.resetBoard();        
    }

    resetBoard() {
        const phraseDisplay = document.querySelector('#phrase ul');
        const keyboardLetters = document.querySelectorAll('.key');
        const hearts = document.querySelectorAll('#scoreboard ol li img');

        phraseDisplay.innerHTML = "";
        for (let i = 0; i < keyboardLetters.length; i++) {
            const keyboardLetter = keyboardLetters[i];
            keyboardLetter.disabled = false;
            if (keyboardLetter.classList.contains('chosen')) {
                keyboardLetter.classList.remove('chosen');
            }
            if (keyboardLetter.classList.contains('wrong')) {
                keyboardLetter.classList.remove('wrong');
            }
        }

        for (let i = 0; i < hearts.length; i++) {
            const heart = hearts[i];
            heart.src = 'images/liveHeart.png';
        }

        this.gameWon = false;
    }
}