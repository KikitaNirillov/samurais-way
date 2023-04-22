import { DialogsMessagesDataItemType, DialogsUsersDataItemType, onChangeMessage, sendMessage } from '../../../../redux/dialogsPage-reducer'
import Dialogs from './Dialogs'
import { connect } from 'react-redux'
import { withAuthredirect } from '../../../hoc/withAuthRedirect'
import { compose } from 'redux'
import { AppStateType } from '../../../../redux/redux-store'

type StatePropsType = {
    dialogsUsersData: Array<DialogsUsersDataItemType>
    dialogsMessagesData: Array<DialogsMessagesDataItemType>
    newMessageText: string
}

type DispatchPropsType = {
    sendMessage: () => void
    onChangeMessage: (newMessageText: string) => void
}

export type DialogsPropsType = StatePropsType & DispatchPropsType

let mapStateToProps = (state: AppStateType): StatePropsType => {
    return {
        dialogsUsersData: state.dialogsPage.dialogsUsersData,
        dialogsMessagesData: state.dialogsPage.dialogsMessagesData,
        newMessageText: state.dialogsPage.newMessageText,
    }
}

export default compose<React.Component>(
    // <TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = DefaultState>
    connect<StatePropsType, DispatchPropsType, null, AppStateType>(mapStateToProps, { sendMessage, onChangeMessage }),
    withAuthredirect<DialogsPropsType>,
)(Dialogs)