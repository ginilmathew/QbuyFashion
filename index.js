import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import App from './src/App';
import 'react-native-gesture-handler';


import messaging from '@react-native-firebase/messaging';

// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
});



AppRegistry.registerComponent(appName, () => App);
