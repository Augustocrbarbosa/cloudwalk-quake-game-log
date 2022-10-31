import { TAG_WORLD } from '../constants';
import {
  GameDataType,
  GameType,
  KilledPlayerType,
  KilledWorldType,
  DeathCauses,
  ProcessKillType,
  GetPlayerType,
} from '../typings';
import { clearCharacters } from '../utils';

export const startNewGame = (index: number): GameType => {
  return {
    [`game_${index}`]: {
      total_kills: 0,
      players: [],
      kills: {},
      kills_by_means: {},
    },
  };
};

export const getPlayer = ({
  gameData,
  lineAction,
}: GetPlayerType): GameDataType => {
  const startLine = lineAction.indexOf('n\\');
  const endLine = lineAction.indexOf('\\t');
  const playerName = clearCharacters(lineAction, startLine, endLine);

  if (!gameData.players.includes(playerName)) {
    gameData.players.push(playerName);
  }
  return gameData;
};

export const processKill = ({
  gameData,
  splitLine,
}: ProcessKillType): GameDataType => {
  let newGameData = gameData;
  newGameData.total_kills++;
  const killer = splitLine[5];

  newGameData = scoreDeathCauses({ gameData: newGameData, splitLine });
  if (killer === TAG_WORLD) {
    newGameData = scoreKilledWorld({ gameData: newGameData, splitLine });
    return newGameData;
  }

  newGameData = scoreKilledPlayer({ gameData: newGameData, splitLine, killer });
  return newGameData;
};

const scoreDeathCauses = ({
  gameData,
  splitLine,
}: DeathCauses): GameDataType => {
  const meansOfDeath = String(splitLine.at(-1));

  gameData.kills_by_means[meansOfDeath] != undefined
    ? gameData.kills_by_means[meansOfDeath]++
    : (gameData.kills_by_means[meansOfDeath] = 1);
  return gameData;
};

const scoreKilledPlayer = ({
  gameData,
  killer,
  splitLine,
}: KilledPlayerType): GameDataType => {
  const killedPosition = splitLine.indexOf('killed');
  for (let position = 6; position < killedPosition; position++) {
    killer += ` ${splitLine[position]}`;
  }

  gameData.kills[killer] != undefined
    ? gameData.kills[killer]++
    : (gameData.kills[killer] = 1);
  return gameData;
};

const scoreKilledWorld = ({
  splitLine,
  gameData,
}: KilledWorldType): GameDataType => {
  const killedBy = splitLine.indexOf('killed');
  const byPosition = splitLine.indexOf('by');
  let killedPlayer = splitLine[killedBy + 1];

  for (let position = killedBy + 2; position < byPosition; position++) {
    killedPlayer += ` ${splitLine[position]}`;
  }

  gameData.kills[killedPlayer] != undefined
    ? gameData.kills[killedPlayer]--
    : (gameData.kills[killedPlayer] = -1);
  return gameData;
};
