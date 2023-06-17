import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import createSagaMiddleware from 'redux-saga';
import rootSaga from './saga';
import topRatedReducer from ".";
import popularReducer from "./popular";
import nowPlayingReducer from "./nowplaying";
import upComingReducer from "./upcoming";
import movieDetailReducer from "./moviedetail";
import favoriteReducer from "./favorite";

let sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

export const store = configureStore({
    reducer: {
        topRated: topRatedReducer,
        popular: popularReducer,
        nowPlaying: nowPlayingReducer,
        upComing: upComingReducer,
        movieDetail: movieDetailReducer,
        favorite: favoriteReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware)
});

sagaMiddleware.run(rootSaga);