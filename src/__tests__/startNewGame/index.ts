import startNewGame from '../../app/functions/startNewGame';

describe('getPlayer', () => {
  const gameData = {
    game_0: {
      total_kills: 0,
      players: [],
      kills_by_means: {},
      kills: {},
    },
  };

  it('Should return object new game data', () => {
    const newGame = startNewGame(0);
    expect(newGame).toEqual(gameData);
  });
});
