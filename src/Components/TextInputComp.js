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

const TextInputComp = ({
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
        <Text onPress={onPressSecure} style={{...styles.textStyle, flex: 0,color:colors.blueColor}}>
          {secureText}
        </Text>
      ) : null}
    </View>
  );
};

export default TextInputComp;

const styles = StyleSheet.create({
  inputStyle: {
    height: moderateScale(52),
    borderRadius: moderateScale(8),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: moderateScale(16),
    backgroundColor: colors.grayColor,
    marginBottom: moderateScaleVertical(16),
  },
  textStyle: {
    fontSize: textScale(14),
    fontFamily: fontFamily.regular,
    flex: 1,
    color: colors.whiteOpacity70,
  },
});
