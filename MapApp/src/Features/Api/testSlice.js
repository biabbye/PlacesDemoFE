import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchLoggedUser, fetchLoggedUserLocation, fetchOtherUsers, fetchOtherUsersLocations } from './api'

const fetchLoggedUserLocationIfNeeded = createAsyncThunk('api/fetchLoggedUserLocationIfNeeded', async (_, { getState }) => {
  const state = state.api

  if (!state.loggedUser) {
    return null
  }

  if (state.loggedUserLocation) {
    return state.loggedUserLocation
  }

  const response = await fetchLoggedUserLocation(state.loggedUser.id)
  return response.data
})

const fetchOtherUsersIfNeeded = createAsyncThunk('api/fetchOtherUsersIfNeeded', async (_, { getState }) => {
  const state = state.api

  if (!state.loggedUser) {
    return null
  }

  if (state.otherUsers) {
    return state.otherUsers
  }

  const response = await fetchOtherUsers(state.loggedUser.id)
  return response.data
})

const fetchOtherUsersLocationsIfNeeded = createAsyncThunk('api/fetchOtherUsersLocationsIfNeeded', async (_, { getState }) => {
  const state = state.api

  if (!state.otherUsers) {
    return null
  }

  if (state.otherUsersLocations) {
    return state.otherUsersLocations
  }

  const response = await fetchOtherUsersLocations(state.otherUsers.map((user) => user.id))
  return response.data
})

const apiSlice = createSlice({
  name: 'api',
  initialState: {
    loggedUser: null,
    loggedUserLocation: null,
    otherUsers: null,
    otherUsersLocations: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoggedUser.fulfilled, (state, action) => {
        state.loggedUser = action.payload
      })
      .addCase(fetchLoggedUserLocationIfNeeded.fulfilled, (state, action) => {
        state.loggedUserLocation = action.payload
      })
      .addCase(fetchOtherUsersIfNeeded.fulfilled, (state, action) => {
        state.otherUsers = action.payload
      })
      .addCase(fetchOtherUsersLocationsIfNeeded.fulfilled, (state, action) => {
        state.otherUsersLocations = action.payload
      })
  },
})

export const fetchData = () => async (dispatch) => {
  await dispatch(fetchLoggedUser())

  const state = state.api

  if (state.loggedUser) {
    await dispatch(fetchLoggedUserLocationIfNeeded())
    await dispatch(fetchOtherUsersIfNeeded())
    await dispatch(fetchOtherUsersLocationsIfNeeded())
  }
}
