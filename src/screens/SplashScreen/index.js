import { Image, ImageBackground, NativeModules, StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React from 'react'
import CommonAuthBg from '../auth/CommonAuthBg'
import { mode } from '../../config/constants'


const SplashScreen = ({ navigation }) => {

    const { width, height } = useWindowDimensions()

    const imageURl = {
        panda: require('../../Images/splashPanda.png'),
        green: require('../../Images/splash.png'),
        fashion: require('../../Images/splash.png')
    }

    return (
        <Image
            source={imageURl[mode]}
            style={{ width: width, height: height }}
            resizeMode='cover'
        />

    )
}

export default SplashScreen

const styles = StyleSheet.create({

})