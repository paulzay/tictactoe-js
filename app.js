const playerFactory = (name, marker) => {
	return {
		name,
		marker
	}
};

const gameBoard = (() => {
	let board = ['','','','','','','','','']

	let player1 = playerFactory('', 'X');
	let player2 = playerFactory('', 'O');

	player1.name = prompt('Enter your name player1')
	player2.name = prompt('Enter your name player2')
	const players = [player1, player2] 

	let currentPlayerName = player1.name;
	let currentPlayerMarker = player1.marker;

	let messageBoard = document.querySelector('.game-board');
	const currentPlayerTurn = () => `It is now your turn ${currentPlayerName}`;
	const winningMessage = () => `${currentPlayerName} wins`;
	const drawMessage = () => `It is a draw`;
	gameOn = true;


	const resetGame = () => {
	    location.reload()
	}
	document.querySelector('.game-reset').addEventListener('click', resetGame);

	const clearBoard = () =>{
		gameOn = true;
		let currentPlayerMarker = player1.marker;
		let currentPlayerName = player1.name;
		board = ["", "", "", "", "", "", "", "", ""];
		messageBoard.innerHTML = currentPlayerTurn();
		document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = '')
	}
	document.querySelector('.clear-board').addEventListener('click', clearBoard);

	const takeTurns = () =>{
		currentPlayerMarker = currentPlayerMarker === 'X'? 'O' : 'X';
		currentPlayerName = currentPlayerName === player1.name ? player2.name : player1.name;
		messageBoard.innerHTML = currentPlayerTurn();
	}


  const checkWinner = () => {
  	let winner = false;
    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]
    let result = winConditions.some((indices) => {
      return (
        board[indices[0]] == currentPlayerMarker &&
        board[indices[1]] == currentPlayerMarker &&
        board[indices[2]] == currentPlayerMarker
      );
    });

    if (result == true) {
      winner = true;
      messageBoard.innerHTML = winningMessage();
      gameOn = false;

      return;

    }


    if (!board.some((e) => e === "") && winner == false) {
        messageBoard.innerHTML = drawMessage();
      	gameOn = false;
      	return;

    }

    takeTurns();
  }

	const placeMarker = (clickedCell, clickedCellIndex) => {
	  	board[clickedCellIndex] = currentPlayerMarker;
	    clickedCell.innerHTML = currentPlayerMarker;
	}
	const checkCellClick =(clickedCellEvent) => {
		const clickedCell = clickedCellEvent.target;
	    const clickedCellIndex = parseInt(
	      clickedCell.getAttribute('data-cell-index')
	    );
	    if (board[clickedCellIndex] !== "" || !gameOn) {
	        return;
	    }
	    placeMarker(clickedCell, clickedCellIndex);
	    checkWinner();
	};

	document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', checkCellClick));


})();


