export const API_BASE_URL = "http://10.0.2.2:3000"

export const getApiURL = (endpoint) => API_BASE_URL + endpoint

export const SIGNUP_API = getApiURL('/signup');
export const LOGIN_API = getApiURL('/login');
export const VERIFY_OTP = getApiURL('/verifyOTP');
export const CREATE_POST = getApiURL('/createPost');
export const ALL_POSTS = getApiURL('/allPosts');
export const FILE_UPLOAD = getApiURL('/fileUpload');