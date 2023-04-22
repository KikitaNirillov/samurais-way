import { UsersPageAPI } from '../api/usersPageApi'
import { ACWithPayload, AppThunk, UsersItemType } from './../components/common/commonTypes'
import { addError } from "./app-reducer"

enum usersPageActionList {
    FOLLOW = 'FOLLOW',
    UNFOLLOW = 'UNFOLLOW',
    SET_USERS = 'SET_USERS',
    SET_TOTAL_COUNT = 'SET_TOTAL_COUNT',
    SET_CURRENT_PAGE = 'SET_CURRENT_PAGE',
    SET_IS_LOADED = 'SET_IS_LOADED',
    SET_FOLLOWING_IN_PROCESS = 'SET_FOLLOWING_IN_PROCESS',
}

let initialState = {
    users: [] as Array<UsersItemType>,
    pageSize: 4 as number, // максимальное количество пользователей на страницу
    totalUserCount: 0 as number,
    isLoaded: false as boolean,
    followingInProcess: [] as Array<number>,
}

type InitialStateType = typeof initialState

export type UsersPageReducerActions = SetUsersType | FollowType | UnfollowType |
    SetTotalCountType | SetIsLoadedType | SetFollowingInProcessType

const usersPageReducer = (state = initialState, action: UsersPageReducerActions): InitialStateType => {
    switch (action.type) {
        case usersPageActionList.FOLLOW:
            return {
                ...state,
                users: state.users.map(user =>
                    user.id === action.payload ? { ...user, followed: true } : user
                ),
            }
        case usersPageActionList.UNFOLLOW:
            return {
                ...state,
                users: state.users.map(user =>
                    user.id === action.payload ? { ...user, followed: false } : user
                ),
            }
        case usersPageActionList.SET_USERS:
            return {
                ...state,
                users: [...action.payload],
            }
        case usersPageActionList.SET_TOTAL_COUNT:
            return {
                ...state,
                totalUserCount: action.payload,
            }
        case usersPageActionList.SET_IS_LOADED:
            return {
                ...state,
                isLoaded: action.payload,
            }
        case usersPageActionList.SET_FOLLOWING_IN_PROCESS:
            return {
                ...state,
                followingInProcess: (action.payload.isInProcess) ? [...state.followingInProcess, action.payload.userId]
                    : state.followingInProcess.filter(id => id !== action.payload.userId)
            }
        default:
            return state
    }
}


type SetUsersType = ACWithPayload<usersPageActionList.SET_USERS, Array<UsersItemType>>
export const setUsers = (users: Array<UsersItemType>): SetUsersType => ({
    type: usersPageActionList.SET_USERS,
    payload: users,
})

type FollowType = ACWithPayload<usersPageActionList.FOLLOW, number>
export const follow = (id: number): FollowType => ({
    type: usersPageActionList.FOLLOW,
    payload: id,
})

type UnfollowType = ACWithPayload<usersPageActionList.UNFOLLOW, number>
export const unfollow = (id: number): UnfollowType => ({
    type: usersPageActionList.UNFOLLOW,
    payload: id,
})

type SetTotalCountType = ACWithPayload<usersPageActionList.SET_TOTAL_COUNT, number>
export const setTotalCount = (totalCount: number): SetTotalCountType => ({
    type: usersPageActionList.SET_TOTAL_COUNT,
    payload: totalCount,
})

type SetIsLoadedType = ACWithPayload<usersPageActionList.SET_IS_LOADED, boolean>
export const setIsLoaded = (isLoad: boolean): SetIsLoadedType => ({
    type: usersPageActionList.SET_IS_LOADED,
    payload: isLoad,
})

type SetFollowingInProcessType = ACWithPayload<usersPageActionList.SET_FOLLOWING_IN_PROCESS, {
    isInProcess: boolean
    userId: number
}>
export const setFollowingInProcess = (isInProcess: boolean, userId: number): SetFollowingInProcessType => ({
    type: usersPageActionList.SET_FOLLOWING_IN_PROCESS,
    payload: {
        isInProcess,
        userId
    }
})

export const getUsers = (currentPage: number, pageSize: number): AppThunk => (dispatch) => {
    UsersPageAPI.getUsers(currentPage, pageSize)
        .then(data => {
            dispatch(setUsers(data.items))
            dispatch(setTotalCount(data.totalCount))
            dispatch(setIsLoaded(true))
        })
        .catch(error => {
            dispatch(addError(error.message))
        })
}

export const unfollowRequest = (userId: number): AppThunk => (dispatch) => {
    dispatch(setFollowingInProcess(true, userId))
    UsersPageAPI.unfollow(userId)
        .then(data => {
            if (data.resultCode === 0) {
                dispatch(unfollow(userId))
            }
            dispatch(setFollowingInProcess(false, userId))
        })
        .catch(error => {
            dispatch(addError(error.message))
        })
}

export const followRequest = (userId: number): AppThunk => (dispatch) => {
    dispatch(setFollowingInProcess(true, userId))
    UsersPageAPI.follow(userId)
        .then(data => {
            if (data.resultCode === 0) {
                dispatch(follow(userId))
            }
            dispatch(setFollowingInProcess(false, userId))
        })
        .catch(error => {
            dispatch(addError(error.message))
        })
}


export default usersPageReducer
