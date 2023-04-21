import { StyleSheet, Text, View, ScrollView, useWindowDimensions, TouchableOpacity, ActivityIndicator, AlertIOS, ToastAndroid } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import HeaderWithTitle from '../../Components/HeaderWithTitle'
import PandaContext from '../../contexts/Panda'
import FastImage from 'react-native-fast-image'
import LoaderContext from '../../contexts/Loader'
import customAxios from '../../CustomeAxios'
import reactotron from '../../ReactotronConfig'
import { useNavigation } from '@react-navigation/native'
import FashionCatCard from './FashionCatCard'


const FashionCategory = ({route}) => {

    const navigation = useNavigation()


    const loadingContex = useContext(LoaderContext)
    let loadingg = loadingContex?.loading

    const mode = route?.params?.mode

    const { width } = useWindowDimensions()

    const contextPanda = useContext(PandaContext)
    let grocery = contextPanda.greenPanda
    let fashion = contextPanda.pinkPanda

    const [catList, setCatList] = useState([])

    reactotron.log({catList})



    useEffect(() => {
        getCategoryList()
    }, [])

    const getCategoryList = async() => {
        loadingContex.setLoading(true)
        let data = {
            type:'fashion'
        }
        await customAxios.post(`customer/categories`, data)
        .then(async response => {
            setCatList(response?.data?.data)
            loadingContex.setLoading(false)
        })
        .catch(async error => {
            // toast.show({
            //     title: 'Error',
            //     description : error,
            //     backgroundColor:'red.500'
            // })
            loadingContex.setLoading(false)
        })
    }



    return (
        <>

            <HeaderWithTitle title={'Categories'} noBack/>
            <ScrollView
                style={{
                    flex: 1,
                    backgroundColor: grocery ? '#F4FFE9' : fashion ? '#FFF5F7' : '#fff',
                    paddingHorizontal: 10,
                }}
            >
                <View style={styles.categoryView}>
                    {loadingg ? <ActivityIndicator style={{width:width}}/> : catList.map((item, index) => 
                    <FashionCatCard item={item} key={index}/>)}
                </View>
            </ScrollView>
        </>

    )
}

export default FashionCategory

const styles = StyleSheet.create({
    categoryView: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        marginTop:5,
    },
})