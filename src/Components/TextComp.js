import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import colors from '../styles/colors';
import {textScale} from '../styles/responsiveSize';
import fontFamily from '../styles/fontFamily';

const TextComp = ({text = '', style = {}, children, ...props}) => {
  const selectedTheme = useSelector(state => state?.appSettings?.selectedTheme);

  return (
    <Text
      style={{
        ...style.textStyle,
        color: selectedTheme == 'dark' ? colors.white : colors.black,
        ...style,
      }}
      {...props}
      >
      {text} {children}
    </Text>
  );
};

export default TextComp;

const styles = StyleSheet.create({
  textStyle: {
    fontSize: textScale(12),
    fontFamily: fontFamily.regular,
    color: colors.white,
  },
});
