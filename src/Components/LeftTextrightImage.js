import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import colors from '../styles/colors';
import imagePath from '../constants/imagePath';
import fontFamily from '../styles/fontFamily';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../styles/responsiveSize';

const LeftTextrightImage = ({
    onPress = () => {},
     isSelected,
      text = '',
      image=imagePath.icCheckFill
    }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => onPress('en')}
      style={styles.horizontalView}>
      <Text
        style={{
          ...styles.lanTextStyle,
          color: isSelected ? colors.redColor : colors.black,
        }}>
        {text}
      </Text>
      <Image
        source={image}
        style={[
          styles.checkImgStyle,
          {tintColor: isSelected ? colors.redColor : colors.grayColor},
        ]}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

export default LeftTextrightImage;

const styles = StyleSheet.create({
  lanTextStyle: {
    color: colors.black,
    fontFamily: fontFamily.semiBold,
    fontSize: textScale(14),
    textTransform: 'capitalize',
    marginVertical: moderateScaleVertical(8),
  },
  checkImgStyle: {
    height: moderateScale(22),
    width: moderateScale(22),
  },
  horizontalView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
