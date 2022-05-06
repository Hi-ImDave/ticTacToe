//this file represents a single game of tic tac toe

export default class Game{ 

    // defining what happens when a new game of tic tac toe is started
    constructor(){ 

        // starting turn will be 'X', can be 'O' if youd like
        this.turn = 'X' 

        // starting board will be an array of 9 elements (3x3 board). Will be filled with default value of null because empty board to start game
        this.board = new Array(9).fill(null); 
    }

    // toggles the turn of the game between 'player X' and 'player O'
    nextTurn(){ 

        // if current turn is 'X' make it 'O' or vice versa
        this.turn = this.turn === 'X'? 'O' : 'X' 
    }

    // setting index of board array to be current turn
    makeMove(i){

        // checks if the game is still in progress. If there are no more moves available to make, the turn is not executed.
        if(!this.isInProgress()){
            return;
        }

        // checks if position is already occupied. If it is, then the turn is not executed.
        if(this.board[i]){ 
            return;
        }

        // places player marker (X or O) at specified index
        this.board[i] = this.turn; 
        
        // toggles player turn as long as there is no winning combination on the board
        if(!this.findWinningCombination()){

            // executes method on line 12
            this.nextTurn(); 
        }
    }
    
    // method used to determine if there is a winning combination on the board
    findWinningCombination(){ 

        // array of all the possible winning combinations on the board
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

        // iterates through winningCombinations and subs indexes into combination. will run 8 times
        for(const combination of winningCombinations){

            // array destructuring. taking each combination in the loop and inserting them into the const [a,b,c]
            const [a, b, c] = combination; 

            // if index a is not empty and index a is equal to index b and index c
            if(this.board[a] && (this.board[a] === this.board[b] && this.board[a] === this.board[c])){ 

                // returns winning combination
                return combination
            }
        }

        // returns null if there is no winning combination
        return null;
    }

    // checks to see if game is still in progress
    isInProgress(){ 

        // if there is no winning combination and there is still a null somewhere on the board
        return !this.findWinningCombination() && this.board.includes(null) 
    }
}