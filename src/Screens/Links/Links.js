import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import WrapperContainer from '../../Components/WrapperContainer';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
  width,
} from '../../styles/responsiveSize';
import HeaderComp from '../../Components/HeaderComp';
import strings from '../../constants/lang';
import {FlashList} from '@shopify/flash-list';
import TextComp from '../../Components/TextComp';
import colors from '../../styles/colors';
import {useSelector} from 'react-redux';
import imagePath from '../../constants/imagePath';
import fontFamily from '../../styles/fontFamily';
import TextInputComp from '../../Components/TextInputComp';
import ModalComp from '../../Components/ModalComp';
import ButtonComp from '../../Components/ButtonComp';

const Links = () => {
  const selectedTheme = useSelector(state => state?.appSettings?.selectedTheme);
  const isDark = selectedTheme == 'dark';

  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [showModal, setShowModal] = useState(false);


  const renderItem = () => {
    return (
      <TouchableOpacity style={styles.itemStyle} activeOpacity={0.7}>
        <View style={{flex: 0.1}}>
          <Image
            source={imagePath.icLink}
            resizeMode="contain"
            style={{
              ...styles.icLinkStyle,
              marginRight: moderateScale(8),
              tintColor: isDark ? colors.white : colors.black,
            }}
          />
        </View>

        <View style={{flex: 0.8}}>
          <TextComp
            numberOfLines={1}
            text="https://www.youtube.com/channel/UCIytLrd_KDOR-41k2J9kRZw"
            style={{color: colors.blueColor}}
          />
        </View>
        <View style={{flex: 0.1}}>
          <Image
            source={imagePath.icRight_Arrow}
            resizeMode="contain"
            style={{
              ...styles.icLinkStyle,
              tintColor: isDark ? colors.white : colors.black,
            }}
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <WrapperContainer>
      <View style={{flex: 1, padding: moderateScale(16)}}>
        <HeaderComp leftText={strings.ADD_LINKS} />
        <TouchableOpacity
          style={styles.addLinkStyle}
          activeOpacity={0.7}
          onPress={()=>setShowModal(true)}
          >
            <Image
            source={imagePath.icAdd}
            resizeMode="contain"
            style={{
              ...styles.icLinkStyle,
              tintColor: isDark ? colors.white : colors.black,
              marginRight:moderateScale(16)
            }}
          />
          <TextComp text={strings.ADD_LINKS} style={styles.addLinkLable}/>
          </TouchableOpacity>
        <FlashList
          data={[{}, {}]}
          renderItem={renderItem}
          estimatedItemSize={48}
          ItemSeparatorComponent={() => (
            <View
              style={{
                ...styles.horizontalLine,
                borderBottomColor: isDark
                  ? colors.whiteOpacity40
                  : colors.blackOpacity40,
              }}
            />
          )}
        />
      </View>
      <ModalComp
          isVisible={showModal}
          style={{margin: 0, justifyContent: 'flex-end'}}
          avoidKeyboard
          onBackdropPress={()=>setShowModal(false)}
          >
          <View
            style={{
              ...styles.modalStyle,
              backgroundColor: isDark ? colors.whiteOpacity20 : colors.white,
            }}>
            <TextInputComp
              value={title}
              placeholder={strings.TITLE}
              onChangeText={value => setTitle(value)}
            />
            <TextInputComp
              value={url}
              placeholder={strings.URL}
              onChangeText={value => setUrl(value)}
              
            />
            <ButtonComp text={strings.SAVE} />
          </View>
        </ModalComp>
    </WrapperContainer>
  );
};

export default Links;

const styles = StyleSheet.create({
  horizontalLine: {
    height: moderateScale(1),
    borderBottomWidth: 1,
    marginVertical: moderateScaleVertical(16),
  },
  itemStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  icLinkStyle: {
    height: moderateScale(20),
    width: moderateScale(20),
  },
  addLinkStyle: {
    flexDirection: 'row',
    marginVertical: moderateScaleVertical(16),
    alignItems: 'center',
  },
  addLinkLable:{
    fontSize:textScale(16),
    fontFamily:fontFamily.medium
  },
  modalStyle: {
    padding: moderateScale(16),
    borderTopRightRadius: moderateScale(8),
    borderTopLeftRadius: moderateScale(9),
  },
});
