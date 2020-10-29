export const playerFactory = (name, marker) => ({
  name,
  marker,
});

export const winConditions = [[0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

export const getBoard = (() => {
  const board = ['', '', '', '', '', '', '', '', ''];
  return board;
});

export const clearBoard = (messageBoard, turn) => {
  messageBoard.innerHTML = turn;
  document.querySelectorAll('.cell').forEach(cell => { cell.innerHTML = ''; });
};

export const drawMessage = () => 'It is a draw';

export const winningMessage = currentPlayerName => `${currentPlayerName} wins`;

export const currentPlayerTurn = currentPlayerName => `It is now your turn ${currentPlayerName}`;

export const gameBoard = (() => {
  let gameOn = true;
  let board = getBoard();
  const player1 = playerFactory('', 'X');
  const player2 = playerFactory('', 'O');

  let ask = true;
  while (ask) {
    player1.name = prompt('Enter your name player1'); // eslint-disable-line no-alert
    if (player1.name !== '') {
      player2.name = prompt('Enter your name player2'); // eslint-disable-line no-alert
      if (player2.name !== '') {
        ask = false;
        break;
      }
    }
  }

  let currentPlayerName = player1.name;
  let currentPlayerMarker = player1.marker;

  const messageBoard = document.querySelector('.game-board');
  
  const resetGame = () => { window.location.reload(); };

  document.querySelector('.game-reset').addEventListener('click', resetGame);


  document.querySelector('.clear-board').addEventListener('click', () => {
    board = getBoard();
    clearBoard(messageBoard, currentPlayerTurn(currentPlayerName));
    gameOn = true;
  });

  function takeTurns() {
    currentPlayerMarker = currentPlayerMarker === 'X' ? 'O' : 'X';
    currentPlayerName = currentPlayerName === player1.name ? player2.name : player1.name;
    messageBoard.innerHTML = currentPlayerTurn(currentPlayerName);
  }


  const checkWinner = () => {
    let winner = false;
    const result = winConditions.some((indices) => (
      board[indices[0]] === currentPlayerMarker
      && board[indices[1]] === currentPlayerMarker
      && board[indices[2]] === currentPlayerMarker
    ));

    if (result === true) {
      winner = true;
      messageBoard.innerHTML = winningMessage(currentPlayerName);
      gameOn = false;

      return;
    }


    if (!board.some((e) => e === '') && winner === false) {
      messageBoard.innerHTML = drawMessage();
      gameOn = false;
      return;
    }

    takeTurns();
  };

  const placeMarker = (clickedCell, clickedCellIndex) => {
    board[clickedCellIndex] = currentPlayerMarker;
    clickedCell.innerHTML = currentPlayerMarker;
  };
  const checkCellClick = (clickedCellEvent) => {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(
      clickedCell.getAttribute('data-cell-index'), 10,
    );
    if (board[clickedCellIndex] !== '' || !gameOn) {
      return;
    }
    placeMarker(clickedCell, clickedCellIndex);
    checkWinner();
  };

  document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', checkCellClick));
});
