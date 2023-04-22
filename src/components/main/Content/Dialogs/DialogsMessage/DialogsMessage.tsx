import React from 'react'
import s from '../Dialogs.module.scss'

type PropsType = {
    id: number
    message: string
}

const DialogsMessage: React.FC<PropsType> = (props) => {
    return (
        <li className={s.dialogs__messages_list_item}>
            <p className={s.dialogs__messages_list_item_text}>
                {props.message}
            </p>
        </li>
    )
}

export default DialogsMessage