import { StyleSheet, useWindowDimensions, TextInput, View, Image, Platform, Text } from 'react-native'
import React, { useContext, useState } from 'react'
import { Controller } from 'react-hook-form'
import PandaContext from '../contexts/Panda'

const CommonInput = ({ placeholder, control, fieldName, error, inputMode, mt, leftElement, backgroundColor, topLabel, mb, placeholderTextColor, width, maxHeight, top, shadowOpacity, elevation, editable }) => {

    const contextPanda = useContext(PandaContext)
    let active = contextPanda.active

    return (
        <>
            {topLabel && <Text
                style={{
                    fontFamily: 'Poppins-Regular',
                    color: '#000',
                    fontSize: 11,
                    marginLeft: 5,
                    marginTop: top
                }}
            >{topLabel}</Text>}
            <View
                style={{
                    backgroundColor: backgroundColor ? backgroundColor : active === 'green' || active === 'fashion' ? '#fff' : '#F2F2F2',
                    borderRadius: 7,
                    marginTop: mt ? mt : 3,
                    maxHeight: maxHeight ? maxHeight : 45,
                    shadowOpacity: shadowOpacity,
                    shadowRadius: 5,
                    elevation: elevation,
                    shadowOffset: { width: 1, height: 5 },
                    flexDirection: 'row',
                    alignItems: 'center',
                    margin: 1,
                    marginBottom: mb
                }}
            >
                {leftElement && <Image
                    style={styles.logo}
                    source={require('../Images/mobile.png')}
                />}
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            minHeight={50}
                            placeholder={placeholder}
                            placeholderTextColor={placeholderTextColor ? placeholderTextColor : '#23233C'}
                            inputMode={inputMode}
                            paddingLeft={7}
                            fontFamily='Poppins-Regular'
                            fontSize={12}
                            color='#23233C'
                            width={width ? width : '100%'}
                            marginTop={Platform.OS === 'android' ? 5 : 1}
                            editable={editable}
                        />
                    )}
                    name={fieldName}
                />
            </View>
            {error && <Text style={styles.errorText}>{error?.message}</Text>}
        </>

    )
}

export default CommonInput


const styles = StyleSheet.create({
    logo: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
        marginLeft: 8
    },
    errorText: {
        fontFamily: 'Poppins-Regular',
        color: 'red',
        fontSize: 11,
    }
})
