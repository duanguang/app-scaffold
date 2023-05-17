import {Center} from 'native-base';
import React from 'react';
import {TouchableOpacity, ViewStyle} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {SvgContainer} from '../LegionsProSvg';
import codeScan from '../../assets/images/codeScan.svg';

interface Iprops {
    /** 点击事件 */
    onPress: () => void;
    /** 扫描图标样式 */
    scanStyle: ViewStyle;
    touchStyle?: ViewStyle;
}
export const LegionsProCameraScan = (props: Iprops) => {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            style={props?.touchStyle}
            onPress={() => {
                props.onPress();
            }}>
            <LinearGradient
                style={props?.scanStyle}
                angle={133}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={['#259AF6', '#4BBEFF']}>
                <Center flex={1}>
                    <SvgContainer xml={codeScan} width={20} height={20} />
                </Center>
            </LinearGradient>
        </TouchableOpacity>
    );
};
