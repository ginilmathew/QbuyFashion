import { AppState, PermissionsAndroid, Platform, StyleSheet, ToastAndroid } from 'react-native'
import React, { useState, useEffect, useContext, useCallback } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { useDispatch, useSelector } from 'react-redux';
import { navigationRef } from '../Navigations/RootNavigation';
import Login from '../screens/auth/Login';
import Otp from '../screens/auth/Otp';
//import Menu from './Menu';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreenP from '../screens/SplashScreen';
import AuthContext from '../contexts/Auth';
import CartContext from '../contexts/Cart';
import Panda from './panda';
import Fashion from './fashion';
import { mode } from '../config/constants';
import Green from './green';
import Geolocation from 'react-native-geolocation-service';
import customAxios from '../CustomeAxios';
import LoaderContext from '../contexts/Loader';
import { isObject } from 'lodash'
import Toast from 'react-native-toast-message';
import axios from 'axios';
import reactotron from '../ReactotronConfig';
import LoadingModal from '../Components/LoadingModal';
import LocationScreen from '../screens/MyAccount/MyAddresses/LocationScreen';
import AddNewLocation from '../screens/MyAccount/MyAddresses/LocationScreen/AddNewLocation';
import CommonUpdateModal from '../Components/CommonUpdateModal';
import DeviceInfo from 'react-native-device-info'
import SplashScreen from 'react-native-splash-screen';

// import Menu from './Menu';


const Stack = createNativeStackNavigator();

const Route = () => {

    const DeviceVersion = DeviceInfo.getVersion()


    const userContext = useContext(AuthContext)
    const cartContext = useContext(CartContext)
    const loadingContext = useContext(LoaderContext)
    const [location, setLocation] = useState(null)
    const [versionUpdate,setversionUpdate]=useState(false);
    const [forceUpdate,setForceUpdate]=useState(false)


    const [initialScreen, setInitialScreen] = useState(null)
    reactotron.log({DeviceVersion})
    reactotron.log({versionUpdate})
    reactotron.log({forceUpdate})

    useEffect(() => {
        getCurrentLocation()
    }, [])

    // useEffect(() => {
    //     const subscription = AppState.addEventListener('change', nextAppState => {
    //     //   if (
    //     //     appState.current.match(/inactive|background/) &&
    //     //     nextAppState === 'active'
    //     //   ) {
    //     //     console.log('App has come to the foreground!');
    //     //   }
    
    //     //   appState.current = nextAppState;
    //     //   setAppStateVisible(appState.current);
    //       reactotron.log('AppState', nextAppState, cartContext.cart);
    //     });
    
    //     return () => {
    //       subscription.remove();
    //     };
    //   }, [cartContext.cart]);

    const getCurrentLocation = useCallback(async () => {
        if (Platform.OS === 'ios') {
            const status = await Geolocation.requestAuthorization('whenInUse');
            if (status === "granted") {
                getPosition()
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Location permission denied by user.'
                });
                const token = await AsyncStorage.getItem("token");

                if (token) {
                    getProfile()
                    getCartDetails()
                    getAddressList()
                }
                setInitialScreen('AddNewLocation');
            }

        }
        else {
            if (Platform.OS === 'android' && Platform.Version < 23) {
                getPosition()
            }

            const hasPermission = await PermissionsAndroid.check(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                
            );

            if (hasPermission) {
                getPosition()
            }

            const status = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,

            );

            if (status === PermissionsAndroid.RESULTS.GRANTED) {
                getPosition()
             
            }

            if (status === PermissionsAndroid.RESULTS.DENIED) {
                const token = await AsyncStorage.getItem("token");

                if (token) {
                    getProfile()
                    getCartDetails()
                    getAddressList()
                }
                setInitialScreen('AddNewLocation');
                Toast.show({
                    type: 'error',
                    text1: 'Location permission denied by user.'
                });
            }
            else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
                const token = await AsyncStorage.getItem("token");

                if (token) {
                    getProfile()
                    getCartDetails()
                    getAddressList()
                }
                setInitialScreen('AddNewLocation');
                Toast.show({
                    type: 'error',
                    text1: 'Location permission revoked by user.',
                });
            }
        }

    }, [])

    function getAddressFromCoordinates() {
        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${location?.latitude},${location?.longitude}&key=AIzaSyBBcghyB0FvhqML5Vjmg3uTwASFdkV8wZY`).then(response => {
            userContext.setCurrentAddress(response?.data?.results[0]?.formatted_address)
            //setLocation
        })
            .catch(err => {
            })
    }

    const getPosition = async () => {
        await Geolocation.getCurrentPosition(
            position => {

                getAddressFromCoordinates(position?.coords?.latitude, position.coords?.longitude)
                setLocation(position?.coords)
                userContext.setLocation([position?.coords?.latitude, position.coords?.longitude])
                checkLogin();
            },
            async error => {
                const token = await AsyncStorage.getItem("token");

                if (token) {
                    getProfile()
                    getCartDetails()
                    getAddressList()
            
                }
                setInitialScreen('AddNewLocation');
                Toast.show({
                    type: 'error',
                    text1: error.message
                });
                // checkLogin();
            },
            {
                accuracy: {
                    android: 'high',
                    ios: 'best',
                },
                enableHighAccuracy: true,
                timeout: 15000,
                maximumAge: 10000,
                distanceFilter: 0,
                forceRequestLocation: true,
                forceLocationManager: false,
                showLocationDialog: true,
            },
        );
    }



    const VersionManagement = (data)=>{
        reactotron.log('API CSLLEEEEEE')
        SplashScreen.hide()
          if(DeviceVersion * 1 < data?.current_version * 1){
                 if(DeviceVersion * 1 < data?.current_version * 1 && data?.update){
                    setversionUpdate(true);
                    setForceUpdate(true);
                 }else if(DeviceVersion * 1 < data?.current_version * 1 && !data?.update){
                    setversionUpdate(true)
                 }
          }else{
            setInitialScreen(mode);
          }
       }
    
    
       const ColoseUpdateModal = useCallback(()=>{
        setversionUpdate(false);
        setInitialScreen(mode);
       },[versionUpdate])
    


    const getProfile = useCallback(async () => {
        loadingContext.setLoading(true);
        await customAxios.get(`customer/customer-profile`)
            .then(async response => {
                loadingContext.setLoading(false);
                userContext.setUserData(response?.data?.data)
                VersionManagement(response?.data?.data)
                // setInitialScreen(mode);
            })
            .catch(async error => {
                Toast.show({
                    type: 'error',
                    text1: error
                });
                setInitialScreen('Login');
                await AsyncStorage.clear()
                loadingContext.setLoading(false);
            })
    }, [])

    const getCartDetails = useCallback(async () => {
        let cartId = await AsyncStorage.getItem("cartId");
        if (cartId) {
            loadingContext.setLoading(true);
            await customAxios.get(`customer/cart/show-cart/${cartId}`)
                .then(async response => {
                    if (isObject(response?.data?.data)) {
                        cartContext.setCart(response?.data?.data)
                    }
                    else {
                        await AsyncStorage.removeItem("cartId")
                    }
                    loadingContext.setLoading(false);

                })
                .catch(async error => {
                    Toast.show({
                        type: 'error',
                        text1: error
                    });
                    loadingContext.setLoading(false);
                })
        }

    }, [])
    

    const getAddressList = async () => {
        loadingContext.setLoading(true)
        await customAxios.get(`customer/address/list`)
            .then(async response => {
                if (response?.data?.data?.length > 0) {
                    if (response?.data?.data?.length === 1) {
                        userContext.setLocation([response?.data?.data?.[0]?.area?.latitude, response?.data?.data?.[0]?.area?.longitude])
                        userContext?.setCurrentAddress(response?.data?.data?.[0]?.area?.address)
                        // reactotron.log('API RESPONSE CALLED IN GEO')
                    }
                    else {
                        let defaultAdd = response?.data?.data?.find(add => add?.default === true)
                        userContext.setLocation([defaultAdd?.area?.latitude, defaultAdd?.area?.longitude])
                        userContext?.setCurrentAddress(defaultAdd?.area?.address)
                        // reactotron.log('API RESPONSE CALLED IN GEO')
                    }
                }
                cartContext.setAddress(response?.data?.data)
                loadingContext.setLoading(false)
            })
            .catch(async error => {
                getAddressFromCoordinates()
                Toast.show({
                    type: 'error',
                    text1: error
                });
                loadingContext.setLoading(false)
            })
    }

    const checkLogin = async () => {
        // await AsyncStorage.clear()

        const token = await AsyncStorage.getItem("token");

        if (token) {
            getProfile()
            getCartDetails()
            getAddressList()
            reactotron.log('API CALLED IN ADDDRESS')
        }
        else {
            setInitialScreen('Login');
        }
    }


    

    useEffect(async () => {
        const token = await AsyncStorage.getItem("token");
        if (token) {
            const subscription = AppState.addEventListener('change', async nextAppState => {

                if (nextAppState === 'active') {
              
                    await customAxios.post('customer/login-status-update', { login_status: true })
                
                } else {
                    await customAxios.post('customer/login-status-update', { login_status: false })
            
                }
            });
            return () => {
                subscription.remove();
            };
        }
    }, []);

    if (!initialScreen) {
        SplashScreen.hide()
        return (
            <>
            <SplashScreenP />
            {versionUpdate &&  <CommonUpdateModal isopen={versionUpdate} CloseModal={ColoseUpdateModal} ForceUpdate={forceUpdate} /> }
            </>
            
        )
    }



    return (
        <>
            <NavigationContainer ref={navigationRef}>
                <Stack.Navigator initialRouteName={initialScreen} screenOptions={{ headerShown: false }}>

                    {/* <Stack.Screen name="SplashScreen" component={SplashScreen} /> */}
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="Otp" component={Otp} />
                    <Stack.Screen name="LocationScreen" component={LocationScreen} options={{ title: 'home' }} />
                    <Stack.Screen name="AddNewLocation" component={AddNewLocation} />
                    <Stack.Screen name="panda" component={Panda} />
                    <Stack.Screen name="fashion" component={Fashion} />
                    <Stack.Screen name="green" component={Green} />
                </Stack.Navigator>
            </NavigationContainer>
            {/* <LoadingModal isVisible={true} /> */}
        </>
    )
}

export default Route

const styles = StyleSheet.create({})