import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Alert,
  Modal,
  SafeAreaView,
  TouchableWithoutFeedback,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';
import WrapperContainer from '../../Components/WrapperContainer';
import HeaderComp from '../../Components/HeaderComp';
import {
  height,
  moderateScale,
  moderateScaleVertical,
  width,
} from '../../styles/responsiveSize';
import colors from '../../styles/colors';
import imagePath from '../../constants/imagePath';
import ImagePicker from 'react-native-image-crop-picker';
import strings from '../../constants/lang';
import MultiTextInput from '../../Components/MultiTextInput';
import ButtonComp from '../../Components/ButtonComp';
import actions from '../../redux/actions';
import {useSelector} from 'react-redux';
import navigationStrings from '../../Navigations/navigationStrings';

const AddPost = ({navigation, route}) => {
  const {userData} = useSelector(state => state?.auth || {});
  const [images, setImages] = useState(route?.params?.selectedImage || []);
  const [pickerModalVisible, setPickerModalVisible] = useState(false);
  const [text, setText] = useState('');
    // console.log('route+++', route?.params?.selectedImage);

  const onAdd = () => {
    if (images.length > 4) {
      alert('You can add only 4 images');
      return;
    }
    // Alert.alert(
    //     'Upload Image',
    //     'Choose an option',
    //     [
    //         {text:'Camera',onPress:()=>openCamera()},
    //         {text:'Camera',onPress:()=>openGallery()},
    //         {text:'Camera',onPress:{}},
    //     ]
    // )
    setPickerModalVisible(!pickerModalVisible);
  };

  const onPressOpenCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      // cropping: true,
    })
      .then(image => {
        // navigation.navigate(navigationStrings.ADD_POST, {selectedImage:[{image:image}]});
        // console.log(image);
        setImages(prev => [...prev, ...[{image: image}]]);
        setPickerModalVisible(!pickerModalVisible);
      })
      .catch(err => {
        console.log('error raised in open camera', err);
      });
  };

  const openGallery = async () => {
    try {
      const image = await ImagePicker.openPicker({mediaType: 'photo'});
      console.log('image+++', image);
      setImages(prev => [...prev, ...[{image: image}]]);
      setPickerModalVisible(!pickerModalVisible);
    } catch (error) {
      console.log('error+++++', error);
    }
  };

  const removeImage = index => {
    let cloneImages = [...images];
    cloneImages.splice(index, 1);
    setImages(cloneImages);
  };

  const onSave = async () => {
    if (images.length == 0) {
      alert('Please upload at least one image');
    }

    const formData = new FormData();
    formData.append('userId', userData?._id);
    formData.append('description', text);

    console.log('userId', userData?._id);
    // return;

    images.forEach((val, i) => {
      formData.append('file', {
        uri: val?.image?.uri || val?.image?.path,
        type: 'images/png',
        name: val.image.filename,
      });
      console.log("images in form data",val?.image?.uri || val?.image?.path,);
    });
    // return;
    console.log('formDataformData', formData);
    
    
    try {
      const res = await actions.createPost(formData);

      console.log('api res+++++', res);
      Alert.alert('SUCCESS', 'Post created successfull..!!', [
        {text: 'OK', onPress: () => navigation.navigate(navigationStrings.HOME)},
      ]);
      // navigation.navigate(navigationStrings.HOME);
    } catch (error) {
      console.log('error raised', error);
    }
  };

  const renderItem = (item, index) => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        // onPress={() => onSelect(item, index)}
        style={{marginRight: moderateScale(16)}}>
        <Image
          source={{uri: item?.image?.uri || item?.image?.path}}
          style={styles.imgStyle}
        />

        <Pressable
          style={styles.icCrossStyle}
          onPress={() => removeImage(index)}>
          <Image source={imagePath.icCross} style={styles.icCrossStyle} />
        </Pressable>
      </TouchableOpacity>
    );
  };

  return (
    <WrapperContainer>
      <HeaderComp leftText={strings.CREATE_POST} />
      <View style={styles.container}>
        <View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{overflow: 'visible'}}>
            {images.length > 0
              ? images.map((val, i) => {
                  return renderItem(val, i);
                })
              : null}
            <TouchableOpacity
              style={styles.addBtnStyle}
              onPress={() => onAdd()}>
              <Image
                source={imagePath.icAdd}
                style={{tintColor: colors.white}}
              />
            </TouchableOpacity>
          </ScrollView>
          <MultiTextInput
            value={text}
            placeholder={strings.DESCRIPTION}
            onChangeText={value => setText(value)}
            multiline={true}
            inputStyle={{marginTop: moderateScaleVertical(16)}}
          />
        </View>
        <ButtonComp text={strings.SAVE} onPress={() => onSave()} />
      </View>
      <Modal
        // animationType="slide"
        transparent={true}
        visible={pickerModalVisible}>
        <SafeAreaView style={styles.flexOneSafe}>
          <View style={styles.flexOne}>
            <TouchableWithoutFeedback
              onPress={() => setPickerModalVisible(!pickerModalVisible)}>
              <View style={styles.flexOne} />
            </TouchableWithoutFeedback>

            <View style={styles.mainView}>
              <View style={styles.viewContainer}>
                <View style={styles.textViewImagePicker}>
                  <TouchableOpacity
                    onPress={() => {
                      onPressOpenCamera();
                    }}
                    style={styles.imagePickerViewText}
                    activeOpacity={0.5}>
                    <Text style={styles.pickerTextCamera}>From Camera</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      openGallery();
                    }}
                    style={styles.imagePickerViewTextGallery}
                    activeOpacity={0.5}>
                    <Text style={styles.pickerTextCamera}>From Gallery</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity
                style={styles.cancelButton}
                activeOpacity={0.8}
                onPress={() => setPickerModalVisible(!pickerModalVisible)}>
                <Text style={styles.pickerCamera}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    </WrapperContainer>
  );
};

export default AddPost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: moderateScale(16),
    justifyContent: 'space-between',
  },
  imgStyle: {
    height: width / 5.3,
    width: width / 5.3,
    borderRadius: moderateScale(8),
  },
  addBtnStyle: {
    height: width / 5.3,
    width: width / 5.3,
    borderRadius: moderateScale(8),
    backgroundColor: colors.grayColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icCrossStyle: {
    width: moderateScale(18),
    height: moderateScale(18),
    tintColor: colors.redColor,
    position: 'absolute',
    right: -4,
    top: -1,
  },
  //---------->Model CSS<----------
  flexOneSafe: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  flexOne: {
    flex: 1,
  },
  mainView: {
    maxHeight: 160,
    borderRadius: 10,
    marginBottom: height / 2.5,
    marginHorizontal: 20,
    zIndex: 999,
  },
  viewContainer: {
    borderRadius: 10,
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 100,
    // position:'absolute'
  },
  textViewImagePicker: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 21,
    width: '100%',
  },
  imagePickerViewText: {
    borderBottomWidth: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    borderColor: 'lightgrey',
  },
  imagePickerViewTextGallery: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    borderColor: 'lightgrey',
  },

  pickerTextCamera: {
    textAlignVertical: 'center',
    fontSize: 16,
    color: '#fff',
    fontWeight: '800',
  },
  pickerCamera: {
    textAlignVertical: 'center',
    fontSize: 16,
    color: '#000',
    fontWeight: '800',
  },
  cancelButton: {
    marginVertical: 10,
    backgroundColor: 'lightgrey',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 20,
  },
});
