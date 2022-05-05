//this file represents a single game of tic tac toe

export default class Game{ 
    constructor(){ // defining what happens when a new game of tic tac toe is started
        this.turn = 'X' // starting turn will be 'X', can be 'O' if youd like
        this.board = new Array(9).fill(null); // starting board will be an array of 9 elements (3x3 board). filled with default value of null because empty board to start game
    }

    nextTurn(){ // toggles the turn of the game
        this.turn = this.turn === 'X'? 'O' : 'X' // if current turn is 'X' make it 'O' or vice versa
    }

    makeMove(i){
        if(!this.isInProgress()){
            return;
        }
        if(this.board[i]){ // checks if position is already occupied
            return;
        }
        this.board[i] = this.turn; // places item at index
        
        if(!this.findWinningCombination()){
            this.nextTurn(); // toggles player if game is still playable
        }
    }
    findWinningCombination(){ // array of winning combinations
        const winningCombinations = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ];

    


        for(const combination of winningCombinations){
            const [a, b, c] = combination; // iterates through winningCombinations and subs indexes into combination. array destructuring

            if(this.board[a] && (this.board[a] === this.board[b] && this.board[a] === this.board[c])){ // if index a is not empty and is equal to index b and c 
                return combination
            }
        }
        return null;
    }

    isInProgress(){ // checks to see if game is still in progress
        return !this.findWinningCombination() && this.board.includes(null) // if there is no winning combination and there is still a null on the board
    }
}