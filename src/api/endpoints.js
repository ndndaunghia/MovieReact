const API_ENDPOINTS = {
  // User
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    ME: '/auth/me',
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
};

export default API_ENDPOINTS; 