import axios from "axios"

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: { 'API-KEY': 'c1af828d-57cf-4425-95d6-c4cdfa887039' }
})

export type DefaultResponseType<DataType=any> = { //any, because in the api most responseData was designated as "some additional data" and no more
    resultCode: number
    messages: Array<string>
    data: DataType
}



