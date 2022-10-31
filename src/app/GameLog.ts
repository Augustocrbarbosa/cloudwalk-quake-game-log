import fs from 'fs';
import {
  GAME_ACTIONS_TAG,
  TAG_INIT_GAME,
  TAG_KILL,
  TAG_PLAYER,
  TAG_WORLD,
} from './Constants';
import {
  GameDataType,
  GameType,
  KilledPlayerType,
  KilledWorldType,
  DeathCauses,
  ProcessKillType,
  GetPlayerType,
  ActionType,
} from '../typings';
import { clearCharacters, logger } from '../utils';

export const startGame = () => {
  try {
    const logGames = parseGameLog();
    if (!logGames) {
      return logger.error('Error parsing log');
    }
    for (const logGame of logGames) {
      logger.info(logGame);
    }
  } catch (error) {
    logger.error(error);
  }
};

export const parseGameLog = () => {
  try {
    const qGamesLog = fs.readFileSync('src/logs/qgames.log', 'utf8').toString();
    const logGames: GameType[] = [];

    const lines = qGamesLog.split('\n');
    const findLinesActions = lines.filter(line =>
      GAME_ACTIONS_TAG.includes(line.trim().split(' ')[1])
    );

    for (const lineAction of findLinesActions) {
      const action = lineAction.trim().split(' ')[1] as ActionType;
      const splitLine = lineAction.trim().split(' ');

      if (action === TAG_INIT_GAME) {
        const game = startNewGame(logGames.length);
        logGames.push(game);
        continue;
      }

      const index =
        logGames.length > 0
          ? Number(logGames.length - 1)
          : Number(logGames.length);

      const currentGame = logGames[index];
      let gameData = currentGame[`game_${index}`];

      if (action === TAG_PLAYER) {
        const game = getPlayer({ gameData, lineAction });
        logGames[index] = { [`game_${index}`]: game };
      }

      if (action === TAG_KILL) {
        const game = processKill({ gameData, splitLine });
        logGames[index] = { [`game_${index}`]: game };
      }
    }

    return logGames;
  } catch (error) {
    logger.error(error);
  }
};

const startNewGame = (index: number): GameType => {
  return {
    [`game_${index}`]: {
      total_kills: 0,
      players: [],
      kills: {},
      kills_by_means: {},
    },
  };
};

const getPlayer = ({ gameData, lineAction }: GetPlayerType): GameDataType => {
  const startLine = lineAction.indexOf('n\\');
  const endLine = lineAction.indexOf('\\t');
  const playerName = clearCharacters(lineAction, startLine, endLine);

  if (!gameData.players.includes(playerName)) {
    gameData.players.push(playerName);
  }
  return gameData;
};

const processKill = ({
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
