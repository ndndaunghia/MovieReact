import { createAction } from "@reduxjs/toolkit";
import { call } from "redux-saga/effects";


export const getFavoriteAsync = createAction('favorite/getFavoriteAsync');

function* getFavoriteSaga(action) {
    // const data = yield call(() => ax)
}