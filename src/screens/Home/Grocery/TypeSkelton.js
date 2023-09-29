import { StyleSheet, TouchableOpacity, View, useWindowDimensions } from 'react-native'
import React, { memo } from 'react'
import Animated, { Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';



const TypeSkelton = memo(() => {

    const opacity = useSharedValue(0.5);


    const { width, fontScale, height } = useWindowDimensions();

    let imageWidth = width / 6
    let restauranWidth = width / 4.5

    const styles = makeStyles(fontScale, height);

    // React.useEffect(() => {
    //     withTiming(1, { duration: 1000 })
    //   }, []);

    // const style = useAnimatedStyle(() => {
    //     return {
    //       opacity: withRepeat (withTiming(opacity.value, {
    //         duration: 1000,
    //         easing: 
    //       }, () => {
    //         opacity.value = 1
    //       }), -1, true)
          
    //     };
    //   });

    
    return (
        <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: 5, padding: 5 }}>
            <Animated.View
                style={[{ alignItems: 'center', width: imageWidth, height: imageWidth, backgroundColor: '#fff', borderRadius: imageWidth/2  }]}
            >
                

            </Animated.View>
            <View
                numberOfLines={2}
                style={styles.shopName}
            ></View>
        </View>
    )
})

export default TypeSkelton

const makeStyles = (fontScale, width) => StyleSheet.create({
    shopName: {
        
        textAlign: 'center',
        marginTop: 4,
        height: 10,
        backgroundColor: '#fafafa',
        width: '100%'
    },
})