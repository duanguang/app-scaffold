import React from 'react';
import {Login} from './containers/login/index';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationOptions} from '@react-navigation/native-stack';
import {RootStackParamList} from '../typings/global';
import {Pressable, Text} from 'native-base';


export interface IScreen {
    name: keyof RootStackParamList;
    component: React.ComponentType<any>;
    options?:
        | NativeStackNavigationOptions
        | ((props: {
              route: RouteProp<RootStackParamList, keyof RootStackParamList>;
              navigation: any;
          }) => NativeStackNavigationOptions)
        | undefined;
}

export const screens: Array<IScreen> = [
    {
        name: 'Login',
        component: Login,
        options: {
            headerShown: false,
        },
    },
];
