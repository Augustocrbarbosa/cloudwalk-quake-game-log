export type ActionType = 'ClientUserinfoChanged:' | 'Kill:' | 'InitGame:';

export type GameDataType = {
  total_kills: number;
  players: string[];
  kills_by_means: {
    [key: string]: number;
  };
  kills: {
    [key: string]: number;
  };
};

export type GameType = {
  [key: string]: GameDataType;
};

export type KilledPlayerType = {
  gameData: GameDataType;
  killer: string;
  splitLine: string[];
};

export type KilledWorldType = {
  splitLine: string[];
  gameData: GameDataType;
};

export type DeathCauses = {
  gameData: GameDataType;
  splitLine: string[];
};

export type ProcessKillType = {
  gameData: GameDataType;
  splitLine: string[];
};

export type GetPlayerType = {
  gameData: GameDataType;
  lineAction: string;
};
