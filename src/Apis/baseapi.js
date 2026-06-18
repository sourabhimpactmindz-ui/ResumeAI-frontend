import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: `${import.meta.env.VITE_PUBLIC_BACKEND_URL}/api`,
  credentials: "include",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithRefresh = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    const refreshResult = await baseQuery(
      { url: "/refresh", method: 'POST' },
      api,
      extraOptions
    );
    console.log("refresh calling", refreshResult)

    if (refreshResult?.data?.token) {
      localStorage.setItem("accessToken", refreshResult.data.token);
      result = await baseQuery(args, api, extraOptions);
    } else {
      localStorage.removeItem("accessToken");
      window.location.href = "/";
    }
  }

  return result;
};

const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithRefresh,
  endpoints: () => ({}),
});

export default baseApi;