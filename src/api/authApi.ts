import { DefaultResponseType, instance } from "./api"

type GetAuthUserDataResponse = DefaultResponseType<{
    id: number
    email: string 
    login: string
}>

type GetCaptchaResponse = {
    url: string
}
export const AuthAPI = {
    getAuthUserData() {
        return instance.get<GetAuthUserDataResponse>(`auth/me`)
            .then(response => response.data)
    },
    login(values: any) {
        const { email, password, rememberMe, captcha } = values
        return instance.post<DefaultResponseType>('auth/login', { email, password, rememberMe, captcha })
            .then(response => response.data)
    },
    logout() {
        return instance.delete<DefaultResponseType>('auth/login')
            .then(response => response.data)
    },
    getCaptcha() {
        return instance.get<GetCaptchaResponse>('security/get-captcha-url')
            .then(response => response.data)
    },
}