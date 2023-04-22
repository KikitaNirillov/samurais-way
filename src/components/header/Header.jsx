import React from 'react'
import s from './Header.module.scss'
import { NavLink } from 'react-router-dom'
import displayIfAuthorized from '../common/displayIfAuthorized'
import logoutIcon from '../../assets/imgs/logoutIcon.png'

const Header = (props) => {
    return (
        <header className={s.header}>
            <div className={`${s.header_container} container`}>
                <p className={s.header_logo}>SocialMediaForPortfolio</p>
                <div className={s.header_interface}>
                    {(!props.isAuth) ? <NavLink to='/login' className={s.header_interface_login}>Login</NavLink>
                        : <p className={s.header_interface_login}>Authorized: {props.login}</p>}
                    {displayIfAuthorized((
                        <ul className={s.header_interface_iconsList}>
                            <li>
                                <button onClick={props.logout} title="Logout">
                                    <img src={logoutIcon} className={s.header_interface_iconsList_icon} alt="exit" />
                                </button>
                            </li>
                        </ul>
                    ), props.isAuth)}
                </div>
            </div>
        </header>
    )
}

export default Header