import { TAG_WORLD } from '../constants';
import { GameData, ScoreInput, ProcessActionsInput } from '../../typings';

export default ({ gameData, lineAction }: ProcessActionsInput): GameData => {
  const splitLine = lineAction.trim().split(' ');
  let killer = splitLine[5];

  let newGameData = gameData;

  newGameData.total_kills++;

  newGameData = getScoreByMeansOfDeath({ gameData: newGameData, splitLine });

  if (killer === TAG_WORLD) {
    newGameData = getScoreByWorld({ gameData: newGameData, splitLine });
    return newGameData;
  }

  newGameData = getScoreByPlayer({ gameData: newGameData, splitLine });

  return newGameData;
};

export const getScoreByMeansOfDeath = ({
  gameData,
  splitLine,
}: ScoreInput): GameData => {
  const meansOfDeath = splitLine.at(-1);

  if (!meansOfDeath) {
    return gameData;
  }

  gameData.kills_by_means[meansOfDeath] != undefined
    ? gameData.kills_by_means[meansOfDeath]++
    : (gameData.kills_by_means[meansOfDeath] = 1);

  return gameData;
};

export const getScoreByWorld = ({
  splitLine,
  gameData,
}: ScoreInput): GameData => {
  const killedBy = splitLine.indexOf('killed');

  const byPosition = splitLine.indexOf('by');

  let killedPlayer = splitLine[killedBy + 1];

  if (!killedBy || !byPosition || !killedPlayer) {
    return gameData;
  }

  for (let position = killedBy + 2; position < byPosition; position++) {
    killedPlayer += ` ${splitLine[position]}`;
  }

  gameData.kills[killedPlayer] != undefined
    ? gameData.kills[killedPlayer]--
    : (gameData.kills[killedPlayer] = -1);

  return gameData;
};

export const getScoreByPlayer = ({
  gameData,
  splitLine,
}: ScoreInput): GameData => {
  let killer = splitLine[5];

  const killedPosition = splitLine.indexOf('killed');

  if (!killer || !killedPosition) {
    return gameData;
  }

  for (let position = 6; position < killedPosition; position++) {
    killer += ` ${splitLine[position]}`;
  }

  gameData.kills[killer] != undefined
    ? gameData.kills[killer]++
    : (gameData.kills[killer] = 1);

  return gameData;
};
