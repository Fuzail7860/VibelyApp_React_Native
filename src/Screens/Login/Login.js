import {
  StyleSheet,
  Text,
  View,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useState} from 'react';
import WrapperContainer from '../../Components/WrapperContainer';
import {moderateScale, textScale} from '../../styles/responsiveSize';
import strings from '../../constants/lang';
import TextInputComp from '../../Components/TextInputComp';
import fontFamily from '../../styles/fontFamily';
import colors from '../../styles/colors';
import ButtonComp from '../../Components/ButtonComp';
import HeaderComp from '../../Components/HeaderComp';
import TextComp from '../../Components/TextComp';
import {showError} from '../../utils/helpherFunctions';
import validator from '../../utils/validations';
import navigationStrings from '../../Navigations/navigationStrings';
import {userLogin} from '../../redux/actions/auth';
import {saveUserData} from '../../redux/reducers/auth';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(true);
  const [isLoading, setLoading] = useState(false);

  const isValidData = () => {
    const error = validator({
      email,
      password,
    });
    if (error) {
      showError(error);
      return false;
    }
    return true;
  };
  const onLogin = async () => {
    const checkValid = isValidData();
    if (checkValid) {
      setLoading(true);
      try {
        const res = await userLogin({
          email,
          password,
        });
        console.log('login api res', res);
        setLoading(false);
        if (!!res?.data && !res?.data?.validOTP) {
          navigation.navigate(navigationStrings.OTP_VERIFICATION, {
            data: res.data,
          });
          return
        }
      } catch (error) {
        console.log('error in login api', error);
        showError(error?.error);
        setLoading(false);
      }
    }
  };

  return (
    <WrapperContainer>
      <HeaderComp />
      <View style={{flex: 1, padding: moderateScale(16)}}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{flex: 1}}>
            <View style={{flex: 0.8}}>
              <TextComp
                text={strings.WELCOME_BACK}
                style={styles.headerStyle}
              />
              <TextComp
                text={strings.WE_ARE_HAPPY_TO_SEE}
                style={styles.descStyle}
              />

              <TextInputComp
                value={email}
                placeholder={strings.EMAIL}
                onChangeText={value => setEmail(value)}
              />
              <TextInputComp
                value={password}
                placeholder={strings.PASSWORD}
                onChangeText={value => setPassword(value)}
                secureTextEntry={secureText}
                secureText={secureText ? strings.SHOW : strings.HIDE}
                onPressSecure={() => setSecureText(!secureText)}
              />

              <Text
                style={{
                  ...styles.descStyle,
                  alignSelf: 'flex-end',
                  color: colors.blueColor,
                  fontFamily: fontFamily.semiBold,
                }}>
                {strings.FORGOT_PASSWORD}
              </Text>
            </View>
            <View style={{flex: 0.2, justifyContent: 'flex-end'}}>
              <ButtonComp
                text={strings.LOGIN}
                onPress={() => onLogin()}
                isLoading={isLoading}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </WrapperContainer>
  );
};

export default Login;
const styles = StyleSheet.create({
  headerStyle: {
    fontSize: textScale(24),
    fontFamily: fontFamily.medium,
    color: colors.white,
  },
  descStyle: {
    fontSize: textScale(12),
    fontFamily: fontFamily.regular,
    color: colors.whiteOpacity70,
    marginTop: moderateScale(8),
    marginBottom: moderateScale(52),
  },
});
