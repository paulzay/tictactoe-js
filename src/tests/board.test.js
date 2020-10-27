import {
  winConditions, playerFactory, getBoard,
} from '../logic';


test('the board should initially be empty', () => {
  expect(getBoard()).toEqual(['', '', '', '', '', '', '', '', '']);
});


test('There should be 8 possible winning conditions', () => {
  expect(winConditions.length).toEqual(8);
});

test('winConditions should be an array', () => {
  expect(typeof winConditions).toBe('object');
});

test('Should contain 8 different winning conditions', () => {
  expect(winConditions).toContainEqual([0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]);
});

test('The playerFactory has name', () => {
  expect(playerFactory('Player1', 0).name).toBe('Player1');
});
