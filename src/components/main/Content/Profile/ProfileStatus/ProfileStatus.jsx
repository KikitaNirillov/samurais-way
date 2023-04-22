import React, { useEffect } from 'react'
import { useState } from 'react'
import s from './ProfileStatus.module.scss'

const ProfileStatus = (props) => {

    useEffect(() => {
        setStatus(props.profileStatus)
    }, [props.profileStatus])


    const [editMode, setEditMode] = useState(false)
    const [status, setStatus] = useState(props.profileStatus)

    const activateEditMode = () => {
        setEditMode(true)
    }
    const deactivateEditMode = () => {
        if (props.profileStatus !== status) {
            props.updateProfileStatus(status)
        }
        setEditMode(false)
    }
    const editStatus = (event) => {
        setStatus(event.target.value)
    }

    return (
        <div className={s.status}>
            <p className={s.status_title}>Status (you can change it here if this profile = authorized profile): </p>
            {(!editMode) ? <p onClick={(props.authorizedId === props.userId) ? activateEditMode : null}>{props.profileStatus === '' ||  props.profileStatus ===null ? 'No status' : props.profileStatus}</p>
                : <input type="text" value={status} onChange={editStatus} onBlur={deactivateEditMode} autoFocus={true} />}
        </div>
    )
}
export default ProfileStatus
