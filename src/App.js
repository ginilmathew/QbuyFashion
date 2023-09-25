import { StyleSheet, Text, View, SafeAreaView, Platform } from 'react-native'
import React, { useCallback, useEffect } from 'react'
import Navigation from './Navigations'
import PandaProvider from './contexts/Panda/PandaContext'
import AuthProvider from './contexts/Auth/AuthContext'
import { Provider } from 'react-redux'
import store from './Redux/store'
import LoadProvider from './contexts/Loader/loaderContext'
import Route from './Route'
import CartProvider from './contexts/Cart/CartContext'
import Toast from 'react-native-toast-message';
import AddressProvider from './contexts/Address/AddressContext'

import RouteTest from './RouteText'
import { AppWithTour } from './Route/green/TabNav'
import { copilot, walkthroughable, CopilotStep,CopilotProvider } from 'react-native-copilot';


const App = (props) => {


    if (Platform.OS === 'ios') {
        //SplashScreen.hide()
    }

    // useEffect(() => {
    //     getCurrentLocation()

    //     onAppBootstrap()
    // }, [])

    // async function onMessageReceived(message) {
    //     const { notification } = message

    //     reactotron.log({message})
    //     // Request permissions (required for iOS)
    //     await notifee.requestPermission()

    //     // Create a channel (required for Android)
    //     const channelId = await notifee.createChannel({
    //     id: 'default',
    //     name: 'Default Channel',
    //     });

    //     // Display a notification
    //     await notifee.displayNotification({
    //     title: notification?.title,
    //     body: notification?.body,
    //     android: {
    //         channelId,
    //         //smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
    //         // pressAction is needed if you want the notification to open the app when pressed
    //         pressAction: {
    //         id: 'default',
    //         },
    //     },
    //     });
    // }

    // async function onAppBootstrap() {
    //     // Register the device with FCM
    //     let userDetails = await AsyncStorage.getItem("user");
    //     await messaging().registerDeviceForRemoteMessages();

    //     if(userDetails){
    //         let user = JSON.parse(userDetails)

    //         reactotron.log({user})
    //         // Get the token
    //         const token = await messaging().getToken();

    //         let data = {
    //             id: user?._id,
    //             token: token
    //         }
    //         customAxios.post('auth/update-devicetoken', data)
    //         .then(response => {
    //             reactotron.log({response})
    //         })
    //         .catch(err => {
    //             reactotron.log({err})
    //         })
    //         reactotron.log({token})

    //     }




    //     // Save the token
    //     //await postToApi('/users/1234/tokens', { token });
    // }

    // useEffect(() => {
    //     const unsubscribe = messaging().onMessage(onMessageReceived);

    //     messaging().onNotificationOpenedApp(remoteMessage => {
    //         console.log(
    //           'Notification caused app to open from background state:',
    //           remoteMessage.notification,
    //         );
    //         //navigation.navigate(remoteMessage.data.type);
    //     });

    //     messaging()
    //     .getInitialNotification()
    //     .then(remoteMessage => {
    //         if (remoteMessage) {
    //         console.log(
    //             'Notification caused app to open from quit state:',
    //             remoteMessage.notification,
    //         );
    //         //setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
    //         }
    //   });

    //     return unsubscribe;
    // }, []);

    // const getCurrentLocation = useCallback(async () => {
    //     if (Platform.OS === 'ios') {
    //         const status = await Geolocation.requestAuthorization('whenInUse');
    //         if (status === "granted") {
    //             //getPosition()
    //             requestUserPermission()
    //         }
    //     }
    //     else {
    //         if (Platform.OS === 'android' && Platform.Version < 23) {
    //            // getPosition()
    //            requestUserPermission()
    //         }

    //         const hasPermission = await PermissionsAndroid.check(
    //             PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    //         );

    //         if (hasPermission) {
    //             //getPosition()
    //             requestUserPermission()
    //         }

    //         const status = await PermissionsAndroid.request(
    //             PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    //         );

    //         if (status === PermissionsAndroid.RESULTS.GRANTED) {
    //             //getPosition()
    //             requestUserPermission()
    //         }

    //         if (status === PermissionsAndroid.RESULTS.DENIED) {
    //             Toast.show({
    //                 type: 'error',
    //                 text1: 'Location permission denied by user.'
    //             });
    //             requestUserPermission()
    //         }
    //         else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
    //             Toast.show({
    //                 type: 'error',
    //                 text1: 'Location permission revoked by user.',
    //             });
    //             requestUserPermission()
    //         }
    //     }

    // }, [])

    // async function requestUserPermission() {

    //     if(Platform.OS === 'android'){
    //         PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
    //     }

    //     const authStatus = await messaging().requestPermission();
    //     const enabled =
    //       authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    //       authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    //     if (enabled) {
    //       console.log('Authorization status:', authStatus);
    //     }

    //     //getCurrentLocation()
    // }



    return (
        <Provider store={store}>
      
                <LoadProvider>
                    <AuthProvider>
                        <AddressProvider>
                            <PandaProvider>
                                <CartProvider>
                                {/* <AppWithTour/> */}
                                    <RouteTest />
                                    <Toast
                                        position='bottom'
                                        bottomOffset={20}
                                    />
                                </CartProvider>
                            </PandaProvider>
                        </AddressProvider>
                    </AuthProvider>
                </LoadProvider>
           
        </Provider>
    )
}

export default  App

const styles = StyleSheet.create({})