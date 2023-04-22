// this file was create at the beginning of the beginning and serves me as a cheat sheet:) no more than
import profilePageReducer from './profilePage-reducer'
import dialogsPageReducer from './dialogsPage-reducer'

let store = {
    _state: {
        dialogsPage: {
            dialogsUsersData: [
                { id: 1, name: 'Маша' },
                { id: 2, name: 'Паша' },
                { id: 3, name: 'Саша' },
                { id: 4, name: 'Ксюша' }
            ],
            dialogsMessagesData: [
                { id: 1, message: 'ТЫ ЛОХ' },
                { id: 2, message: 'НЕТ, ТЫ' },
                { id: 3, message: 'КТО, Я? ДА ИДИ ТЫ К ЧЕРТУ, ПОНЯЛ, ДА, ДРУЖОЧЕК?' }
            ],
            newMessageText: '',
        },
        profilePage: {
            profilePostsData: [
                { id: 1, post: 'Я ЛУЧШИЙ В МИРЕ' },
                { id: 2, post: 'КТО Я?' },
                { id: 3, post: 'Аянами Рей...' },
            ],
            newPostText: '',
        }
    },
    _callSubscriber() { }, // уведомить об изменении

    getState() {
        return this._state
    },
    subscribe(observer) {
        this._callSubscriber = observer // перенимает из index.js перерисовку (ф-ия подписки на изменения)
    },

    dispatch(action) {
        profilePageReducer(this._state.profilePage, action)
        dialogsPageReducer(this._state.dialogsPage, action)
        this._callSubscriber(this._state)
    },
}

export default store

