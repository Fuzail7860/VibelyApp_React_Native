import {StyleSheet, Text, View, Image, TouchableOpacity,Alert} from 'react-native';
import React, {useState} from 'react';
import WrapperContainer from '../../Components/WrapperContainer';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../styles/responsiveSize';
import FastImageComp from '../../Components/FastImageComp';
import HeaderComp from '../../Components/HeaderComp';
import strings from '../../constants/lang';
import imagePath from '../../constants/imagePath';
import TextInputComp from '../../Components/TextInputComp';
import MultiTextInput from '../../Components/MultiTextInput';
import colors from '../../styles/colors';
import ButtonComp from '../../Components/ButtonComp';
import {useSelector} from 'react-redux';
import ModalComp from '../../Components/ModalComp';
import navigationStrings from '../../Navigations/navigationStrings';
import store from '../../redux/store';
import { saveUserData } from '../../redux/reducers/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showError } from '../../utils/helpherFunctions';


const {dispatch}=store;

const ProfileEdit = ({navigation}) => {
  const selectedTheme = useSelector(state => state?.appSettings?.selectedTheme);
  const isDark = selectedTheme == 'dark';

  const [userName, setUserName] = useState('');
  const [fullName, setFullName] = useState('');
  const [bio, setBio] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');
  const [secureText, setSecureText] = useState(true);
  const [secureText1, setSecureText1] = useState(true);
  const [showPassModal, setShowPassModal] = useState(false);

  const onSave = () => {
    alert('Hello');
  }

  const logoutFunction=()=>{
    //  alert("logoutFunction")
    AsyncStorage.removeItem('userData').then((res)=>{
      console.log("user remove successfully..!!");
      dispatch(saveUserData({}))
    }).catch((err)=>{
      showError("data no found")
    })
    
  }

  const onLogout = () => {
    Alert.alert(
      'Logout',
      'Do you really want to logout?',
      [
          { text: 'Yes', onPress: () => logoutFunction() },
          { text: 'No', onPress: () => { } },
      ]
  )
  };

  return (
    <WrapperContainer>
      <View style={{flex: 1, padding: moderateScale(16)}}>
        <HeaderComp
          leftText={strings.EDIT_PROFILE}
          rightText={strings.SAVE}
          onPressRight={onSave}
          rightTextStyle={{color: colors.blueColor}}
        />
        <TouchableOpacity style={{alignSelf: 'center'}}>
          <FastImageComp
            url="https://i1.sndcdn.com/artworks-JmErnf9jVsLNoqN4-7yRD4w-t500x500.jpg"
            imageStyle={{
              borderRadius: moderateScale(50),
            }}
          />
          <Image
            source={imagePath.icEdit}
            resizeMode="contain"
            style={styles.icEditStyle}
          />
        </TouchableOpacity>
        <View style={{marginTop: moderateScaleVertical(24)}}>
          <TextInputComp
            value={userName}
            placeholder={strings.USERNAME}
            onChangeText={value => setUserName(value)}
          />
          <TextInputComp
            value={fullName}
            placeholder={strings.FULL_NAME}
            onChangeText={value => setFullName(value)}
          />
          <MultiTextInput
            value={bio}
            placeholder={strings.BIO}
            onChangeText={value => setBio(value)}
            multiline={true}
          />
          <ButtonComp
           onPress={()=>setShowPassModal(true)}
            text={strings.CHANGE_PASSWORD}
            style={{
              backgroundColor: 'transparent',
              borderWidth: 0.5,
              borderColor: isDark ? colors.white : colors.black,
            }}
          />
          <ButtonComp
            text={strings.ADD_LINKS}
            onPress={()=>navigation.navigate(navigationStrings.LINKS)}
            style={{
                // backgroundColor: 'transparent',
                // borderWidth: 0.5,
                // borderColor: isDark ? colors.white : colors.black,
              marginTop: moderateScale(16),
            }}
          />
           <ButtonComp
            text={strings.LOGOUT}
            onPress={()=>onLogout()}
            style={{
                backgroundColor: 'transparent',
                borderWidth: 0.5,
                borderColor:colors.redColor,
              marginTop: moderateScale(16),
            }}
          />
        </View>
        <ModalComp
          isVisible={showPassModal}
          style={{margin: 0, justifyContent: 'flex-end'}}
          avoidKeyboard
          onBackdropPress={()=>setShowPassModal(false)}
          >
          <View
            style={{
              ...styles.modalStyle,
              backgroundColor: isDark ? colors.whiteOpacity20 : colors.white,
            }}>
            <TextInputComp
              value={password}
              placeholder={strings.ENTER_OLD_PASSWORD}
              onChangeText={value => setPassword(value)}
              secureTextEntry={secureText}
              secureText={secureText ? strings.SHOW : strings.HIDE}
              onPressSecure={() => setSecureText(!secureText)}
            />
            <TextInputComp
              value={cpassword}
              placeholder={strings.ENTER_NEW_PASSWORD}
              onChangeText={value => setCpassword(value)}
              secureTextEntry={secureText1}
              secureText={secureText1 ? strings.SHOW : strings.HIDE}
              onPressSecure={() => setSecureText1(!secureText1)}
            />
            <ButtonComp text={strings.CHANGE_PASSWORD} />
          </View>
        </ModalComp>
      </View>
    </WrapperContainer>
  );
};

export default ProfileEdit;

const styles = StyleSheet.create({
  icEditStyle: {
    height: moderateScale(20),
    width: moderateScale(20),
    position: 'absolute',
    bottom: 6,
    right: 2,
  },
  modalStyle: {
    padding: moderateScale(16),
    borderTopRightRadius: moderateScale(8),
    borderTopLeftRadius: moderateScale(9),
  },
});
