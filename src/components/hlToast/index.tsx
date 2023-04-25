import {Center, Flex, Input, IToastProps, Text, Toast, View} from 'native-base';
import React from 'react';
import {StyleProp, StyleSheet} from 'react-native';
import {SvgXml, XmlProps} from 'react-native-svg';
import iconSuccess from '../../assets/images/successIcon.svg';
interface Iprops {
    type?: 'success' | string;
}
const SuccessSvg = (props: Iprops) => {
    return (
        <SvgXml fillRule="nonzero" width={32} height={32} xml={iconSuccess} />
    );
};
export const hlToast = (
    props: IToastProps & {
        message?: string;
        type?: 'success';
    },
) => {
    const {message, type, duration, style} = props;
    return Toast.show({
        ...props,
        duration: duration || 2000,
        style: {
            top: 156,
            backgroundColor: '#606263',
            borderRadius: 8,
            ...(style as {}),
        },
        placement: 'top',
        title:
            type === 'success' ? (
                <Center mt={3} mb={2}>
                    <SuccessSvg />
                </Center>
            ) : (
                props.title
            ),
        description:
            type === 'success' ? (
                <Center mb={3} mx={3}>
                    <Text color="#fff">{message}</Text>
                </Center>
            ) : (
                message || props.description
            ),
    });
};
