import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import createSagaMiddleware from 'redux-saga';
import rootSaga from './saga';
import authReducer from '../redux/slices/authSlice';
import categoriesReducer from '../redux/slices/categoriesSlice'
import videosReducer from '../redux/slices/videosSlice'
import usersReducer from '../redux/slices/userSlice';

let sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

export const store = configureStore({
    reducer: {
        auth: authReducer,
        categories: categoriesReducer,
        videos: videosReducer,
        users: usersReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware)
});

sagaMiddleware.run(rootSaga);