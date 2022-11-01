import gameLog from '../../app/gameLog';
import fs from 'fs';

describe('gameLog', () => {
  const gameData = [
    {
      game_0: {
        total_kills: 0,
        players: ['Isgalamido'],
        kills: {},
        kills_by_means: {},
      },
    },
  ];

  const quakeGameLog = fs
    .readFileSync('src/__tests__/gameLog/data.log', 'utf8')
    .toString();

  it('Should return object each match and a player ranking', () => {
    const game = gameLog(quakeGameLog);
    expect(game).toEqual(gameData);
  });
});
