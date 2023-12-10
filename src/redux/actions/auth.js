import AsyncStorage from '@react-native-async-storage/async-storage';
import {FILE_UPLOAD, LOGIN_API, SIGNUP_API, VERIFY_OTP} from '../../config/urls';
import {storeData} from '../../utils/helpherFunctions';
import {apiPost} from '../../utils/utils';
import {saveUserData} from '../reducers/auth';
import store from '../store';
import types from '../types';

const {dispatch} = store;

export const userLogin = data => {
  return new Promise((resolve, reject) => {
    apiPost(LOGIN_API, data)
      .then(res => {
        // console.log('get res+++', res);
        if (!!res?.data && !!res?.data?.validOTP) {
          storeData('userData', res.data)
            .then(value => {
              resolve(res);
              dispatch(saveUserData(res.data));
              // console.log("data saved in async");
            })
            .catch(err => {
              reject(err);
            });
          // console.log("token auth+++",res?.data?.token);
          // AsyncStorage.setItem('token', JSON.stringify(res?.data?.token));
        } else {
          resolve(res);
        }
      })
      .catch(error => {
        reject(error);
      });
  });
  // dispatch(saveUserData(data));
};

export const otpVerify = (data, token = null) => {
  return new Promise((resolve, reject) => {
    apiPost(VERIFY_OTP, data)
      .then(res => {
        if (!!res?.data) {
          let addToken = {...res.data,token}
          storeData('userData', addToken)
            .then(value => { 
              dispatch(saveUserData(addToken));
              resolve(res);
            })
            .catch(err => {
              reject(err);
            });
        } else {
          resolve(res);
        }
      })
      .catch(error => {
        reject(error);
      });
  });
  // dispatch(saveUserData(data));
};

export const userSignup = data => {
  return apiPost(SIGNUP_API, data);
};

export const fileUpload = data => {
  return apiPost(FILE_UPLOAD, data);
};

export const login = data => {
  dispatch(saveUserData(data));
};

export function logout() {
  dispatch({type: types.CLEAR_REDUX_STATE});
}
