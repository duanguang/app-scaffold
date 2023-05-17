import {  createNavigationContainerRef } from '@react-navigation/native';
import { RootStackParamList } from '@typing/global';
export const navigationRef = createNavigationContainerRef()

export function navigate<RouteName extends keyof RootStackParamList>(...args: undefined extends RootStackParamList[RouteName] ? [screen: RouteName] | [screen: RouteName, params: RootStackParamList[RouteName]] : [screen: RouteName, params: RootStackParamList[RouteName]]) {
    if (navigationRef.isReady()) {
      //@ts-ignore
    navigationRef.navigate(...args);
  }
}