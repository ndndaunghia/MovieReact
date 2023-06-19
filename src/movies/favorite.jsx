import { createAction, createSlice } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import { get, getDatabase, ref, remove, set } from "firebase/database";

export const getFavoriteAsync = createAction("favorite/getFavoriteAsync");
export const addToFavoriteAsync = createAction("favorite/addToFavoriteAsync");
export const removeFavoriteAsync = createAction("favorite/removeFavoriteAsync");


function* getFavoriteSaga(action) {
  try {
    const userId = localStorage.getItem("uid");
    const database = getDatabase();
    const favoriteRef = ref(database, `${userId}/list`);
    const snapshot = yield call(get, favoriteRef);
    if (snapshot.exists()) {
      const favoriteData = snapshot.val();
      const favoriteMovies = Object.values(favoriteData);
      yield put(getFavorite(favoriteMovies));
    } else {
      yield put(getFavorite([]));
    }
  } catch (error) {
    console.log(error);
  }
}

function* removeFavoriteSaga(action) {
  try {
    const userId = localStorage.getItem("uid");
    const movieId = action.payload;
    const database = getDatabase();
    const favoriteRef = ref(database, `${userId}/list/${movieId}`);
    yield call(remove, favoriteRef);
    yield put(removeFavorite(movieId));
  } catch (error) {
    console.log(error);
  }
}


function* addToFavoriteSaga(action) {
  const movieData = {
    id: action.payload.movieDetail.id,
    title: action.payload.movieDetail.title,
    poster_path: action.payload.movieDetail.poster_path,
    vote_average: action.payload.movieDetail.vote_average,
  };

  try {
    const userId = localStorage.getItem("uid");
    const database = getDatabase();
    const favoriteRef = ref(database, `${userId}/list/${movieData.id}`);
    yield call(set, favoriteRef, movieData);
    yield put(addToFavorite(movieData));
    yield put(getFavorite());
    // localStorage.setItem(`isInFavorite_${movieData.id}`, true);
  } catch (error) {
    console.log(error);
  }
}


export function* watchFavoriteSaga() {
  yield takeLatest(getFavoriteAsync, getFavoriteSaga);
  yield takeLatest(addToFavoriteAsync, addToFavoriteSaga);
  yield takeLatest(removeFavoriteAsync, removeFavoriteSaga);
}

const favoriteSlice = createSlice({
  name: "favorite",
  initialState: {
    favorite: [],
    loading: false,
  },
  reducers: {
    getFavorite: (state, action) => {
      state.favorite = action.payload;
    },
    addToFavorite: (state, action) => {
      state.favorite.push(action.payload);
    },
    removeFavorite: (state, action) => {
      state.favorite = state.favorite.filter(
        (movie) => movie.id !== action.payload
      );
    },
  },
});

const favoriteReducer = favoriteSlice.reducer;
export const {
  getFavorite,
  addToFavorite,
  removeFavorite,
} = favoriteSlice.actions;

export default favoriteReducer;
