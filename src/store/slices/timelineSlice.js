

import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL ||
  "https://backend-beta-ruby-13.vercel.app/api/v1";

axios.defaults.withCredentials = true;

// 🔥 SAFE ERROR HANDLER
const getError = (error) =>
  error.response?.data?.message || error.message || "Something went wrong";

// 🔥 AUTH HEADER (clean version)
const setAuthHeader = () => {
  const token = localStorage.getItem("token");

  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

const timelineSlice = createSlice({
  name: "timeline",
  initialState: {
    loading: false,
    timeline: [],
    error: null,
    message: null,
  },
  reducers: {
    getAllTimelineRequest(state) {
      state.loading = true;
      state.timeline = [];
      state.error = null;
    },
    getAllTimelineSuccess(state, action) {
      state.loading = false;
      state.timeline = action.payload;
      state.error = null;
    },
    getAllTimelineFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    addNewTimelineRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    addNewTimelineSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
    },
    addNewTimelineFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    deleteTimelineRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    deleteTimelineSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
    },
    deleteTimelineFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    resetTimelineSlice(state) {
      state.loading = false;
      state.error = null;
      state.message = null;
    },

    clearAllErrors(state) {
      state.error = null;
      state.message = null;
    },
  },
});

// 🔥 GET ALL
export const getAllTimeline = () => async (dispatch) => {
  dispatch(timelineSlice.actions.getAllTimelineRequest());

  try {
    setAuthHeader();

    const { data } = await axios.get(
      `${API_BASE}/timeline/getall`
    );

    dispatch(
      timelineSlice.actions.getAllTimelineSuccess(data.timelines)
    );
  } catch (error) {
    dispatch(
      timelineSlice.actions.getAllTimelineFailed(getError(error))
    );
  }
};

// 🔥 ADD
export const addNewTimeline = (data) => async (dispatch) => {
  dispatch(timelineSlice.actions.addNewTimelineRequest());

  try {
    setAuthHeader();

    const response = await axios.post(
      `${API_BASE}/timeline/add`,
      data,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    dispatch(
      timelineSlice.actions.addNewTimelineSuccess(response.data.message)
    );
  } catch (error) {
    dispatch(
      timelineSlice.actions.addNewTimelineFailed(getError(error))
    );
  }
};

// 🔥 DELETE
export const deleteTimeline = (id) => async (dispatch) => {
  dispatch(timelineSlice.actions.deleteTimelineRequest());

  try {
    setAuthHeader();

    const response = await axios.delete(
      `${API_BASE}/timeline/delete/${id}`
    );

    dispatch(
      timelineSlice.actions.deleteTimelineSuccess(
        response.data.message
      )
    );

    dispatch(getAllTimeline());
  } catch (error) {
    const status = error.response?.status;

    if (status === 404) {
      dispatch(
        timelineSlice.actions.deleteTimelineSuccess(
          "Timeline already deleted."
        )
      );
      dispatch(getAllTimeline());
    } else {
      dispatch(
        timelineSlice.actions.deleteTimelineFailed(getError(error))
      );
    }
  }
};

export const resetTimelineSlice = () => (dispatch) => {
  dispatch(timelineSlice.actions.resetTimelineSlice());
};

export const clearAllTimelineErrors = () => (dispatch) => {
  dispatch(timelineSlice.actions.clearAllErrors());
};

export default timelineSlice.reducer;


