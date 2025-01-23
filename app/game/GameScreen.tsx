import React, { useEffect } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { QuantumPlayer } from '@/components/game/QuantumPlayer';
import { GameHUD } from '@/components/game/GameHUD';
import { Platform } from '@/components/game/Platform';
import { GameOver } from '@/components/game/GameOver';
import { useGameState } from '@/hooks/useGameState';
import { DIMENSION_COLORS } from '@/constants/Game';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function GameScreen() {
    const { gameState, playerPositions, platforms, handleTap, resetGame } = useGameState();

    // Render platforms
    const renderPlatforms = () => {
        return platforms.map((platform, index) => (
            <Platform key={`platform-${index}`} platform={platform} />
        ));
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="light" />
            <GameHUD score={gameState.score} />
            <View style={styles.gameArea}>
                {renderPlatforms()}
                <QuantumPlayer
                    gameState={gameState}
                    positions={playerPositions}
                    onTap={handleTap}
                />
            </View>
            {gameState.gameOver && (
                <GameOver score={gameState.score} onRestart={resetGame} />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    gameArea: {
        flex: 1,
        position: 'relative',
    },
}); 