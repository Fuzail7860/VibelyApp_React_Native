import {
  StyleSheet,
  Text,
  View,
  PermissionsAndroid,
  Platform,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import WrapperContainer from '../../Components/WrapperContainer';
import HeaderComp from '../../Components/HeaderComp';
import strings from '../../constants/lang';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import ButtonComp from '../../Components/ButtonComp';
import {FlashList} from '@shopify/flash-list';
import {moderateScale, width} from '../../styles/responsiveSize';
import colors from '../../styles/colors';
import imagePath from '../../constants/imagePath';
import navigationStrings from '../../Navigations/navigationStrings';
import ImagePicker from 'react-native-image-crop-picker';
import actions from '../../redux/actions';

const CreatePost = ({navigation}) => {
  const [photos, setPhotos] = useState([]);
  const [selectedImage, setSelectedImage] = useState([]);
  const [currentImage, setCurrentImage] = useState({});

  async function hasAndroidPermission() {
    const getCheckPermissionPromise = () => {
      if (Platform.Version >= 33) {
        return Promise.all([
          PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          ),
          PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
          ),
        ]).then(
          ([hasReadMediaImagesPermission, hasReadMediaVideoPermission]) =>
            hasReadMediaImagesPermission && hasReadMediaVideoPermission,
        );
      } else {
        return PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        );
      }
    };

    const hasPermission = await getCheckPermissionPromise();
    if (hasPermission) {
      return true;
    }
    const getRequestPermissionPromise = () => {
      if (Platform.Version >= 33) {
        return PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
        ]).then(
          statuses =>
            statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES] ===
              PermissionsAndroid.RESULTS.GRANTED &&
            statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO] ===
              PermissionsAndroid.RESULTS.GRANTED,
        );
      } else {
        return PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        ).then(status => status === PermissionsAndroid.RESULTS.GRANTED);
      }
    };

    return await getRequestPermissionPromise();
  }

  async function savePicture() {
    if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
      return;
    }
    try {
      let res = await CameraRoll.getPhotos({first: 50, assetType: 'Photos'});
      const result = res.edges.map((val, i) => val.node).reverse();
      setCurrentImage(result[0]);
      setPhotos(result);
    } catch (error) {
      console.log('error raised', error);
    }
  }

  // console.log('photos++++222', photos);

  useEffect(() => {
    savePicture();
  }, []);

  const onSelect = (item, index) => {
    let clonePhotos = [...photos];
    clonePhotos[index].isSelected = !item.isSelected;
    setPhotos(clonePhotos);
    setCurrentImage(item);
    let cloneSelectImg = [...selectedImage];
    const indexItem = cloneSelectImg.findIndex(
      val => val.timestamp === item?.timestamp,
    );
    // console.log(indexItem);
    if (indexItem === -1) {
      setSelectedImage(prev => [...prev, ...[item]]);
    } else {
      cloneSelectImg.splice(indexItem, 1);
      setSelectedImage(cloneSelectImg);
    }
  };

  const onNext = () => {
    if (selectedImage.length >= 4) {
      alert('You can add only 4 images');
      return;
    }
    // let singleImage = selectedImage[0]
    // console.log("singleImage",singleImage);
    navigation.navigate(navigationStrings.ADD_POST, {selectedImage});
    // console.log("selected Images",selectedImage);
    

    // formData.append('file',{
    //   uri:singleImage.image.uri,
    //   type:singleImage.image.extension,
    //   name:singleImage.image.filename
    // })
 
    // // console.log("form data",formData);
    // actions.fileUpload(formData).then((res)=>{
    //   console.log("file uploaded successfully...!!!");
    // }).catch((err)=>{
    //   console.log("error",err);
    // })
  };

  const onPressOpenCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      // cropping: true,
    })
      .then(image => {
        // setSelectedImage(image.path)
        navigation.navigate(navigationStrings.ADD_POST, {selectedImage:[{image:image}]});
        console.log("select from camera",image.path);
      })
      .catch(err => {
        console.log('error raised in open camera', err);
      });
  };

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => onSelect(item, index)}>
        <Image source={{uri: item?.image?.uri}} style={styles.imgStyle} />
        {!!item?.isSelected ? (
          <Image source={imagePath.icCheckFill} style={styles.icCheckStyle} />
        ) : null}
      </TouchableOpacity>
    );
  };

  const listHeaderComponent = () => {
    return (
      <View style={{marginBottom: moderateScale(16)}}>
        {!!currentImage?.image && currentImage?.image?.uri ? (
          <Image
            source={{uri: currentImage.image.uri}}
            style={styles.parentImage}
          />
        ) : null}
      </View>
    );
  };

  return (
    <WrapperContainer>
      <HeaderComp
        leftText={strings.ADD_POST}
        isLeftImage={false}
        rightText={strings.NEXT}
        rightTextStyle={{color: colors.blueColor}}
        onPressRight={onNext}
      />

      <View style={{flex: 1}}>
        <FlashList
          numColumns={4}
          data={photos}
          renderItem={renderItem}
          ListHeaderComponent={listHeaderComponent}
          estimatedItemSize={moderateScale(80)}
          keyExtractor={(item, index) => String(item?.image?.uri || index)}
        />
        <TouchableOpacity
          style={styles.cameraBtn}
          onPress={() => onPressOpenCamera()}>
          <Image
            source={imagePath.icCamera}
            style={styles.icCameraStyle}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </WrapperContainer>
  );
};

export default CreatePost;

const styles = StyleSheet.create({
  imgStyle: {
    height: width / 4,
    width: width / 4,
    borderWidth: 1,
    borderColor: colors.black,
  },
  parentImage: {
    width: '100%',
    height: moderateScale(200),
  },
  icCheckStyle: {
    width: moderateScale(20),
    height: moderateScale(20),
    tintColor: colors.redColor,
    position: 'absolute',
    right: 5,
    top: 5,
  },
  icCameraStyle: {
    height: moderateScale(22),
    width: moderateScale(22),
    tintColor: colors.white,
  },
  cameraBtn: {
    height: moderateScale(60),
    width: moderateScale(60),
    borderRadius: moderateScale(30),
    backgroundColor: colors.redColor,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 40,
    right: 20,
  },
});
