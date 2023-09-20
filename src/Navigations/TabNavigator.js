import { Image, StyleSheet, TouchableOpacity, useWindowDimensions, View } from 'react-native'
import React, { useCallback, useContext, useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import LinearGradient from 'react-native-linear-gradient';
import { useRoute } from '@react-navigation/native';
import Panda from '../screens/Panda';
import HomeNav from './HomeNav';
import CartNav from './CartNav';
import MyOrderNav from './MyOrderNav';
import * as Animatable from 'react-native-animatable';

import CartItemsCount from '../Components/CartItemsCount';
import MyAccountNav from './MyAccountNav';
import PandaContext from '../contexts/Panda';

const Tab = createBottomTabNavigator();

const TabNavigator = ({ navigation }) => {

    const contextPanda = useContext(PandaContext)
    let grocery = contextPanda.greenPanda
    let fashion = contextPanda.pinkPanda

    let colors = contextPanda.color
    let logos = contextPanda.logo



    const [showPandas, setShowPandas] = useState(false)

    const SwitchQbuyGreen = useCallback(() => {
        setShowPandas(!showPandas)
        contextPanda.setGreenPanda(!contextPanda.greenPanda)
        contextPanda.setColor(contextPanda.greenPanda ? ['#7BE495', '#329D9C'] : ['#8BC852', '#9BFF58'])
        contextPanda.setPinkPanda(false)

        contextPanda.setLogo(contextPanda.greenPanda ? require('../Images/home.png') : require('../Images/grocery.png'))
    })

    const SwitchQbuyFashion = useCallback(() => {
        setShowPandas(!showPandas)
        contextPanda.setPinkPanda(!contextPanda.pinkPanda)
        contextPanda.setColor(contextPanda.pinkPanda ? ['#7BE495', '#329D9C'] : ['#FF41F2', '#FF5757'])
        contextPanda.setGreenPanda(false)

        contextPanda.setLogo(contextPanda.pinkPanda ? require('../Images/home.png') : require('../Images/textile.png'))
    })

    const onPressHome = useCallback(() => {
        navigation.navigate('HomeNav', {screen:'SwitchHome'})
    }, [navigation])

    const onPressCart = useCallback(() => {
        navigation.navigate('CartNav', {screen:'Cart'})
    }, [navigation])

    const onPressOrders = useCallback(() => {
        navigation.navigate('MyOrderNav', {screen:'MyOrders'})
    }, [navigation])


    const onPressAccount = useCallback(() => {
        navigation.navigate('MyAccountNav', {screen:'MyAccount'})
    }, [navigation])

    const showPanda = useCallback(() => {
        setShowPandas(!showPandas)
    })
    
    
    
    return (
        <>
            {/* <Header 
                onPress={() => navigation.openDrawer()}
            /> */}
            <Tab.Navigator
                initialRouteName='HomeNav'
                screenOptions={({ route }) => ({
                    tabBarShowLabel: false,
                    tabBarHideOnKeyboard: true,
                    tabBarStyle: { height: 65, backgroundColor: fashion ? '#FFE1E7' : '#F3FFF5' },
                    tabBarItemStyle: { justifyContent: 'center', height: 55 },
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        color = focused ? grocery ? '#8ED053' : fashion ? '#FF6184' : '#58D36E' : fashion ? '#FF9FB4' : '#AAD1A2'
                        if (route.name === 'HomeNav') {
                            iconName = 'home'
                            return <TouchableOpacity onPress={onPressHome}>
                                <Entypo name={iconName} size={28} color={color} />
                            </TouchableOpacity> ;

                        } else if (route.name ===  'CartNav') {
                            iconName = 'shoppingcart';
                            return <TouchableOpacity onPress={onPressCart}>
                                {<CartItemsCount count={2} />}
                                <AntDesign name={iconName} size={26} color={color} />
                            </TouchableOpacity>
                        } else if (route.name === 'Panda') {
                            iconName = 'shopping-bag';
                            return <>
                                {showPandas && 
                                    <TouchableOpacity
                                        activeOpacity={0.9}
                                        style={{ 
                                            width: 170, position: 'absolute', bottom: 95, 
                                            justifyContent: 'space-between', alignItems: 'center', 
                                            flexDirection: 'row', borderRadius: 100 
                                        }}
                                    >
                                        <TouchableOpacity onPress={SwitchQbuyFashion}>
                                            <LinearGradient
                                                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={contextPanda.pinkPanda ? ['#7BE495', '#329D9C'] : ['#FF41F2', '#FF5757']}
                                                style={styles.smallPandas}
                                            >
                                                <Animatable.Image
                                                    animation={'pulse'}
                                                    easing='ease-in-out-quad'
                                                    iterationCount='infinite'
                                                    style={styles.smallPandasLogo}
                                                    // source={require('../Images/cool.png')}
                                                    source={contextPanda.pinkPanda ? require('../Images/home.png') : require('../Images/textile.png')}
                                                />
                                            </LinearGradient>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={SwitchQbuyGreen}>
                                            <LinearGradient
                                                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={contextPanda.greenPanda ? ['#7BE495', '#329D9C'] : ['#8BC852', '#9BFF58']}
                                                style={styles.smallPandas}
                                            >
                                                <Animatable.Image
                                                    animation={'pulse'}
                                                    easing='ease-in-out'
                                                    iterationCount='infinite'
                                                    style={styles.smallPandasLogo}
                                                    // source={ require('../Images/green.png')}
                                                    source={contextPanda.greenPanda ? require('../Images/home.png') : require('../Images/grocery.png')}
                                                />
                                            </LinearGradient>
                                        </TouchableOpacity>

                                </TouchableOpacity>}


                                <TouchableOpacity
                                    onPress={showPanda}
                                    style={{ width: 90, height: 90, borderRadius: 50, backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center', marginTop:-70}}
                                >
                                    <LinearGradient
                                        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={colors}
                                        style={styles.panda}
                                    >
                                        <Image
                                            style={styles.logo}
                                            source={logos}
                                        // source={require('../Images/logo.png')}
                                        />
                                    </LinearGradient>
                                </TouchableOpacity>

                                {/* small dot */}
                                <TouchableOpacity style={{ width: 100, height: 50, alignItems: 'center', position: 'absolute', bottom:-22 }}>
                                    <LinearGradient
                                        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={fashion ? ['#FF41F2', '#FF5757'] :  ['#7BE495', '#329D9C']}
                                        style={styles.linearGradient}
                                    >
                                    </LinearGradient>
                                </TouchableOpacity>

                            </>

                        } else if (route.name === 'MyOrderNav') {
                            iconName = 'shopping-bag';
                            return <TouchableOpacity onPress={onPressOrders} >
                                <FontAwesome name={iconName} size={23} color={color}/>
                            </TouchableOpacity> 
                           
                        } else if (route.name === 'MyAccountNav') {
                            iconName = 'settings-sharp';
                            return <TouchableOpacity onPress={onPressAccount} >
                                <Ionicons name={iconName} size={28} color={color}/>
                            </TouchableOpacity>
                        }
                    },

                    headerShown: false,

                })}
            >
                <Tab.Screen name="HomeNav" component={HomeNav} />
                <Tab.Screen name="CartNav" component={CartNav} />
                <Tab.Screen name="Panda" component={Panda} />
                <Tab.Screen name="MyOrderNav" component={MyOrderNav} />
                <Tab.Screen name="MyAccountNav" component={MyAccountNav} />
            </Tab.Navigator>
        </>
    )
}

export default TabNavigator

const styles = StyleSheet.create({
    linearGradient: {
        width: 8,
        height: 8,
        borderRadius: 25,
        marginTop: 12

    },
    panda: {
        width: 70,
        height: 70,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    logo: {
        width: 60,
        height: 60,
        resizeMode: 'contain',
    },
    smallPandas: {
        width: 50,
        height: 50,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    smallPandasLogo: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
    },
})
