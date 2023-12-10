import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import WrapperContainer from '../../Components/WrapperContainer';
import FastImageComp from '../../Components/FastImageComp';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
  width,
} from '../../styles/responsiveSize';
import TextComp from '../../Components/TextComp';
import {useSelector} from 'react-redux';
import colors from '../../styles/colors';
import {FlashList} from '@shopify/flash-list';
import imagePath from '../../constants/imagePath';
import navigationStrings from '../../Navigations/navigationStrings';

const Profile = ({navigation}) => {
  const selectedTheme = useSelector(state => state?.appSettings?.selectedTheme);
  const isDark = selectedTheme == 'dark';

  const listHeader = () => {
    return (
      <View style={{marginBottom: moderateScaleVertical(16)}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <FastImageComp
              url="https://i1.sndcdn.com/artworks-JmErnf9jVsLNoqN4-7yRD4w-t500x500.jpg"
              imageStyle={{
                borderRadius: moderateScale(50),
              }}
            />
            <View style={{marginLeft: moderateScale(16)}}>
              <TextComp text="Satoru Gojo" style={{fontSize: textScale(20)}} />
              <TextComp
                text="satoru@gmail.com"
                style={{
                  fontSize: textScale(14),
                  color:
                    selectedTheme == 'dark'
                      ? colors.whiteOpacity70
                      : colors.blackOpacity70,
                }}
              />
            </View>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate(navigationStrings.PROFILE_EDIT)}
            activeOpacity={0.7}>
            <Image
              source={imagePath.icEdit}
              resizeMode="contain"
              style={styles.icEditStyle}
            />
          </TouchableOpacity>
        </View>
        <View style={{marginVertical: moderateScaleVertical(16)}}>
          <TextComp
            text="I'm a passionate software developer with a deep love for coding and problem-solving."
            style={{fontSize: textScale(16)}}
          />
        </View>
        <View
          style={{
            ...styles.boxView,
            backgroundColor: isDark
              ? colors.blackOpacity20
              : colors.blackOpacity40,
          }}>
          <TextComp
            text="Dashboard"
            style={{
              fontSize: textScale(14),
            }}
          />
          <TextComp
            text="1k account reached in the last 30 days"
            style={{
              fontSize: textScale(14),
              color: isDark ? colors.whiteOpacity70 : colors.blackOpacity70,
            }}
          />
        </View>
      </View>
    );
  };

  const renderItem = () => {
    return (
      <TouchableOpacity style={{}} activeOpacity={0.7}>
        <FastImageComp
          url={
            'https://i1.sndcdn.com/artworks-JmErnf9jVsLNoqN4-7yRD4w-t500x500.jpg'
          }
          imageStyle={{
            ...styles.imgStyle,
            borderColor: isDark ? colors.white : colors.black,
          }}
        />
      </TouchableOpacity>
    );
  };
  return (
    <WrapperContainer>
      <View style={{flex: 1, padding: moderateScale(16)}}>
        <FlashList
          data={[{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]}
          renderItem={renderItem}
          numColumns={3}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={listHeader}
          estimatedItemSize={width / 3}
          ListEmptyComponent={() => <Text>No posts found</Text>}
          keyExtractor={(item, index) => item?._id || String(index)}
        />
      </View>
    </WrapperContainer>
  );
};

export default Profile;

const styles = StyleSheet.create({
  boxView: {
    padding: moderateScale(12),
    borderRadius: moderateScale(8),
  },
  icEditStyle: {
    height: moderateScale(20),
    width: moderateScale(20),
  },
  imgStyle: {
    width: width / 3,
    height: width / 3,
    borderWidth: 0.5,
  },
});
