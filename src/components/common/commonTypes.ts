import { ThunkAction } from 'redux-thunk';
import { AppStateType } from './../../redux/redux-store';
import { AnyAction } from 'redux'

export type ACWithPayload<type, payload> = {
  type: type
  payload: payload
}
export type ACWithoutPayload<type> = {
  type: type
}

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppStateType,
  unknown,
  AnyAction
>

export type UsersItemType = {
  id: number
  name: string
  status?: string
  photos: {
      small?: string
      large?: string
  }
  followed: boolean
}

export type ProfileType = {
  userId: number
  lookingForAJob: boolean
  lookingForAJobDescription: string
  fullName: string
  aboutMe: string //WARNING
  contacts: {
      github: string
      vk: string
      facebook: string
      instagram: string
      twitter: string
      website: string
      youtube: string
      mainLink: string
  }
  photos?: {
      small?: string
      large?: string
  }
}