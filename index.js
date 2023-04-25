/**
 * @format
 */

import {AppRegistry, LogBox} from 'react-native';
import App from './src/App';
import {name as appName} from './src/app.json';

// 忽略路由传不可序列化参数时的警告
LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
]);

AppRegistry.registerComponent(appName, () => App);
