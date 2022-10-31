import { startGame } from './app/GameLog';
import { logger } from './utils';

export const startApp = () => {
  try {
    startGame();
  } catch (error) {
    logger.error(error);
  }
};

startApp();
