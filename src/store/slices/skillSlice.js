// import { createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

// const API_BASE = import.meta.env.VITE_API_BASE_URL || "https://backend-beta-ruby-13.vercel.app/api/v1";
// axios.defaults.withCredentials = true;

// const skillSlice = createSlice({
//   name: "skill",
//   initialState: {
//     loading: false,
//     skills: [],
//     error: null,
//     message: null,
//   },
//   reducers: {
//     getAllSkillsRequest(state) {
//       state.skills = [];
//       state.error = null;
//       state.loading = true;
//     },
//     getAllSkillsSuccess(state, action) {
//       state.skills = action.payload;
//       state.error = null;
//       state.loading = false;
//     },
//     getAllSkillsFailed(state, action) {
//       state.error = action.payload;
//       state.loading = false;
//     },
//     addNewSkillRequest(state) {
//       state.loading = true;
//       state.error = null;
//       state.message = null;
//     },
//     addNewSkillSuccess(state, action) {
//       state.error = null;
//       state.loading = false;
//       state.message = action.payload;
//     },
//     addNewSkillFailed(state, action) {
//       state.error = action.payload;
//       state.loading = false;
//       state.message = null;
//     },
//     deleteSkillRequest(state) {
//       state.loading = true;
//       state.error = null;
//       state.message = null;
//     },
//     deleteSkillSuccess(state, action) {
//       state.error = null;
//       state.loading = false;
//       state.message = action.payload;
//     },
//     deleteSkillFailed(state, action) {
//       state.error = action.payload;
//       state.loading = false;
//       state.message = null;
//     },
//     updateSkillRequest(state) {
//       state.loading = true;
//       state.error = null;
//       state.message = null;
//     },
//     updateSkillSuccess(state, action) {
//       state.loading = false;
//       state.message = action.payload;
//       state.error = null;
//     },
//     updateSkillFailed(state, action) {
//       state.error = action.payload;
//       state.loading = false;
//       state.message = null;
//     },
//     resetSkillSlice(state) {
//       state.error = null;
//       state.message = null;
//       state.loading = false;
//     },
//     clearAllErrors(state) {
//       state.error = null;
//     },
//   },
// });

// export const getAllSkills = () => async (dispatch) => {
//   dispatch(skillSlice.actions.getAllSkillsRequest());
//   try {
//     const response = await axios.get(`${API_BASE}/skill/getall`);
//     dispatch(skillSlice.actions.getAllSkillsSuccess(response.data.skills));
//     dispatch(skillSlice.actions.clearAllErrors());
//   } catch (error) {
//     dispatch(
//       skillSlice.actions.getAllSkillsFailed(error.response?.data?.message || error.message)
//     );
//   }
// };

// export const addNewSkill = (data) => async (dispatch) => {
//   dispatch(skillSlice.actions.addNewSkillRequest());
//   try {
//     const response = await axios.post(`${API_BASE}/skill/add`, data, {
//       headers: { "Content-Type": "multipart/form-data" },
//     });
//     console.log(response);
//     console.log(response.data.message);
//     dispatch(skillSlice.actions.addNewSkillSuccess(response.data.message));
//     dispatch(skillSlice.actions.clearAllErrors());
//   } catch (error) {
//     dispatch(skillSlice.actions.addNewSkillFailed(error.response.data.message));
//   }
// };

// export const updateSkill = (id, proficiency) => async (dispatch) => {
//   dispatch(skillSlice.actions.updateSkillRequest());
//   try {
//     const response = await axios.put(
//       `${API_BASE}/skill/update/${id}`,
//       { proficiency },
//       {
//         headers: { "Content-Type": "application/json" },
//       }
//     );
//     dispatch(skillSlice.actions.updateSkillSuccess(response.data.message));
//     dispatch(skillSlice.actions.clearAllErrors());
//   } catch (error) {
//     dispatch(skillSlice.actions.updateSkillFailed(error.response.data.message));
//   }
// };

// export const deleteSkill = (id) => async (dispatch) => {
//   dispatch(skillSlice.actions.deleteSkillRequest());
//   try {
//     const response = await axios.delete(`${API_BASE}/skill/delete/${id}`);
//     dispatch(skillSlice.actions.deleteSkillSuccess(response.data.message));
//     dispatch(skillSlice.actions.clearAllErrors());
//   } catch (error) {
//     dispatch(skillSlice.actions.deleteSkillFailed(error.response.data.message));
//   }
// };

// export const clearAllSkillErrors = () => (dispatch) => {
//   dispatch(skillSlice.actions.clearAllErrors());
// };

// export const resetSkillSlice = () => (dispatch) => {
//   dispatch(skillSlice.actions.resetSkillSlice());
// };

// export default skillSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL ||
  "https://backend-beta-ruby-13.vercel.app/api/v1";

axios.defaults.withCredentials = true;

// 🔥 SAFE ERROR HANDLER
const getError = (error) =>
  error.response?.data?.message || error.message || "Something went wrong";

const skillSlice = createSlice({
  name: "skill",
  initialState: {
    loading: false,
    skills: [],
    error: null,
    message: null,
  },
  reducers: {
    getAllSkillsRequest(state) {
      state.loading = true;
      state.skills = [];
      state.error = null;
    },
    getAllSkillsSuccess(state, action) {
      state.loading = false;
      state.skills = action.payload;
      state.error = null;
    },
    getAllSkillsFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    addNewSkillRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    addNewSkillSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
    },
    addNewSkillFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    updateSkillRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    updateSkillSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
    },
    updateSkillFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    deleteSkillRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    deleteSkillSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
    },
    deleteSkillFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    resetSkillSlice(state) {
      state.loading = false;
      state.error = null;
      state.message = null;
    },

    clearAllErrors(state) {
      state.error = null;
    },
  },
});

// 🔥 GET ALL SKILLS
export const getAllSkills = () => async (dispatch) => {
  dispatch(skillSlice.actions.getAllSkillsRequest());

  try {
    const { data } = await axios.get(`${API_BASE}/skill/getall`);

    dispatch(skillSlice.actions.getAllSkillsSuccess(data.skills));
  } catch (error) {
    dispatch(
      skillSlice.actions.getAllSkillsFailed(getError(error))
    );
  }
};

// 🔥 ADD SKILL
export const addNewSkill = (data) => async (dispatch) => {
  dispatch(skillSlice.actions.addNewSkillRequest());

  try {
    const response = await axios.post(
      `${API_BASE}/skill/add`,
      data,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    dispatch(skillSlice.actions.addNewSkillSuccess(response.data.message));
  } catch (error) {
    dispatch(
      skillSlice.actions.addNewSkillFailed(getError(error))
    );
  }
};

// 🔥 UPDATE SKILL
export const updateSkill = (id, proficiency) => async (dispatch) => {
  dispatch(skillSlice.actions.updateSkillRequest());

  try {
    const response = await axios.put(
      `${API_BASE}/skill/update/${id}`,
      { proficiency },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    dispatch(skillSlice.actions.updateSkillSuccess(response.data.message));
  } catch (error) {
    dispatch(
      skillSlice.actions.updateSkillFailed(getError(error))
    );
  }
};

// 🔥 DELETE SKILL
export const deleteSkill = (id) => async (dispatch) => {
  dispatch(skillSlice.actions.deleteSkillRequest());

  try {
    const response = await axios.delete(
      `${API_BASE}/skill/delete/${id}`
    );

    dispatch(skillSlice.actions.deleteSkillSuccess(response.data.message));
  } catch (error) {
    dispatch(
      skillSlice.actions.deleteSkillFailed(getError(error))
    );
  }
};

export const clearAllSkillErrors = () => (dispatch) => {
  dispatch(skillSlice.actions.clearAllErrors());
};

export const resetSkillSlice = () => (dispatch) => {
  dispatch(skillSlice.actions.resetSkillSlice());
};

export default skillSlice.reducer;


