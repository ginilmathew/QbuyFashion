import React, { memo } from 'react'
import { View, StyleSheet, TouchableOpacity, useWindowDimensions } from "react-native";



const ShopCardSkeltion = memo(() => {

  

    const { width, height, fontScale } = useWindowDimensions()
    const styles = makeStyles(height);

    

    return (
        <TouchableOpacity style={{justifyContent:'center',alignItems:'center'}}>
            <View
            style={{ width: width / 4.5, height: width / 4.2, alignItems: 'center', justifyContent: 'center', marginTop: 10, marginBottom: 5, backgroundColor: '#fafafa', margin: 4 }}
        >
            
           
        </View>
        <View
                style={{paddingTop:5,backgroundColor:'#fafafa',width:'90%',height:10}}
            ></View>
        </TouchableOpacity>
    
    )
})

export default ShopCardSkeltion

const makeStyles = height => StyleSheet.create({

    itemText: {
       
        marginTop: 5,
        height: 10,
        backgroundColor: '#fafafa',
        width: '100%'
    }
})