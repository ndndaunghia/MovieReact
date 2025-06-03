const API_ENDPOINTS = {
  // User
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    ME: '/auth/me',
    UPDATE_PROFILE: 'auth/me',
    CHANGE_PASSWORD: '/auth/change-password',  // POST method
  },

  CATEGORIES: {
    GET_ALL: '/categories',
    GET_BY_ID: (id) => `/categories/${id}`,
    CREATE: '/categories',
    UPDATE: (id) => `/categories/${id}`,
    DELETE: (id) => `/categories/${id}`,
  },

  VIDEOS: {
    GET_ALL: '/videos',
    GET_BY_ID: (id) => `/videos/${id}`,
    CREATE: '/videos',
    UPDATE: (id) => `/videos/${id}`,
    DELETE: (id) => `/videos/${id}`,
  },

  USERS: {
    GET_ALL: '/users',
    GET_BY_ID: (id) => `/users/${id}`,
    CREATE: '/users',
    UPDATE: (id) => `/users/${id}`,
    DELETE: (id) => `/users/${id}`,
  },
};

export default API_ENDPOINTS; 