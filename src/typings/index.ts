export type ActionInput = 'ClientUserinfoChanged:' | 'Kill:' | 'InitGame:';
export type ProcessActionInput = 'ClientUserinfoChanged:' | 'Kill:';

export type GameData = {
  total_kills: number;
  players: string[];
  kills_by_means: {
    [key: string]: number;
  };
  kills: {
    [key: string]: number;
  };
};

export type GameInput = {
  [key: string]: GameData;
};

export type ScoreInput = {
  splitLine: string[];
  gameData: GameData;
};

export type ProcessActionsInput = {
  gameData: GameData;
  lineAction: string;
};
