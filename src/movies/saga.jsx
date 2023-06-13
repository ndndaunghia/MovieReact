import { all } from "redux-saga/effects";
import { watchGetTopRatedSaga } from ".";
import { watchGetPopularSaga } from "./popular";
import { watchGetNowPlaydingSaga } from "./nowplaying";
import { watchGetUpComingSaga } from "./upcoming";


export default function* rootSaga() {
    yield all([watchGetTopRatedSaga(), watchGetPopularSaga(), watchGetNowPlaydingSaga(), watchGetUpComingSaga()]);
}