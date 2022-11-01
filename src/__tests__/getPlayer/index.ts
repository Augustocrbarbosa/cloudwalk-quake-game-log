import fs from 'fs';
import getPlayer from '../../app/functions/getPlayer';

describe('getPlayer', () => {
  const lineAction = fs
    .readFileSync('src/__tests__/getPlayer/data.log', 'utf8')
    .toString();

  const gameData = {
    total_kills: 0,
    players: [],
    kills_by_means: {},
    kills: {},
  };

  it('Should return empty players', () => {
    const players = getPlayer({ gameData, lineAction: '' }).players;
    expect(players.length).toBe(0);
  });

  it('Should return players', () => {
    const players = getPlayer({ gameData, lineAction }).players;
    expect(players.length).toBeGreaterThan(0);
  });
});
