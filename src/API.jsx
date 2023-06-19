export const API_KEY = 'api_key=5e3c1f5bb51ccfa7e8cd50dd4d33f967'
export const BASE_URL = 'https://api.themoviedb.org/3/movie/';
// export const API_ALL_MOVIES = 'https://api.themoviedb.org/3/discover/movie?language=vi-VN&' + API_KEY;
export const API_TOP_RATED = BASE_URL + "top_rated?language=vi-VN&page=1&" + API_KEY;
export const API_POPULAR = BASE_URL + "popular?language=vi-VN&page=1&" + API_KEY;
export const API_NOWPLAYING = BASE_URL + "now_playing?language=vi-VN&page=1&" + API_KEY;
export const API_UPCOMING = BASE_URL + "upcoming?language=vi-VN&page=1&" + API_KEY;
const API_URL = BASE_URL + 'discover/movie?sort_by=popularity.desc&'+API_KEY;

