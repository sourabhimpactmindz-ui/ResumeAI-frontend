import baseApi from "./baseapi";


export const userApi = baseApi.injectEndpoints({
    endpoints : (builder) => ({
        LoginUser : builder.mutation({
            query : (data) => ({
                url : '/login',
                method : 'POST',
                body : data,
            }),
        }),

        SignupUser : builder.mutation({
            query : (data) => ({
                url : '/signup',
                method : 'POST',
                body : data,
            }),
        }),

        VerifyOtp : builder.mutation({
            query : (data) => ({
                url : "/verify-otp",
                method : "POST",
                body : data
            }),
        }),

        ResendOtp : builder.mutation({
            query : (data) => ({
                url : "/resend-otp",
                method : "POST",
                body : data
            }),
        }),

        GoogleLogin : builder.mutation({
            query : (data) => ({
                url : "/google-login",
                method : "POST",
                body : data
            })
        })

    })

})

export const {useLoginUserMutation , useSignupUserMutation , useVerifyOtpMutation , useResendOtpMutation , useGoogleLoginMutation} = userApi;