import {
  StyleSheet,
  Text,
  View,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import WrapperContainer from '../../Components/WrapperContainer';
import {moderateScale, textScale} from '../../styles/responsiveSize';
import strings from '../../constants/lang';
import TextInputComp from '../../Components/TextInputComp';
import fontFamily from '../../styles/fontFamily';
import colors from '../../styles/colors';
import ButtonComp from '../../Components/ButtonComp';
import HeaderComp from '../../Components/HeaderComp';
import TextComp from '../../Components/TextComp';
import navigationStrings from '../../Navigations/navigationStrings';
import OTPTextView from 'react-native-otp-textinput';
import {showError} from '../../utils/helpherFunctions';
import validator from '../../utils/validations';
import {otpVerify} from '../../redux/actions/auth';
import store from '../../redux/store';
import {saveUserData} from '../../redux/reducers/auth';

const {dispatch} = store;

const OtpVerification = ({navigation, route}) => {
  const [timer, setTimer] = useState(60);
  const [isLoading, setLoading] = useState(false);
  const [otpInput, setOtpInput] = useState('');

  const input = useRef(null);
  const handleCellTextChange = async (text, i) => {};

  // console.log("email",route?.params?.data?.email);
  const {data} = route?.params || {};
  // console.log("email++",data?.email);
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (timer > 0) setTimer(timer - 1);
    }, 1000);
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [timer]);

  const onResendCode = () => {
    setTimer(60);
  };

  const isValidData = () => {
    const error = validator({
      otp: otpInput,
    });
    if (error) {
      showError(error);
      return false;
    }
    return true;
  };
  const onDone = async () => {
    const checkValid = isValidData();
    if (checkValid) {
      setLoading(true);
      let apiData = {
        email: data?.email,
        otp: otpInput,
      };
      try {
        const res = await otpVerify(apiData, data?.token);
        setLoading(false);
        console.log('login api res', res);
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
                text={strings.ENTER_THE_FOUR_DIGIT + ` xyz@gmail.com`}
                style={styles.headerStyle}
              />
              <TextComp
                text={strings.EDIT_MY_EMAIL}
                style={styles.descStyle}
                onPress={() => navigation.goBack()}
              />

              <OTPTextView
                ref={input}
                textInputStyle={styles.textInputContainer}
                handleTextChange={setOtpInput}
                handleCellTextChange={handleCellTextChange}
                inputCount={4}
                keyboardType="numeric"
                autoFocus
                tintColor={colors.white}
                offTintColor={colors.whiteOpacity50}
              />
            </View>
            <View style={{flex: 0.2, justifyContent: 'flex-end'}}>
              {timer > 0 ? (
                <TextComp
                  text={strings.RESEND_CODE + ' In '}
                  style={{
                    ...styles.descStyle,
                    marginBottom: moderateScale(16),
                  }}>
                  <Text>00:{timer}</Text>
                </TextComp>
              ) : (
                <TextComp
                  text={strings.RESEND_CODE}
                  style={styles.resendCodestyle}
                  onPress={onResendCode}
                />
              )}

              <ButtonComp
                text={strings.DONE}
                onPress={() => onDone()}
                isLoading={isLoading}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </WrapperContainer>
  );
};

export default OtpVerification;
const styles = StyleSheet.create({
  headerStyle: {
    fontSize: textScale(24),
    fontFamily: fontFamily.medium,
    color: colors.white,
  },
  descStyle: {
    fontSize: textScale(14),
    fontFamily: fontFamily.regular,
    color: colors.blueColor,
    marginTop: moderateScale(8),
    marginBottom: moderateScale(52),
  },
  textInputContainer: {
    backgroundColor: colors.grayColor,
    borderBottomWidth: 0,
    borderRadius: 8,
    color: colors.white,
  },
  resendCodestyle: {
    fontSize: textScale(14),
    fontFamily: fontFamily.regular,
    marginTop: moderateScale(8),
    marginBottom: moderateScale(16),
  },
});
