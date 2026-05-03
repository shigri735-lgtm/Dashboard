// import { createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

// const API_BASE = import.meta.env.VITE_API_BASE_URL || "https://backend-beta-ruby-13.vercel.app/api/v1";
// axios.defaults.withCredentials = true;

// const forgotResetPassSlice = createSlice({
//   name: "forgotPassword",
//   initialState: {
//     loading: false,
//     error: null,
//     message: null,
//   },
//   reducers: {
//     forgotPasswordRequest(state) {
//       state.loading = true;
//       state.error = null;
//       state.message = null;
//     },
//     forgotPasswordSuccess(state, action) {
//       state.loading = false;
//       state.error = null;
//       state.message = action.payload;
//     },
//     forgotPasswordFailed(state, action) {
//       state.loading = false;
//       state.error = action.payload;
//       state.message = null;
//     },
//     resetPasswordRequest(state) {
//       state.loading = true;
//       state.error = null;
//       state.message = null;
//     },
//     resetPasswordSuccess(state, action) {
//       state.loading = false;
//       state.error = null;
//       state.message = action.payload;
//     },
//     resetPasswordFailed(state, action) {
//       state.loading = false;
//       state.error = action.payload;
//       state.message = null;
//     },
//     clearAllErrors(state) {
//       state.error = null;
//     },
//   },
// });

// export const forgotPassword = (email) => async (dispatch) => {
//   try {
//     dispatch(forgotResetPassSlice.actions.forgotPasswordRequest());
//     const response = await axios.post(
//       `${API_BASE}/user/password/forgot`,
//       { email },
//       { withCredentials: true, headers: { "Content-Type": "application/json" } }
//     );
//     dispatch(
//       forgotResetPassSlice.actions.forgotPasswordSuccess(response.data.message)
//     );
//   } catch (error) {
//     dispatch(
//       forgotResetPassSlice.actions.forgotPasswordFailed(
//         error.response?.data?.message || error.message
//       )
//     );
//   }
// };

// export const resetPassword =
//   (token, password, confirmPassword) => async (dispatch) => {
//     try {
//       dispatch(forgotResetPassSlice.actions.resetPasswordRequest());
//       const response = await axios.put(
//         `${API_BASE}/user/password/reset/${token}`,
//         { password, confirmPassword },
//         {
//           withCredentials: true,
//           headers: { "Content-Type": "application/json" },
//         }
//       );
//       dispatch(
//         forgotResetPassSlice.actions.resetPasswordSuccess(response.data.message)
//       );
//     } catch (error) {
//       dispatch(
//         forgotResetPassSlice.actions.resetPasswordFailed(
//           error.response?.data?.message || error.message
//         )
//       );
//     }
//   };

// export const clearAllForgotResetPassErrors = () => (dispatch) => {
//   dispatch(forgotResetPassSlice.actions.clearAllErrors());
// };

// export default forgotResetPassSlice.reducer;


import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL ||
  "https://backend-beta-ruby-13.vercel.app/api/v1";

axios.defaults.withCredentials = true;

// 🔥 reusable error handler
const getError = (error) =>
  error.response?.data?.message || error.message || "Something went wrong";

const forgotResetPassSlice = createSlice({
  name: "forgotPassword",
  initialState: {
    loading: false,
    error: null,
    message: null,
  },
  reducers: {
    forgotPasswordRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    forgotPasswordSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
    },
    forgotPasswordFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    resetPasswordRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    resetPasswordSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
    },
    resetPasswordFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    clearAllErrors(state) {
      state.error = null;
    },
  },
});

// 🔥 FORGOT PASSWORD
export const forgotPassword = (email) => async (dispatch) => {
  dispatch(forgotResetPassSlice.actions.forgotPasswordRequest());

  try {
    const { data } = await axios.post(
      `${API_BASE}/user/password/forgot`,
      { email },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    dispatch(
      forgotResetPassSlice.actions.forgotPasswordSuccess(data.message)
    );
  } catch (error) {
    dispatch(
      forgotResetPassSlice.actions.forgotPasswordFailed(getError(error))
    );
  }
};

// 🔥 RESET PASSWORD
export const resetPassword =
  (token, password, confirmPassword) => async (dispatch) => {
    dispatch(forgotResetPassSlice.actions.resetPasswordRequest());

    try {
      const { data } = await axios.put(
        `${API_BASE}/user/password/reset/${token}`,
        { password, confirmPassword },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      dispatch(
        forgotResetPassSlice.actions.resetPasswordSuccess(data.message)
      );
    } catch (error) {
      dispatch(
        forgotResetPassSlice.actions.resetPasswordFailed(getError(error))
      );
    }
  };

export const clearAllForgotResetPassErrors = () => (dispatch) => {
  dispatch(forgotResetPassSlice.actions.clearAllErrors());
};

export default forgotResetPassSlice.reducer;


