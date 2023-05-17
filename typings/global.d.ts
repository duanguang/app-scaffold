import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {BarCodeReadEvent} from 'react-native-camera';

declare type RootStackParamList = {
    Login: undefined;
    LoginOauth: undefined;
    Home: undefined;
    MergeRequest: undefined;
    MergeRequestDetail: undefined;
    MergeRequests: {
        url: string;
    };
    Deploy: undefined;
    DeployDetail: undefined;
    Branch: undefined;
    BranchDetail: undefined;
};

declare global {
    interface RootProps<RouteName extends keyof RootStackParamList = any>
        extends NativeStackScreenProps<RootStackParamList, RouteName> {}
    // namespace ReactNavigation {
    //     interface RootParamList extends RootStackParamList {}
    // }
}
