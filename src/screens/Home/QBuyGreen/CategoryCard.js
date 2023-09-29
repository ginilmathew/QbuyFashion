import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { memo } from 'react'
import TypeCard from '../Grocery/TypeCard'
import reactotron from '../../../ReactotronConfig'
import TypeSkelton from '../Grocery/TypeSkelton'

const CategoryCard = memo(({ data, loading }) => {


	if(loading){
		return(
<ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 20 }}>
			{Array(4)?.map((item, index) =>
				(<TypeSkelton />)
			)}
		</ScrollView>
		)
		
	}


	return (
		<ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 20 }}>
			{data?.map((item, index) =>
				(<TypeCard item={item} key={index} />)
			)}
		</ScrollView>
	)
})

export default CategoryCard

const styles = StyleSheet.create({})