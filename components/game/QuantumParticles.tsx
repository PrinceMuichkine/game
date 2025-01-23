import React from 'react';
import { StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, withRepeat, withSpring } from 'react-native-reanimated';
import { DIMENSION_COLORS } from '@/constants/Game';
import type { Dimension } from '@/app/game/types';

interface Props {
    dimension: Dimension['id'];
}

export function QuantumParticles({ dimension }: Props) {
    const particleStyle = useAnimatedStyle(() => ({
        transform: [
            {
                scale: withRepeat(
                    withSpring(1.2, {
                        damping: 2,
                        stiffness: 80,
                    }),
                    -1,
                    true
                ),
            },
        ],
    }));

    return (
        <Animated.View
            style={[
                styles.particle,
                { backgroundColor: DIMENSION_COLORS[dimension] },
                particleStyle,
            ]}
        />
    );
}

const styles = StyleSheet.create({
    particle: {
        width: '100%',
        height: '100%',
        borderRadius: 999,
    },
}); 