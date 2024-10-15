import { getDecryptData } from "../../common/encrypt";
import { createMenuList, createRollList } from "../Reducer/authSlice";

export const menuEndpoints = (builder) => ({
  getAllMenu: builder.query({
    query: (orgId) => `/auth/menu/getallmenus/${orgId}`,
    async onQueryStarted(arg, { dispatch, queryFulfilled }) {
      try {
        const { data } = await queryFulfilled;
        const menuDatas = getDecryptData(data?.data);
        const menuList = JSON.parse(menuDatas);
        dispatch(createMenuList(menuList));
      } catch (err) {
        console.error("Fetching rolls failed: ", err);
      }
    },
  }),
  getAllRoll: builder.query({
    query: (data) => `/auth/roll/getallrolls/${data?.orgId}/${data?.orgtypeId}`,
    async onQueryStarted(arg, { dispatch, queryFulfilled }) {
      try {
        const { data } = await queryFulfilled;
        const rollDatas = getDecryptData(data?.data);
        const rollList = JSON.parse(rollDatas);
        dispatch(createRollList(rollList));
      } catch (err) {
        console.error("Fetching rolls failed: ", err);
      }
    },
  }),
  UpdateAllRoll: builder.mutation({
    query: (formData) => ({
      url: `/auth/roll/updateallroll`,
      method: "POST",
      body: formData,
    }),
  }),
});
