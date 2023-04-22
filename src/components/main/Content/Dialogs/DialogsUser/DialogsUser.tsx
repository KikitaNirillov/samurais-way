import React from 'react'
import { NavLink } from 'react-router-dom'
import s from '../Dialogs.module.scss'

type PropsType = {
    id: number
    name: string
}

const DialogsUser: React.FC<PropsType> = (props) => {
    let path = '/dialogs/' + props.id
    return (
        <li className={s.dialogs__usersList_item}>
            <NavLink to={path} className={s.dialogs__usersList_item_link}>
                {props.name}
            </NavLink>
        </li>
    )
}

export default DialogsUser