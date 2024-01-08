import { createSlice, createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import {useContext } from 'react';
import axios from 'axios';
import { config } from "../../urlConfig";
import { useDispatch, useSelector } from 'react-redux';

const initialState = {
    loggedUser: [],
    userProfile:[],
    userLocation:[],
    otherUserProfiles:[],
    otherUserLocation:[],
    userConnections:[],
    eventsData:[],
    locationById:[],
    connectionExists: null,
}

export const fetchLoggedInUser = createAsyncThunk("api/fetchLoggedInUser",
    async (phoneNumber) => {
      
        const loggedUserData = await axios.get(`${config.BASE_URL}/api/UserProfile/GetUserProfileByPhone/${phoneNumber}`);
        console.log(loggedUserData.data);
        return loggedUserData?.data; 
    }
);

export const fetchUserProfile = createAsyncThunk("api/fetchUserProfile",
    async (id) => {
      
        const response = await axios.get(`${config.BASE_URL}/api/UserProfile/${id}`);
        console.log(response.data);
        return response?.data; 
    }
);

export const fetchLocationOfUser = createAsyncThunk("api/fetchLocationOfUser",
    async (id) => {
        
        
        const response = await axios.get(`${config.BASE_URL}/api/Location/GetLocationOfAUser/userProfiles/${id}`);
        console.log(response.data);
        return response?.data;
    
        
    }
); 

export const fetchOtherUserLocation = createAsyncThunk("api/fetchOtherUserLocation",
    async(id) => {
        
    
        const response = await axios.get(`${config.BASE_URL}/api/Location/${id}`);
        console.log(response.data);
        return response?.data;
        
    }
)

export const fetchOtherUserProfiles = createAsyncThunk("api/fetchOtherUserProfiles",
    async (id) => {
        
        const response = await axios.get(`${config.BASE_URL}/api/Location/GetOtherUserProfiles/${id}`);
        console.log(response.data);
        return response?.data;
    
        
    }
);

export const fetchExistsConnection = createAsyncThunk("api/fetchExistsConnection",
    async(userData) => {
        console.log("FETCH EXIST CONNECTION", userData.senderId,userData.receiverId);
        const response = await axios.get(`${config.BASE_URL}/api/Connection/CheckConnectionBetweenUsers?senderId=${userData.senderId}&receiverId=${userData.receiverId}`);
        console.log(response.data);
        return response?.data;
    });

export const fetchUserConnections = createAsyncThunk("api/fetchUserConnections",
    async(id) => {
        const response = await axios.get(`${config.BASE_URL}/api/Connection/GetConnectionOfAUser/${id}`);
        console.log(response.data);
        return response?.data;
})

export const fetchEvents = createAsyncThunk("api/fetchEvents",
    async() => {
        const response = await axios.get(`${config.BASE_URL}/api/Event`);
        console.log(response.data);
        return response?.data;
})

export const fetchLocationById = createAsyncThunk("api/fetchLocationById",
    async(eventLocationId) => {
        const response = await axios.get(`${config.BASE_URL}/api/Location/${eventLocationId}`);
        console.log(response.data);
        return response?.data;
    })


export const apiSlice = createSlice({
    name:"api",
    initialState,
    reducers:{
    }, 
    extraReducers: (builder) => {
        builder.addCase(fetchLoggedInUser.pending, (state,action)=> {
            console.log("Pending..");
        })
        .addCase(fetchLoggedInUser.fulfilled,(state,action) => {
            console.log("Fetched Successfully", action.payload);
            return { ...state, loggedUser: action.payload};

        })
        .addCase(fetchLoggedInUser.rejected,(state,action)=>{
            console.log("Rejected", action.payload);
        })
        .addCase(fetchUserProfile.pending, (state,action)=> {
            console.log("Pending..");
        })
        .addCase(fetchUserProfile.fulfilled,(state,action) => {
            console.log("Fetched Successfully", action.payload);
            return { ...state, userProfile: action.payload};

        })
        .addCase(fetchUserProfile.rejected,(state,action)=>{
            console.log("Rejected", action.payload);
        })
        .addCase(fetchLocationOfUser.pending, (state,action)=> {
            console.log("Pending..");
        })
        .addCase(fetchLocationOfUser.fulfilled,(state,action) => {
            console.log("Fetched Successfully", action.payload);
            return { ...state, userLocation: action.payload };

        })
        .addCase(fetchLocationOfUser.rejected,(state,action)=>{
            console.log("Rejected", action.payload);
        })
        .addCase(fetchOtherUserProfiles.pending, (state,action)=> {
            console.log("Pending..");
        })
        .addCase(fetchOtherUserProfiles.fulfilled,(state,action) => {
            console.log("Fetched Successfully", action.payload);
            return { ...state, otherUserProfiles: action.payload };

        })
        .addCase(fetchOtherUserProfiles.rejected,(state,action)=>{
            console.log("Rejected", action.payload);
        })
        .addCase(fetchOtherUserLocation.pending, (state,action)=> {
            console.log("Pending..");
        })
        .addCase(fetchOtherUserLocation.fulfilled,(state,action) => {
            console.log("Fetched Successfully", action.payload);
            return { ...state, otherUserLocation: action.payload };

        })
        .addCase(fetchOtherUserLocation.rejected,(state,action)=>{
            console.log("Rejected", action.payload);
        })
        .addCase(fetchExistsConnection.pending, (state,action)=> {
            console.log("Pending..");
        })
        .addCase(fetchExistsConnection.fulfilled,(state,action) => {
            console.log("Fetched Successfully", action.payload);
            return { ...state, connectionExists: action.payload };

        })
        .addCase(fetchExistsConnection.rejected,(state,action)=>{
            console.log("Rejected", action.error.message);
        })
        .addCase(fetchUserConnections.pending, (state,action)=> {
            console.log("Pending..");
        })
        .addCase(fetchUserConnections.fulfilled,(state,action) => {
            console.log("Fetched Successfully", action.payload);
            return { ...state, userConnections: action.payload };

        })
        .addCase(fetchUserConnections.rejected,(state,action)=>{
            console.log("Rejected", action.error.message);
        })
        .addCase(fetchEvents.pending, (state,action)=> {
            console.log("Pending..");
        })
        .addCase(fetchEvents.fulfilled,(state,action) => {
            console.log("Fetched Successfully", action.payload);
            return { ...state, eventsData: action.payload };

        })
        .addCase(fetchEvents.rejected,(state,action)=>{
            console.log("Rejected", action.error.message);
        })
        .addCase(fetchLocationById.pending, (state,action)=> {
            console.log("Pending..");
        })
        .addCase(fetchLocationById.fulfilled,(state,action) => {
            console.log("Fetched Successfully", action.payload);
            return { ...state, locationById: action.payload };

        })
        .addCase(fetchLocationById.rejected,(state,action)=>{
            console.log("Rejected", action.error.message);
        })
    }
    
})

// export const fetchData = () => async ({getState,dispatch,phoneNumber}) => {
    
//     dispatch = useDispatch();
//     await dispatch(fetchLoggedInUser(phoneNumber))

//     const state = getState().api;
//     if (state.loggedUser) {
//       await dispatch(fetchLocationOfUser(state.loggedUser.id))
//       await dispatch(fetchOtherUserProfiles(state.loggedUser.id))
//       await dispatch(fetchOtherUserLocation(state.otherUserProfiles.map((user)=>user.id)))
//     }
//   }
  


// Define Thunk Action Creators
// export const { getLoggedInUser, getLocationOfUser, setError, setLoggedUserPhoneNumber } = apiSlice.actions;
// export const getLoggedUser = (state) => state.api.loggedUser;
// export const getUserLocation  = (state) => state.api.userLocation;
export default apiSlice.reducer;