import React, { useState, useEffect, memo, useCallback, useContext } from 'react'
import { View, ImageBackground, StyleSheet, TouchableOpacity, useWindowDimensions, Text } from "react-native";
import { useNavigation } from '@react-navigation/native'
import Lottie from 'lottie-react-native';
import FastImage from 'react-native-fast-image';
import { IMG_URL } from '../../config/constants';
import PandaContext from '../../contexts/Panda';
import reactotron from '../../ReactotronConfig';



const CategoriesCard = memo(({ item }) => {

    const { width, fontScale, height } = useWindowDimensions()
    const { active } = useContext(PandaContext)


    let imageWidth = width / 6

    const navigation = useNavigation();




    const onClick = useCallback(() => {
        navigation.navigate(active === 'panda' ? 'pandaCategory' : 'Category', { name: active === 'panda' ? item?.store_name : item?.name, mode: active, item: item })
    }, [item,navigation])

    return (
        <TouchableOpacity
            onPress={onClick}
            style={{ width: width / 4.2, height: 80, alignItems: 'center' }}
        >
            <View
                style={styles.lottieView}
            >
                <FastImage
                    style={{ borderRadius: imageWidth / 2, width: '100%', height: '100%' }}
                    source={{ uri: `${IMG_URL}${item?.image}` }}
                    borderRadius={30}
                />
            </View>
            <Text style={styles.itemText} numberOfLines={1}>{item?.name}</Text>
        </TouchableOpacity>
    )
})

export default CategoriesCard

const styles = StyleSheet.create({
    lottieView: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#DFEFE2',
    },
    itemText: {
        textAlign: 'center',
        fontSize: 11,
        marginTop: 5,
        fontFamily: 'Poppins-Medium',
        color: '#23233C'
    }
})