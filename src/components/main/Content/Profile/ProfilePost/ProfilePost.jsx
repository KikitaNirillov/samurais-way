import React from 'react'
import s from './ProfilePost.module.scss'

const ProfilePost = React.memo(({post}) => {
    return (
        <li className={s.post}>
            <p>{post}</p>
        </li >
    )
})

export default ProfilePost