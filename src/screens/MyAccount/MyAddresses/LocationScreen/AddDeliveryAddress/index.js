import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Switch} from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Foundation from 'react-native-vector-icons/Foundation'
import HeaderWithTitle from '../../../../../Components/HeaderWithTitle'
import AddressCard from '../../AddressCard'
import ChooseAddressType from './ChooseAddressType'
import CommonTexts from '../../../../../Components/CommonTexts'
import CommonInput from '../../../../../Components/CommonInput'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import CustomButton from '../../../../../Components/CustomButton'
import PandaContext from '../../../../../contexts/Panda'
import reactotron from '../../../../../ReactotronConfig'
import customAxios from '../../../../../CustomeAxios'
import LoaderContext from '../../../../../contexts/Loader'
import CommonSwitch from '../../../../../Components/CommonSwitch'
import Toast from 'react-native-simple-toast';


const AddDeliveryAddress = ({route, navigation}) => {

    let locationData = route?.params?.item

    reactotron.log({locationData})

	const loadingContex = useContext(LoaderContext)
    let loadingg = loadingContex?.loading

    const [addr, setAddr] = useState([])

    const contextPanda = useContext(PandaContext)
    let active = contextPanda.active

    const [selected, setSelected] = useState('Home')


    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    // console.log({isEnabled})

    const schema = yup.object({
        location: yup.string().required('Area is required'),
        address: yup.string().required('Address is required'),
        pincode: yup.number().required('Pincode is required'),
	}).required();

	const { control, handleSubmit, formState: { errors }, setValue } = useForm({
		resolver: yupResolver(schema),
        defaultValues:{
            location: locationData?.city,
            address: locationData?.location
        }
	});


    datas = [
        {
            _id: '1',
            name: 'Home',
        },
        {
            _id: '2',
            name: 'Work',
        },
        {
            _id: '3',
            name: 'Other',
        },
    ]

    const onSave = useCallback(async(data) => {

        loadingContex.setLoading(true)
        let datas = {
            address_type: selected.toLocaleLowerCase(),
            area:{
                latitude: locationData?.latitude,
                longitude: locationData?.longitude,
                address: data?.address,
                location: locationData?.city,
            },
            default_status: isEnabled ? true : false,
            comments: data?.comments,
            mobile: data?.mobile,
            pincode: data?.pincode,
        }

        reactotron.log({datas})

        await customAxios.post(`customer/address/create`, datas)
        .then(async response => {
			setAddr(response?.data)
            loadingContex.setLoading(false)
			navigation.navigate('MyAddresses', {mode : 'MyAcc'})
        })
        .catch(async error => {
            Toast.showWithGravity(error, Toast.SHORT, Toast.BOTTOM);
            loadingContex.setLoading(false)
        })
    })
    

    return (
        <>
            <HeaderWithTitle  title={'Add Delivery Address'} />
            <ScrollView 
                style={{ 
                    backgroundColor: active === 'green' ? '#F4FFE9' : active === 'fashion' ? '#FFF5F7' : '#fff',
                    flex:1, 
                    paddingHorizontal:15
                }}
            >
                <View style={styles.headerView}>
                    <View style={{flexDirection:'row', }}>
                        {datas.map((item, index) =>
                            <ChooseAddressType
                                item={item}
                                key={index}
                                selected = {selected}
                                setSelected={setSelected}
                            />
                        )}
                    </View>

                    <View style={{paddingTop:10}} >
                        <CommonTexts label={'Default'} fontSize={12} />
                        <CommonSwitch toggleSwitch={toggleSwitch} isEnabled={isEnabled}/>
                    </View>
                </View>

                <CommonInput
					control={control}
					error={errors.location}
					fieldName="location"
                    topLabel={'Area'}
				/>
                <CommonInput
					control={control}
					error={errors.address}
					fieldName="address"
                    topLabel={'Address'}
                    placeholder='Complete Address e.g. house number, street name, etc'
                    placeholderTextColor='#0C256C21'
                    top={10}
				/>
                <CommonInput
					control={control}
					error={errors.comments}
					fieldName="comments"
                    topLabel={'Comments (Optional)'}
                    placeholder='Delivery Instructions e.g. Opposite Gold Souk Mall'
                    placeholderTextColor='#0C256C21'
                    top={10}
				/>
                <CommonInput
					control={control}
					error={errors.mobile}
					fieldName="mobile"
                    topLabel={'Mobile (Optional)'}
                    placeholder='Delivery Mobile Number e.g. mobile of the owner'
                    placeholderTextColor='#0C256C21'
                    top={10}
				/>
                <CommonInput
					control={control}
					error={errors.pincode}
					fieldName="pincode"
                    topLabel={'Pincode'}
                    placeholder='Delivery Pincode e.g. 695111'
                    placeholderTextColor='#0C256C21'
                    top={10}
				/>

                <CustomButton
                    onPress={handleSubmit(onSave)}
                    bg={ active === 'green' ? '#8ED053' : active === 'fashion' ? '#FF7190' : '#58D36E'}
                    label='Save'
                    mt={20}
                    loading={loadingg}
                />
                
                
                
            </ScrollView>
            
        </>
        
    )
}

export default AddDeliveryAddress

const styles = StyleSheet.create({
    headerView : {
        flexDirection:'row', 
        justifyContent:'space-between', 
        paddingRight:10 
    }
})