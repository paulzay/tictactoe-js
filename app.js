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
	};

	const resetGame = () => {
	    location.reload()
	}
	document.querySelector('.game-reset').addEventListener('click', resetGame);

	const clearBoard = () =>{
		gameOn = true;
		let currentPlayerMarker = player1.marker;
		let currentPlayerName = player1.name;
		board = ["", "", "", "", "", "", "", "", ""];
		document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = '')
	}
	document.querySelector('.clear-board').addEventListener('click', clearBoard);
	// const play = (target, marker) => {
	// 	board[target] = currentPlayerMarker;
	// }
	document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', checkCellClick));

})();


