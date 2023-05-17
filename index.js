/**
 * @format
 */

import { AppRegistry,LogBox } from 'react-native';
import App from './src/App';
import setup from './src/setup';
import { name as appName } from './src/app.json';
LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
    'Require cycles'
]);

AppRegistry.registerComponent(appName,() => setup);

