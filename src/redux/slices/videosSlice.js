import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API_ENDPOINTS from '../../api/endpoints';
import axiosInstance from "../../api/axiosInstance";

export const fetchVideos = createAsyncThunk(
  "videos/fetchVideos",
  async ({ page = 1, perPage = 10, q = "" }, {getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const response = await axiosInstance.get(API_ENDPOINTS.VIDEOS.GET_ALL, {
        params: {
          page,
          per_page: perPage,
          q: q,
        },
        headers: {
          Authorization: `Bearer ${auth.token}`,
      },
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchVideoById = createAsyncThunk(
    'videos/fetchVideoById',
    async (id, { getState, rejectWithValue }) => {
        try {
            const { auth } = getState();
            const response = await axiosInstance.get(API_ENDPOINTS.VIDEOS.GET_BY_ID(id), {
                headers: {
                    Authorization: `Bearer ${auth.token}`,
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const createVideo = createAsyncThunk(
    'videos/createVideo',
    async (videoData, { getState, rejectWithValue }) => {
        try {
            const { auth } = getState();
            const response = await axiosInstance.post(API_ENDPOINTS.VIDEOS.CREATE, videoData, {
                headers: {
                    Authorization: `Bearer ${auth.token}`,
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateVideo = createAsyncThunk(
    'videos/updateVideo',
    async ({ id, videoData }, { getState, rejectWithValue }) => {
        try {
            const { auth } = getState();
            const response = await axiosInstance.put(API_ENDPOINTS.VIDEOS.UPDATE(id), videoData, {
                headers: {
                    Authorization: `Bearer ${auth.token}`,
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const deleteVideo = createAsyncThunk(
    'videos/deleteVideo',
    async (id, { getState, rejectWithValue }) => {
        try {
            const { auth } = getState();
            await axiosInstance.delete(API_ENDPOINTS.VIDEOS.DELETE(id), {
                headers: {
                    Authorization: `Bearer ${auth.token}`,
                },
            });
            return id;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const initialState = {
    videos: [],
    currentVideo: null,
    loading: false,
    error: null,
    totalVideos: 0,
    currentPage: 1,
    perPage: 10,
}

const videosSlice = createSlice({
    name: 'videos',
    initialState,
    reducers: {
      clearCurrentVideo: (state) => {
        state.currentVideo = null;
      },
      clearError: (state) => {
        state.error = null;
      },
    },
    extraReducers: (builder) => {
      builder
        // Fetch all categories
        .addCase(fetchVideos.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchVideos.fulfilled, (state, action) => {
          state.loading = false;
          state.videos = action.payload.videos;
          state.totalVideos = action.payload.total;
          state.currentPage = action.payload.page;
          state.perPage = action.payload.per_page;
        })
        .addCase(fetchVideos.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
  
        // Fetch category by id
        .addCase(fetchVideoById.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchVideoById.fulfilled, (state, action) => {
          state.loading = false;
          state.currentVideo = action.payload;
        })
        .addCase(fetchVideoById.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
  
        // Create category
        .addCase(createVideo.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(createVideo.fulfilled, (state, action) => {
          state.loading = false;
          state.videos.push(action.payload);
        })
        .addCase(createVideo.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
  
        // Update category
        .addCase(updateVideo.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(updateVideo.fulfilled, (state, action) => {
          state.loading = false;
          const index = state.videos.findIndex((cat) => cat.id === action.payload.id);
          if (index !== -1) {
            state.videos[index] = action.payload;
          }
          if (state.videos?.id === action.payload.id) {
            state.currentVideo = action.payload;
          }
        })
        .addCase(updateVideo.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
  
        // Delete category
        .addCase(deleteVideo.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(deleteVideo.fulfilled, (state, action) => {
          state.loading = false;
          state.videos = state.videos.filter((cat) => cat.id !== action.payload);
          if (state.currentVideo?.id === action.payload) {
            state.currentVideo = null;
          }
        })
        .addCase(deleteVideo.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
  });

  export const { clearCurrentVideo, clearError } = videosSlice.actions;

  export default videosSlice.reducer;