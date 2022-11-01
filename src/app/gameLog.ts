import {
  GAME_ACTIONS_TAG,
  TAG_INIT_GAME,
  TAG_KILL,
  TAG_PLAYER,
} from './constants';
import { GameInput, ProcessActionInput, ActionInput } from '../typings';
import { logger } from '../utils';
import getPlayer from './functions/getPlayer';
import processKill from './functions/processKill';
import startNewGame from './functions/startNewGame';

export default (quakeGameLog: string) => {
  try {
    const logGames: GameInput[] = [];

    const lines = quakeGameLog.split('\n');

    const lineActions = filterGameActions(lines);

    for (const lineAction of lineActions) {
      const action = lineAction.trim().split(' ')[1] as ActionInput;

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

      const processAction = processActions(action);

      const game = processAction({ gameData, lineAction });

      logGames[index] = { [`game_${index}`]: game };
    }

    return logGames;
  } catch (error) {
    logger.error(error);
  }
};

const filterGameActions = (lines: string[]) => {
  return lines.filter(line =>
    GAME_ACTIONS_TAG.includes(line.trim().split(' ')[1])
  );
};

const processActions = (action: ProcessActionInput) => {
  const process = {
    [TAG_PLAYER]: getPlayer,
    [TAG_KILL]: processKill,
  };
  return process[action];
};
