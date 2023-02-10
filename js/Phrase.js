/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

class Phrase {
    constructor(phrase) {  
        console.log(phrase)
        this.phrase = phrase.toLowerCase();
    }

    addPhraseToDisplay() {
        const phraseUL = document.querySelector('#phrase ul')
        const phraseArray = [];
        for (let i = 0; i < this.phrase.length; i++) {
            const letter = this.phrase[i];
            let letterHTML = '';
            if ((/[a-zA-Z]/).test(letter)) {
                letterHTML = `<li class="hide letter ${letter}">${letter}</li>`;
            }
            else if (/\s/g.test(letter)) {
                letterHTML = `<li class="hide space"></li>`;
            }
            phraseArray.push(letterHTML)
        }
        for (let i = 0; i < phraseArray.length; i++) {
            phraseUL.insertAdjacentHTML('beforeend', phraseArray[i])
        }
    }

    checkLetter(letter) {
        for (let i = 0; i < this.phrase.length; i++) {
            const phraseLetter = this.phrase[i];
            if (letter === phraseLetter) {
                return true
            }
        }
        return false;
    }

    showMatchedLetter(letter) {
        // reveals letter(s) on board that matches player selection, selects all letter DOM elements that have a CSS class name that matches selected letter and replace each selected element's hide CSS class with the show CSS class
        const boardLetters = document.querySelectorAll(`.${letter}`)
        if (boardLetters.length > 0) {
            for (let i = 0; i < boardLetters.length; i++) {
                const boardLetter = boardLetters[i];
                boardLetter.classList.replace('hide', 'show')
            }
        }
    }
}