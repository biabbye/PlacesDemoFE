import { GET_USER_PROFILES,GET_USER_PROFILE_BY_PHONE,POST_USER_PROFILE } from "../Actions/UserProfileActions";

const initialState = {
    userProfile: [],
};

function userProfileReducer(state=initialState,action)
{
    switch (action.type) {
        case GET_USER_PROFILES:
          return {...state, userProfile: action.payload};
        case GET_USER_PROFILE_BY_PHONE:
            return {...state, 
                userProfile: state.userProfile.filter(userProfile => userProfile.phoneNumber == action.payload.phoneNumber)};
        case POST_USER_PROFILE:
            return {...state, userProfile: [...state.userProfile, action.payload]};
        default:
          return state; 
    }
}

export default userProfileReducer;