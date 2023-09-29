import { Image, StyleSheet, Text, View, ScrollView, TouchableOpacity, useWindowDimensions, Linking } from 'react-native'
import React, { useRef, useState, useEffect, useContext, useCallback } from 'react'
import Foundation from 'react-native-vector-icons/Foundation'
import Ionicons from 'react-native-vector-icons/Ionicons'
import HeaderWithTitle from '../../../../Components/HeaderWithTitle'
import Lottie from 'lottie-react-native';
import CommonTexts from '../../../../Components/CommonTexts'
import CustomButton from '../../../../Components/CustomButton'
import PandaContext from '../../../../contexts/Panda'
import reactotron from '../../../../ReactotronConfig'
import moment from 'moment'
import AuthContext from '../../../../contexts/Auth'



const OrderPlaced = ({ route, navigation }) => {
    const { item } = route.params;
    


    const userContext = useContext(AuthContext);


    const contextPanda = useContext(PandaContext)
    let active = contextPanda.active


    const { width } = useWindowDimensions()


    const WhatsappRedirect = (useCallback(() => {
        let msg = `${'OrderId:'}${item?.order_id}`;
        let phoneWithCountryCode = `${+918137009905}`;
        let mobile =
            Platform.OS == "ios" ? phoneWithCountryCode : "+" + phoneWithCountryCode;
        if (mobile) {
            if (msg) {
                let url = "whatsapp://send?text=" + msg + "&phone=" + mobile;
                Linking.openURL(url)
                    .then(data => {
                      
                    })
                    .catch(() => {
                        alert("Make sure WhatsApp installed on your device");
                    });
            } else {
                alert("Please insert message to send");
            }
        } else {
            alert("Please insert mobile no");
        }

    }, []))

    return (
        <>
            <HeaderWithTitle title={'Order Placed'} noBack />
            <View style={{ flex: 1, backgroundColor: active === 'green' ? '#F4FFE9' : active === 'fashion' ? '#FFF5F7' : '#fff', paddingHorizontal: 10, justifyContent: 'center' }}>

                <View style={{ height: 180, }}>
                    <Lottie
                        source={{ uri: 'https://assets7.lottiefiles.com/packages/lf20_p8xtmag7.json' }}
                        autoPlay loop
                    />
                </View>
                <CommonTexts label={'Order Placed Successfully !'} color='#089321' fontSize={20} textAlign='center' />
                <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 16, color: '#23233C', textAlign: 'center' }}>Order ID : #{item?.order_id}</Text>
                <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 9, color: '#A5A5A5', textAlign: 'center', marginTop: 5 }}>{moment(item?.created_at).format('DD-MM-YYYY hh:mm A')}</Text>
                {/* <View style={{borderRadius:15, backgroundColor:'#F3FFF5', padding:10, marginVertical:15}}>
                    <Text style={{fontFamily:'Poppins-Regular', fontSize:11, color:'#23233C'}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</Text>
                </View> */}
                <View style={{ marginTop: 20, alignItems: 'center' }}>
                    <CommonTexts label={'Please let us know if you need any help'} color='#23233C' fontSize={13} />
                </View>


                <View style={{  justifyContent: 'space-between' ,alignItems:'center',marginTop:10 }}>
                    {/* <CustomButton
                        label={'Call Us'}
                        bg={active === 'green' ? '#FF9C0C' : '#5871D3'}
                        width={width / 2.2}
                        leftIcon={<Ionicons name='call-sharp' color='#fff' size={18} marginRight={5} />}
                    /> */}
                    <CustomButton
                        onPress={WhatsappRedirect}
                        label={'Whatsapp'}
                        bg='#21AD37'
                        width={width / 2.2}
                        leftIcon={<Ionicons name='logo-whatsapp' color='#fff' size={18} marginRight={5} />}
                    />
                </View>
            </View>


        </>
    )
}

export default OrderPlaced

const styles = StyleSheet.create({

    productBox: {
        marginTop: 10,
        backgroundColor: '#fff',
        borderRadius: 15,
        marginHorizontal: 10,
    },



})