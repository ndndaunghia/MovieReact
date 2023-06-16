import { createAction, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useParams } from "react-router-dom";
import { call, put, takeLatest } from "redux-saga/effects";

export const getMovieDetailAsync = createAction('movieDetail/getMovieDetailAsync');


function* getMovieDetailSaga(action) {
    const data = yield call(() => axios.get(`https://api.themoviedb.org/3/movie/${action.payload.id}?language=vi-VN&page=1&api_key=5e3c1f5bb51ccfa7e8cd50dd4d33f967`), action.payload);

    yield put(getMovieDetail(data?.data));
}

export function* watchGetMovieDetail() {
    yield takeLatest(getMovieDetailAsync, getMovieDetailSaga);
}

const movieDetailSlice = createSlice({
    name: 'movieDetail',
    initialState: {
        movieDetail: [],
        loading: false
    },
    reducers: {
        getMovieDetail: (state, action) => {
            state.movieDetail = action.payload;
        }
    }
});

const movieDetailReducer = movieDetailSlice.reducer;
export const {getMovieDetail} = movieDetailSlice.actions;
export default movieDetailReducer;