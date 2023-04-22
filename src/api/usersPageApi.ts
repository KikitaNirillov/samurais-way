import { UsersItemType } from "../components/common/commonTypes"
import { DefaultResponseType, instance } from "./api"

type GetUsersResponse = {
    items: Array<UsersItemType>
    totalCount: number
    error: string | null
}
export const UsersPageAPI = {
    unfollow(userId: number) {
        return instance.delete<DefaultResponseType>(`follow/${userId}`)
            .then(response => response.data)
    },
    follow(userId: number) {
        return instance.post<DefaultResponseType>(`follow/${userId}`)
            .then(response => response.data)
    },
    getUsers(currentPage: number, pageSize: number) {
        return instance.get<GetUsersResponse>(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    }
}