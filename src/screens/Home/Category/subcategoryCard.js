import { StyleSheet, Text, View } from 'react-native'
import React, { useCallback } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import FastImage from 'react-native-fast-image'
import { IMG_URL } from '../../../config/constants'
import reactotron from 'reactotron-react-native'
const SubcategoryCard = ({item,onClick,active,selectSubcategorySwitch}) => {

    const subCategorySelect = useCallback((value)=>{
        selectSubcategorySwitch(value?._id)
    },[item])
    return (
        <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: 5, padding: 5 }}>
            <TouchableOpacity
                onPress={()=>subCategorySelect(item)}
                key={item?._id}
                style={{ alignItems: 'center', width:60, height: 60}}
            >
                <FastImage
                    style={{ borderRadius: 30, width: '100%', height: '100%' }}
                    source={{ uri: `${IMG_URL}${active === "panda" ? (item?.store_logo || item?.image) : item?.image}` }}
                    borderRadius={30}
                />

            </TouchableOpacity>
            <Text
                numberOfLines={2}
                style={styles.shopName}
            >{item?.name}</Text>
        </View>
    )
}

export default SubcategoryCard

const styles = StyleSheet.create({})