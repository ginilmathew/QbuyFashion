import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View, Switch, Platform, useWindowDimensions, SafeAreaView, RefreshControl } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import ImageSlider from '../../../Components/ImageSlider';
import CustomSearch from '../../../Components/CustomSearch';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import OfferText from '../OfferText';
import PickDropAndReferCard from '../PickDropAndReferCard';
import Header from '../../../Components/Header';
import CommonSquareButton from '../../../Components/CommonSquareButton';
import CommonTexts from '../../../Components/CommonTexts';
import TypeCard from '../Grocery/TypeCard';
import CommonItemCard from '../../../Components/CommonItemCard';
import NameText from '../NameText';
import ShopCard from '../Grocery/ShopCard';
import CountDownComponent from '../../../Components/CountDown';
import Offer from './Offer';
import LoaderContext from '../../../contexts/Loader';
import customAxios from '../../../CustomeAxios';
import SearchBox from '../../../Components/SearchBox';
import { useFocusEffect } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import AuthContext from '../../../contexts/Auth';
import reactotron from 'reactotron-react-native';
import { env, location } from '../../../config/constants';
import CartContext from '../../../contexts/Cart';
import CategoryCard from './CategoryCard';
import AvailableStores from './AvailableStores';
import RecentlyViewed from './RecentlyViewed';
import AvailableProducts from './AvailableProducts';
import PandaSuggestions from './PandaSuggestions';


const QBuyGreen = ({ navigation }) => {

    const { width } = useWindowDimensions()

    const loadingg = useContext(LoaderContext)
    const userContext = useContext(AuthContext)
    const cartContext = useContext(CartContext)


    let loader = loadingg?.loading

    const [homeData, setHomeData] = useState(null)
    const [availablePdt, setavailablePdt] = useState(null)
    const [slider, setSlider] = useState(null)


    useEffect(() => {
        let availPdt = homeData?.find((item, index) => item?.type === 'available_products')
        setavailablePdt(availPdt?.data)

        let slider = homeData?.find((item, index) => item?.type === 'sliders')
        setSlider(slider?.data)
    }, [homeData])


    const schema = yup.object({
        name: yup.string().required('Name is required'),
    }).required();



    const groceImg = [
        {
            id: "1",
            img: require('../../../Images/groceryAdds.jpeg')
        },
        {
            id: "2",
            img: require('../../../Images/image1.jpeg')
        },
        {
            id: "3",
            img: require('../../../Images/image2.jpeg')
        },
        {
            id: "4",
            img: require('../../../Images/image3.jpeg')
        }
    ]

    const ourFarm = useCallback(() => {
        navigation.navigate('OurFarms')
    }, [])

    const referRestClick = useCallback(() => {
        navigation.navigate('RefferRestaurant')
    }, [])

    const gotoChat = useCallback(() => {
        navigation.navigate('Chat')
    }, [])

    const onClickDrawer = useCallback(() => {
        navigation.openDrawer()
    }, [])

    let offer = {
        hotel: 'Farm N Fresh'
    }

    const goToShop = useCallback(() => {
        navigation.navigate('SingleHotel', { item: offer, mode: 'offers' })
    }, [])

    useEffect(() => {
        getHomedata()
    }, [])


    const getHomedata = async () => {

        loadingg.setLoading(true)

        let datas = {
            type: "green",
            coordinates: env === "dev" ? location : userContext?.location
        }
        await customAxios.post(`customer/home`, datas)
            .then(async response => {
                setHomeData(response?.data?.data)
                loadingg.setLoading(false)
            })
            .catch(async error => {
                console.log(error)
                Toast.show({
                    type: 'error',
                    text1: error
                });
                loadingg.setLoading(false)
            })
    }
    const onSearch = useCallback(() => {
        navigation.navigate('ProductSearchScreen', { mode: 'fashion' })
    }, [])

    const addToCart = async (item) => {

        let cartItems;
        let url;

        if (item?.variants?.length === 0) {
            loadingg.setLoading(true)
            if (cartContext?.cart) {
                url = "customer/cart/update";
                let existing = cartContext?.cart?.product_details?.findIndex(prod => prod.product_id === item?._id)
                if (existing >= 0) {
                    let cartProducts = cartContext?.cart?.product_details;
                    cartProducts[existing].quantity = cartProducts[existing].quantity + 1;
                    cartItems = {
                        cart_id: cartContext?.cart?._id,
                        product_details: cartProducts,
                        user_id: userContext?.userData?._id
                    }
                }
                else {
                    let productDetails = {
                        product_id: item?._id,
                        name: item?.name,
                        image: item?.product_image,
                        type: 'single',
                        variants: null,
                        quantity: 1
                    };

                    cartItems = {
                        cart_id: cartContext?.cart?._id,
                        product_details: [...cartContext?.cart?.product_details, productDetails],
                        user_id: userContext?.userData?._id
                    }
                }
            }
            else {
                url = "customer/cart/add";
                let productDetails = {
                    product_id: item?._id,
                    name: item?.name,
                    image: item?.product_image,
                    type: "single",
                    variants: null,
                    quantity: 1
                };

                cartItems = {
                    product_details: [productDetails],
                    user_id: userContext?.userData?._id
                }
            }

            await customAxios.post(url, cartItems)
                .then(async response => {
                    cartContext.setCart(response?.data?.data)
                    await AsyncStorage.setItem("cartId", response?.data?.data?._id)
                    loadingg.setLoading(false)
                })
                .catch(async error => {
                    loadingg.setLoading(false)
                })
        }
        else {
            navigation.navigate('SingleItemScreen', { item: item })
        }
    }



    const renderItems = (item) => {
        if (item?.type === 'categories') {
            return (
                <>
                    <CategoryCard data={item?.data} />
                    <SearchBox onPress={onSearch} />
                    {slider?.length > 0 && <ImageSlider datas={slider} mt={20} />}
                </>
            )
        }
        if (item?.type === 'stores') {
            return (
                <>
                    {item?.data?.length > 0 &&<AvailableStores data={item?.data} />}
                    <View style={styles.pickupReferContainer}>
                        <PickDropAndReferCard
                            onPress={ourFarm}
                            lotties={require('../../../Lottie/farmer.json')}
                            label={'Our Farms'}
                            lottieFlex={1}
                        />
                        <PickDropAndReferCard
                            onPress={referRestClick}
                            lotties={require('../../../Lottie/farm.json')}
                            label={"Let's Farm Together"}
                            lottieFlex={0.4}
                        />
                    </View>
                    {/* <View style={styles.offerView}>
                        <Text style={styles.discountText}>{'50% off Upto Rs 125!'}</Text>
                         <Offer onPress={goToShop} shopName={offer?.hotel} />
                        <CountDownComponent />
                        <Text style={styles.offerValText}>{'Offer valid till period!'}</Text>
                    </View> */}
                </>
            )
        }
        if (item?.type === 'offer_array') {
            return (
                <>
                    {item?.data?.length > 0 && <View style={styles.offerView}>
                        <Text style={styles.discountText}>{'50% off Upto Rs 125!'}</Text>
                        <Offer onPress={goToShop} shopName={offer?.hotel} />
                        {/* <CountDownComponent /> */}
                        <Text style={styles.offerValText}>{'Offer valid till period!'}</Text>
                    </View>}
                </>
            )
        }
        if (item?.type === 'recentlyviewed') {
            return (
                <>
                    <RecentlyViewed data={item?.data} addToCart={addToCart} />
                </>
            )
        }
        if (item?.type === 'suggested_products') {
            return (
                <>
                    <PandaSuggestions data={item?.data} addToCart={addToCart} />
                </>
            )
        }
        // if (item?.type === 'available_products') {
        //     return (
        //         <>
        //             <AvailableProducts data={item?.data} addToCart={addToCart} />
        //         </>
        //     )
        // }


    }

    const renderProducts = ({ item }) => {
        return (
            <CommonItemCard
                item={item}
                key={item?._id}
                width={width / 2.25}
                height={220}
                wishlistIcon
                addToCart={addToCart}
                mr={8}
                ml={8}
                mb={15}
            />
        )
    }

    return (
        <>
            <Header onPress={onClickDrawer} />
            <View style={styles.container} >

                <NameText userName={userContext?.userData?.name ? userContext?.userData?.name : userContext?.userData?.mobile} mt={8} />
                <ScrollView
                    removeClippedSubviews
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl refreshing={loader} onRefresh={getHomedata} />
                    }>
                    {homeData?.map(home => renderItems(home))}
                    {availablePdt?.length > 0 && <CommonTexts label={'Available Products'} fontSize={13} ml={15} mb={10} mt={20} />}
                    <FlatList
                        data={availablePdt}
                        keyExtractor={(item, index) => index}
                        renderItem={renderProducts}
                        showsVerticalScrollIndicator={false}
                        initialNumToRender={6}
                        removeClippedSubviews={true}
                        windowSize={10}
                        maxToRenderPerBatch={5}
                        // refreshing={loader}
                        // onRefresh={getHomedata}
                        numColumns={2}
                        style={{marginLeft:5}}
                    />
                </ScrollView>


                {/* <FlatList
                    data={homeData}
                    keyExtractor={(item, index) => index}
                    renderItem={renderItems}
                    showsVerticalScrollIndicator={false}
                    initialNumToRender={2}
                    removeClippedSubviews={true}
                    pt={2}
                    mb={170}
                    refreshing={loader}
                    onRefresh={getHomedata}
                /> */}
                {/* <NameText userName={userContext?.userData?.name ? userContext?.userData?.name : userContext?.userData?.mobile} mt={8} /> */}

                {/* {categories?.length > 0 && <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{ flexDirection: 'row', marginTop: 20, marginLeft: 10, marginRight: 10 }}
                >
                    {categories?.map((item, index) =>
                        (<TypeCard item={item} key={index} />)
                    )}
                </ScrollView>}
                <SearchBox onPress={onSearch}/>
                <ImageSlider datas={groceImg} mt={20} />
                {storeList?.length > 0 && <>
                    <CommonTexts label={'Available Stores'} ml={15} fontSize={13} mt={25} />
                    <View style={styles.grossCatView}>
                        {storeList?.map((item, index) => (
                            <ShopCard key={index} item={item} />
                        ))}
                    </View>
                </>} */}

                {/* <View style={styles.pickupReferContainer}>
                    <PickDropAndReferCard
                        onPress={ourFarm}
                        lotties={require('../../../Lottie/farmer.json')}
                        label={'Our Farms'}
                        lottieFlex={1}
                    />
                    <PickDropAndReferCard
                        onPress={referRestClick}
                        lotties={require('../../../Lottie/farm.json')}
                        label={"Let's Farm Together"}
                        lottieFlex={0.4}
                    />
                </View> */}

                {/* <View style={styles.offerView}>
                    <Text style={styles.discountText}>{'50% off Upto Rs 125!'}</Text>
                    <Offer onPress={goToShop} shopName={offer?.hotel} />
                    <CountDownComponent/>
                    <Text style={styles.offerValText}>{'Offer valid till period!'}</Text>
                </View> */}

                {/* {recentViewList?.length > 0 && <>
                    <CommonTexts label={'Recently Viewed'} fontSize={13} mt={5} ml={15} mb={15} />
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={{ flexDirection: 'row', paddingLeft: 7, }}
                    >
                        {recentViewList.map((item) =>
                            <CommonItemCard
                                key={item?._id}
                                item={item}
                                width={width / 2.5}
                                marginHorizontal={5}
                                addToCart={addToCart}
                            />
                        )}
                    </ScrollView>
                </>} */}

                {/* <CommonTexts label={'Trending Sales'} fontSize={13} ml={15} mb={5} mt={15} />
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{ flexDirection: 'row', paddingLeft: 7, }}
                >
                    {trend.map((item) =>
                        <CommonItemCard
                            key={item?._id}
                            item={item}
                            width={width / 2.5}
                            marginHorizontal={5}
                        />
                    )}
                </ScrollView> */}

                {/* <CommonItemMenuList
                    list={grozz}
                    label={'Available Products'}
                    mb={80}
                /> */}

                {/* {availablePdts?.length > 0 && <>
                    <CommonTexts label={'Available Products'} fontSize={13} ml={15} mb={15} mt={15} />
                    <View style={styles.productContainer}>
                        {availablePdts?.map((item) => (
                            <CommonItemCard
                                item={item}
                                key={item?._id}
                                width={width / 2.25}
                                height={220}
                                wishlistIcon
                                addToCart={addToCart}
                            />
                        ))}
                    </View>
                </>} */}

            </View>

            <CommonSquareButton
                onPress={gotoChat}
                position='absolute'
                bottom={10}
                right={10}
            />
        </>
    )
}

export default QBuyGreen

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#F4FFE9'
    },
    grossCatView: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 2,
        marginLeft: 20,
        marginRight: 10
    },
    pickupReferContainer: {
        flexDirection: 'row',
        backgroundColor: '#F7F7F7',
        marginTop: 20,
        justifyContent: 'space-evenly'
    },
    offerView: {
        alignItems: 'center',
        backgroundColor: '#DDFFCB',
        marginBottom: 20,
        paddingVertical: 15
    },
    discountText: {
        fontFamily: 'Poppins-Bold',
        color: '#464CFF',
        fontSize: 18,
    },
    offerValText: {
        fontFamily: 'Poppins-LightItalic',
        color: '#23233C',
        fontSize: 10,
        marginTop: 5
    },
    productContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 17,
        paddingHorizontal: '3%'
    }

})