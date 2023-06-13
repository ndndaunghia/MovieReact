import { createAction, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_NOWPLAYING } from "../API";
import { call, put, takeLatest } from "redux-saga/effects";


export const getNowPlayingAsync = createAction('nowPlaying/getNowPlayingAsync');

function* getNowPlayingSaga(action) {
    const data = yield call(() => axios.get(API_NOWPLAYING, action.payload));
    yield put(getNowPlaying(data?.data));
}

export function* watchGetNowPlaydingSaga() {
    yield takeLatest(getNowPlayingAsync, getNowPlayingSaga);
}

const nowPlayingSlice = createSlice({
    name: 'nowPlaying',
    initialState: {
        nowPlaying: [],
        loading: false
    },
    reducers: {
        getNowPlaying: (state, action) => {
            state.nowPlaying = action.payload.results;
        }
    }
});

const nowPlayingReducer = nowPlayingSlice.reducer;
export const {getNowPlaying} = nowPlayingSlice.actions;
export default nowPlayingReducer;