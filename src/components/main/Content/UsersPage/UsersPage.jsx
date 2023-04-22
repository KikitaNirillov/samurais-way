import React from 'react'
import s from './UsersPage.module.scss'
import Paginator from '../../../common/Paginator'
import User from './User'
import Preloader from '../../../../assets/imgs/preloader.gif'

let UsersPage = (props) => {
    return (
        <div className={s.usersPage}>
            <ul className={s.usersPage_list}>
                {!props.isLoaded ? <img src={Preloader} alt="preloader" /> :
                    props.users.map(
                        user =>
                            <User user={user}
                                key={user.id}
                                followingInProcess={props.followingInProcess}
                                unfollowRequest={props.unfollowRequest}
                                followRequest={props.followRequest}
                            />
                    )
                }
            </ul>
            <div className={props.isLoaded ? s.usersPage_pageButtons : 'visually-hidden'}>
                <Paginator
                    itemsMaxCount={10}
                    onPageChanged={props.onPageChanged}
                    totalCount={props.totalUserCount}
                    pageSize={props.pageSize}
                />
            </div>
        </div>
    )
}

export default UsersPage