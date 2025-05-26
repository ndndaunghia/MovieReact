import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API_ENDPOINTS from '../../api/endpoints';
import axiosInstance from '../../api/axiosInstance';

// Async thunks
export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async ({ page = 1, perPage = 10, q = "" }, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const response = await axiosInstance.get(API_ENDPOINTS.CATEGORIES.GET_ALL, {
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

export const fetchCategoryById = createAsyncThunk(
  'categories/fetchCategoryById',
  async (id, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const response = await axiosInstance.get(API_ENDPOINTS.CATEGORIES.GET_BY_ID(id), {
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

export const createCategory = createAsyncThunk(
  'categories/createCategory',
  async (categoryData, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const response = await axiosInstance.post(API_ENDPOINTS.CATEGORIES.CREATE, categoryData, {
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

export const updateCategory = createAsyncThunk(
  'categories/updateCategory',
  async ({ id, categoryData }, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const response = await axiosInstance.put(API_ENDPOINTS.CATEGORIES.UPDATE(id), categoryData, {
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

export const deleteCategory = createAsyncThunk(
  'categories/deleteCategory',
  async (id, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      await axiosInstance.delete(API_ENDPOINTS.CATEGORIES.DELETE(id), {
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
  categories: [],
  currentCategory: null,
  loading: false,
  error: null,
  totalCategories: 0,
  currentPage: 1,
  perPage: 10,
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    clearCurrentCategory: (state) => {
      state.currentCategory = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all categories
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload.categories;
        state.totalCategories = action.payload.total;
        state.currentPage = action.payload.page;
        state.perPage = action.payload.per_page;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch category by id
      .addCase(fetchCategoryById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategoryById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentCategory = action.payload;
      })
      .addCase(fetchCategoryById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create category
      .addCase(createCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories.push(action.payload);
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update category
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.categories.findIndex((cat) => cat.id === action.payload.id);
        if (index !== -1) {
          state.categories[index] = action.payload;
        }
        if (state.currentCategory?.id === action.payload.id) {
          state.currentCategory = action.payload;
        }
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete category
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = state.categories.filter((cat) => cat.id !== action.payload);
        if (state.currentCategory?.id === action.payload) {
          state.currentCategory = null;
        }
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCurrentCategory, clearError } = categoriesSlice.actions;

export default categoriesSlice.reducer;