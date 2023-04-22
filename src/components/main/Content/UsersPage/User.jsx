import React from 'react'
import userImg from '../../../../assets/imgs/user.png'
import { NavLink } from 'react-router-dom'
import s from './UsersPage.module.scss'

const User = ({user, ...props}) => {
    return (
        <li className={s.usersPage_list_item}>
            <NavLink to={'/profile/' + user.id}>
                <img src={user.photos.small == null ? userImg : user.photos.small} alt="avatar" className={s.usersPage_list_item_avatar} />
            </NavLink>
            <div className={s.usersPage_list_item_info}>
                <p className={s.usersPage_list_item_info_fullName}>{user.name}</p>
                <p className={s.usersPage_list_item_status}>{user.status}</p>
            </div>
            {user.followed ?
                <button disabled={props.followingInProcess.some(id => id === user.id)}
                    onClick={() => { props.unfollowRequest(user.id) }}
                    className={s.usersPage_list_item_btn}>Unsubscribe</button>
                : <button disabled={props.followingInProcess.some(id => id === user.id)}
                    onClick={() => { props.followRequest(user.id) }}
                    className={s.usersPage_list_item_btn}>Subscribe</button>
            }
        </li>
    )
}

export default User