import {StyleSheet, Text, View, TextInput, ActivityIndicator} from 'react-native';
import React from 'react';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../styles/responsiveSize';
import fontFamily from '../styles/fontFamily';
import colors from '../styles/colors';
import {useSelector} from 'react-redux';

const SearchBar = ({
  value = '',
  onChangeText,
  placeholder,
  placeholderTextColor = colors.whiteOpacity70,
  isSearch = false,
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
      {!!isSearch ? <ActivityIndicator color={colors.redColor}/> : null}
    </View>
  );
};

export default SearchBar;

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
    color: colors.white,
  },
});
