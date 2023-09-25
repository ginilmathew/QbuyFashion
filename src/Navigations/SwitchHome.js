import { StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import QbuyPanda from '../screens/Home';
import QBuyFashion from '../screens/Home/QBuyFashion';
import QBuyGreen from '../screens/Home/QBuyGreen';
import PandaContext from '../contexts/Panda';
import QbuyfashionHome from '../screens/Home/QBuyFashion/QbuyfashionHome';

const Stack = createNativeStackNavigator();

const SwitchHome = () => {

    const contextPanda = useContext(PandaContext)
    let grocery = contextPanda.greenPanda
    let fashion = contextPanda.pinkPanda

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}> 
            <Stack.Screen name="Home" component={grocery ? QBuyGreen : fashion ? QbuyfashionHome : QbuyPanda}/>
        </Stack.Navigator>
    )
}

export default SwitchHome

const styles = StyleSheet.create({})