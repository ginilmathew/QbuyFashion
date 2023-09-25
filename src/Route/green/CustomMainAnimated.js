import { View, Text, StyleSheet, Animated, useAnimatedValue, Easing } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import reactotron from 'reactotron-react-native';
const CustomMainAnimated = (props) => {


    const { enableSwitch, colors, imageswitch } = props;
    let [animatedValue, setAnimatedValue] = useState(new Animated.Value(0))



    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                // start rotation in one direction (only half the time is needed)
                Animated.timing(animatedValue, { toValue: 1.0, duration: 150, easing: Easing.linear, useNativeDriver: true }),
                // rotate in other direction, to minimum value (= twice the duration of above)
                Animated.timing(animatedValue, { toValue: -1.0, duration: 300, easing: Easing.linear, useNativeDriver: true }),
                // return to begin position
                Animated.timing(animatedValue, { toValue: 0.0, duration: 150, easing: Easing.linear, useNativeDriver: true })
            ])
        ).start();
    }, [])


   


    return (
     
            <TouchableOpacity
                style={styles.button}
                onPress={enableSwitch}
            >
                <LinearGradient
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={colors}
                    style={styles.panda}
                >
                    <Animated.Image
                        style={{
                            
                            transform: [{
                                rotate: animatedValue.interpolate({
                                    inputRange: [-1, 1],
                                    outputRange: ['-0.1rad', '0.1rad']
                                })
                            }]
                        }}
                        source={imageswitch}
                    />
                </LinearGradient>
            </TouchableOpacity>
     
    )
}

export default CustomMainAnimated

const styles = StyleSheet.create({

    button: {
        flex: 1,
        height:'100%',
        justifyContent: 'center',
    },

    panda: {
        width: 70,
        height: 70,
        borderRadius: 35,
        zIndex:50,
        alignItems: 'center',
        justifyContent: 'center'
    },
   
})