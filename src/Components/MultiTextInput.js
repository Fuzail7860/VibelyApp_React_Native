import {StyleSheet, Text, View, TextInput} from 'react-native';
import React from 'react';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../styles/responsiveSize';
import fontFamily from '../styles/fontFamily';
import colors from '../styles/colors';
import {useSelector} from 'react-redux';

const MultiTextInput = ({
  value = '',
  onChangeText,
  placeholder,
  placeholderTextColor = colors.whiteOpacity70,
  secureText = false,
  onPressSecure = () => {},
  inputStyle = {},
  textStyle = {},
  ...props
}) => {
  const {lang} = useSelector(state => state?.appSettings);

  return (
    <View style={{...styles.inputStyle, ...inputStyle}}>
      <TextInput
        style={{
          ...styles.textStyle,
          ...textStyle,
          textAlign: lang == 'ar' ? 'right' : 'left',
        }}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        {...props}
      />
      {!!secureText ? (
        <Text onPress={onPressSecure} style={{...styles.textStyle, flex: 0}}>
          {secureText}
        </Text>
      ) : null}
    </View>
  );
};

export default MultiTextInput;

const styles = StyleSheet.create({
  inputStyle: {
    minHeight: moderateScale(80),
    maxHeight:moderateScale(120),
    borderRadius: moderateScale(8),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: moderateScale(16),
    backgroundColor: colors.grayColor,
    marginBottom: moderateScaleVertical(16),
    // paddingTop:moderateScaleVertical(),

  },
  textStyle: {
    fontSize: textScale(14),
    fontFamily: fontFamily.regular,
    flex: 1,
    color: colors.white,
  },
});
