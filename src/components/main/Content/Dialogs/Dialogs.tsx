import React, { ChangeEvent } from 'react'
import s from './Dialogs.module.scss'
import DialogsUser from './DialogsUser/DialogsUser'
import DialogsMessage from './DialogsMessage/DialogsMessage'
import { DialogsPropsType } from './DialogsContainer'

const Dialogs: React.FC<DialogsPropsType> = (props) => {

    let dialogsUsersElements = props.dialogsUsersData.map(
        dialogsUser => <DialogsUser id={dialogsUser.id} name={dialogsUser.name} key={dialogsUser.id} />
    )

    let dialogsMessagesElements = props.dialogsMessagesData.map(
        dialogsMessage => <DialogsMessage id={dialogsMessage.id} message={dialogsMessage.message} key={dialogsMessage.id} />
    )

    let sendMessage = () => {
        props.sendMessage()
    }

    let onChangeNewMessage = (event: ChangeEvent<HTMLTextAreaElement>) => {
        let newMessageText = event.target.value
        props.onChangeMessage(newMessageText)
    }

    return (
        <div className={s.dialogs}>
            <ul className={s.dialogs__usersList}>
                {dialogsUsersElements}
            </ul>
            <div className={s.dialogs__messages}>
                <h2>(This form was done at the beginning just for training, actually, it doesn't work correctly)</h2>
                <ul className={s.dialogs__messages_list}>
                    {dialogsMessagesElements}
                </ul>
                <textarea onChange={onChangeNewMessage} value={props.newMessageText} />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    )
}

export default Dialogs