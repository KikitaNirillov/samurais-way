import React from 'react'
import s from './NavBar.module.scss'
import { NavLink } from 'react-router-dom'

const CreateNavlink = ({ to, title }) => {
    return (
        <li className={s.navBar__list_item}>
            <NavLink to={to} className={s.navBar__list_item_link}>{title}</NavLink>
        </li>
    )
}

const NavBar = () => {
    return (
        <nav className={s.navBar}>
            <ul className={s.navBar__list}>
                <CreateNavlink to='/profile' title='My profile'/>
                <CreateNavlink to='/dialogs' title='Dialogs'/>
                <CreateNavlink to='/users' title='Users'/>
            </ul>
        </nav>
    )
}

export default NavBar