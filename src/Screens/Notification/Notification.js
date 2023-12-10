import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import WrapperContainer from '../../Components/WrapperContainer';
import {FlashList} from '@shopify/flash-list';
import {
  height,
  moderateScale,
  moderateScaleVertical,
  textScale,
  width,
} from '../../styles/responsiveSize';
import FastImageComp from '../../Components/FastImageComp';
import colors from '../../styles/colors';
import HeaderComp from '../../Components/HeaderComp';
import TextComp from '../../Components/TextComp';
import {useSelector} from 'react-redux';

const Notification = () => {
  const selectedTheme = useSelector(state => state?.appSettings?.selectedTheme);
  // console.log(selectedTheme);
  const renderItem = () => {
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: moderateScale(16),
        }}
        activeOpacity={0.7}>
        <FastImageComp
          url={
            'https://i1.sndcdn.com/artworks-JmErnf9jVsLNoqN4-7yRD4w-t500x500.jpg'
          }
          imageStyle={styles.imgStyle}
        />
        <View style={{marginHorizontal: moderateScale(8)}}>
          <TextComp
            text="User name"
            style={{fontSize: textScale(16), color: colors.redColor}}>
            <Text style={{color: colors.white}}>added new post.</Text>
          </TextComp>
          <TextComp
            text="1 hr"
            style={{
              marginVertical: moderateScaleVertical(4),
              color:
                selectedTheme == 'dark'
                  ? colors.whiteOpacity70
                  : colors.blackOpacity70,
            }}
          />
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <WrapperContainer>
      <View style={{flex: 1}}>
        <HeaderComp
          isLeftImage={false}
          leftText="Notifications"
          style={{marginBottom:moderateScale(16)}}
        />
        <FlashList
          data={[{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]}
          renderItem={renderItem}
          estimatedItemSize={width / 3}
          ItemSeparatorComponent={() => (
            <View
              style={{
                ...styles.horizontalLine,
                borderBottomColor:
                  selectedTheme == 'dark'
                    ? colors.whiteOpacity40
                    : colors.blackOpacity40,
              }}
            />
          )}
        />
      </View>
    </WrapperContainer>
  );
};

export default Notification;

const styles = StyleSheet.create({
  imgStyle: {
    width: moderateScale(50),
    height: moderateScale(50),
    borderRadius: moderateScale(50 / 2),
    marginRight: moderateScale(8),
  },
  horizontalLine: {
    height: moderateScale(1),
    borderBottomWidth: 1,
    marginVertical: moderateScaleVertical(16),
  },
});
