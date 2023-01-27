/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */
const app = {};
const startGameBtn = document.querySelector('#btn__reset');
startGameBtn.addEventListener('click', () => {
    app.game = new Game();
    app.game.startGame();
    console.log(app.game)
})

const keyboard = document.getElementById('qwerty');
keyboard.addEventListener('click', (e) => {
    if (e.target.nodeName === 'BUTTON') {
        app.game.handleInteraction(e.target)
    }
})
