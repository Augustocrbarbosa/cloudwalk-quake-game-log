import pino from 'pino';

export const clearCharacters = (
  line: string,
  startLine: number,
  endLine: number
): string => {
  const playerName = line
    .trim()
    .substring(startLine, endLine)
    .replace('\\t', '')
    .replace('n\\', '')
    .replace('\\', '');

  return playerName.replace('\\', '');
};

export const logger = pino({
  enabled: true,
  level: 'debug',
  transport: {
    target: 'pino-pretty',
    options: {
      levelFirst: true,
    },
  },
});
