import { ImageBackground, StatusBar, StyleSheet } from 'react-native'
import React from 'react'

const CommonAuthBg = ({children}) => {
    return (
        <>
        <StatusBar backgroundColor={'#000'} />
        <ImageBackground 
            style={styles.container} 
            source={require('../../Images/authBg.png')}
        >
            {children}
        </ImageBackground>
        </>
    )
}

export default CommonAuthBg

const styles = StyleSheet.create({
    container: {
        flex: 1,
       
    }
})