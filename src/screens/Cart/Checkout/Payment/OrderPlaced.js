import { Image, StyleSheet, Text, View, ScrollView, TouchableOpacity, useWindowDimensions } from 'react-native'
import React, { useRef, useState, useEffect, useContext } from 'react'
import Foundation from 'react-native-vector-icons/Foundation'
import Ionicons from 'react-native-vector-icons/Ionicons'
import HeaderWithTitle from '../../../../Components/HeaderWithTitle'
import Lottie from 'lottie-react-native';
import CommonTexts from '../../../../Components/CommonTexts'
import CustomButton from '../../../../Components/CustomButton'
import PandaContext from '../../../../contexts/Panda'

const OrderPlaced = ({ navigation }) => {

    const contextPanda = useContext(PandaContext)
    let active = contextPanda.active
    const {width} = useWindowDimensions()

    return (
        <>
            <HeaderWithTitle title={'Order Placed'} noBack />
            <ScrollView style={{ flex: 1, backgroundColor: active === 'green' ? '#F4FFE9' : active === 'fashion' ? '#FFF5F7' : '#fff',  paddingHorizontal:10}}>

                <View style={{height:180,}}>
                    <Lottie 
                        source={{uri: 'https://assets7.lottiefiles.com/packages/lf20_p8xtmag7.json'}} 
                        autoPlay loop
                    />
                </View>
                <CommonTexts label={'Order Placed Successfully !'} color='#089321' fontSize={20} textAlign='center'/>
                <Text style={{fontFamily:'Poppins-Bold', fontSize:16, color:'#23233C', textAlign:'center'}}>Order ID : #10785</Text>
                <Text style={{fontFamily:'Poppins-Medium', fontSize:9, color:'#A5A5A5', textAlign:'center', marginTop:5}}>22/05/2022 10:50 pm</Text>
                <View style={{borderRadius:15, backgroundColor:'#F3FFF5', padding:10, marginVertical:15}}>
                    <Text style={{fontFamily:'Poppins-Regular', fontSize:11, color:'#23233C'}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</Text>
                </View>
                <CommonTexts label={'Please let us know if you need any help'} color='#23233C' fontSize={13} />

                <View style={{flexDirection:'row', justifyContent:'space-between',marginVertical:20}}>
                    <CustomButton 
                        label={'Call Us'}
                        bg={ active === 'green' ? '#FF9C0C' : '#5871D3'}
                        width={width/2.2}
                        leftIcon={<Ionicons name='call-sharp' color='#fff' size={18} marginRight={5}/>}
                    />
                    <CustomButton 
                        label={'Whatsapp'}
                        bg='#21AD37'
                        width={width/2.2}
                        leftIcon={<Ionicons name='logo-whatsapp' color='#fff' size={18} marginRight={5}/>}
                    />

                </View>
                
             

            </ScrollView>

        
        </>
    )
}

export default OrderPlaced

const styles = StyleSheet.create({

    productBox: { 
        marginTop: 10, 
        backgroundColor: '#fff', 
        borderRadius: 15,
        marginHorizontal:10 ,
    },

   

})