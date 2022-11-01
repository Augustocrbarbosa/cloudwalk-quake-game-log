import getPlayer from '../../app/functions/getPlayer';

describe('getPlayer', () => {
  const lineAction =
    '6:34 ClientUserinfoChanged: 7 n\\Mal\\t\\0\\model\\sarge\\hmodel\\sarge\\g_redteam\\\\g_blueteam\\\\c1\\4\\c2\\5\\hc\\100\\w\\0\\l\\0\\tt\\0\\tl\\0';

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
