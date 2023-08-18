import { Image, StyleSheet, Text, View, ScrollView, TouchableOpacity, useWindowDimensions } from 'react-native'
import React, { useCallback, useContext } from 'react'
import Lottie from 'lottie-react-native';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Ionicons from 'react-native-vector-icons/Ionicons'
import HeaderWithTitle from '../../../Components/HeaderWithTitle';
import CommonSelectDropdown from '../../../Components/CommonSelectDropdown';
import CommonInput from '../../../Components/CommonInput';
import CustomButton from '../../../Components/CustomButton';
import CommonPicker from '../../../Components/CommonPicker';
import PandaContext from '../../../contexts/Panda';
import CommonSquareButton from '../../../Components/CommonSquareButton';


const WorkWithPanda = ({ navigation, route }) => {

    const contextPanda = useContext(PandaContext)
    let active = contextPanda.active


    const { width } = useWindowDimensions()

    let regSuccess = route?.params?.mode



    let status = 'approved'


    const schema = yup.object({
        mobile: yup.string().min(8).required('Phone number is required'),
    }).required();

    const { control, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(schema)
    });



    const clickRegNow = useCallback(() => {
        navigation.navigate('RegisterAsAffiliate')
    }, [])
    
    return (
        <>
            <HeaderWithTitle title={'Work With Qbuy Panda'} noBack />
            <ScrollView
                style={{
                    flex: 1,
                    backgroundColor: active === 'green' ? '#F4FFE9' : active === 'fashion' ? '#FFF5F7' : '#fff', 
                    paddingHorizontal: 15,
                }}
            >
                <View style={{ height: 170, alignItems: 'center' }}>
                    <Lottie
                        source={{ uri: 'https://assets9.lottiefiles.com/packages/lf20_dBF8frvgma.json' }}
                        autoPlay
                    />
                </View>
                <Text style={styles.mainText}>{'Join Our Affiliate program and get Panda Coins !'}</Text>

                <Text style={styles.subText}>{"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."}</Text>


                {regSuccess === 'success' ? '' : <CustomButton
                    onPress={clickRegNow}
                    label={'Register Now!'}
                    bg={ active === 'green' ? '#8ED053' : active === 'fashion' ? '#FF7190' : '#58D36E'}
                    mb={20}
                    mt={20}
                />}


                {regSuccess === 'success' &&
                    <View style={{ paddingBottom: 80 }}>
                        {status !== 'approved' && <Text style={styles.submittedText}>{'Your Form Has Been Submitted Successfully'}</Text>}
                        <View style={{ alignItems: 'center', marginTop: 15 }}>
                            <Ionicons name={status === 'approved' ? 'checkmark-circle-sharp' : 'alert-circle'} color={status === 'approved' ? '#1A9730' : '#B29211'} size={30} />
                            <Text
                                style={{
                                    fontFamily: 'Poppins-Medium',
                                    color: status === 'approved' ? '#1A9730' : '#B29211',
                                    fontSize: 13,
                                    textAlign: 'center',
                                    marginTop: 10
                                }}
                            >{status === 'approved' ? 'Your Form Has Been Approved' : 'Awaiting Approval'}</Text>
                        </View>


                        {status === 'approved' && <>
                            <Text style={styles.shareLinkText}>{'Share the affiliate link to earn panda coins !'}</Text>
                            <View style={{ flexDirection: 'row', marginTop: 15, alignItems: 'center' }}>
                                <CommonPicker
                                    // onPress={()=>setOpenCalendar(true)}
                                    icon={<Ionicons name={'ios-copy'} size={25} color={active === 'green' ? '#8ED053' : active === 'fashion' ? '#FF7190' : '#58D36E'} />}
                                    w={width - 100}
                                    label='qbuypanda/affiliate/328745'
                                    top={-14}
                                />
                                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                    <CommonSquareButton
                                        iconName={'share-social'}
                                    />
                                </View>
                            </View>
                        </>}



                    </View>



                }



            </ScrollView>
        </>
    )
}

export default WorkWithPanda

const styles = StyleSheet.create({

    mainText: {
        fontFamily: 'Poppins-Medium',
        color: '#23233C',
        fontSize: 13,
        textAlign: 'center',
        paddingHorizontal: 40,
        marginTop: 10,
        marginBottom: 20
    },
    subText: {
        fontFamily: 'Poppins-LightItalic',
        color: '#23233C',
        fontSize: 9,
        textAlign: 'center',
        paddingHorizontal: 40,
        marginBottom: 20
    },
    submittedText: {
        fontFamily: 'Poppins-Medium',
        color: '#1A9730',
        fontSize: 13,
        textAlign: 'center',
    },
    shareLinkText: {
        fontFamily: 'Poppins-Medium',
        color: '#23233C',
        fontSize: 13,
        marginTop: 20,
    },
    shareButton: {
        width: 50,
        height: 50,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#58D36E',
        marginTop: 1,
    }

})