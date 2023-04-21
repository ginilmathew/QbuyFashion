import { PermissionsAndroid, Platform, StyleSheet, ToastAndroid } from 'react-native'
import React, { useState, useEffect, useContext, useCallback } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { useDispatch, useSelector } from 'react-redux';
import { navigationRef } from '../Navigations/RootNavigation';
import Login from '../screens/auth/Login';
import Otp from '../screens/auth/Otp';
//import Menu from './Menu';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from '../screens/SplashScreen';
//import reactotron from '../ReactotronConfig';
import AuthContext from '../contexts/Auth';
import CartContext from '../contexts/Cart';
import Panda from './panda';
import Fashion from './fashion';
import { mode } from '../config/constants';
import Green from './green';
import Geolocation from 'react-native-geolocation-service';
import reactotron from 'reactotron-react-native';
import customAxios from '../CustomeAxios';
import LoaderContext from '../contexts/Loader';
import { isObject } from 'lodash'
import Toast from 'react-native-simple-toast';
import axios from 'axios';



// import Menu from './Menu';


const Stack = createNativeStackNavigator();

const Route = () => {

    const userContext = useContext(AuthContext)
    const cartContext = useContext(CartContext)
    const loadingContext = useContext(LoaderContext)
    const [location, setLocation] = useState(null) 


    const [initialScreen, setInitialScreen] = useState(null)
    useEffect(() => {
        getCurrentLocation()
    }, [])

    const getCurrentLocation = useCallback(async () => {
        if (Platform.OS === 'ios') {
            const status = await Geolocation.requestAuthorization('whenInUse');
            if (status === "granted") {
                getPosition()
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
                ToastAndroid.show(
                    'Location permission denied by user.',
                    ToastAndroid.LONG,
                );
            }
            else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
                ToastAndroid.show(
                    'Location permission revoked by user.',
                    ToastAndroid.LONG,
                );
            }
        }

    }, [])

    function getAddressFromCoordinates() {
        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${location?.latitude},${location?.longitude}&key=AIzaSyDDFfawHZ7MhMPe2K62Vy2xrmRZ0lT6X0I`).then(response => {
            userContext.setCurrentAddress(response?.data?.results[0]?.formatted_address)
            setLocation
        })
        .catch(err => {
            reactotron.log({err})
        })
      
    }

    const getPosition = async () => {
        await Geolocation.getCurrentPosition(
            position => {
                //getAddressFromCoordinates(position?.coords?.latitude, position.coords?.longitude)
                setLocation(position?.coords)
                userContext.setLocation([position?.coords?.latitude, position.coords?.longitude])
                checkLogin();
            },
            error => {
                Toast.showWithGravity(error, Toast.SHORT, Toast.BOTTOM);
                checkLogin();
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


    const getProfile = useCallback(async() => {
        loadingContext.setLoading(true);
        await customAxios.get(`customer/customer-profile`)
        .then(async response => {
            loadingContext.setLoading(false);
            userContext.setUserData(response?.data?.data)
            setInitialScreen(mode);
        })
        .catch(async error => {
            Toast.showWithGravity(error, Toast.SHORT, Toast.BOTTOM);
            setInitialScreen('Login');
            loadingContext.setLoading(false);
        })
    }, [])

    const getCartDetails = useCallback(async() => {
        let cartId = await AsyncStorage.getItem("cartId");
        if(cartId){
            loadingContext.setLoading(true);
            await customAxios.get(`customer/cart/show-cart/${cartId}`)
            .then(async response => {
                if(isObject(response?.data?.data)){
                    cartContext.setCart(response?.data?.data)
                }
                else{
                    await AsyncStorage.removeItem("cartId")
                }
                loadingContext.setLoading(false);
                
            })
            .catch(async error => {
                Toast.showWithGravity(error, Toast.SHORT, Toast.BOTTOM);
                loadingContext.setLoading(false);
            })
        }
        
    }, [])

    const getAddressList = async () => {
        loadingContext.setLoading(true)
        await customAxios.get(`customer/address/list`)
            .then(async response => {
                if(response?.data?.data?.length > 0){
                    if(response?.data?.data?.length === 1){
                        userContext.setLocation([response?.data?.data?.[0]?.area?.latitude, response?.data?.data?.[0]?.area?.longitude])
                        userContext?.setCurrentAddress(response?.data?.data?.[0]?.area?.address)
                    }
                    else{
                        let defaultAdd = response?.data?.data?.find(add => add?.default === true)
                        userContext.setLocation([defaultAdd?.area?.latitude, defaultAdd?.area?.longitude])
                        userContext?.setCurrentAddress(defaultAdd?.area?.address)
                    }
                }
                
                
                cartContext.setAddress(response?.data?.data)
                loadingContext.setLoading(false)
            })
            .catch(async error => {
                getAddressFromCoordinates()
                reactotron.log({error})
                //Toast.showWithGravity(error, Toast.SHORT, Toast.BOTTOM);
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
        }
        else {
            setInitialScreen('Login');
        }
    }
    if (!initialScreen) {
        return (
            <SplashScreen />
        )
    }

    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator initialRouteName={initialScreen} screenOptions={{ headerShown: false }}>

                <Stack.Screen name="SplashScreen" component={SplashScreen} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Otp" component={Otp} />

                <Stack.Screen name="panda" component={Panda} />
                <Stack.Screen name="fashion" component={Fashion} />
                <Stack.Screen name="green" component={Green} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Route

const styles = StyleSheet.create({})