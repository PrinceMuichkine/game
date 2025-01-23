import { useState, useCallback, useRef } from 'react';
import { Dimensions } from 'react-native';
import type { Platform, Position } from '@/app/game/types';
import { MIN_PLATFORM_WIDTH, MAX_PLATFORM_WIDTH, PLATFORM_HEIGHT } from '@/constants/Game';
import { usePlatformGenerator } from './usePlatformGenerator';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export function useGamePlatforms(gameState: { isPlaying: boolean; gameOver: boolean }) {
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const highestPlatformY = useRef(SCREEN_HEIGHT);

  const generatePlatform = useCallback((yPosition: number, dimension: Platform['dimension']) => {
    const platformWidth = Math.random() * (MAX_PLATFORM_WIDTH - MIN_PLATFORM_WIDTH) + MIN_PLATFORM_WIDTH;
    const xPosition = Math.random() * (SCREEN_WIDTH - platformWidth);

    const platform: Platform = {
      id: `${Date.now()}-${Math.random()}`,
      position: {
        x: xPosition,
        y: yPosition,
      },
      width: platformWidth,
      dimension,
    };

    setPlatforms(prev => [...prev, platform]);
    highestPlatformY.current = Math.min(highestPlatformY.current, yPosition);
  }, []);

  const { generateNewPlatformSet, PLATFORM_GAP } = usePlatformGenerator(gameState, generatePlatform);

  // Clean up off-screen platforms
  const cleanupPlatforms = useCallback(() => {
    setPlatforms(prev => prev.filter(platform => platform.position.y < SCREEN_HEIGHT + PLATFORM_HEIGHT));
  }, []);

  // Check if we need to generate new platforms
  const checkPlatformGeneration = useCallback((playerY: number) => {
    if (playerY < highestPlatformY.current + PLATFORM_GAP) {
      generateNewPlatformSet(highestPlatformY.current);
    }
  }, [generateNewPlatformSet]);

  return {
    platforms,
    generatePlatform,
    cleanupPlatforms,
    checkPlatformGeneration,
  };
} 