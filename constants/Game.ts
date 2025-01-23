export const PLAYER_SIZE = 40;
export const GRAVITY = 0.8;
export const JUMP_FORCE = -15;
export const PLATFORM_HEIGHT = 20;
export const MIN_PLATFORM_WIDTH = 60;
export const MAX_PLATFORM_WIDTH = 200;

export const DIMENSION_COLORS = {
  top: '#FF5E5B',
  middle: '#50B2C0',
  bottom: '#8A4FFF',
} as const;

export const INITIAL_GAME_STATE = {
  dimensions: {
    top: {
      id: 'top' as const,
      gravity: GRAVITY,
      timeScale: 1,
      opacity: 0.8,
    },
    middle: {
      id: 'middle' as const,
      gravity: 0,
      timeScale: 0.5,
      opacity: 0.8,
    },
    bottom: {
      id: 'bottom' as const,
      gravity: -GRAVITY,
      timeScale: 1,
      opacity: 0.8,
    },
  },
  score: 0,
  isPlaying: false,
  gameOver: false,
}; 