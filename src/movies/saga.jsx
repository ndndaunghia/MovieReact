import { all } from "redux-saga/effects";
import { watchGetTopRatedSaga } from ".";
import { watchGetPopularSaga } from "./popular";
import { watchGetNowPlaydingSaga } from "./nowplaying";
import { watchGetUpComingSaga } from "./upcoming";
import { watchGetMovieDetail } from "./moviedetail";
import { watchAddToFavoriteSaga, watchGetFavoriteSaga, watchRemoveFavoriteSaga } from "./favorite";
import { watchGetSearchSaga } from "./search";



export default function* rootSaga() {
    yield all([watchGetTopRatedSaga(), watchGetPopularSaga(), 
        watchGetNowPlaydingSaga(), watchGetUpComingSaga(), 
        watchGetMovieDetail(), watchGetFavoriteSaga(), 
        watchAddToFavoriteSaga(), watchRemoveFavoriteSaga(),
        watchGetSearchSaga()
    ]);
}