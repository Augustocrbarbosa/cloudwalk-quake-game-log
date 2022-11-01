import processKill, {
  getScoreByMeansOfDeath,
  getScoreByWorld,
  getScoreByPlayer,
} from '../../app/functions/processKill';

describe('getScoreByMeansOfDeath', () => {
  const gameData = {
    total_kills: 0,
    players: [],
    kills_by_means: {},
    kills: {},
  };

  const splitLine = [
    '13:55',
    'Kill:',
    '3',
    '4',
    '6:',
    'Oootsimo',
    'killed',
    'Dono',
    'da',
    'Bola',
    'by',
    'MOD_ROCKET',
  ];

  it('Should return empty object kills by means', () => {
    const killsByMeans = getScoreByMeansOfDeath({
      gameData,
      splitLine: [],
    }).kills_by_means;

    expect(killsByMeans).toEqual({});
  });

  it('Should return object kills by means', () => {
    const killsByMeans = getScoreByMeansOfDeath({
      gameData,
      splitLine,
    }).kills_by_means;

    expect(killsByMeans).not.toEqual({});
  });
});

describe('getScoreByWorld', () => {
  const gameData = {
    total_kills: 131,
    players: [
      'Isgalamido',
      'Oootsimo',
      'Dono da Bola',
      'Assasinu Credi',
      'Zeh',
      'Mal',
    ],
    kills: {
      'Dono da Bola': 14,
      Zeh: 19,
      Mal: 6,
      Isgalamido: 17,
      'Assasinu Credi': 19,
      Oootsimo: 22,
    },
    kills_by_means: {
      MOD_ROCKET: 37,
      MOD_TRIGGER_HURT: 14,
      MOD_RAILGUN: 9,
      MOD_ROCKET_SPLASH: 60,
      MOD_MACHINEGUN: 4,
      MOD_SHOTGUN: 4,
      MOD_FALLING: 3,
    },
  };

  const splitLine = [
    '11:38',
    'Kill:',
    '1022',
    '6',
    '22:',
    '<world>',
    'killed',
    'Zeh',
    'by',
    'MOD_TRIGGER_HURT',
  ];

  it('Should return object kills World', () => {
    const kills = getScoreByWorld({
      gameData,
      splitLine,
    }).kills;

    expect(gameData.kills).toEqual(kills);
  });
});

describe('getScoreByPlayer', () => {
  const gameStartData = {
    total_kills: 0,
    players: [],
    kills: {},
    kills_by_means: {},
  };

  const gameData = {
    total_kills: 131,
    players: [
      'Isgalamido',
      'Oootsimo',
      'Dono da Bola',
      'Assasinu Credi',
      'Zeh',
      'Mal',
    ],
    kills: {
      'Dono da Bola': 14,
      Zeh: 19,
      Mal: 6,
      Isgalamido: 17,
      'Assasinu Credi': 19,
      Oootsimo: 22,
    },
    kills_by_means: {
      MOD_ROCKET: 37,
      MOD_TRIGGER_HURT: 14,
      MOD_RAILGUN: 9,
      MOD_ROCKET_SPLASH: 60,
      MOD_MACHINEGUN: 4,
      MOD_SHOTGUN: 4,
      MOD_FALLING: 3,
    },
  };

  const splitLine = [
    '11:38',
    'Kill:',
    '1022',
    '6',
    '22:',
    '<world>',
    'killed',
    'Zeh',
    'by',
    'MOD_TRIGGER_HURT',
  ];

  const lineAction =
    ' 13:26 Kill: 5 3 6: Assasinu Credi killed Oootsimo by MOD_ROCKET';

  it('Should return empty object kills by players', () => {
    const kills = getScoreByPlayer({
      gameData: gameStartData,
      splitLine: [],
    }).kills;

    expect(kills).toEqual({});
  });

  it('Should return object kills by players', () => {
    const kills = getScoreByPlayer({
      gameData,
      splitLine,
    }).kills;

    expect(kills).toEqual(gameData.kills);
  });

  it('Should return object process kill', () => {
    const scoreKills = processKill({
      gameData,
      lineAction,
    });

    expect(scoreKills).toEqual(gameData);
  });
});
