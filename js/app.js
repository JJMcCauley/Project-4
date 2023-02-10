/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */
const app = {
    playCount: 0
};
const startGameBtn = document.querySelector('#btn__reset');
startGameBtn.addEventListener('click', () => {
    startGame();
})

document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && document.getElementById('overlay').style.display !== 'none') {
        startGame();
    }
} )

const keyboard = document.getElementById('qwerty');
keyboard.addEventListener('click', (e) => {
    if ((e.target.nodeName === 'BUTTON') && ((!e.target.classList.contains('chosen')) || (!e.target.classList.contains('chosen')) || (!e.target.disabled))) {
        app.game.handleInteraction(e.target)
    }
})

function startGame() {
    app.playCount++;
    app[`game${app.playCount}`] = new Game();
    app[`game${app.playCount}`].startGame();
    console.log(app[`game${app.playCount}`])
}