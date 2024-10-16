import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token") || null,
    refreshToken: localStorage.getItem("refreshToken") || null,
    org: JSON.parse(localStorage.getItem("org")) || null,
    orgType: JSON.parse(localStorage.getItem("orgType")) || [],
    rollList: JSON.parse(localStorage.getItem("rollList")) || [],
    roll: JSON.parse(localStorage.getItem("roll")) || null,
    user: JSON.parse(localStorage.getItem("user")) || null,
    menuList: JSON.parse(localStorage.getItem("menuList")) || [],
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
    setRefreshToken: (state, action) => {
      state.refreshToken = action.payload;
      localStorage.setItem("refreshToken", action.payload);
    },
    orgData: (state, action) => {
      state.org = action.payload;
      localStorage.setItem("org", JSON.stringify(action.payload));
    },
    orgTypeData: (state, action) => {
      state.orgType = action.payload;
      localStorage.setItem("orgType", JSON.stringify(action.payload));
    },
    createRollList: (state, action) => {
      state.rollList = action.payload;
      localStorage.setItem("rollList", JSON.stringify(action.payload));
    },
    rollData: (state, action) => {
      state.roll = action.payload;
      localStorage.setItem("roll", JSON.stringify(action.payload));
    },
    userData: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    createMenuList: (state, action) => {
      state.menuList = action.payload;
      localStorage.setItem("menuList", JSON.stringify(action.payload));
    },
    // createRollList: (state, action) => {
    //   state.rollList = action.payload;
    //   localStorage.setItem("rollList", JSON.stringify(action.payload));
    // },
    logout: (state) => {
      state.token = null;
      state.refreshToken = null;
      state.org = null;
      state.rollList = [];
      state.roll = null;
      state.user = null;
      state.orgType = [];
      state.menuList = [];
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("org");
      localStorage.removeItem("rollList");
      localStorage.removeItem("roll");
      localStorage.removeItem("user");
      localStorage.removeItem("orgType");
      localStorage.removeItem("menuList");
    },
  },
});

export const {
  setToken,
  setRefreshToken,
  logout,
  createRollList,
  rollData,
  orgData,
  userData,
  orgTypeData,
  createMenuList,
} = authSlice.actions;

export const selectToken = (state) => state.auth.token;
export const selectRefreshToken = (state) => state.auth.refreshToken;
export const selectOrg = (state) => state.auth.org;
export const getRollList = (state) => state.auth.rollList;
export const selectRoll = (state) => state.auth.roll;
export const selectUser = (state) => state.auth.user;
export const getOrgType = (state) => state.auth.orgType;
export const getMenuList = (state) => state.auth.menuList;

export default authSlice.reducer;
