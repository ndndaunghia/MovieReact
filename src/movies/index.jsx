import { createSlice, createAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {API_TOP_RATED } from "../API";

export const getTopRatedAsync = createAction('topRated/getTopRatedAsync');

function* getTopRatedSaga(action) {
  const data = yield call(() => axios.get(API_TOP_RATED, action.payload));
  yield put(getTopRated(data?.data));
}

export function* watchGetTopRatedSaga() {
  yield takeLatest(getTopRatedAsync, getTopRatedSaga);
}

const topRatedSlice = createSlice({
  name: 'topRated',
  initialState: {
    topRated: [],
    loading: false,
  },
  reducers: {
    getTopRated: (state, action) => {
      state.topRated = action.payload.results;
      // console.log(action.payload);
    }
  }
});


const topRatedReducer = topRatedSlice.reducer;
export const {getTopRated} = topRatedSlice.actions;
export default topRatedReducer;

