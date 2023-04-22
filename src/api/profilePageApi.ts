import { ProfileType } from "../components/common/commonTypes"
import { DefaultResponseType, instance } from "./api"

type RequestProfileResponse = ProfileType
type UpdateProfileImageResponse = DefaultResponseType<{
    small?: string
    large?: string
}> 
export const ProfilePageAPI = {
    requestProfile(userId: number) {
        return instance.get<RequestProfileResponse>('profile/' + userId)
            .then(response => response.data)
    },
    requestProfileStatus(userId: number) {
        return instance.get<string>('profile/status/' + userId)
            .then(response => response.data)
    },
    updateProfileStatus(status: string) {
        return instance.put<DefaultResponseType>('/profile/status', { status: status })
            .then(response => response.data)
    },
    updateProfileInfo(info: any, userId: number) {
        return instance.put<DefaultResponseType>('/profile', { ...info, userId: userId })
            .then(response => response.data)
    },
    updateProfileImage(file: File) {
        const formData = new FormData()
        formData.append('image', file)
        return instance.put<UpdateProfileImageResponse>('/profile/photo', formData, {
            headers: {
                'Content-type': 'multipart/form-data'
            }
        })
            .then(response => response.data)
    }
}
