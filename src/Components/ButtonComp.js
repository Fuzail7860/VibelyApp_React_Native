import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import colors from '../styles/colors';
import fontFamily from '../styles/fontFamily';
import {moderateScale, textScale} from '../styles/responsiveSize';

const ButtonComp = ({
  onPress = () => {},
  text = '',
  style = {},
  textStyle = {},
  leftImg = null,
  iconStyle = {},
  isLoading = false,
}) => {
  return (
    <TouchableOpacity
      style={{...styles.container, ...style}}
      onPress={onPress}
      activeOpacity={0.7}>
      {!!leftImg ? (
        <Image
          source={leftImg}
          style={{...styles.iconStyle, ...iconStyle}}
          resizeMode="contain"
        />
      ) : (
        <View />
      )}
      {isLoading ? (
        <ActivityIndicator size={'small'} color={'white'} />
      ) : (
        <Text style={{...styles.textStyle, ...textStyle}}>{text}</Text>
      )}

      <View />
    </TouchableOpacity>
  );
};

export default ButtonComp;

const styles = StyleSheet.create({
  container: {
    height: moderateScale(52),
    borderRadius: moderateScale(8),
    backgroundColor: colors.redColor,
    alignItems: 'center',
    justifyContent: 'space-between',
    // marginLeft:moderateScale(10),
    // marginRight: moderateScale(10),
    flexDirection: 'row',
    paddingHorizontal: moderateScale(16),
  },
  textStyle: {
    fontFamily: fontFamily.semiBold,
    color: colors.white,
    fontSize: textScale(16),
  },
  iconStyle: {
    height: 20,
    width: 20,
  },
});
