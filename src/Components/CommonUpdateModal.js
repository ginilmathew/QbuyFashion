import { StyleSheet, Text, View, Modal, useWindowDimensions, Image, TouchableOpacity } from 'react-native'
import React, { useCallback } from 'react'
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withTiming,
} from 'react-native-reanimated';
import CommonAddButton from './CommonAddButton';
import * as RootNavigation from '../Navigations/RootNavigation';
import { mode } from '../config/constants';
import { Linking } from 'react-native';

const duration = 2000;
const easing = Easing.bezier(0.25, -0.5, 0.25, 1);

const CommonUpdateModal = ({ isopen, url, CloseModal, ForceUpdate }) => {

  


    const { height, width } = useWindowDimensions();

    const sv = useSharedValue(-1);

    React.useEffect(() => {
        sv.value = withRepeat(
            withSequence(
                withTiming(1, { duration, easing }),
                withTiming(-1, { duration, easing })
            ),
            -1,
            false)
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ rotate: `${sv.value * 180}deg` }],
    }));

    const URL = {
        panda: 'https://play.google.com/store/apps/details?id=com.diginest.qbuypanda',
        green: 'https://play.google.com/store/apps/details?id=com.diginest.qbuygreen',
        fashion: 'https://play.google.com/store/apps/details?id=com.diginest.qbuyfashion'
    }

    const UpdateUrl = () => {
        Linking.openURL(URL[mode])
        RootNavigation.navigate("Login")
    }



    return (

        <Modal
            animationType="slide"
            transparent={true}
            visible={isopen}

        >
            <View style={{ height, paddingVertical: 100, justifyContent: 'center', paddingHorizontal: 30, elevation: .1 }}>
                <View style={{ backgroundColor: '#fff', height: height / 2.5, borderRadius: 10, alignItems: 'center', justifyContent: 'space-evenly' }}>
                    <Text style={{ fontSize: 22 }}>A new version is available !!</Text>
                    <View>
                        <Animated.Image
                            style={[animatedStyle, { height: 60, width: 65 }]}
                            source={require('../Images/update.png')}
                        />

                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', gap: 10 }}>
                        <TouchableOpacity onPress={UpdateUrl} style={{ height: 40, width: 90, justifyContent: 'center', alignItems: 'center', backgroundColor: '#56D06D', borderRadius: 10 }}>
                            <Text style={{ fontSize: 16, fontWeight: '600', color: '#fff' }}>UPDATE</Text>
                        </TouchableOpacity>
                        {!ForceUpdate &&
                            <TouchableOpacity onPress={CloseModal} style={{ height: 40, width: 90, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FF7190', borderRadius: 10 }}>
                                <Text style={{ fontSize: 16, fontWeight: '600', color: '#fff' }}>ClOSE</Text>
                            </TouchableOpacity>}
                    </View>
                </View>
            </View>
        </Modal>




    )
}

export default CommonUpdateModal

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 12,


    },

})