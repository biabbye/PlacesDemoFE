import { configureStore } from '@reduxjs/toolkit'

import userProfileReducer from './Reducers/UserProfileReducers'

export const store = configureStore({reducer: {
       userProfileReducer,
    }
});

