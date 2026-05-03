// import { createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

// const messageSlice = createSlice({
//   name: "messages",
//   initialState: {
//     loading: false,
//     messages: [],
//     error: null,
//     message: null,
//   },
//   reducers: {
//     getAllMessagesRequest(state) {
//       state.messages = [];
//       state.error = null;
//       state.loading = true;
//     },
//     getAllMessagesSuccess(state, action) {
//       state.messages = action.payload;
//       state.error = null;
//       state.loading = false;
//     },
//     getAllMessagesFailed(state, action) {
//       state.error = action.payload;
//       state.loading = false;
//     },
//     deleteMessageRequest(state) {
//       state.loading = true;
//       state.error = null;
//       state.message = null;
//     },
//     deleteMessageSuccess(state, action) {
//       state.error = null;
//       state.loading = false;
//       state.message = action.payload;
//     },
//     deleteMessageFailed(state, action) {
//       state.error = action.payload;
//       state.loading = false;
//       state.message = null;
//     },
//     resetMessageSlice(state) {
//       state.error = null;
//       state.message = null;
//       state.loading = false;
//     },
//     clearAllErrors(state) {
//       state.error = null;
//     },
//   },
// });

// const API_BASE = import.meta.env.VITE_API_BASE_URL || "https://backend-beta-ruby-13.vercel.app/api/v1";
// axios.defaults.withCredentials = true;

// export const getAllMessages = () => async (dispatch) => {
//   dispatch(messageSlice.actions.getAllMessagesRequest());
//   try {
//     const response = await axios.get(
//       `${API_BASE}/message/getall`,
//       {
//         withCredentials: true,
//       }
//     );
//     dispatch(
//       messageSlice.actions.getAllMessagesSuccess(response.data.messages)
//     );
//     dispatch(messageSlice.actions.clearAllErrors());
//   } catch (error) {
//     dispatch(
//       messageSlice.actions.getAllMessagesFailed(error.response?.data?.message || error.message)
//     );
//   }
// };

// export const deleteMessage = (id) => async (dispatch) => {
//   dispatch(messageSlice.actions.deleteMessageRequest());
//   try {
//     const response = await axios.delete(
//       `${API_BASE}/message/delete/${id}`,
//       {
//         withCredentials: true,
//       }
//     );
//     dispatch(messageSlice.actions.deleteMessageSuccess(response.data.message));
//     dispatch(messageSlice.actions.clearAllErrors());
//   } catch (error) {
//     dispatch(
//       messageSlice.actions.deleteMessageFailed(error.response.data.message)
//     );
//   }
// };

// export const clearAllMessageErrors = () => (dispatch) => {
//   dispatch(messageSlice.actions.clearAllErrors());
// };

// export const resetMessagesSlice = () => (dispatch) => {
//   dispatch(messageSlice.actions.resetMessageSlice());
// };

// export default messageSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL ||
  "https://backend-beta-ruby-13.vercel.app/api/v1";

axios.defaults.withCredentials = true;

// 🔥 safe error handler
const getError = (error) =>
  error.response?.data?.message || error.message || "Something went wrong";

const messageSlice = createSlice({
  name: "messages",
  initialState: {
    loading: false,
    messages: [],
    error: null,
    message: null,
  },
  reducers: {
    getAllMessagesRequest(state) {
      state.loading = true;
      state.messages = [];
      state.error = null;
    },
    getAllMessagesSuccess(state, action) {
      state.loading = false;
      state.messages = action.payload;
      state.error = null;
    },
    getAllMessagesFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    deleteMessageRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    deleteMessageSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
    },
    deleteMessageFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    resetMessageSlice(state) {
      state.loading = false;
      state.error = null;
      state.message = null;
    },

    clearAllErrors(state) {
      state.error = null;
    },
  },
});

// 🔥 GET ALL MESSAGES
export const getAllMessages = () => async (dispatch) => {
  dispatch(messageSlice.actions.getAllMessagesRequest());

  try {
    const { data } = await axios.get(`${API_BASE}/message/getall`);

    dispatch(messageSlice.actions.getAllMessagesSuccess(data.messages));
  } catch (error) {
    dispatch(
      messageSlice.actions.getAllMessagesFailed(getError(error))
    );
  }
};

// 🔥 DELETE MESSAGE
export const deleteMessage = (id) => async (dispatch) => {
  dispatch(messageSlice.actions.deleteMessageRequest());

  try {
    const { data } = await axios.delete(
      `${API_BASE}/message/delete/${id}`
    );

    dispatch(
      messageSlice.actions.deleteMessageSuccess(data.message)
    );

    dispatch(getAllMessages());
  } catch (error) {
    dispatch(
      messageSlice.actions.deleteMessageFailed(getError(error))
    );
  }
};

export const clearAllMessageErrors = () => (dispatch) => {
  dispatch(messageSlice.actions.clearAllErrors());
};

export const resetMessagesSlice = () => (dispatch) => {
  dispatch(messageSlice.actions.resetMessageSlice());
};

export default messageSlice.reducer;


