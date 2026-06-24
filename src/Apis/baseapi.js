import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: `${import.meta.env.VITE_PUBLIC_BACKEND_URL}/api`,
  credentials: "include",
  // When using httpOnly cookies for authentication, do not set Authorization headers
  // here or attempt to read tokens from `localStorage` — the server will read cookies.
  prepareHeaders: (headers) => headers,
});

const baseQueryWithRefresh = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    // Attempt silent refresh using httpOnly refresh cookie. The server should
    // set new auth cookies if refresh succeeds. No refresh token is sent from
    // JS when using httpOnly cookies — `credentials: 'include'` ensures cookies
    // are sent along with this request.
    const refreshResult = await baseQuery(
      { url: "/refresh", method: 'POST' },
      api,
      extraOptions
    );

    console.log("refresh calling", refreshResult);

    // If refresh failed, clear any client-side tokens and let UI handle logout.
    if (refreshResult?.error) {
      localStorage.removeItem("accessToken");
    } else {
      // Retry the original request after successful refresh.
      result = await baseQuery(args, api, extraOptions);
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