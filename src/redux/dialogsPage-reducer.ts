import { ACWithPayload, ACWithoutPayload } from './../components/common/commonTypes'

enum dialogsPageActionList {
    SEND_MESSAGE = 'SEND_MESSAGE',
    CHANGE_MESSAGE = 'CHANGE_MESSAGE',
}

export type DialogsUsersDataItemType = {
    id: number
    name: string
}
export type DialogsMessagesDataItemType = {
    id: number
    message: string
}

let initialState = {
    dialogsUsersData: [
        { id: 1, name: 'Marie' },
        { id: 2, name: 'Pavel' },
        { id: 3, name: 'Alex' },
        { id: 4, name: 'Ksenia' }
    ] as Array<DialogsUsersDataItemType>,
    dialogsMessagesData: [
        { id: 1, message: 'You so cute' },
        { id: 2, message: 'No, thats a lie' },
        { id: 3, message: 'Ok, you look like potato)' }
    ] as Array<DialogsMessagesDataItemType>,
    newMessageText: '' as string,
}

type InitialStateType = typeof initialState

export type DialogsPageReducerActions = SendMessageType | OnChangeMessage

let dialogsPageReducer = (state = initialState, action: DialogsPageReducerActions): InitialStateType => {
    switch (action.type) {
        case dialogsPageActionList.SEND_MESSAGE:
            return {
                ...state,
                dialogsMessagesData: [...state.dialogsMessagesData, {
                    id: state.dialogsMessagesData.length + 1,
                    message: state.newMessageText,
                }],
                newMessageText: '',
            }
        case dialogsPageActionList.CHANGE_MESSAGE:
            return {
                ...state,
                newMessageText: action.payload,
            }
        default:
            return state
    }
}

type SendMessageType = ACWithoutPayload<dialogsPageActionList.SEND_MESSAGE>
export let sendMessage = (): SendMessageType => ({ type: dialogsPageActionList.SEND_MESSAGE })

type OnChangeMessage = ACWithPayload<dialogsPageActionList.CHANGE_MESSAGE, string>
export let onChangeMessage = (text: string): OnChangeMessage => (
    { type: dialogsPageActionList.CHANGE_MESSAGE, payload: text }
)

export default dialogsPageReducer

