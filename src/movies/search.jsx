import { createAction, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import { API_KEY } from "../API";


export const getSearchAsync = createAction('search/getSearchAsync');

function* getSearchSaga(action) {
  try {
    const query = action.payload;
    const res = yield call(() => axios.get(`https://api.themoviedb.org/3/search/movie?&${API_KEY}&language=vi-VN&query=${query}&page=1`));
    const movies = res.data.results;
    yield put(getSearch(movies));
  } catch (error) {
    console.log(error);
  }
}

export function* watchGetSearchSaga() {
  yield takeLatest(getSearchAsync, getSearchSaga);
}

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    search: [], 
    loading: false
  },
  reducers: {
    getSearch: (state, action) => {
      state.search = action.payload
    }
  }
})

const searchReducer = searchSlice.reducer;
export const {getSearch} = searchSlice.actions;
export default searchReducer;