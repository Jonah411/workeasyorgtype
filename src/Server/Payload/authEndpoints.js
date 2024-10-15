import { CommonAlert } from "../../common/CommonAlert";
import {
  orgData,
  orgTypeData,
  rollData,
  setRefreshToken,
  setToken,
  userData,
} from "../Reducer/authSlice";

export const authEndpoints = (builder) => ({
  getAllOrg: builder.query({
    query: () => `/org/getAllorg`,
  }),
  signin: builder.mutation({
    query: (user) => ({
      url: "/auth/signin",
      method: "POST",
      body: user,
    }),
    onQueryStarted: async (user, { dispatch, queryFulfilled }) => {
      try {
        const { data } = await queryFulfilled;
        console.log(data);

        CommonAlert(data?.msg, "success");
        dispatch(setToken(data?.data?.token));
        dispatch(setRefreshToken(data?.data?.refreshToken));
        dispatch(orgData(data?.data?.userData?.Organization));
        dispatch(rollData(data?.data?.userData?.Roll));
        dispatch(orgTypeData(data?.data?.userData?.orgtype));
        dispatch(userData(data?.data?.userData));
      } catch (err) {
        console.error("Login failed: ", err);
      }
    },
  }),
});
