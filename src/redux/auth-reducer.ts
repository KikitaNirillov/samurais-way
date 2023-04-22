import { AuthAPI } from '../api/authApi'
import { ACWithoutPayload, ACWithPayload, AppThunk } from './../components/common/commonTypes'
import { addError } from "./app-reducer"

enum authActionList {
    SET_AUTH_USER_DATA = 'SET_AUTH_USER_DATA',
    SET_AUTH_IN_PROCESS = 'SET_AUTH_IN_PROCESS',
    RESET_AUTH_USER_DATA = 'RESET_AUTH_USER_DATA',
    SET_CAPTCHA_URL = 'SET_CAPTCHA',
}

let initialState = {
    id: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false as boolean,
    captchaUrl: null as string | null,
}

type InitialStateType = typeof initialState

type AuthReducerActions = SetAuthUserDataType | ResetAuthUserDataType | SetCaptchaUrlType

const authReducer = (state = initialState, action: AuthReducerActions): InitialStateType => {
    switch (action.type) {
        case authActionList.SET_AUTH_USER_DATA:
            return {
                ...state,
                ...action.payload,
                isAuth: true,
            }
        case authActionList.RESET_AUTH_USER_DATA:
            return {
                ...state,
                ...initialState,
            }
        case authActionList.SET_CAPTCHA_URL:
            return {
                ...state,
                captchaUrl: action.payload,
            }
        default:
            return state
    }
}

type SetAuthUserDataType = ACWithPayload<authActionList.SET_AUTH_USER_DATA, {
    id: number
    login: string
    email: string
}>
const setAuthUserData = (id: number, login: string, email: string): SetAuthUserDataType => ({
    type: authActionList.SET_AUTH_USER_DATA,
    payload: { id, login, email },
})

type ResetAuthUserDataType = ACWithoutPayload<authActionList.RESET_AUTH_USER_DATA>
const resetAuthUserData = (): ResetAuthUserDataType => ({
    type: authActionList.RESET_AUTH_USER_DATA
})

type SetCaptchaUrlType = ACWithPayload<authActionList.SET_CAPTCHA_URL, string>
export const setCaptchaUrl = (captchaUrl: string): SetCaptchaUrlType => ({
    type: authActionList.SET_CAPTCHA_URL,
    payload: captchaUrl,
})

export const getAuthUserData = (): AppThunk<Promise<void>> => (dispatch) => {
    return AuthAPI.getAuthUserData()
        .then(response => {
            if (response.resultCode === 0) {
                let { id, login, email } = response.data
                dispatch(setAuthUserData(id, login, email))
            }
        }
        )
        .catch(error => {
            dispatch(addError(error.message))
        })
}

export const getCaptcha = (): AppThunk => (dispatch) => {
    AuthAPI.getCaptcha()
        .then(data => {
            dispatch(setCaptchaUrl(data.url))
        })
        .catch(error => {
            dispatch(addError(error.message))
        })
}

export const login = (values: any, setStatus: any): AppThunk => (dispatch) => {
    AuthAPI.login(values)
        .then(data => {
            if (data.resultCode === 0) {
                dispatch(getAuthUserData())
            }
            else if (data.resultCode === 10) {
                setStatus('Please, сonfirm that you are not a robot (captcha is not case sensitive) and recheck the entered data')
                dispatch(getCaptcha())
            }
            else {
                setStatus(data.messages[0])
            }
        })
        .catch(error => {
            dispatch(addError(error.message))
        })
}

export const logout = (): AppThunk => (dispatch) => {
    AuthAPI.logout()
        .then(data => {
            if (data.resultCode === 0) {
                dispatch(resetAuthUserData())
            }
        })
        .catch(error => {
            dispatch(addError(error.message))
        })
}

export default authReducer

