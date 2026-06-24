import {
  createApi,
  fetchBaseQuery
} from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl:
    `${import.meta.env.VITE_PUBLIC_BACKEND_URL}/api`,

  prepareHeaders: (headers) => {
    const token =
      localStorage.getItem(
        "accessToken"
      );

    if (token) {
      headers.set(
        "Authorization",
        `Bearer ${token}`
      );
    }

    return headers;
  },
});

const baseQueryWithRefresh = async (
  args,
  api,
  extraOptions
) => {

  let result = await baseQuery(
    args,
    api,
    extraOptions
  );

  if (
    result?.error?.status === 401
  ) {

    const provider =
      localStorage.getItem(
        "authProvider"
      );

    // Google Login
    if (provider === "google") {

      localStorage.removeItem(
        "accessToken"
      );

      localStorage.removeItem(
        "authProvider"
      );

      window.location.href = "/";

      return result;
    }

    // Local Login
    const refreshResult =
      await baseQuery(
        {
          url: "/refresh",
          method: "POST",
          body: {
            refreshToken:
              localStorage.getItem(
                "refreshToken"
              ),
          },
        },
        api,
        extraOptions
      );

    if (
      refreshResult?.data?.accessToken
    ) {

      localStorage.setItem(
        "accessToken",
        refreshResult.data
          .accessToken
      );

      if (
        refreshResult?.data
          ?.refreshToken
      ) {
        localStorage.setItem(
          "refreshToken",
          refreshResult.data
            .refreshToken
        );
      }

      result = await baseQuery(
        args,
        api,
        extraOptions
      );

    } else {

      localStorage.clear();

      window.location.href = "/";
    }
  }

  return result;
};

const baseApi = createApi({
  reducerPath: "api",
  baseQuery:
    baseQueryWithRefresh,
  endpoints: () => ({}),
});

export default baseApi;