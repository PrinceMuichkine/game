export interface Dimension {
  id: 'top' | 'middle' | 'bottom';
  gravity: number;
  timeScale: number;
  opacity: number;
}

export interface GameState {
  dimensions: {
    top: Dimension;
    middle: Dimension;
    bottom: Dimension;
  };
  score: number;
  isPlaying: boolean;
  gameOver: boolean;
}

export interface Position {
  x: number;
  y: number;
}

export interface Platform {
  id: string;
  position: Position;
  width: number;
  dimension: Dimension['id'];
} 