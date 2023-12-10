import AsyncStorage from '@react-native-async-storage/async-storage';
import FlashMessage ,{showMessage}  from 'react-native-flash-message';
export const storeData = async (key, value) => {
  try {
    var jsonvValue = value;
    if (typeof (value) !== 'string') {
      jsonvValue = JSON.stringify(value);
    }
    await AsyncStorage.setItem(key, jsonvValue);
  } catch (e) {
    alert('Value not saved');
    return e;
  }
};

export const getData = async key => {
  try {
    const res = await AsyncStorage.getItem(key);
    return res != null
      ? typeof (res) !== 'string'
        ? JSON.parse(res)
        : res
      : null;
  } catch (e) {
    return e;
  }
};

export const showError =(message)=>{
    showMessage({
      type:'danger',
      icon:'danger',
      message,
      duration:2500
    })
}

export const showSuccess =(message)=>{
  showMessage({
    type:'success',
    icon:'success',
    message,
    duration:2500
  })
}
