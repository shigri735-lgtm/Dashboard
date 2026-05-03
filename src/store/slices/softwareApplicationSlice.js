// import { createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

// const softwareApplicationSlice = createSlice({
//   name: "softwareApplications",
//   initialState: {
//     loading: false,
//     softwareApplications: [],
//     error: null,
//     message: null,
//   },
//   reducers: {
//     getAllsoftwareApplicationsRequest(state) {
//       state.softwareApplications = [];
//       state.error = null;
//       state.loading = true;
//     },
//     getAllsoftwareApplicationsSuccess(state, action) {
//       state.softwareApplications = action.payload;
//       state.error = null;
//       state.loading = false;
//     },
//     getAllsoftwareApplicationsFailed(state, action) {
//       state.error = action.payload;
//       state.loading = false;
//     },
//     addNewsoftwareApplicationsRequest(state) {
//       state.loading = true;
//       state.error = null;
//       state.message = null;
//     },
//     addNewsoftwareApplicationsSuccess(state, action) {
//       state.error = null;
//       state.loading = false;
//       state.message = action.payload;
//     },
//     addNewsoftwareApplicationsFailed(state, action) {
//       state.error = action.payload;
//       state.loading = false;
//       state.message = null;
//     },
//     deletesoftwareApplicationsRequest(state) {
//       state.loading = true;
//       state.error = null;
//       state.message = null;
//     },
//     deletesoftwareApplicationsSuccess(state, action) {
//       state.error = null;
//       state.loading = false;
//       state.message = action.payload;
//     },
//     deletesoftwareApplicationsFailed(state, action) {
//       state.error = action.payload;
//       state.loading = false;
//       state.message = null;
//     },
//     resetSoftwareApplicationSlice(state) {
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

// export const getAllSoftwareApplications = () => async (dispatch) => {
//   dispatch(
//     softwareApplicationSlice.actions.getAllsoftwareApplicationsRequest()
//   );
//   try {
//     const response = await axios.get(
//       `${API_BASE}/softwareapplication/getall`
//     );
//     dispatch(
//       softwareApplicationSlice.actions.getAllsoftwareApplicationsSuccess(
//         response.data.softwareApplications
//       )
//     );
//     dispatch(softwareApplicationSlice.actions.clearAllErrors());
//   } catch (error) {
//     dispatch(
//       softwareApplicationSlice.actions.getAllsoftwareApplicationsFailed(
//         error.response.data.message
//       )
//     );
//   }
// };

// export const addNewSoftwareApplication = (data) => async (dispatch) => {
//   dispatch(
//     softwareApplicationSlice.actions.addNewsoftwareApplicationsRequest()
//   );
//   try {
//     const response = await axios.post(
//       `${API_BASE}/softwareapplication/add`,
//       data,
//       {
//         withCredentials: true,
//         headers: { "Content-Type": "multipart/form-data" },
//       }
//     );
//     dispatch(
//       softwareApplicationSlice.actions.addNewsoftwareApplicationsSuccess(
//         response.data.message
//       )
//     );
//     dispatch(softwareApplicationSlice.actions.clearAllErrors());
//   } catch (error) {
//     dispatch(
//       softwareApplicationSlice.actions.addNewsoftwareApplicationsFailed(
//         error.response.data.message
//       )
//     );
//   }
// };

// export const deleteSoftwareApplication = (id) => async (dispatch) => {
//   dispatch(
//     softwareApplicationSlice.actions.deletesoftwareApplicationsRequest()
//   );
//   try {
//     const response = await axios.delete(
//       `${API_BASE}/softwareapplication/delete/${id}`,
//       {
//         withCredentials: true,
//       }
//     );
//     dispatch(
//       softwareApplicationSlice.actions.deletesoftwareApplicationsSuccess(
//         response.data.message
//       )
//     );
//     dispatch(softwareApplicationSlice.actions.clearAllErrors());
//   } catch (error) {
//     dispatch(
//       softwareApplicationSlice.actions.deletesoftwareApplicationsFailed(
//         error.response.data.message
//       )
//     );
//   }
// };

// export const clearAllSoftwareAppErrors = () => (dispatch) => {
//   dispatch(softwareApplicationSlice.actions.clearAllErrors());
// };

// export const resetSoftwareApplicationSlice = () => (dispatch) => {
//   dispatch(softwareApplicationSlice.actions.resetSoftwareApplicationSlice());
// };

// export default softwareApplicationSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL ||
  "https://backend-beta-ruby-13.vercel.app/api/v1";

axios.defaults.withCredentials = true;

const getErrorMessage = (error) =>
  error.response?.data?.message || error.message || "Something went wrong";

const softwareApplicationSlice = createSlice({
  name: "softwareApplications",
  initialState: {
    loading: false,
    softwareApplications: [],
    error: null,
    message: null,
  },
  reducers: {
    getAllsoftwareApplicationsRequest(state) {
      state.loading = true;
      state.error = null;
      state.softwareApplications = [];
    },

    getAllsoftwareApplicationsSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.softwareApplications = action.payload;
    },

    getAllsoftwareApplicationsFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    addNewsoftwareApplicationsRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },

    addNewsoftwareApplicationsSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },

    addNewsoftwareApplicationsFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    deletesoftwareApplicationsRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },

    deletesoftwareApplicationsSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },

    deletesoftwareApplicationsFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    resetSoftwareApplicationSlice(state) {
      state.loading = false;
      state.error = null;
      state.message = null;
    },

    clearAllErrors(state) {
      state.error = null;
    },
  },
});

// 🔥 GET ALL
export const getAllSoftwareApplications = () => async (dispatch) => {
  dispatch(
    softwareApplicationSlice.actions.getAllsoftwareApplicationsRequest()
  );

  try {
    const { data } = await axios.get(
      `${API_BASE}/softwareapplication/getall`
    );

    dispatch(
      softwareApplicationSlice.actions.getAllsoftwareApplicationsSuccess(
        data.softwareApplications
      )
    );
  } catch (error) {
    dispatch(
      softwareApplicationSlice.actions.getAllsoftwareApplicationsFailed(
        getErrorMessage(error)
      )
    );
  }
};

// 🔥 ADD NEW
export const addNewSoftwareApplication = (formData) => async (dispatch) => {
  dispatch(
    softwareApplicationSlice.actions.addNewsoftwareApplicationsRequest()
  );

  try {
    const { data } = await axios.post(
      `${API_BASE}/softwareapplication/add`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    dispatch(
      softwareApplicationSlice.actions.addNewsoftwareApplicationsSuccess(
        data.message
      )
    );
  } catch (error) {
    dispatch(
      softwareApplicationSlice.actions.addNewsoftwareApplicationsFailed(
        getErrorMessage(error)
      )
    );
  }
};

// 🔥 DELETE
export const deleteSoftwareApplication = (id) => async (dispatch) => {
  dispatch(
    softwareApplicationSlice.actions.deletesoftwareApplicationsRequest()
  );

  try {
    const { data } = await axios.delete(
      `${API_BASE}/softwareapplication/delete/${id}`
    );

    dispatch(
      softwareApplicationSlice.actions.deletesoftwareApplicationsSuccess(
        data.message
      )
    );

    dispatch(getAllSoftwareApplications());
  } catch (error) {
    dispatch(
      softwareApplicationSlice.actions.deletesoftwareApplicationsFailed(
        getErrorMessage(error)
      )
    );
  }
};

// 🔥 CLEAR ERROR
export const clearAllSoftwareAppErrors = () => (dispatch) => {
  dispatch(softwareApplicationSlice.actions.clearAllErrors());
};

// 🔥 RESET
export const resetSoftwareApplicationSlice = () => (dispatch) => {
  dispatch(
    softwareApplicationSlice.actions.resetSoftwareApplicationSlice()
  );
};

export default softwareApplicationSlice.reducer;


