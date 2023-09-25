import { FlatList, StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React, { useCallback, useContext, useState } from 'react'
import AuthContext from '../../../contexts/Auth'
import CartContext from '../../../contexts/Cart'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import LoaderContext from '../../../contexts/Loader'
import { env, location } from '../../../config/constants'
import customAxios from '../../../CustomeAxios'
import Header from '../../../Components/Header'
import NameText from '../NameText'
import SearchBox from '../../../Components/SearchBox'
import { ScrollView } from 'react-native-gesture-handler'
import CategoryCard from '../QBuyGreen/CategoryCard'
import reactotron from 'reactotron-react-native'
import Carousel from 'react-native-reanimated-carousel'
import AvailableStores from '../QBuyGreen/AvailableStores'
import ShopCard from '../Grocery/ShopCard'
import CommonTexts from '../../../Components/CommonTexts'
import PickDropAndReferCard from '../PickDropAndReferCard'
import Offer from './Offer'
import CommonItemCard from '../../../Components/CommonItemCard'
import CommonWhatsappButton from '../../../Components/CommonWhatsappButton'
import SplashScreen from 'react-native-splash-screen'

const QbuyfashionHome = () => {

    const navigation = useNavigation()
    const auth = useContext(AuthContext)
    const cartContext = useContext(CartContext);
    const loadingg = useContext(LoaderContext);
    const { width, height } = useWindowDimensions()

    let coord = auth.location;

    const [homeData, setHomeData] = useState([]);
    const [slider, setSlider] = useState([]);
    const [category, setcategory] = useState([])
    const [availibleProduct, setAvailibleproduct] = useState([]);
    const [recentView, setRecentView] = useState([]);
    const [suggested, setSuggested] = useState([]);
    const [store, setStore] = useState([]);


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
                        user_id: auth?.userData?._id
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
                        user_id: auth?.userData?._id
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
                    user_id: auth?.userData?._id
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

    const GetHomeData = async () => {
        loadingg.setLoading(true)
        let datas = {
            type: "fashion",
            coordinates: env === "dev" ? location : coord
        }
        
        try {
         
            const response = await customAxios.post(`customer/home`, datas);
            setHomeData(response?.data?.data);
            let slide = response?.data?.data?.find(home => home?.type === "sliders");
            setSlider(slide)
            let cat = response?.data?.data?.find(home => home?.type === "categories");
            setcategory(cat)
            let stores = response?.data?.data?.find(home => home?.type === "stores");
            setStore(stores)
            let avaiProduct = response?.data?.data?.find(home => home?.type === "available_products");
            setAvailibleproduct(avaiProduct);
            let suggested_products = response?.data?.data?.find(home => home?.type === "suggested_products");
            setSuggested(suggested_products);
            let rescent_view = response?.data?.data?.find(home => home?.type === "recentlyviewed");
            setRecentView(rescent_view)
            setTimeout(() => {
                SplashScreen.hide()
            }, 100);
            loadingg.setLoading(false)
     

        } catch (err) {
            loadingg.setLoading(false)
        } finally {
            loadingg.setLoading(false)
        }
    }


    useFocusEffect(
        React.useCallback(() => {
            GetHomeData()
        }, [coord])
    );

    const onClickDrawer = useCallback(() => {
        navigation.openDrawer()
    }, [navigation])


    const onSearch = useCallback(() => {
        navigation.navigate('ProductSearchScreen', { mode: 'fashion' })
    }, [navigation])


    const headerComponents = () => {
        return (
            <View>
                <NameText userName={auth?.userData?.name ? auth?.userData?.name : auth?.userData?.mobile} mt={8} />
                <SearchBox onPress={onSearch} />
                {category?.data?.length > 0 &&
                    <CategoryCard data={category?.data} />}
                {slider?.length > 0 &&
                    <View>
                        <Carousel
                            loop
                            width={width}
                            height={height / 5}
                            autoPlay={true}
                            data={slider}
                            scrollAnimationDuration={1000}
                            renderItem={CarouselCardItem}
                        />
                    </View>}
                <CommonTexts label={'Available Stores'} ml={15} fontSize={13} mt={20} />
                <View style={{ marginHorizontal: 5, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                    {store?.data?.map((item) => (
                        <ShopCard key={item?._id} item={item} />
                    ))}
                </View>
                <View style={styles.pickupReferContainer}>
                    <PickDropAndReferCard
                        onPress={null}
                        lotties={require('../../../Lottie/farmer.json')}
                        label={'Test'}
                        lottieFlex={0.7}
                    />
                    <PickDropAndReferCard
                        onPress={null}
                        lotties={require('../../../Lottie/dresses.json')}
                        label={'Sell Your Items'}
                        lottieFlex={0.5}
                        ml={8}
                    />
                </View>
                <View style={styles.offerView}>
                    <Text style={styles.discountText}>{'50% off Upto Rs 125!'}</Text>
                    <Offer onPress={null} shopName={"GM"} />
                    <Text style={styles.offerValText}>{'Offer valid till period!'}</Text>
                </View>
                {recentView?.data?.length > 0 &&
                    <View>
                        <CommonTexts label={'Recently Viewed'} fontSize={13} mt={5} ml={15} mb={5} />
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            style={{ flexDirection: 'row', paddingLeft: 7 }}
                        >
                            {recentView?.data?.map((item) =>
                                <CommonItemCard
                                    key={item?._id}
                                    item={item}
                                    width={width / 2.5}
                                    marginHorizontal={5}
                                    addToCart={addToCart}
                                />
                            )}
                        </ScrollView>
                    </View>}
                <View>
                    <View>
                        <CommonTexts label={'Available Products'} fontSize={13} ml={15} mb={5} mt={15} />
                    </View>
                </View>
            </View>
        )
    }

    const renderProducts = ({ item, index }) => {
        return (
            <View key={index} style={{ flex: 0.5, justifyContent: 'center' }}>
                <CommonItemCard
                    item={item}
                    key={item?._id}
                    width={width / 2.2}
                    height={height / 3.6}
                    mr={5}
                    ml={8}
                    mb={15}
                />
            </View>
        )
    }


    const keyExtractorfashion = (item) => item._id;
    const ListFooterComponent = () => {
        return (
            <View style={{ height: 20 }}>

            </View>
        )
    }

    return (

        <>
            <Header onPress={onClickDrawer} />
            <FlatList
                ListHeaderComponent={headerComponents}
                data={availibleProduct?.data}
                showsVerticalScrollIndicator={false}
                initialNumToRender={6}
                removeClippedSubviews={true}
                windowSize={10}
                maxToRenderPerBatch={6}
                keyExtractorCategory={keyExtractorfashion}
                numColumns={2}
                refreshing={loadingg?.loading}
                onRefresh={GetHomeData}
                style={{ marginLeft: 5 }}
                contentContainerStyle={{ justifyContent: 'center', gap: 2, backgroundColor: '#FFF5F7' }}
                renderItem={renderProducts}
                ListFooterComponent={ListFooterComponent}

            />
             <CommonWhatsappButton
                position='absolute'
                bottom={10}
                right={10}
            />
        </>


    )
}

export default QbuyfashionHome

const styles = StyleSheet.create({
    pickupReferContainer: {
        flexDirection: 'row',
        backgroundColor: '#F7F7F7',
        marginTop: 20,
        justifyContent: 'space-evenly'
    },
    offerView: {
        alignItems: 'center',
        backgroundColor: '#FFDBE3',
        marginBottom: 20,
        paddingVertical: 15
    },
    discountText: {
        fontFamily: 'Poppins-Bold',
        color: '#FF4646',
        fontSize: 18,
    },
    offerValText: {
        fontFamily: 'Poppins-LightItalic',
        color: '#23233C',
        fontSize: 9,
        marginTop: 5,
    },
})