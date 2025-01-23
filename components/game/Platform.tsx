import React from 'react';
import { StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import type { Platform as PlatformType } from '@/app/game/types';
import { DIMENSION_COLORS, PLATFORM_HEIGHT } from '@/constants/Game';

interface Props {
    platform: PlatformType;
}

export function Platform({ platform }: Props) {
    return (
        <Animated.View
            style={[
                styles.platform,
                {
                    width: platform.width,
                    left: platform.position.x,
                    top: platform.position.y,
                    backgroundColor: DIMENSION_COLORS[platform.dimension],
                },
            ]}
        />
    );
}

const styles = StyleSheet.create({
    platform: {
        height: PLATFORM_HEIGHT,
        position: 'absolute',
        borderRadius: PLATFORM_HEIGHT / 2,
    },
}); 