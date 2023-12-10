import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {moderateScale, textScale} from '../styles/responsiveSize';
import imagePath from '../constants/imagePath';
import colors from '../styles/colors';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import TextComp from './TextComp';
import fontFamily from '../styles/fontFamily';

const HeaderComp = ({
  onPressLeft,
  leftText = '',
  isLeftImage = true,
  style = {},
  rightTextStyle = {},
  rightText = '',
  onPressRight=()=>{}
}) => {
  const navigation = useNavigation();
  const selectedTheme = useSelector(state => state?.appSettings?.selectedTheme);

  return (
    <View style={{...styles.container, ...style}}>
      <View style={{flexDirection:'row',alignItems:'center'}}>
      {isLeftImage ? (
        <TouchableOpacity
          style={{marginRight: moderateScale(16)}}
          onPress={!!onPressLeft ? onPressLeft : () => navigation.goBack()}>
          <Image
            source={imagePath.icBack}
            resizeMode="contain"
            style={[
              styles.iconStyle,
              {
                tintColor:
                  selectedTheme == 'dark' ? colors.white : colors.black,
              },
            ]}
          />
        </TouchableOpacity>
      ) : null}
      {!!leftText ? (
        <TextComp text={leftText} style={styles.textStyle} />
      ) : null}
      </View>
      {!!rightText ? (
        <TouchableOpacity onPress={onPressRight}>
          <TextComp style={{...styles.textStyle, ...rightTextStyle}}>
            {rightText}
          </TextComp>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default HeaderComp;

const styles = StyleSheet.create({
  container: {
    height: moderateScale(42),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: moderateScale(16),
    justifyContent:'space-between'
  },
  iconStyle: {
    height: moderateScale(15),
    width: moderateScale(15),
    tintColor: colors.white,
  },
  textStyle: {
    fontSize: textScale(16),
    fontFamily: fontFamily.bold,
  },
});
