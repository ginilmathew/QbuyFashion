import { StyleSheet, ToastAndroid } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { useDispatch, useSelector } from 'react-redux';
import { navigationRef } from './RootNavigation';
import Login from '../screens/auth/Login';
import Otp from '../screens/auth/Otp';
import Menu from './Menu';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AuthContext from '../contexts/Auth';
import customAxios from '../CustomeAxios';
import LoaderContext from '../contexts/Loader';
import Toast from 'react-native-toast-message'
import SplashScreen from 'react-native-splash-screen'
import LoadingModal from '../Components/LoadingModal';
import LocationScreen from '../screens/MyAccount/MyAddresses/LocationScreen';
import AddNewLocation from '../screens/MyAccount/MyAddresses/LocationScreen/AddNewLocation';
import SplashScreenF from '../screens/SplashScreen';


// import Menu from './Menu';


const Stack = createNativeStackNavigator();

const Navigation = () => {

    const userContext = useContext(AuthContext)
	const loadingg = useContext(LoaderContext)

    const [initialScreen, setInitialScreen] = useState(null)


    useEffect(() => {
        checkLogin();
    }, [])
    const checkLogin =  async() => {
        const token = await AsyncStorage.getItem("token");
        if (token) {
            const user = await AsyncStorage.getItem("user");
            if (user) {
                let userdata = JSON.parse(user)
                await customAxios.get(`customer/customer-profile`)
                .then(async response => {
                    // setData(response?.data?.data)
                    userContext.setUserData(response?.data?.data)
                    loadingg.setLoading(false)
                })
                .catch(async error => {
                    Toast.show({
                        type: 'error',
                        text1: error
                    });
                    loadingg.setLoading(false)
                })

                
                setInitialScreen('Menu');
            }
            else {
                SplashScreen.hide()
                setInitialScreen('Login');
                
            }
        }
        else {
            SplashScreen.hide()
            setInitialScreen('Login');
            
        }
    }
    

    return (
        <>
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator initialRouteName={initialScreen} screenOptions={{ headerShown: false }}>

                <Stack.Screen name="SplashScreen" component={SplashScreenF} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Otp" component={Otp} />

                <Stack.Screen name="Menu" component={Menu} />
              

                {/* <Stack.Screen name="Menu" component={Menu} /> */}
                {/* <Stack.Screen name="ViewPdf" component={ViewPdf} options={{
                    presentation: 'containedTransparentModal'
                }} />
                <Stack.Screen name='notifications' component={Notifications} /> */}


            </Stack.Navigator>
        </NavigationContainer>
        {/* <LoadingModal isVisible={true} /> */}
        </>
    )
}

export default Navigation

const styles = StyleSheet.create({})