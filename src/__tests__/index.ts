import fs, { existsSync } from 'fs';
// import { parseGameLog } from '../app/GameLog';
// import { GameDataType } from '../typings';

describe('exist game logs', () => {
  it('example', () => {
    const qGamesLog = fs.existsSync('src/logs/qgames.log');
    expect(qGamesLog).toBe(true);
  });
});
