/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Button, NativeBaseProvider, StatusBar} from 'native-base';
import React, {useContext, useEffect, useMemo, useRef} from 'react';
import {Text, useColorScheme, View} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {initHttpConfig} from './constants/httpConfig';
import {GlboalStore} from './stores/globalStore';
import {customizingTheme} from './theme';
import {RootStackParamList} from '../typings/global';
import {storage} from './utils/storage';
import {screens} from './screen';
import {MyLoading} from './components/hlLoading';
import {observer} from 'mobx-react-lite';

export interface AppProps {
    isDebug: boolean;
    buildType: string;
    rootTag: string;
}

const Stack = createNativeStackNavigator<RootStackParamList>();
const config = {
    animation: 'spring',
    config: {
        stiffness: 1000,
        damping: 500,
        mass: 3,
        overshootClamping: true,
        restDisplacementThreshold: 0.01,
        restSpeedThreshold: 0.01,
    },
};
export const loadingUtils: {
    ref: any;
    showLoading: () => void;
    hideLoading: () => void;
} = {
    ref: null,
    showLoading() {
        this.ref?.showLoading?.();
    },
    hideLoading() {
        this.ref?.dismissLoading?.();
    },
};
const App = (props: AppProps) => {
    const store = useContext(GlboalStore);
    useEffect(() => {
        storage.save({key: 'ignoreUpdate', data: false});
        store.initApp(props);
        initHttpConfig(props.buildType);
    });
    const lodingRef = useRef<any>();
    return (
        <View
            style={{width: '100%', height: '100%', position: 'relative'}}
            pointerEvents={store.touchAble ? 'auto' : 'none'}>
            {useMemo(() => {
                return (
                    <MyLoading
                        ref={ref => {
                            lodingRef.current = ref;
                            loadingUtils.ref = ref;
                        }}
                    />
                );
            }, [])}
            <SafeAreaProvider>
                <StatusBar
                    barStyle={'dark-content'}
                    backgroundColor="rgba(0,0,0,0)"
                    translucent
                />
                <NativeBaseProvider theme={customizingTheme}>
                    <NavigationContainer>
                        <Stack.Navigator
                            screenOptions={
                                {
                                }
                            }>
                            {[...screens].map(screen => {
                                return (
                                    <Stack.Screen
                                        name={screen.name}
                                        component={screen.component}
                                        options={screen.options}
                                        key={screen.name}
                                    />
                                );
                            })}
                        </Stack.Navigator>
                    </NavigationContainer>
                </NativeBaseProvider>
            </SafeAreaProvider>
        </View>
    );
};

export default observer(App);
