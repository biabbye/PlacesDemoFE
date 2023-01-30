export const GET_USER_PROFILES = "GET_USER_PROFILES";
export const GET_USER_PROFILE_BY_PHONE = "GET_USER_PROFILE_BY_PHONE";
export const POST_USER_PROFILE = "POST_USER_PROFILE";

import axios from "axios";

const BASE_URL = 'http://10.158.5.58:7071';

export const getUserProfiles = () => {
    try {
      return async dispatch => {
        // const res = await axios.get(`${BASE_URL}/api/UserProfile`);
        const res = await axios.get('http://10.158.5.58:7071/api/UserProfile',
        {
            timeout:2000
        });
        console.log(`${BASE_URL}/api/UserProfile`);
        if (res.data) {
          dispatch({
            type: GET_USER_PROFILES,
            payload: res.data,
          });
        } else {
          console.log('Unable to fetch');
        }
      };
    } catch (error) {
      console.log(error);
    }
  };

  export const getUserProfileByPhone = (phoneNumber) => {
    try {
      return async dispatch => {
        const res = await axios.get(`${BASE_URL}/api/UserProfile/${phoneNumber}`);
        if (res.data) {
          dispatch({
            type: GET_USER_PROFILE_BY_PHONE,
            payload: res.data,
          });
        } else {
          console.log('Unable to fetch');
        }
      };
    } catch (error) {
      console.log(error);
    }
  };

  export const postUserProfile = () => {
    try {
      return async dispatch => {
        const res = await axios.post(`${BASE_URL}/api/UserProfile`);
        if (res.data) {
          dispatch({
            type: POST_USER_PROFILE,
            payload: res.data,
          });
        } else {
          console.log('Unable to fetch');
        }
      };
    } catch (error) {
      console.log(error);
    }
  };