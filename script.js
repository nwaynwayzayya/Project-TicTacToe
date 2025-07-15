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
    return {
        render, 
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
    }

    const handleClick = (event) => {
        let index = parseInt(event.target.id.split("-")[1]);
        console.log(index);
    }

    return {
        start,
        handleClick,
    }
})();

// Start button variable and event listener for it.
const startButton = document.querySelector("#start-button");
startButton.addEventListener("click", () => {
    Game.start();
})