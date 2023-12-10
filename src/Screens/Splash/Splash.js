import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import navigationStrings from '../../Navigations/navigationStrings';
import LottieView from 'lottie-react-native';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../styles/responsiveSize';
import TextComp from '../../Components/TextComp';
import colors from '../../styles/colors';
import fontFamily from '../../styles/fontFamily';
import { useSelector } from 'react-redux';

const Splash = ({navigation}) => {

  // const userData = useSelector(state => state.auth.userData);
  // console.log("userdata+++++++",!!userData?.token);
 
  useEffect(() => {
    setTimeout(() => {
      userLoginCheck()
    }, 4000);
  }, []);

  const userLoginCheck=async()=>{
    const userData = await useSelector(state => state.auth.userData);
    if (!!userData?.token) {
      navigation.replace(navigationStrings.TAB_ROUTES);
    } else {
      navigation.replace(navigationStrings.INITIAL_SCREEN);
    }
  }

  return (
    <View style={{flex: 1, alignItems: 'center', backgroundColor: '#fff'}}>
      <LottieView
        style={{
          height: moderateScale(200),
          width: moderateScale(200),
          marginTop: moderateScaleVertical(150),
        }}
        source={require('../../assets/Animations/splashAnimation.json')}
        autoPlay
        loop
      />
      <TextComp text={'Vibely'} style={styles.txtStyle}>
        {/* <Text style={{color: colors.black,marginLeft:-15}}>ly</Text> */}
      </TextComp>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  txtStyle: {
    textAlign: 'center',
    color: colors.black,
    fontSize: 40,
    fontFamily: fontFamily.regular,
    fontWeight: '800',
  },
});
