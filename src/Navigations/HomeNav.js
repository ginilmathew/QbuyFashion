import { SafeAreaView, StyleSheet } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Category from '../screens/Home/Category';
import SingleHotel from '../screens/Home/SingleHotel';
import PickupAndDropoff from '../screens/Home/PickupAndDropoff';
import RefferRestaurant from '../screens/Home/RefferRestaurant';
import SellWithUs from '../screens/Drawer/SellWithUS';
import WorkWithPanda from '../screens/Drawer/WorkWithPanda';
import CustomerFeedback from '../screens/Drawer/CustomerFeedback';
import ApplyFranchisee from '../screens/Drawer/ApplyFranchisee';
import RegisterAsAffiliate from '../screens/Drawer/WorkWithPanda/RegisterAsAffiliate';
import SingleItemScreen from '../screens/Home/SingleItemScreen';
import OurFarms from '../screens/Home/OurFarms';
import Wishlist from '../screens/Wishlist';
import FashionCategory from '../screens/FashionCategory';
import SwitchHome from './SwitchHome';
import CategoryScreen from '../screens/Home/CategoryScreen';
import StoreScreen from '../screens/Home/StoreScreen';
import ViewAllStore from '../screens/Home/QBuyGreen/ViewAllStore';
import QbuyPanda from '../screens/Home';
import QBuyGreen from '../screens/Home/QBuyGreen';
import QBuyFashion from '../screens/Home/QBuyFashion';
import QbuyfashionHome from '../screens/Home/QBuyFashion/QbuyfashionHome';



const Stack = createNativeStackNavigator();

const HomeNav = ({mode, route}) => {
    return (
        <>
        <Stack.Navigator initialRouteName='Home'  screenOptions={{ headerShown: false }}> 
            <Stack.Screen name="Home" component={mode === "panda" ? QbuyPanda : mode === "green" ? QBuyGreen : QbuyfashionHome}/>


            <Stack.Screen name="SingleHotel" component={SingleHotel}/>

            <Stack.Screen name="SingleItemScreen" component={SingleItemScreen}/>


            <Stack.Screen name="Category" component={Category}/>
            <Stack.Screen name="CategoryScreen" component={CategoryScreen}/>
            <Stack.Screen name="StoreScreen" component={StoreScreen}/>


            <Stack.Screen name="PickupAndDropoff" component={PickupAndDropoff}/>
            <Stack.Screen name="OurFarms" component={OurFarms}/>

            <Stack.Screen name="RefferRestaurant" component={RefferRestaurant}/>

            <Stack.Screen name="SellWithUs" component={SellWithUs}/>
            <Stack.Screen name="WorkWithPanda" component={WorkWithPanda}/>
            <Stack.Screen name="RegisterAsAffiliate" component={RegisterAsAffiliate}/>

            <Stack.Screen name="CustomerFeedback" component={CustomerFeedback}/>
            <Stack.Screen name="ApplyFranchisee" component={ApplyFranchisee}/>
     
            
            <Stack.Screen name="Wishlist" component={Wishlist}/>

            <Stack.Screen name="FashionCategory" component={FashionCategory}/>
        </Stack.Navigator>
        </>
    )
}

export default HomeNav

const styles = StyleSheet.create({})