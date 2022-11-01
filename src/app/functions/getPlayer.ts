import { GameData, ProcessActionsInput } from '../../typings';
import { clearCharacters } from '../../utils';

export default ({ gameData, lineAction }: ProcessActionsInput): GameData => {
  const startLine = lineAction.indexOf('n\\');

  const endLine = lineAction.indexOf('\\t');

  const playerName = clearCharacters(lineAction, startLine, endLine);

  if (!playerName) {
    return gameData;
  }

  if (!gameData.players.includes(playerName)) {
    gameData.players.push(playerName);
  }

  return gameData;
};
