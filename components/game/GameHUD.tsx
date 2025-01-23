import React from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

interface Props {
    score: number;
}

export function GameHUD({ score }: Props) {
    return (
        <View style={styles.container}>
            <View style={styles.scoreContainer}>
                <ThemedText style={styles.scoreLabel}>SCORE</ThemedText>
                <ThemedText style={styles.score}>{score}</ThemedText>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 40,
        left: 0,
        right: 0,
        zIndex: 10,
        alignItems: 'center',
    },
    scoreContainer: {
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
    },
    scoreLabel: {
        fontSize: 16,
        color: '#fff',
        opacity: 0.8,
    },
    score: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#fff',
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 10,
    },
}); 