import React from 'react';
import {Login} from './containers/login/index';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationOptions} from '@react-navigation/native-stack';
import {RootStackParamList} from '../typings/global';
import {Pressable, Text} from 'native-base';
import { LoginOauth } from '@/containers/oauth';
import { Home } from './containers/home';
import { MergeRequest } from './containers/merge_request';
import { MergeRequestDetail } from './containers/merge_request_detail';
import { GitlabWebView } from './containers/merge_requests';
import { Deploy } from './containers/deploy';
import { DeployDetail } from './containers/deploy_detail';
import { Branch } from './containers/branch';
import { BranchDetail } from './containers/branch_detail';


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
        name: 'Home',
        component: Home,
        options: {
            headerShown: false,
        },
    },
    {
        name: 'Login',
        component: Login,
        options: {
            headerShown: false,
        },
    },
    {
        name: 'LoginOauth',
        component: LoginOauth,
        options: {
            headerShown: false,
        },
    },
    {
        name: 'MergeRequest',
        component: MergeRequest,
        options: {
            headerShown: false,
        },
    },
    {
        name: 'MergeRequestDetail',
        component: MergeRequestDetail,
        options: {
            headerShown: false,
        },
    },
    {
        name: 'MergeRequests',
        component: GitlabWebView,
        options: {
            headerShown: false,
        },
    },
    {
        name: 'Deploy',
        component: Deploy,
        options: {
            headerShown: false,
        },
    },
    {
        name: 'DeployDetail',
        component: DeployDetail,
        options: {
            headerShown: false,
        },
    },
    {
        name: 'Branch',
        component: Branch,
        options: {
            headerShown: false,
        },
    },
    {
        name: 'BranchDetail',
        component: BranchDetail,
        options: {
            headerShown: false,
        },
    },
];
