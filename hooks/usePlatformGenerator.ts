import { useEffect, useCallback } from 'react';
import { Dimensions } from 'react-native';
import { Platform } from '@/app/game/types';
import { PLATFORM_HEIGHT } from '@/constants/Game';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const PLATFORM_GAP = 200; // Vertical gap between platforms
const PLATFORM_SETS = 5; // Number of platform sets to maintain

export function usePlatformGenerator(
  gameState: { isPlaying: boolean; gameOver: boolean },
  generatePlatform: (y: number, dimension: Platform['dimension']) => void
) {
  // Generate initial platform set
  const generateInitialPlatforms = useCallback(() => {
    for (let i = 0; i < PLATFORM_SETS; i++) {
      const y = SCREEN_HEIGHT - (i * PLATFORM_GAP + PLATFORM_HEIGHT);
      generatePlatform(y, 'top');
      generatePlatform(y, 'middle');
      generatePlatform(y, 'bottom');
    }
  }, [generatePlatform]);

  // Generate new platforms as player moves up
  const generateNewPlatformSet = useCallback((highestY: number) => {
    const newY = highestY - PLATFORM_GAP;
    generatePlatform(newY, 'top');
    generatePlatform(newY, 'middle');
    generatePlatform(newY, 'bottom');
  }, [generatePlatform]);

  // Initialize platforms
  useEffect(() => {
    if (!gameState.isPlaying && !gameState.gameOver) {
      generateInitialPlatforms();
    }
  }, [gameState.isPlaying, gameState.gameOver, generateInitialPlatforms]);

  return {
    generateNewPlatformSet,
    PLATFORM_GAP,
  };
} 