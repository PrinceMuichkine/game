import React from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import { BlurView } from 'expo-blur';
import { ThemedText } from '@/components/ThemedText';
import * as Haptics from 'expo-haptics';

interface Props {
    score: number;
    onRestart: () => void;
}

export function GameOver({ score, onRestart }: Props) {
    const handleRestart = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        onRestart();
    };

    return (
        <BlurView intensity={90} style={StyleSheet.absoluteFill}>
            <View style={styles.container}>
                <ThemedText style={styles.gameOver}>Game Over</ThemedText>
                <ThemedText style={styles.score}>Score: {score}</ThemedText>
                <Pressable
                    style={styles.button}
                    onPress={handleRestart}
                >
                    <ThemedText style={styles.buttonText}>Try Again</ThemedText>
                </Pressable>
            </View>
        </BlurView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
    },
    gameOver: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#fff',
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 10,
    },
    score: {
        fontSize: 32,
        color: '#fff',
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 5,
    },
    button: {
        backgroundColor: '#fff',
        paddingHorizontal: 30,
        paddingVertical: 15,
        borderRadius: 25,
        marginTop: 20,
    },
    buttonText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
    },
}); 