import baseApi from "./baseapi";


export const ResumeApi = baseApi.injectEndpoints({
    endpoints : (builder) => ({
        UplodeResume : builder.mutation({
            query : (FormData) => ({
                url : '/upload',
                method : 'POST',
                body : FormData
            })
        })
    })
})

export const {useUplodeResumeMutation} = ResumeApi