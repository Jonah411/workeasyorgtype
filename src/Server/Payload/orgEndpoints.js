export const orgEndpoints = (builder) => ({
  getAllOrg: builder.query({
    query: () => `/org/getAllorg`,
  }),
});
