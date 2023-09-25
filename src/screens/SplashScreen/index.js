import { Image, ImageBackground, NativeModules, StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React from 'react'
import CommonAuthBg from '../auth/CommonAuthBg'
import { mode } from '../../config/constants'


const SplashScreenF = ({ navigation }) => {

    const { width, height } = useWindowDimensions()

    const imageURl = {
        panda: require('../../Images/splashPanda.png'),
        green: require('../../Images/greensplash.png'),
        fashion: require('../../Images/fashion.jpg')
    }

    return (
        <Image
            source={imageURl[mode]}
            style={{ width: width, height: height }}
            resizeMode='cover'
        />

    )
}

export default SplashScreenF

const styles = StyleSheet.create({

})