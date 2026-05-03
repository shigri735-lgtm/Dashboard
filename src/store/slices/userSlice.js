
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL ||
  "https://backend-beta-ruby-13.vercel.app/api/v1";

axios.defaults.withCredentials = true;

const getError = (error) =>
  error.response?.data?.message || error.message || "Something went wrong";

const savedToken = localStorage.getItem("token");
if (savedToken) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${savedToken}`;
}

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    user: {},
    isAuthenticated: false,
    error: null,
    message: null,
    isUpdated: false,
  },
  reducers: {
    loginRequest(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    loginFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    registerRequest(state) {
      state.loading = true;
      state.error = null;
    },
    registerSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    registerFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    logoutSuccess(state) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
    },

    loadUserSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    loadUserFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    },

    updatePasswordSuccess(state, action) {
      state.loading = false;
      state.isUpdated = true;
      state.message = action.payload;
    },
    updatePasswordFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    updateProfileSuccess(state, action) {
      state.loading = false;
      state.isUpdated = true;
      state.message = action.payload;
    },
    updateProfileFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // ✅ resetProfile reducer
    resetProfile(state) {
      state.isUpdated = false;
      state.message = null;
      state.error = null;
    },

    clearAllErrors(state) {
      state.error = null;
    },
  },
});

export const login = (email, password) => async (dispatch) => {
  dispatch(userSlice.actions.loginRequest());
  try {
    const { data } = await axios.post(`${API_BASE}/user/login`, {
      email,
      password,
    });
    if (data.token) {
      localStorage.setItem("token", data.token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
    }
    dispatch(userSlice.actions.loginSuccess(data.user));
  } catch (error) {
    dispatch(userSlice.actions.loginFailed(getError(error)));
  }
};

export const register = (formData) => async (dispatch) => {
  dispatch(userSlice.actions.registerRequest());
  try {
    const { data } = await axios.post(`${API_BASE}/user/register`, formData);
    dispatch(userSlice.actions.registerSuccess(data.user));
  } catch (error) {
    dispatch(userSlice.actions.registerFailed(getError(error)));
  }
};

export const getUser = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${API_BASE}/user/me`);
    dispatch(userSlice.actions.loadUserSuccess(data.user));
  } catch (error) {
    dispatch(userSlice.actions.loadUserFailed(getError(error)));
  }
};

export const logout = () => async (dispatch) => {
  try {
    await axios.get(`${API_BASE}/user/logout`);
  } finally {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    dispatch(userSlice.actions.logoutSuccess());
  }
};

export const updatePassword =
  (currentPassword, newPassword, confirmNewPassword) => async (dispatch) => {
    try {
      const { data } = await axios.put(`${API_BASE}/user/password/update`, {
        currentPassword,
        newPassword,
        confirmNewPassword,
      });
      dispatch(userSlice.actions.updatePasswordSuccess(data.message));
    } catch (error) {
      dispatch(userSlice.actions.updatePasswordFailed(getError(error)));
    }
  };

export const updateProfile = (formData) => async (dispatch) => {
  try {
    const { data } = await axios.put(
      `${API_BASE}/user/me/profile/update`,
      formData
    );
    dispatch(userSlice.actions.updateProfileSuccess(data.message));
  } catch (error) {
    dispatch(userSlice.actions.updateProfileFailed(getError(error)));
  }
};

// ✅ resetProfile export
export const resetProfile = () => (dispatch) => {
  dispatch(userSlice.actions.resetProfile());
};

export const clearAllUserErrors = () => (dispatch) => {
  dispatch(userSlice.actions.clearAllErrors());
};

export default userSlice.reducer;
