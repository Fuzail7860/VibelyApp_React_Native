import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React from 'react';
import colors from '../styles/colors';
import {useSelector} from 'react-redux';

const WrapperContainer = ({style = {}, children}) => {
  const {selectedTheme} = useSelector(state => state?.appSettings);
  
  // console.log(selectedTheme);
  return (
    <View
      style={{
        ...styles.container,
        ...style,
        backgroundColor:
          selectedTheme == 'dark' ? colors.themeColor : colors.white,
      }}>
      <SafeAreaView style={{flex: 1}}>{children}</SafeAreaView>
    </View>
  );
};

export default WrapperContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.themeColor,
  },
});
