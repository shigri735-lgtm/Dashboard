

import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL ||
  "https://backend-beta-ruby-13.vercel.app/api/v1";

axios.defaults.withCredentials = true;

// 🔥 Safe error handler
const getError = (error) =>
  error.response?.data?.message || error.message || "Something went wrong";

const projectSlice = createSlice({
  name: "project",
  initialState: {
    loading: false,
    projects: [],
    singleProject: {},
    error: null,
    message: null,
  },
  reducers: {
    getAllProjectsRequest(state) {
      state.loading = true;
      state.projects = [];
      state.error = null;
    },
    getAllProjectsSuccess(state, action) {
      state.loading = false;
      state.projects = action.payload;
      state.error = null;
    },
    getAllProjectsFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    addNewProjectRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    addNewProjectSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
    },
    addNewProjectFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    deleteProjectRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    deleteProjectSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
    },
    deleteProjectFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    updateProjectRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    updateProjectSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
    },
    updateProjectFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    resetProjectSlice(state) {
      state.loading = false;
      state.error = null;
      state.message = null;
    },

    clearAllErrors(state) {
      state.error = null;
    },
  },
});

// 🔥 GET ALL PROJECTS
export const getAllProjects = () => async (dispatch) => {
  dispatch(projectSlice.actions.getAllProjectsRequest());

  try {
    const { data } = await axios.get(`${API_BASE}/project/getall`);

    dispatch(projectSlice.actions.getAllProjectsSuccess(data.projects));
  } catch (error) {
    dispatch(
      projectSlice.actions.getAllProjectsFailed(getError(error))
    );
  }
};

// 🔥 ADD PROJECT
export const addNewProject = (data) => async (dispatch) => {
  dispatch(projectSlice.actions.addNewProjectRequest());

  try {
    const response = await axios.post(
      `${API_BASE}/project/add`,
      data,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    dispatch(
      projectSlice.actions.addNewProjectSuccess(response.data.message)
    );
  } catch (error) {
    dispatch(
      projectSlice.actions.addNewProjectFailed(getError(error))
    );
  }
};

// 🔥 DELETE PROJECT
export const deleteProject = (id) => async (dispatch) => {
  dispatch(projectSlice.actions.deleteProjectRequest());

  try {
    const response = await axios.delete(
      `${API_BASE}/project/delete/${id}`
    );

    dispatch(
      projectSlice.actions.deleteProjectSuccess(response.data.message)
    );

    dispatch(getAllProjects());
  } catch (error) {
    dispatch(
      projectSlice.actions.deleteProjectFailed(getError(error))
    );
  }
};

// 🔥 UPDATE PROJECT
export const updateProject = (id, newData) => async (dispatch) => {
  dispatch(projectSlice.actions.updateProjectRequest());

  try {
    const response = await axios.put(
      `${API_BASE}/project/update/${id}`,
      newData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    dispatch(
      projectSlice.actions.updateProjectSuccess(response.data.message)
    );
  } catch (error) {
    dispatch(
      projectSlice.actions.updateProjectFailed(getError(error))
    );
  }
};

export const resetProjectSlice = () => (dispatch) => {
  dispatch(projectSlice.actions.resetProjectSlice());
};

export const clearAllProjectErrors = () => (dispatch) => {
  dispatch(projectSlice.actions.clearAllErrors());
};

export default projectSlice.reducer;


