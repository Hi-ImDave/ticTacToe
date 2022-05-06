// This file is the main controller for the game. Will combine both the view and model for the tic tac toe game.

// import the board from Game.js
import Game from "./Game.js"; 

// import html and logic from GameView.js
import GameView from './GameView.js'; 

// create a new instance of the game
let game = new Game(); 

// create new instance of GameView
let gameView = new GameView(document.getElementById('app'));


//define functions

// runs when user clicks on tile
gameView.onTileClick = function(i){

    // runs makeMove passing in X or O
    game.makeMove(i)

    // passes through the current state of the game
    gameView.update(game);
}


// runs when user clicks on restart
gameView.onRestartClick = function(){

    // starts a new game
    game = new Game()

    // passes through current state of game
    gameView.update(game)
};

// updates game with current state of game passed in
gameView.update(game)


