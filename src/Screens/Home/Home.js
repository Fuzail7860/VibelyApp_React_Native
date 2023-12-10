import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useCallback, useState, useEffect} from 'react';
import strings from '../../constants/lang';
import {FlashList} from '@shopify/flash-list';
import WrapperContainer from '../../Components/WrapperContainer';
import styles from './styles';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../styles/responsiveSize';
import FastImageComp from '../../Components/FastImageComp';
import imagePath from '../../constants/imagePath';
import TextComp from '../../Components/TextComp';
import {useSelector} from 'react-redux';
import colors from '../../styles/colors';
import actions from '../../redux/actions';

const DATA = [
  {
    title: 'First Item',
  },
  {
    title: 'Second Item',
  },
];

const Home = () => {
  const {selectedTheme} = useSelector(state => state?.appSettings);

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    userPosts();
  }, []);

  const userPosts = async () => {
    try {
      const res = await actions.getAllPosts(`?limit=50`);
      console.log('all posts', res.data.data);
      setPosts(res.data);
    } catch (error) {
      console.log('error raised', error);
    }
  };

  console.log('post++++0', posts);
  const renderItem = useCallback(({item, index}) => {
    console.log('item+++++++', item);
    return (
      <View style={styles.boxStyle}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <FastImageComp
              url={
                'https://i1.sndcdn.com/artworks-JmErnf9jVsLNoqN4-7yRD4w-t500x500.jpg'
              }
              imageStyle={styles.profileImage}
            />
            <View>
              <TextComp text={item?.user?.fullName} style={styles.nameStyle} />
              {!!item?.user?.bio ? (
                <TextComp
                  text={item?.user?.bio}
                  style={{
                    ...styles.bioStyle,
                    color:
                      selectedTheme == 'dark'
                        ? colors.whiteOpacity50
                        : colors.blackOpacity70,
                  }}
                />
              ) : null}
            </View>
          </View>
          <TouchableOpacity activeOpacity={0.7}>
            <Image source={imagePath.icDots} style={styles.dotStyle} />
          </TouchableOpacity>
        </View>
        <FastImageComp
          url={item?.media[0]?.url}
          imageStyle={styles.postImage}
        />

        {!!item?.description ? (
          <TextComp text={item?.description} style={styles.descStyle} />
        ) : null}

        <TextComp
          text={item?.createdAt}
          style={{
            ...styles.descStyle,
            marginVertical: moderateScaleVertical(12),
            color:
              selectedTheme == 'dark'
                ? colors.whiteOpacity70
                : colors.blackOpacity70,
          }}
        />
        <View style={styles.flexHorizontal}>
          <View style={{flexDirection: 'row'}}>
            <TextComp
              text={`Comments ${item?.commentCount || 0}`}
              style={{...styles.descStyle, marginRight: moderateScale(8)}}
            />
            <TextComp
              text={`Likes ${item?.likeCount || 0}`}
              style={styles.descStyle}
            />
            <TouchableOpacity>
              <Image source={imagePath.icHeartFill} style={{...styles.likeImg,tintColor:item?.isLike?colors.redColor:colors.black}} resizeMode='contain'/>
            </TouchableOpacity>
          </View>

          <TouchableOpacity activeOpacity={0.7}>
            <Image source={imagePath.icShare} style={styles.dotStyle} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }, []);

  const listEmtComp = () => {
    return (
      <View style={{alignItems: 'center', marginTop: moderateScale(24)}}>
        <TextComp
          text="No data found"
          style={{
            ...styles.noDataFound,
            color: selectedTheme == 'dark' ? colors.white : colors.black,
          }}
        />
      </View>
    );
  };

  return (
    <WrapperContainer>
      <View style={{flex: 1, padding: moderateScale(8)}}>
        <FlashList
          data={posts}
          renderItem={renderItem}
          estimatedItemSize={200}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => (
            <View style={{height: moderateScale(10)}} />
          )}
          ListEmptyComponent={listEmtComp}
        />
      </View>
    </WrapperContainer>
  );
};

export default Home;
