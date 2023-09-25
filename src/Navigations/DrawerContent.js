import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native'
import React, { useCallback, useContext } from 'react'
import Octicons from 'react-native-vector-icons/Octicons'
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Fontisto from 'react-native-vector-icons/Fontisto'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'

import ListItem from '../Components/ListItem'
import CommonTexts from '../Components/CommonTexts'
import AuthContext from '../contexts/Auth'

const DrawerContent = ({ navigation }) => {

    const auth = useContext(AuthContext)

    const {width, height} = useWindowDimensions()

    const onClickDrawer = useCallback(() => {
        navigation.closeDrawer()
    }, [navigation])

    const clickSellWithus = useCallback(() => {
        navigation.navigate('SellWithUs')
    }, [navigation])

    const clickWorkWithPanda = useCallback(() => {
        navigation.navigate('WorkWithPanda')
    }, [navigation])

    const clickCustFeedback = useCallback(() => {
        navigation.navigate('CustomerFeedback')
    }, [navigation])

    const clickApplyFran = useCallback(() => {
        navigation.navigate('ApplyFranchisee')
    }, [navigation])


    return (
        <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor:'#23233C', }}>
            <SafeAreaView>

                <View style={{alignItems:'center', borderBottomColor:'#fff', borderBottomWidth:2, paddingBottom:15}}>
                    <TouchableOpacity onPress={onClickDrawer} style={{ alignSelf:'flex-end',  padding:10 }}>
                        <Ionicons name={"close"} color="#fff" size={28}  />
                    </TouchableOpacity>
                    <Image
                        style={styles.logo}
                        source={require('../Images/drawerLogo.png')}
                    />
                    <CommonTexts
                        label={auth?.userData?.name}
                        color="#fff"
                        fontSize={13}
                        mt={3}
                    />
                    <Text
                        style={{
                            fontFamily: 'Poppins-Regular',
                            color:'#fff',
                            fontSize: 9,
                        }}
                    >{auth?.userData?.email}</Text>
                    <Text
                        style={{
                            fontFamily: 'Poppins-Regular',
                            color: '#fff',
                            fontSize: 9,
                            marginTop: 1,
                        }}
                    >{auth?.userData?.mobile}</Text>
                </View>
                

                <ListItem
                    onPress={clickSellWithus}
                    icon={<SimpleLineIcons name={"handbag"} color="#fff" size={13}/>}
                    label={'Sell With Us'}
                />
                <ListItem
                    onPress={clickWorkWithPanda}
                    icon={<FontAwesome5 name={"handshake"} color="#fff" size={12}/>}
                    label={'Work With Qbuy Panda'}
                />

                <ListItem
                    onPress={clickCustFeedback}
                    icon={<MaterialCommunityIcons name={"comment-alert"} color="#fff" size={15}/>}
                    label={'Customer Feedbacks'}
                />
                <ListItem
                    onPress={clickApplyFran}
                    icon={<Entypo name={"shop"} color="#fff" size={15}/>}
                    label={'Apply for a Franchisee'}
                />

                <View style={{width:'100%', height: height/2.8, alignItems:'center', justifyContent:'flex-end'}}>
                    <Text
                        style={{
                            fontFamily: 'Poppins-Regular',
                            color: '#fff',
                            fontSize: 11,
                        }}
                    >{'Version 2.0.1'}</Text>
                    <View style={{flexDirection:'row', marginVertical:15, width:'50%', justifyContent:'space-between'}}>
                        <FontAwesome name='facebook' color='#fff' size={18}/>
                        <FontAwesome name='instagram' color='#fff' size={18}/>
                        <Ionicons name='logo-twitter' color='#fff' size={18}/>
                        <Entypo name='linkedin' color='#fff' size={18}/>
                    </View>
                </View>

            </SafeAreaView>
        </ScrollView>
    )
}

export default DrawerContent

const styles = StyleSheet.create({
    logo: {
		width: 60,
		height: 60,
		resizeMode: 'contain',
        marginTop:-30
	},
})