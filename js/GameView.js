// This file will contain all the logic to render the view of the game as well as reacting to updates to the game.

export default class GameView {

    // takes in argument for root element
    constructor(root) {

        // maintaining reference to root element
        this.root = root;

        // this will be the board. 'header' will be the top bar of the board containing information on the current turn, game progress, and the refresh button. 'board' will contain all the board tiles for play and will have data attribute to index every tile.
        this.root.innerHTML = `
            <div class="header">
                <div class="header__turn"></div>
                <div class="header__status"></div>
                <button type="button" class="header__restart">
                    <i class="material-icons">refresh</i>
                </button>
            </div>
            <div class="board">
                <div class="board__tile" data-index="0"></div>
                <div class="board__tile" data-index="1"></div>
                <div class="board__tile" data-index="2"></div>
                <div class="board__tile" data-index="3"></div>
                <div class="board__tile" data-index="4"></div>
                <div class="board__tile" data-index="5"></div>
                <div class="board__tile" data-index="6"></div>
                <div class="board__tile" data-index="7"></div>
                <div class="board__tile" data-index="8"></div>
            </div>
        `;


        this.onTileClick = undefined;
        this.onRestartClick = undefined;

        // selects every board tile element
        this.root.querySelectorAll(".board__tile").forEach(tile => {

            // adds a click event listener to each tile
            tile.addEventListener("click", () => {

                // if tile is clicked, onTileClick (main:19) will run, passing in the index of the tile clicked
                if (this.onTileClick) {
                    this.onTileClick(tile.dataset.index);
                }
            });
        });

        // selects the restart button and adds a click event listener to it
        this.root.querySelector(".header__restart").addEventListener("click", () => {
            // if restart is clicked, onRestartClick (main:25) is run
            if (this.onRestartClick) {
                this.onRestartClick();
            }
        });
    }

    // takes in a game as parameter and updates full game
    update(game) {
        this.updateTurn(game);
        this.updateStatus(game);
        this.updateBoard(game);
    }

    // updates which players turn it currently is
    updateTurn(game) { 
        this.root.querySelector(".header__turn").textContent = `${game.turn}'s turn`;
    }

    // updates status of the game. winner, tie or in progress
    updateStatus(game) {

        // defines status with default of in progress
        let status = "In Progress";

        // if there is a winner in the game, sets status to current winner
        if (game.findWinningCombination()) {
            status = `${game.turn} is the Winner!`;

        // if the game is not in progress and no winner then status is set to a tie
        } else if (!game.isInProgress()) {
            status = "It's a tie!";
        }

        // passes status into game header
        this.root.querySelector(".header__status").textContent = status;
    }

    // updates the board
    updateBoard(game) {

        // grabs current winning combination if there is any
        const winningCombination = game.findWinningCombination();

        // loops through all board tiles
        for (let i = 0; i < game.board.length; i++) {

            // indexes each boardTile to tile
            const tile = this.root.querySelector(`.board__tile[data-index="${i}"]`);

            // ensures previous games do not interfere with current game
            tile.classList.remove("board__tile--winner");

            // grabs X or O value
            tile.textContent = game.board[i];

            // check if value (X or O) is a part of winning combination add class to winningCombination tiles
            if (winningCombination && winningCombination.includes(i)) {
                tile.classList.add("board__tile--winner");
            }
        }
    }
}