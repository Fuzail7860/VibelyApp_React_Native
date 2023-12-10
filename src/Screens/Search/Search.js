import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import WrapperContainer from '../../Components/WrapperContainer';
import { FlashList } from '@shopify/flash-list';
import { height, moderateScale, moderateScaleVertical, width } from '../../styles/responsiveSize';
import FastImageComp from '../../Components/FastImageComp';
import colors from '../../styles/colors';
import SearchBar from '../../Components/SearchBar';


const Search = () => {
  const renderItem =({index})=>{
    return(
      <TouchableOpacity style={{
        marginLeft:moderateScale(9),
        marginTop:index % 2 == 0 ?moderateScaleVertical(16):0}} activeOpacity={0.7}>
        <FastImageComp
          url={'https://i1.sndcdn.com/artworks-JmErnf9jVsLNoqN4-7yRD4w-t500x500.jpg'}
          imageStyle={{
            ...styles.imgStyle,
            borderColor:colors.white,
           
          }}
        />
      </TouchableOpacity>
    );
  }
  return (
   <WrapperContainer>
       <View style={{flex: 1, }}>
        <SearchBar
         placeholder='Search...'
         inputStyle={{marginHorizontal:moderateScale(8),marginTop:moderateScaleVertical(16)}}
        //  isSearch
        />
        <FlashList
          data={[{},{},{},{},{},{},{},{},{},{},{},{}]}
          numColumns={2}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          estimatedItemSize={width/3}
          ItemSeparatorComponent={() => (
            <View style={{height: moderateScale(10)}} />
          )}
        />
      </View>
   </WrapperContainer>
  )
}

export default Search;

const styles = StyleSheet.create({
  imgStyle:{
    width:width/2.2,
    height:height/3,
    borderWidth:1,
    borderRadius:moderateScale(10),
  }
})