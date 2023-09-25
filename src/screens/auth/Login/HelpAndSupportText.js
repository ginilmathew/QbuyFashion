import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const HelpAndSupportText = () => {
    return (
        <View style={{alignItems:'center'}}>
            <View style={{flexDirection:'row', marginTop:15}}>
                <Text style={styles.text1}>{"Please reach out to our"}</Text>
                <Text style={styles.text2} >{" Help & Support"}</Text>
                <Text style={styles.text1}>{" or call your qbuy"}</Text>
            </View>
            <View style={{flexDirection:'row', }}>
                <Text style={styles.text1}>{"panda shopping assistant at"}</Text>
                <Text 
                    style={styles.text3}
                >{" 918137009905"}</Text>
            </View>
        </View>
    )
}

export default HelpAndSupportText

const styles = StyleSheet.create({
    text1:{
        fontFamily: 'Poppins-Light',
        color: '#8D8D8D',
        fontSize: 11,
    },
    text2: {
        fontFamily: 'Poppins-Bold',
        color: '#FF7190',
        fontSize: 11,
    },
    text3 : {
        fontFamily: 'Poppins-Bold',
        color: '#5E59FF',
        fontSize: 11,
    },
})