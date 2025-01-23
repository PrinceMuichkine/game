import { useCallback } from 'react';
import type { Platform, Position } from '@/app/game/types';
import { PLAYER_SIZE, PLATFORM_HEIGHT } from '@/constants/Game';

interface CollisionParams {
  playerPosition: Position;
  platforms: Platform[];
  dimension: Platform['dimension'];
}

export function useCollisionDetection() {
  const checkCollision = useCallback(({ playerPosition, platforms, dimension }: CollisionParams) => {
    // Check each platform in the current dimension
    return platforms
      .filter(platform => platform.dimension === dimension)
      .some(platform => {
        // Collision box calculations
        const playerBottom = playerPosition.y + PLAYER_SIZE;
        const playerLeft = playerPosition.x;
        const playerRight = playerPosition.x + PLAYER_SIZE;
        
        const platformTop = platform.position.y;
        const platformBottom = platform.position.y + PLATFORM_HEIGHT;
        const platformLeft = platform.position.x;
        const platformRight = platform.position.x + platform.width;

        // Check if player is colliding with platform
        return (
          playerBottom >= platformTop &&
          playerBottom <= platformBottom &&
          playerRight >= platformLeft &&
          playerLeft <= platformRight
        );
      });
  }, []);

  return { checkCollision };
} 