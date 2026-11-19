import baseApi from "./baseapi";

export const ResumeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    UplodeResume: builder.mutation({
      query: (FormData) => ({
        url: "/upload",
        method: "POST",
        body: FormData,
      }),
    }),

  GetResumeStatus: builder.query({
  query: ({ id }) => ({
    url: `/resume/status/${id}`,
    method: "GET",
  }),
  keepUnusedDataFor: 0,
}),
  }),
});

export const { useUplodeResumeMutation, useGetResumeStatusQuery } = ResumeApi;