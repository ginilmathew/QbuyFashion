import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View, Switch, Platform, useWindowDimensions } from 'react-native'
import React, { memo, useCallback, useContext, useRef, useState } from 'react'

import FastImage from 'react-native-fast-image'
import { useNavigation } from '@react-navigation/native'
import { IMG_URL } from '../../../config/constants'
import PandaContext from '../../../contexts/Panda'
import reactotron from 'reactotron-react-native'


const PandaShopCard = memo(({ item, mode, onCategoryPress, storeId, mymode, name }) => {



    const { active } = useContext(PandaContext)

    const { width, fontScale, height } = useWindowDimensions()

    let imageWidth = width / 6
    let restauranWidth = width / 4.5

    const styles = makeStyles(fontScale, height);
    const navigation = useNavigation()

    // const onClick = useCallback(() => {
    //     navigation.navigate('Category', { name: item?.name, mode: contextPanda.active, item: item, storeId })
    // }, [item])
    const onClick = useCallback(() => {
        navigation.navigate('store', { name: active === "panda" ? item?.store_name : item?.name, mode: 'store', item: item })


    }, [item, active, item?._id])
    return (
        <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: 5, padding: 5 }}>
            <TouchableOpacity
                onPress={onClick}
                key={item?._id}
                style={{ alignItems: 'center', width: name === "restaurants" ? width/2.3 : imageWidth, height: name === "restaurants" ? 120 : imageWidth }}
            >
                <FastImage
                    style={{  width: '100%', height: '100%',borderRadius: Platform.OS === 'android' ? name === "restaurants" ? 8 : imageWidth / 2 : 0}}
                    source={{ uri: `${IMG_URL}${active === "panda" ? (item?.store_logo || item?.image) : item?.image}` }}
                    borderRadius={ name === "restaurants" ? 8 : imageWidth / 2}
                />

            </TouchableOpacity>
            <Text
                numberOfLines={2}
                style={styles.shopName}
            >{(active === "panda" ? item?.store_name || item?.name : item?.name)}</Text>
        </View>
    )
})

export default PandaShopCard

const makeStyles = (fontScale, width) => StyleSheet.create({
    shopName: {
        fontFamily: 'Poppins-SemiBold',
        color: '#23233C',
        fontSize: 0.013 * width,
        textAlign: 'center',
        marginTop: 5,
        paddingHorizontal: 5,
        fontWeight: 'bold'
    },
})