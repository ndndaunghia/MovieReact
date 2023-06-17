import { createAction, createSlice } from "@reduxjs/toolkit";
import { call, put, takeLatest, take } from "redux-saga/effects";
import { firebaseAppPromise } from "../Firebase";
import { getDatabase, onValue, ref, remove, set } from "firebase/database";
import { eventChannel } from "redux-saga";

export const getFavoriteAsync = createAction("favorite/getFavoriteAsync");
export const addToFavoriteAsync = createAction("favorite/addToFavoriteAsync");
export const removeFavoriteAsync = createAction("favorite/removeFavoriteAsync");

const userId = localStorage.getItem("uid");

function* getFavoriteSaga(action) {
  try {
    const newList = yield call(getFavoriteData);
    if (newList) {
      yield put(getFavorite(newList));

      const channel = yield call(createOnValueChannel);
      while (true) {
        const isInFavorite = yield take(channel);
        const { id } = isInFavorite;
        yield put(updateIsInFavorite({ id, isInFavorite }));
      }
    }
  } catch (error) {
    console.log(error);
  }
}

function getFavoriteData() {
  return new Promise((resolve, reject) => {
    const listRef = ref(getDatabase(), `${userId}/list`);
    onValue(listRef, (snapshot) => {
      const newList = snapshot.val();
      resolve(newList);
    }, (error) => {
      reject(error);
    });
  });
}

function createOnValueChannel() {
  return eventChannel((emit) => {
    const callback = (snapshot) => {
      const newList = snapshot.val();
      if (newList) {
        Object.keys(newList).forEach((id) => {
          const isInFavorite = localStorage.getItem(`isInFavorite_${id}`) === 'true';
          emit({ id, isInFavorite });
        });
      }
    };
    const listRef = ref(getDatabase(), `${userId}/list`);
    const unsubscribe = onValue(listRef, callback);
    return unsubscribe;
  });
}

function* addToFavoriteSaga(action) {
  const movieData = {
    id: action.payload.movieDetail.id,
    title: action.payload.movieDetail.title,
    poster_path: action.payload.movieDetail.poster_path,
    vote_average: action.payload.movieDetail.vote_average,
  };

  try {
    yield call(async () => {
      await firebaseAppPromise;
      const favoriteRef = ref(getDatabase(), `${userId}/list/${movieData.id}`);
      await set(favoriteRef, movieData);
    });
    yield put(addToFavorite(movieData));
    yield put(getFavorite());
    localStorage.setItem(`isInFavorite_${movieData.id}`, true);
  } catch (error) {
    console.log(error);
  }
}

function* removeFavoriteSaga(action) {
  try {
    const movieId = action.payload;

    yield call(async () => {
      await firebaseAppPromise;
      const favoriteRef = ref(getDatabase(), `${userId}/list/${movieId}`);
      await remove(favoriteRef);
    });

    yield put(removeFavorite(movieId));
  } catch (error) {
    console.log(error);
  }
}

export function* watchAddToFavoriteSaga() {
  yield takeLatest(addToFavoriteAsync, addToFavoriteSaga);
}

export function* watchGetFavoriteSaga() {
  yield takeLatest(getFavoriteAsync, getFavoriteSaga);
}

export function* watchRemoveFavoriteSaga() {
  yield takeLatest(removeFavoriteAsync, removeFavoriteSaga);
}

const favoriteSlice = createSlice({
  name: "favorite",
  initialState: {
    favorite: [],
    loading: false,
    isInFavorite: {},
  },
  reducers: {
    getFavorite: (state, action) => {
      state.favorite = action.payload;
    },
    addToFavorite: (state, action) => {
      const index = state.favorite.findIndex((movie) => movie.id === action.payload.id);
      if (index !== -1) {
        state.favorite.push(action.payload);
        state.isInFavorite[action.payload.id] = true;
      }
    },
    removeFavorite: (state, action) => {
      state.favorite = state.favorite.filter((movie) => movie.id !== action.payload);
      delete state.isInFavorite[action.payload];
    },
    updateIsInFavorite: (state, action) => {
      const { id, isInFavorite } = action.payload;
      state.isInFavorite[id] = isInFavorite;
    },
  },
});

const favoriteReducer = favoriteSlice.reducer;
export const { getFavorite, addToFavorite, removeFavorite, updateIsInFavorite } = favoriteSlice.actions;

export default favoriteReducer;
