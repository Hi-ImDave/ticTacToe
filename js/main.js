import Game from "./Game.js"; // import the board from Game.js
import GameView from './GameView.js'; // import html from GameView.js

let game = new Game(); // create a new instance of the game
let gameView = new GameView(document.getElementById('app'));


//define functions
gameView.onTileClick = function(i){
    game.makeMove(i)
    gameView.update(game);
}

gameView.onRestartClick = function(){
    game = new Game()
    gameView.update(game)
};

gameView.update(game)


