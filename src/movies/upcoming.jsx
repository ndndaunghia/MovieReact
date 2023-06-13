import { createAction, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import { API_UPCOMING } from "../API";


export const getUpComingAsync = createAction('upComing/getUpComingAsync');

function* getUpComingSaga(action) {
    const data = yield call(() => axios.get(API_UPCOMING, action.payload));

    yield put(getUpComing(data?.data));
}

export function* watchGetUpComingSaga() {
    yield takeLatest(getUpComingAsync, getUpComingSaga);
}

const upComingSlice = createSlice({
    name: 'upComing',
    initialState: {
        upComing: [],
        loading: false
    },
    reducers: {
        getUpComing: (state, action) => {
            state.upComing = action.payload.results;
        }
    }
});

const upComingReducer = upComingSlice.reducer;
export const {getUpComing} = upComingSlice.actions;

export default upComingReducer;