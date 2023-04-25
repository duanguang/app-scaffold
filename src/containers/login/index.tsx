import { Text } from 'native-base';
import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';





export const Login = ({navigation}: RootProps) => {
    
    return (
        <View
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    padding: 0,
                }}>
                <Text style={styles.headerText}>2222</Text>
            </View>
    );
};

const styles = StyleSheet.create({
    headerText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#000',
    },
});
