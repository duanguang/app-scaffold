import React from 'react';
import {
    StyleSheet,
    TouchableNativeFeedback,
    TouchableOpacity,
    ViewStyle,
} from 'react-native';
import LinearGradient, {
    LinearGradientProps,
} from 'react-native-linear-gradient';
import {View} from 'native-base';

interface IBoxProps {
    /**
     * 添加后有feedback效果
     */
    onPress?: () => void;
    children?: Element;
    /** 渐变颜色 */
    colors: string[];
    style?: ViewStyle;
    angle?: number;
    start?: {x: number; y: number};
    end?: {x: number; y: number};
    activeOpacity?: number;
}

export function LegionsProLinearBox({
    onPress,
    children,
    colors,
    style,
    angle = 133,
    start = {x: 0, y: 0},
    end = {x: 1, y: 0},
    activeOpacity = 0.2,
}: IBoxProps) {
    return onPress ? (
        <TouchableOpacity
            activeOpacity={activeOpacity}
            style={{...linearBoxStyles.box, ...style}}
            onPress={onPress}>
            <View
                style={{
                    position: 'absolute',
                    zIndex: 1,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    top: 0,
                }}>
                {children}
            </View>
            <LinearGradient
                angle={angle}
                start={start}
                end={end}
                colors={colors}
                style={linearBoxStyles.LinearGradient}
            />
        </TouchableOpacity>
    ) : (
        <View style={{...linearBoxStyles.box, ...style}}>
            <View
                style={{
                    position: 'absolute',
                    zIndex: 1,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    top: 0,
                }}>
                {children}
            </View>
            <LinearGradient
                angle={angle}
                start={start}
                end={end}
                colors={colors}
                style={linearBoxStyles.LinearGradient}
            />
        </View>
    );
}

const linearBoxStyles = StyleSheet.create({
    box: {
        height: '100%',
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        // borderRadius: 8,
    },
    LinearGradient: {
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
    },
});
