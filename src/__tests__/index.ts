import { existsSync } from 'fs';
import { parseGameLog } from '../app/GameLog';

describe('Logs', () => {
  it('Read Log', () => {
    const qGamesLog = existsSync('src/logs/qgames.log');
    expect(qGamesLog).toBe(true);
  });
});

describe('Game Results', () => {
  it('Can not be null', () => {
    const logGames = parseGameLog();
    expect(logGames && typeof logGames).not.toBeNull();
  });

  it('At least 1 player', () => {
    const logGames = parseGameLog();
    let index = 0;
    if (!logGames) {
      return expect(logGames && typeof logGames).not.toBeNull();
    }
    for (const logGame of logGames) {
      expect(logGame[`game_${index}`].players.length > 0).toBe(true);
      index++;
    }
  });

  it('Check typing results', () => {
    const logGames = parseGameLog();
    let index = 0;
    if (!logGames) {
      return expect(logGames && typeof logGames).not.toBeNull();
    }

    expect(Array.isArray(logGames)).toBe(true);

    for (const logGame of logGames) {
      const { total_kills, players, kills, kills_by_means } =
        logGame[`game_${index}`];

      expect(typeof total_kills).toBe('number');
      expect(Array.isArray(players)).toBe(true);
      expect(typeof kills === 'object').toBe(true);
      expect(typeof kills_by_means === 'object').toBe(true);
      index++;
    }
  });
});
