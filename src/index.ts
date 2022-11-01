import makeGameLog from './app/gameLog';
import { logger } from './utils';
import fs from 'fs';

export const execute = () => {
  try {
    const quakeGameLog = fs
      .readFileSync('src/logs/qgames.log', 'utf8')
      .toString();

    const gameData = makeGameLog(quakeGameLog);

    if (!gameData) {
      return logger.error('Error parsing log');
    }

    for (const game of gameData) {
      logger.info(game);
    }
  } catch (error) {
    logger.error(error);
  }
};

execute();
