import { CommonAlert } from "../../common/CommonAlert";
import {
  orgData,
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

        CommonAlert(data?.msg, "success");
        dispatch(setToken(data?.data?.token));
        dispatch(setRefreshToken(data?.data?.refreshToken));
        dispatch(orgData(data?.data?.userData?.Organization));
        dispatch(rollData(data?.data?.userData?.Roll));
        dispatch(
          userData({
            _id: data?.data?.userData?._id,
            name: data?.data?.userData?.name,
            email: data?.data?.userData?.email,
            gender: data?.data?.userData?.gender,
            phoneNo: data?.data?.userData?.phoneNo,
          })
        );
      } catch (err) {
        console.error("Login failed: ", err);
      }
    },
  }),
});
