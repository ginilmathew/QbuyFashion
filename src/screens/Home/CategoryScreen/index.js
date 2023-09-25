import { StyleSheet, Text, View, ScrollView, Image, FlatList, useWindowDimensions, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import CommonTexts from '../../../Components/CommonTexts'
import HeaderWithTitle from '../../../Components/HeaderWithTitle'
import FastImage from 'react-native-fast-image'
import PandaContext from '../../../contexts/Panda'
import CommonItemSelect from '../../../Components/CommonItemSelect'
import CommonItemCard from '../../../Components/CommonItemCard'
import { IMG_URL, env, location } from '../../../config/constants'
import LoaderContext from '../../../contexts/Loader'
import customAxios from '../../../CustomeAxios'
import AuthContext from '../../../contexts/Auth'
import Toast from 'react-native-toast-message'
import CartContext from '../../../contexts/Cart'
import AsyncStorage from '@react-native-async-storage/async-storage'
import reactotron from 'reactotron-react-native'
import { useFocusEffect } from '@react-navigation/native'


const CategoryScreen = ({ route, navigation }) => {

    const { width } = useWindowDimensions()
  

    const { active } = useContext(PandaContext)
    const auth = useContext(AuthContext)


    const loadingContex = useContext(LoaderContext)
    const cartContext = useContext(CartContext)
    let loadingg = loadingContex?.loading

    let userData = auth?.userData

    const { name, mode, item, storeId } = route?.params;

    reactotron.log({storeId},'ITEM IN storeId SCREEN')

    const [availablePdts, setAvailabelPdts] = useState([])
    const [filterProducts, setFilterProduct] = useState([])
    const [selected, setSelected] = useState(null);




    //code for filter by subCategory.......


    const filterbySubCategory = () => {
        let result = filterProducts?.filter((res) => res?.sub_category?._id === selected)
        setAvailabelPdts(result)
    }

    useEffect(() => {
        if (selected) {
            filterbySubCategory()
        }
    }, [selected])

    //****************************************/





    // useEffect(() => {
    //     getProductBasedCat();
    // }, [])

    useFocusEffect(
        React.useCallback(() => {
            getProductBasedCat();
        }, [item?._id,item?.id])
      );


    const getProductBasedCat = async (coords) => {
        loadingContex.setLoading(true)
        let datas = {
            category_id: item?._id ? item?._id : item?.id,
            // coordinates: env === "dev" ? location : auth?.location
            coordinates: auth?.location,
            type: active,
        }



        await customAxios.post(`customer/product/category-based`, datas)
            .then(async response => {
                if (storeId) {
                    let products = response?.data?.data?.find((res) => res?.type === 'categories')?.data?.filter(res => res?.store?._id === storeId);
                    setAvailabelPdts(products);
                    setFilterProduct(products);
                }
                else {
                    setSelected(null);
                    const result = response?.data?.data?.find((res) => res?.type === 'categories');
                    setAvailabelPdts(result?.data);
                    setFilterProduct(result?.data);
                }
                loadingContex.setLoading(false)
            })
            .catch(async error => {
                Toast.show({
                    type: 'error',
                    text1: error
                });
                loadingContex.setLoading(false)
            })

    }







    return (
        <>
            <HeaderWithTitle mode={mode} title={name} />
            <ScrollView
                style={{ flex: 1, backgroundColor: active === "green" ? '#F4FFE9' : active === "fashion" ? '#FFF5F7' : '#fff', }}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={loadingContex?.loading} onRefresh={getProductBasedCat} />
                }

            >
                <View style={{ paddingHorizontal: 10 }}>
                    <FastImage
                        source={{ uri: `${IMG_URL}${item?.image}` }}
                        style={styles.mainImage}
                        borderRadius={15}
                    />
                    <Text style={styles.description}>{item?.seo_description === null ? '' : item?.seo_description}</Text>
                </View>


                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{ backgroundColor: '#76867314', marginTop: 5 }}
                >
                    {item?.subcategories?.map((item, index) =>
                    (<CommonItemSelect
                        item={item}
                        key={index}
                        selected={selected}
                        setSelected={setSelected}
                    />)
                    )}
                </ScrollView>

                {availablePdts?.length > 0 && <>
                    <CommonTexts label={'Available Products'} mt={15} ml={10} fontSize={13} mb={5} />
                    <View style={styles.itemContainer}>
                        {availablePdts?.map((item) => (
                            <CommonItemCard
                                item={item}
                                key={item?._id}
                                width={width / 2.2}
                                height={250}
                            // wishlistIcon={fashion ? true : false}
                            />
                        ))}
                    </View>
                </>}



                {/* <View style={styles.recommPdtBox}>
                    <CommonTexts label={'Recommanded Products'} fontSize={13} ml={15} mb={5} />
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={{ flexDirection: 'row', paddingLeft: 7 }}
                    >
                        {recentView?.map((item) =>
                            <CommonItemCard
                                key={item?._id}
                                item={item}
                                width={width / 2.5}
                                marginHorizontal={5}
                            />
                        )}
                    </ScrollView>
                </View> */}

            </ScrollView>
        </>
    )
}

export default CategoryScreen

const styles = StyleSheet.create({
    mainImage: {
        width: '100%',
        height: 200,
        alignSelf: 'center',
        marginTop: 10,
        borderRadius: 15
    },
    description: {
        fontFamily: 'Poppins-Regular',
        color: '#23233C',
        fontSize: 13,
        marginTop: 10
    },

    hotelView: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        paddingHorizontal: '3%'
    },
    recommPdtBox: {
        marginTop: 15,
        marginBottom: 60,
        backgroundColor: '#76867314',
        paddingVertical: 5
    },
    restaurantView: {
        flexDirection: 'row',
        marginTop: 10,
        backgroundColor: '#F7F7F7',
        paddingVertical: 10
    },
    foodName: {
        fontFamily: 'Poppins-Regular',
        color: '#23233C',
        fontSize: 12,
        textAlign: 'center',
        marginTop: 5
    },
    itemContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        paddingHorizontal: '3%'
    }

})