import { GameInput } from '../../typings';

export default (index: number): GameInput => {
  return {
    [`game_${index}`]: {
      total_kills: 0,
      players: [],
      kills: {},
      kills_by_means: {},
    },
  };
};
