import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
  I18nManager,
} from 'react-native';
import React, {useState} from 'react';
import {saveUserData} from '../../redux/reducers/auth';
import {useSelector} from 'react-redux';
import WrapperContainer from '../../Components/WrapperContainer';
import imagePath from '../../constants/imagePath';
import colors from '../../styles/colors';
import fontFamily from '../../styles/fontFamily';
import strings from '../../constants/lang';
import ButtonComp from '../../Components/ButtonComp';
import {
  height,
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../styles/responsiveSize';
import navigationStrings from '../../Navigations/navigationStrings';
import TextComp from '../../Components/TextComp';
import ModalComp from '../../Components/ModalComp';
import LeftTextrightImage from '../../Components/LeftTextrightImage';
import {langData} from '../../constants/langTheme/langData';
import {themeData} from '../../constants/langTheme/themeData';
import RNRestart from 'react-native-restart';
import store from '../../redux/store';
import { changeAppTheme, changeLanguage } from '../../redux/actions/appSettings';

const {dispatch} = store;

const InitialScreen = ({navigation}) => {
  // const dispatch = useDispatch();

  const {selectedTheme, lang} = useSelector(state => state?.appSettings);

  const [isVisible, setIsVisible] = useState(false);

  const onLogin = () => {
    dispatch(saveUserData({isLogin: true}));
  };

  const privacyPolicy = (type = 1) => {
    if (type == 1) {
      navigation.navigate(navigationStrings.WEBVIEW,{type})
    } else {
      navigation.navigate(navigationStrings.WEBVIEW,{type})
    }
  };
  const onPressLang = (lan) => {
    setIsVisible(false);
    if (lan == 'ar' && lang !== lan) {
      changeLanguage(lan);
      setTimeout(()=>{
        I18nManager.forceRTL(true);
        RNRestart.restart();
      },400)
     
    } else if (lang !== lan) {
      changeLanguage(lan);
      setTimeout(()=>{
        I18nManager.forceRTL(false);
        RNRestart.restart();
      },400)
    }
    
  };

  const onPressTheme = (theme) => {
    setIsVisible(false);
    changeAppTheme(theme);
    
  };

  return (
    <WrapperContainer>
      <View style={{flex: 1, padding: moderateScale(16), alignItems: 'center'}}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setIsVisible(true)}
          style={{
            ...styles.circularStyle,
            backgroundColor:
              selectedTheme == 'dark' ? colors.white : colors.gray4,
          }}>
          <Text
            style={{
              ...styles.txtStyle,
              color: selectedTheme == 'dark' ? colors.black : colors.white,
              textAlign:'left'
            }}>
            {lang}
          </Text>
        </TouchableOpacity>
        <View style={{flex: 0.3, justifyContent: 'center'}}>
          <Image source={imagePath.icLogo} style={styles.logoStyle} />
        </View>

        <View style={{flex: 0.7, justifyContent: 'flex-end'}}>
          <TextComp
            text={strings.BY_CLICKING_LOG_IN}
            style={{
              marginVertical: moderateScaleVertical(32),
              textAlign: 'center',
            }}>
            <Text style={{color:colors.blueColor}} onPress={() => privacyPolicy(1)}>{strings.TERMS}</Text>.
            {strings.LEARN_HOW_WE_PROCESS}
            <Text onPress={() => privacyPolicy(2)} style={{color:colors.blueColor}}>
              {strings.PRIVACY_POLICY}
            </Text>
          </TextComp>
          <ButtonComp
            text={strings.LOG_IN_WITH_EMAIL_ADDRESS}
            onPress={() => navigation.navigate(navigationStrings.LOGIN)}
          />

          <TextComp
            text={strings.OR}
            style={{
              marginVertical: moderateScaleVertical(16),
              alignSelf: 'center',
            }}
          />
          <ButtonComp
            text={strings.LOG_IN_WITH_GOOGLE}
            textStyle={{color: colors.black}}
            style={{
              backgroundColor:
                selectedTheme == 'dark' ? colors.white : colors.gray4,
            }}
            leftImg={imagePath.icGoogle}
          />
          <ButtonComp
            text={strings.LOG_IN_WITH_FACEBOOK}
            style={{
              marginVertical: moderateScaleVertical(16),
              backgroundColor:
                selectedTheme == 'dark' ? colors.white : colors.gray4,
            }}
            textStyle={{color: colors.black}}
            leftImg={imagePath.icFacebook}
          />
          <ButtonComp
            text={strings.LOG_IN_WITH_APPLE}
            textStyle={{color: colors.black}}
            style={{
              backgroundColor:
                selectedTheme == 'dark' ? colors.white : colors.gray4,
            }}
            leftImg={imagePath.icApple}
          />
          <TextComp
            text={strings.NEW_HERE}
            style={{
              textAlign: 'center',
              fontFamily: fontFamily.medium,
              marginVertical: moderateScaleVertical(16),
            }}>
            <Text
              onPress={() => navigation.navigate(navigationStrings.SIGNUP)}
              style={{
                ...styles.textStyle,
                color: colors.blueColor,
                fontFamily: fontFamily.semiBold,
              }}>
              {strings.SIGN_UP}
            </Text>
          </TextComp>
        </View>
      </View>
      <ModalComp
        isVisible={isVisible}
        style={{justifyContent: 'flex-end', margin: 0}}
        onBackdropPress={() => setIsVisible(false)}>
        <View style={styles.modalStyle}>
          <Text style={styles.headingStyle}>{strings.CHOOSE_LANGUAGE}</Text>

          {langData.map((val, i) => {
            return (
              <LeftTextrightImage
                key={String(i)}
                text={val.title}
                isSelected={lang == val.code}
                onPress={() => onPressLang(val.code)}
              />
            );
          })}

          <Text
            style={{
              ...styles.headingStyle,
              marginTop: moderateScaleVertical(16),
            }}>
            {strings.CHOOSE_THEME}
          </Text>
          {themeData.map((val, i) => {
            return (
              <LeftTextrightImage
                key={String(i)}
                text={val.title}
                isSelected={val.code == selectedTheme}
                onPress={() => onPressTheme(val.code)}
              />
            );
          })}
        </View>
      </ModalComp>
    </WrapperContainer>
  );
};

export default InitialScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoStyle: {
    height: moderateScale(130),
    width: moderateScale(130),
    borderRadius: moderateScale(130 / 2),
  },
  textStyle: {
    color: colors.white,
    fontFamily: fontFamily.regular,
    textAlign: 'center',
    padding: moderateScale(10),
    fontSize: textScale(14),
  },
  circularStyle: {
    height: moderateScale(40),
    width: moderateScale(40),
    borderRadius: moderateScale(40 / 2),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },
  txtStyle: {
    color: colors.white,
    fontFamily: fontFamily.semiBold,
    textAlign: 'center',
    fontSize: textScale(14),
    textTransform: 'capitalize',
  },
  headingStyle: {
    color: colors.black,
    fontFamily: fontFamily.bold,
    fontSize: textScale(18),
    textTransform: 'capitalize',
    marginBottom: moderateScaleVertical(12),
  },
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
  modalStyle: {
    backgroundColor: colors.white,
    minHeight: moderateScale(height / 4),
    borderTopLeftRadius: moderateScale(8),
    borderTopRightRadius: moderateScale(8),
    padding: moderateScale(16),
  },
});
