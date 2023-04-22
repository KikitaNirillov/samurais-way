import { AppStateType } from './redux-store'

export const getAuthorizedId = (state: AppStateType) => {
    return state.auth.id
}

export const getProfile = (state: AppStateType) => {
    return state.profilePage.profile
}

export const getProfilePostsData = (state: AppStateType) => {
    return state.profilePage.profilePostsData
}

export const getNewPostText = (state: AppStateType) => {
    return state.profilePage.newPostText
}

export const getProfileStatus = (state: AppStateType) => {
    return state.profilePage.profileStatus
}
