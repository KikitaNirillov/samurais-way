import { ProfilePageAPI } from '../api/profilePageApi'
import { ACWithPayload, ACWithoutPayload, AppThunk, ProfileType } from './../components/common/commonTypes'
import { addError } from "./app-reducer"

enum profilePageActionList {
    ADD_POST = 'ADD-POST',
    CHANGE_POST = 'CHANGE-POST',
    SET_PROFILE = 'SET_PROFILE',
    SET_PROFILE_STATUS = 'SET_PROFILE_STATUS',
    SET_PROFILE_IMAGE = 'SET_PROFILE_IMAGE',
}

export type ProfilePostsDataItemType = {
    id: number
    post: string
}

let initialState = {
    profilePostsData: [
        { id: 1, post: '- Who am I?' },
        { id: 2, post: 'Ayanami Rey.' },
        { id: 3, post: '- Who are you?' },
    ] as Array<ProfilePostsDataItemType>,
    newPostText: '' as string,
    profile: null as ProfileType | null,
    profileStatus: null as string | null,
}

type InitialStateType = typeof initialState

export type ProfilePageReducerActions = AddPostType | OnChangeNewPost | SetProfile | SetProfileStatus

let profilePageReducer = (state = initialState, action: ProfilePageReducerActions): InitialStateType => {
    switch (action.type) {
        case profilePageActionList.CHANGE_POST:
            return {
                ...state,
                newPostText: action.payload,
            }
        case profilePageActionList.ADD_POST:
            return {
                ...state,
                profilePostsData: [...state.profilePostsData, {
                    id: state.profilePostsData.length + 1,
                    post: state.newPostText,
                }],
                newPostText: '',
            }
        case profilePageActionList.SET_PROFILE:
            return {
                ...state,
                profile: action.payload,
            }
        case profilePageActionList.SET_PROFILE_STATUS:
            return {
                ...state,
                profileStatus: action.payload,
            }
        default:
            return state
    }
}

type AddPostType = ACWithoutPayload<profilePageActionList.ADD_POST>
export let addPost = (): AddPostType => (
    { type: profilePageActionList.ADD_POST }
)

type OnChangeNewPost = ACWithPayload<profilePageActionList.CHANGE_POST, string>
export let onChangeNewPost = (text: string): OnChangeNewPost => (
    { type: profilePageActionList.CHANGE_POST, payload: text }
)

type SetProfile = ACWithPayload<profilePageActionList.SET_PROFILE, ProfileType>
export let setProfile = (profile: ProfileType): SetProfile => (
    { type: profilePageActionList.SET_PROFILE, payload: profile }
)

type SetProfileStatus = ACWithPayload<profilePageActionList.SET_PROFILE_STATUS, string>
export const setProfileStatus = (status: string): SetProfileStatus => (
    { type: profilePageActionList.SET_PROFILE_STATUS, payload: status }
)

export const requestProfileStatus = (userId: number): AppThunk => (dispatch) => {
    ProfilePageAPI.requestProfileStatus(userId)
        .then(data => {
            dispatch(setProfileStatus(data))
        })
        .catch(error => {
            dispatch(addError(error.message))
        })
}

export const updateProfileStatus = (status: string): AppThunk => (dispatch) => {
    ProfilePageAPI.updateProfileStatus(status)
        .then(data => {
            if (data.resultCode === 0) {
                dispatch(setProfileStatus(status))
            }
        })
        .catch(error => {
            dispatch(addError(error.message))
        })
}

export const requestProfile = (userId: number): AppThunk => (dispatch) => {
    ProfilePageAPI.requestProfile(userId)
        .then(data => {
            dispatch(setProfile(data))
        })
        .catch(error => {
            dispatch(addError(error.message))
        })
}

export const updateProfileImage = (file: File, setStatus: any): AppThunk => (dispatch, getState) => {
    ProfilePageAPI.updateProfileImage(file)
        .then(data => {
            if (data.resultCode === 0) {
                dispatch(requestProfile(getState().profilePage.profile!.userId))
            }
            else {
                setStatus(data.messages[0])
            }
        })
        .catch(error => {
            dispatch(addError(error.message))
        })
}

export const updateProfileInfo = (info: any, setStatus: any): AppThunk => (dispatch, getState) => {
    ProfilePageAPI.updateProfileInfo(info, getState().profilePage.profile!.userId)
        .then(data => {
            if (data.resultCode === 0) {
                dispatch(requestProfile(getState().profilePage.profile!.userId))
            }
            else {
                setStatus(data.messages[0])
            }
        })
        .catch(error => {
            dispatch(addError(error.message))
        })
}


export default profilePageReducer

