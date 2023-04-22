import { ACWithPayload, AppThunk } from './../components/common/commonTypes'

enum appActionList {
    SET_INITIALIZATION = 'SET_INITIALIZATION',
    ADD_ERROR = 'ADD_ERROR',
    REMOVE_ERROR = 'REMOVE_ERROR',
}

let initialState = {
    initialization: false as boolean,
    errors: [] as Array<string>,
}

type InitialStateType = typeof initialState

type AppReducerActions = SetInitializationType | RemoveErrorType | AddErrorType

const appReducer = (state = initialState, action: AppReducerActions): InitialStateType => {
    switch (action.type) {
        case appActionList.SET_INITIALIZATION:
            return {
                ...state,
                initialization: action.payload,
            }
        case appActionList.ADD_ERROR:
            return {
                ...state,
                errors: [...state.errors, action.payload],
            }
        case appActionList.REMOVE_ERROR:
            return {
                ...state,
                errors: state.errors.filter(item => item !== action.payload),
            }
        default:
            return state
    }
}

type SetInitializationType = ACWithPayload<appActionList.SET_INITIALIZATION, boolean>
export const setInitialization = (isInitialized: boolean): SetInitializationType => ({
    type: appActionList.SET_INITIALIZATION,
    payload: isInitialized,
})

type RemoveErrorType = ACWithPayload<appActionList.REMOVE_ERROR, string>
const removeError = (error: string): RemoveErrorType => ({
    type: appActionList.REMOVE_ERROR,
    payload: error,
})

type AddErrorType = ACWithPayload<appActionList.ADD_ERROR, string>
const addErrorActionCreator = (error: string): AddErrorType => ({
    type: appActionList.ADD_ERROR,
    payload: error,
})

export const addError = (error: string): AppThunk => (dispatch) => {
    dispatch(addErrorActionCreator(error))
    setTimeout(() => {
        dispatch(removeError(error))
    }, 4000)
}

export default appReducer