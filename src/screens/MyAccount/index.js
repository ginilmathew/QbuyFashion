import { Image, StyleSheet, Text, View, ScrollView, useWindowDimensions, Modal, TouchableOpacity } from 'react-native'
import React, { useCallback, useContext, useState } from 'react'
import CommonTexts from '../../Components/CommonTexts'
import ListCard from './ListCard'
import CustomButton from '../../Components/CustomButton'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import HeaderWithTitle from '../../Components/HeaderWithTitle'
import { useNavigation } from '@react-navigation/native'
import PandaContext from '../../contexts/Panda'
import LogoutModal from './LogoutModal'
import AsyncStorage from '@react-native-async-storage/async-storage'
import AuthContext from '../../contexts/Auth'
import reactotron from '../../ReactotronConfig'
import customAxios from '../../CustomeAxios'
import Toast from 'react-native-simple-toast';



const MyAccount = ({ navigation }) => {

    const contextPanda = useContext(PandaContext)
    let active = contextPanda.active
    const user = useContext(AuthContext)
    let userData = user?.userData
	// reactotron.log({userData})

    const [showModal, setShowModal] = useState(false)

    const gotoMyAddress = useCallback(() => {
        navigation.navigate('MyAddresses', { mode: 'MyAcc' })
    }, [])

    const gotoPandaCoins = useCallback(() => {
        navigation.navigate('PandaCoins')
    }, [])

    const gotoAffiliateBonus = useCallback(() => {
        navigation.navigate('AffiliateBonus')
    }, [])


    const onClose = useCallback(() => {
        setShowModal(false)
    }, [])

    const onClick = useCallback(async() => {
        setShowModal(false)
        // await AsyncStorage.clear()

        let datas = {
            id : userData?._id
        }
        await customAxios.post(`auth/customerlogout`, datas)
            .then(async response => {
                Toast.showWithGravity(response?.data?.message, Toast.SHORT, Toast.BOTTOM);
                navigation.navigate('Login')
                await AsyncStorage.clear()

            })
            .catch(async error => {
                Toast.showWithGravity(error, Toast.SHORT, Toast.BOTTOM);
            })
    })

    const onEdit = useCallback(async() => {
        navigation.navigate('EditProfile')
    })

    return (
        <>
            <HeaderWithTitle title={'My Account'} noBack />
            <ScrollView style={{ flex: 1, backgroundColor: active === 'green' ? '#F4FFE9' : active === 'fashion' ? '#FFF5F7' : '#fff', }}>
                <View style={{ alignItems: 'center' }}>
                    <View>
                        <Image
                            style={styles.logo}
                            source={require('../../Images/drawerLogo.png')}
                        />
                        <TouchableOpacity 
                            onPress={onEdit}
                            style={{width:25, height:25, borderRadius:15, backgroundColor: active === "green" ? '#8ED053' : active === "fashion" ? '#FF7190' : '#58D36E', alignItems:'center', justifyContent:'center', alignSelf:'flex-end', marginTop:-25}}
                        >
                            <MaterialIcons name='edit' size={15} color='#fff'/>
                        </TouchableOpacity>
                    </View>


                    <CommonTexts
                        label={'Shaan Johnson'}
                        color="#23233C"
                        fontSize={13}
                        mt={3}
                    />
                    <Text
                        style={{
                            fontFamily: 'Poppins-Regular',
                            color: '#A9A9A9',
                            fontSize: 9,
                        }}
                    >{'shaan@gmail.com'}</Text>
                    <Text
                        style={{
                            fontFamily: 'Poppins-Regular',
                            color: '#A9A9A9',
                            fontSize: 9,
                            marginTop: 1,
                        }}
                    >{userData?.mobile}</Text>
                </View>
                <View style={{ marginHorizontal: 20 }}>
                    <ListCard
                        onPress={gotoMyAddress}
                        img={active === 'green' ? require('../../Images/addressOrange.png') : active === 'fashion' ? require('../../Images/fashionAddress.png') : require('../../Images/address.png')}
                        label={'My Addresses'}
                    />
                    <ListCard
                        onPress={gotoPandaCoins}
                        img={active === 'green' ? require('../../Images/Orangepanda.png') : active === 'fashion' ? require('../../Images/fashionPanda.png') : require('../../Images/panda.png')}
                        label={'Panda Coins'}
                        pandaCoin='500'
                    />
                    {!active === 'fashion' || !active === 'green' ? null : <ListCard
                        onPress={gotoAffiliateBonus}
                        img={active === 'green' ? require('../../Images/affiliateOrange.png') : require('../../Images/affiliate.png')}
                        label={'Affiliate Bonus'}
                    />}
                    <ListCard
                        img={active === 'green' ? require('../../Images/buildingOrange.png') : active === 'fashion' ? require('../../Images/fashionBuilding.png') : require('../../Images/building.png')}
                        label={'About Us'}
                    />
                    <ListCard
                        img={active === 'green' ? require('../../Images/fileOrange.png') : active === 'fashion' ? require('../../Images/fashionFile.png') : require('../../Images/file.png')}
                        label={'Terms & Conditions'}
                    />
                    <ListCard
                        img={active === 'green' ? require('../../Images/fileOrange.png') : active === 'fashion' ? require('../../Images/fashionFile.png') : require('../../Images/file.png')}
                        label={'Privacy Policy'}
                    />
                    <ListCard
                        img={active === 'green' ? require('../../Images/fileOrange.png') : active === 'fashion' ? require('../../Images/fashionFile.png') : require('../../Images/file.png')}
                        label={'Cancellation & Refund Policy'}
                    />
                    <ListCard
                        img={active === 'green' ? require('../../Images/fileOrange.png') : active === 'fashion' ? require('../../Images/fashionFile.png') : require('../../Images/file.png')}
                        label={'Shipping Policy'}
                    />
                    <ListCard
                        img={active === 'green' ? require('../../Images/fileOrange.png') : active === 'fashion' ? require('../../Images/fashionFile.png') : require('../../Images/file.png')}
                        label={'Panda Coins Terms'}
                    />
                    <ListCard
                        icon={<MaterialCommunityIcons name='whatsapp' color='#21AD37' size={24} />}
                        label={'Help and Support'}
                        DntshowRightArrow
                        noBorder
                    />
                    <CustomButton
                        onPress={()=>setShowModal(true)}
                        label={'Logout'}
                        bg={active === 'green' ? '#8ED053' : active === 'fashion' ? '#FF7190' : '#58D36E'}
                        mb={100}
                        mt={20}
                    />
                </View>
                
                <LogoutModal
                    visible={showModal}
                    onDismiss={onClose}
                    onPress={onClick} 
                />
            </ScrollView>
        </>
    )
}

export default MyAccount

const styles = StyleSheet.create({
    logo: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
        marginTop: 20,
        borderRadius: 50
    },
})