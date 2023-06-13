import { createSlice, createAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {API_POPULAR } from "../API";

export const getPopularAsync = createAction('popular/getPopularAsync');

function* getPopularSaga(action) {
  const data = yield call(() => axios.get(API_POPULAR, action.payload));
  yield put(getPopular(data?.data));
}

export function* watchGetPopularSaga() {
  yield takeLatest(getPopularAsync, getPopularSaga);
}

const popularSlice = createSlice({
  name: 'popular',
  initialState: {
    popular: [],
    loading: false,
  },
  reducers: {
    getPopular: (state, action) => {
      state.popular = action.payload.results;
      // console.log(action.payload);
    }
  }
});


const popularReducer = popularSlice.reducer;
export const {getPopular} = popularSlice.actions;
export default popularReducer;

