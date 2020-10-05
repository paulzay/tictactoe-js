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
	const currentPlayerTurn = () => `It is now your turn ${currentPlayerName}`

	const placeMarker = (event) => {
		event.addEventListener('click', )
	}

})();
