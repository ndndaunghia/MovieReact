import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";
import API_ENDPOINTS from "../../api/endpoints";

export const fetchUsers = createAsyncThunk(
    "users/fetchUsers",
    async ({ page = 1, perPage = 10, q = "" }, { getState, rejectWithValue }) => {
        try {
            const { auth } = getState();
            const response = await axiosInstance.get(API_ENDPOINTS.USERS.GET_ALL, {
                params: {
                    page,
                    per_page: perPage,
                    q: q,
                },
                headers: {
                    Authorization: `Bearer ${auth.token}`,
                },
            });
            console.log("Fetched Users:", response.data);
            
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const fetchUserById = createAsyncThunk(
    'users/fetchUserById',
    async (id, { getState, rejectWithValue }) => {
        try {
            const { auth } = getState();
            const response = await axiosInstance.get(API_ENDPOINTS.USERS.GET_BY_ID(id), {
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

export const createUser = createAsyncThunk(
    'users/createUser',
    async (userData, { getState, rejectWithValue }) => {
        try {
            const { auth } = getState();
            const response = await axiosInstance.post(API_ENDPOINTS.USERS.CREATE, userData, {
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

export const updateUser = createAsyncThunk(
    'users/updateUser',
    async ({ id, userData }, { getState, rejectWithValue }) => {
        try {
            const { auth } = getState();
            const response = await axiosInstance.put(API_ENDPOINTS.USERS.UPDATE(id), userData, {
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

export const deleteUser = createAsyncThunk(
    'users/deleteUser',
    async (id, { getState, rejectWithValue }) => {
        try {
            const { auth } = getState();
            const response = await axiosInstance.delete(API_ENDPOINTS.USERS.DELETE(id), {
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

const initialState = {
    users: [],
    currentUser: null,
    loading: false,
    error: null,
    totalUsers: 0,
    currentPage: 1,
    perPage: 10,
};

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        clearCurrentUser: (state) => {
            state.currentUser = null;
        },
        clearError: (state) => {
            state.error = null;
        },
        resetUserState: (state) => {
            state.users = [];
            state.currentUser = null;
            state.loading = false;
            state.error = null;
            state.totalUsers = 0;
            state.currentPage = 1;
            state.perPage = 10;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload.users;
                state.totalUsers = action.payload.total;
                state.currentPage = action.payload.page;
                state.perPage = action.payload.per_page;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to fetch users';
            })

            .addCase(fetchUserById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserById.fulfilled, (state, action) => {
                state.loading = false;
                state.currentUser = action.payload;
            })
            .addCase(fetchUserById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to fetch user';
            })

            .addCase(createUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users.push(action.payload);
            })
            .addCase(createUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to create user';
            })

            .addCase(updateUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.users.findIndex(user => user.id === action.payload.id);
                if (index !== -1) {
                    state.users[index] = action.payload;
                }

                if (state.currentUser && state.currentUser.id === action.payload.id) {
                    state.currentUser = action.payload;
                }
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to update user';
            })

            .addCase(deleteUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users = state.users.filter(user => user.id !== action.payload.id);
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to delete user';
            });
    },
});

export const { clearCurrentUser, clearError, resetUserState } = userSlice.actions;

export default userSlice.reducer;