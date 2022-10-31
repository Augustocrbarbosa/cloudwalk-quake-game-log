import fs from 'fs';
import {
  GAME_ACTIONS_TAG,
  TAG_INIT_GAME,
  TAG_KILL,
  TAG_PLAYER,
} from './constants';
import { processKill, getPlayer, startNewGame } from './functions';
import { logger } from './utils';
import { ActionType, GameType } from './typings';

export const startGame = () => {
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

    for (const logGame of logGames) {
      logger.info(logGame);
    }
  } catch (error) {
    logger.error(error);
  }
};

startGame();
