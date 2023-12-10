import {ALL_POSTS, CREATE_POST} from '../../config/urls';
import {apiGet, apiPost} from '../../utils/utils';
import store from '../store';

const {dispatch} = store;

export const createPost = (data) => {
  return apiPost(CREATE_POST,data)
};

export const getAllPosts = (query="") => {
    return apiGet(ALL_POSTS)
};

