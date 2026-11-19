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
      query: (arg) => {
        const id = typeof arg === "object" ? arg?.id : arg;
        const nonce = typeof arg === "object" && arg?.nonce ? arg.nonce : Date.now();
        return {
          url: `/resume/status/${id}?_t=${nonce}`,
          method: "GET",
        };
      },
      keepUnusedDataFor: 0,
    }),
  }),
});

export const { useUplodeResumeMutation, useGetResumeStatusQuery } = ResumeApi;
