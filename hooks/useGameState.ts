import { useState, useCallback, useEffect } from 'react';
import { Dimensions } from 'react-native';
import type { GameState, Position } from '@/app/game/types';
import { INITIAL_GAME_STATE, GRAVITY, JUMP_FORCE, PLAYER_SIZE } from '@/constants/Game';
import { useCollisionDetection } from './useCollisionDetection';
import { useGamePlatforms } from './useGamePlatforms';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

export function useGameState() {
  const [gameState, setGameState] = useState<GameState>(INITIAL_GAME_STATE);
  const [playerPositions, setPlayerPositions] = useState<Record<string, Position>>({
    top: { x: SCREEN_WIDTH / 2 - PLAYER_SIZE / 2, y: SCREEN_HEIGHT / 4 },
    middle: { x: SCREEN_WIDTH / 2 - PLAYER_SIZE / 2, y: SCREEN_HEIGHT / 2 },
    bottom: { x: SCREEN_WIDTH / 2 - PLAYER_SIZE / 2, y: SCREEN_HEIGHT * 3 / 4 },
  });
  const [velocities, setVelocities] = useState<Record<string, number>>({
    top: 0,
    middle: 0,
    bottom: 0,
  });

  const { platforms, generatePlatform, cleanupPlatforms, checkPlatformGeneration } = useGamePlatforms({
    isPlaying: gameState.isPlaying,
    gameOver: gameState.gameOver
  });
  const { checkCollision } = useCollisionDetection();

  // Score system
  const updateScore = useCallback((position: Position) => {
    setGameState(prev => ({
      ...prev,
      score: prev.score + Math.floor(Math.abs(position.y / 100)),
    }));
  }, []);

  // Physics update loop
  useEffect(() => {
    if (!gameState.isPlaying || gameState.gameOver) return;

    const updateInterval = setInterval(() => {
      setPlayerPositions(prev => {
        const newPositions = { ...prev };
        Object.entries(gameState.dimensions).forEach(([key, dimension]) => {
          const position = prev[key];
          const velocity = velocities[key];
          
          // Apply gravity
          const newVelocity = velocity + dimension.gravity;
          
          // Update position
          const newY = position.y + newVelocity;
          
          // Check if we need to generate new platforms
          checkPlatformGeneration(newY);
          
          // Clean up off-screen platforms
          cleanupPlatforms();
          
          // Check collisions
          const hasCollision = checkCollision({
            playerPosition: { ...position, y: newY },
            platforms,
            dimension: key as keyof typeof gameState.dimensions,
          });

          if (hasCollision) {
            // Bounce on collision
            setVelocities(prev => ({
              ...prev,
              [key]: JUMP_FORCE,
            }));
            // Add score on successful bounce
            updateScore(position);
          } else {
            setVelocities(prev => ({
              ...prev,
              [key]: newVelocity,
            }));
            newPositions[key] = { ...position, y: newY };
          }
        });
        return newPositions;
      });
    }, 16);

    return () => clearInterval(updateInterval);
  }, [gameState.isPlaying, gameState.gameOver, platforms, updateScore, checkPlatformGeneration, cleanupPlatforms]);

  // Game over condition
  useEffect(() => {
    Object.entries(playerPositions).forEach(([key, position]) => {
      if (position.y > SCREEN_HEIGHT || position.y < -PLAYER_SIZE) {
        setGameState(prev => ({ ...prev, gameOver: true }));
      }
    });
  }, [playerPositions]);

  const handleTap = useCallback(() => {
    if (gameState.gameOver) return;

    setGameState(prev => ({
      ...prev,
      isPlaying: true,
      dimensions: {
        top: {
          ...prev.dimensions.top,
          gravity: -prev.dimensions.top.gravity,
        },
        middle: {
          ...prev.dimensions.middle,
          opacity: prev.dimensions.middle.opacity > 0.5 ? 0.3 : 0.8,
        },
        bottom: {
          ...prev.dimensions.bottom,
          gravity: -prev.dimensions.bottom.gravity,
        },
      },
    }));
  }, [gameState.gameOver]);

  const resetGame = useCallback(() => {
    setGameState(INITIAL_GAME_STATE);
    setPlayerPositions({
      top: { x: SCREEN_WIDTH / 2 - PLAYER_SIZE / 2, y: SCREEN_HEIGHT / 4 },
      middle: { x: SCREEN_WIDTH / 2 - PLAYER_SIZE / 2, y: SCREEN_HEIGHT / 2 },
      bottom: { x: SCREEN_WIDTH / 2 - PLAYER_SIZE / 2, y: SCREEN_HEIGHT * 3 / 4 },
    });
    setVelocities({
      top: 0,
      middle: 0,
      bottom: 0,
    });
  }, []);

  return {
    gameState,
    playerPositions,
    platforms,
    handleTap,
    resetGame,
  };
} 