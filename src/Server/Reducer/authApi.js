import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../common/ConstaltsVariables";
import { logout, selectRefreshToken, setToken } from "./authSlice";
import { orgEndpoints } from "../Payload/orgEndpoints";
import { authEndpoints } from "../Payload/authEndpoints";

const baseQuery = fetchBaseQuery({
  baseUrl: `${BASE_URL}`,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const refreshToken = selectRefreshToken(api.getState());
    if (refreshToken) {
      const refreshResult = await baseQuery(
        {
          url: "/refresh-token",
          method: "POST",
          body: { token: refreshToken },
        },
        api,
        extraOptions
      );

      if (refreshResult.data) {
        api.dispatch(setToken(refreshResult.data.token));
        result = await baseQuery(args, api, extraOptions);
      } else {
        api.dispatch(logout());
      }
    }
  }
  return result;
};

const combinedEndpoints = (builder) => ({
  ...orgEndpoints(builder),
  ...authEndpoints(builder),
});

export const authApi = createApi({
  reducerPath: "authApi",
  // baseQuery: fetchBaseQuery({ baseUrl: "https://ewserver.onrender.com/app" }),
  baseQuery: baseQueryWithReauth,
  endpoints: combinedEndpoints,
});

export const { useGetAllOrgQuery, useSigninMutation } = authApi;
