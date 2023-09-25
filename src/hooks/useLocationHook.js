

import { PermissionsAndroid, Platform, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Geolocation from 'react-native-geolocation-service';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import reactotron from 'reactotron-react-native';


const  useLocationHook = () => {

    const [location, setLocation] = useState(null);
    const [initialScreen, setInitialScreen] = useState(null);


    useEffect(() => {
        const getCurrentLocation = async () => {
            if (Platform.OS === 'ios') {
                const status = await Geolocation.requestAuthorization('whenInUse');
                if (status === "granted") {
                    getPosition();
                } else {
                    Toast.show({
                        type: 'error',
                        text1: 'Location permission denied by user.'
                    });
                }
            } else {
                const status = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,

                );

                if (status === PermissionsAndroid.RESULTS.GRANTED) {
                    getPosition()
                } else if (status === PermissionsAndroid.RESULTS.DENIED || status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {

                    Toast.show({
                        type: 'error',
                        text1: 'Location permission denied by user.'
                    });
                }

            }

        }

        const getPosition = async () => {
            await Geolocation.getCurrentPosition(position => {
                getAddressFromCoordinates(position?.coords?.latitude, position.coords?.longitude)
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
        const getAddressFromCoordinates = async (lat, lng) => {
            if (lat && lng) {
                axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${lat},${lng}&key=AIzaSyBBcghyB0FvhqML5Vjmg3uTwASFdkV8wZY`).then(response => {


                    setLocation(response?.data?.results[0]?.formatted_address)
                    //setLocation
                })
                    .catch(err => {
                    })
            }
        }

        getCurrentLocation()
    }, [])

    return location;

}

export default useLocationHook;
