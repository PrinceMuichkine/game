import React, { useRef } from 'react';
import { StyleSheet, Pressable } from 'react-native';
import Animated, {
    useAnimatedStyle,
    withSpring,
    withTiming,
} from 'react-native-reanimated';
import type { GameState, Position } from '@/app/game/types';
import { PLAYER_SIZE, DIMENSION_COLORS } from '@/constants/Game';
import { QuantumParticles } from './QuantumParticles';

interface Props {
    gameState: GameState;
    positions: Record<string, Position>;
    onTap: () => void;
}

export function QuantumPlayer({ gameState, positions, onTap }: Props) {
    const topLayerStyle = useAnimatedStyle(() => ({
        transform: [
            { translateY: withSpring(positions.top.y) },
            { translateX: withSpring(positions.top.x) }
        ],
        opacity: withTiming(gameState.dimensions.top.opacity),
    }));

    const middleLayerStyle = useAnimatedStyle(() => ({
        transform: [
            { translateY: withSpring(positions.middle.y) },
            { translateX: withSpring(positions.middle.x) }
        ],
        opacity: withTiming(gameState.dimensions.middle.opacity),
    }));

    const bottomLayerStyle = useAnimatedStyle(() => ({
        transform: [
            { translateY: withSpring(positions.bottom.y) },
            { translateX: withSpring(positions.bottom.x) }
        ],
        opacity: withTiming(gameState.dimensions.bottom.opacity),
    }));

    return (
        <Pressable onPress={onTap} style={StyleSheet.absoluteFill}>
            <Animated.View
                style={[
                    styles.playerLayer,
                    { backgroundColor: DIMENSION_COLORS.top },
                    topLayerStyle
                ]}>
                <QuantumParticles dimension="top" />
            </Animated.View>
            <Animated.View
                style={[
                    styles.playerLayer,
                    { backgroundColor: DIMENSION_COLORS.middle },
                    middleLayerStyle
                ]}>
                <QuantumParticles dimension="middle" />
            </Animated.View>
            <Animated.View
                style={[
                    styles.playerLayer,
                    { backgroundColor: DIMENSION_COLORS.bottom },
                    bottomLayerStyle
                ]}>
                <QuantumParticles dimension="bottom" />
            </Animated.View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    playerLayer: {
        position: 'absolute',
        width: PLAYER_SIZE,
        height: PLAYER_SIZE,
        borderRadius: PLAYER_SIZE / 2,
    },
}); 