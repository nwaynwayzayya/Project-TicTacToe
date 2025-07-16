// Display controller to show message like who wins and if it's a tie
const displayController = (() => {
    const renderMessage = (message) => {
        document.querySelector("#message").innerHTML = message;
    }

    return {
        renderMessage,
    }
})();



// Gameboard module
const Gameboard = (() => {
    let gameboard = ["", "", "", "", "", "", "", "", ""];

    // Method to render the squares
    const render = () => {
        let boardHTML = "";
        gameboard.forEach((square, index) => {
            boardHTML += `<div class="square" id=square-${index}>${square}</div>`;
        })
        document.querySelector("#gameboard").innerHTML = boardHTML;
        // select all the squares on the gameboard
        const squares = document.querySelectorAll(".square");
        // function to click the squares
        // handleClick is called from the module Game
        squares.forEach((square) => {
            square.addEventListener("click", Game.handleClick);
        })
    }
    // Method to update the square with X or O
    const update = (index, value) => {
        gameboard[index] = value;
        render();
    }

    // Accessor method to gameboard
    // This returns the gameboard indirectly so we cannot modify it
    const getGameboard = () => gameboard;

    return {
        render, 
        update, 
        getGameboard,
    }
})();


// Factory for creating players
const createPlayer = (name, mark) => {
    return {
        name,
        mark
    }
}

// Module for controlling the logic of the entire game -- encapsulate the functions of the game
const Game = (() => {
    let players = [];
    let currentPlayerIndex;
    let gameOver = false;

    const start = () => {
        players = [
            createPlayer(document.querySelector("#player1").value, "X"),
            createPlayer(document.querySelector("#player2").value, "O")
        ]
        currentPlayerIndex = 0;
        gameOver = false;
        Gameboard.render();
        // select all the squares on the gameboard
        const squares = document.querySelectorAll(".square");
        // function to click the squares
        // handleClick is called from the module Game
        squares.forEach((square) => {
            square.addEventListener("click", handleClick);
        })
    }

    const handleClick = (event) => {
        if (gameOver) {
            return;
        }
        let index = parseInt(event.target.id.split("-")[1]);

        // Makes sure the player can't click the square twice
        if (Gameboard.getGameboard() [index] !== "") {
            return;
        }

        Gameboard.update(index, players[currentPlayerIndex].mark);

        if (checkForWin(Gameboard.getGameboard(), players[currentPlayerIndex].mark)) {
            gameOver = true; 
            displayController.renderMessage(`${players[currentPlayerIndex].name} won!`);
        } else if  (checkForTie(Gameboard.getGameboard())) {
            gameOver = true;
            displayController.renderMessage(`It's a tie!`);
        }

        // logic to switch players
        currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;


    }

    // Function to restart the game
    const restart = () => {
        for (let i = 0; i < 9; i++) {
            Gameboard.update(i, "");
        }
        Gameboard.render();
        gameOver = false;
        document.querySelector("#message").innerHTML = "";
    }

    return {
        start,
        handleClick,
        restart,
    }
})();


/// Function for checking for win
function checkForWin(board) {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5], 
        [6, 7, 8], 
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8], 
        [0, 4, 8], 
        [2, 4, 6]
    ]  
    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];

        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return true;
        }
    }
    return false;
}

// Function to check for ties
function checkForTie(board) {
    return board.every(cell => cell !== "");
}

// Restart button variable and event listener for it
const restartButton = document.querySelector("#restart-button");
restartButton.addEventListener("click", () => {
    Game.restart();
})

// Start button variable and event listener for it
const startButton = document.querySelector("#start-button");
startButton.addEventListener("click", () => {
    Game.start();
})