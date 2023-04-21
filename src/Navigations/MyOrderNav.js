import { StyleSheet } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MyOrders from '../screens/MyOrders';
import ViewDetails from '../screens/MyOrders/ViewDetails';
import RateOrder from '../screens/MyOrders/RateOrder';


const Stack = createNativeStackNavigator();

const MyOrderNav = () => {
    return (
        <Stack.Navigator initialRouteName='MyNetwork'  screenOptions={{ headerShown: false }}> 
            <Stack.Screen name="MyOrders" component={MyOrders}/>
            <Stack.Screen name="ViewDetails" component={ViewDetails}/>
            <Stack.Screen name="RateOrder" component={RateOrder}/>


        </Stack.Navigator>
    )
}

export default MyOrderNav

const styles = StyleSheet.create({})