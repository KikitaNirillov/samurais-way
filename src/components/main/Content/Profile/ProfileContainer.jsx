import React from "react"
import { Navigate, useParams } from 'react-router-dom'
import { addPost, requestProfile, onChangeNewPost, setProfile, requestProfileStatus, updateProfileStatus, updateProfileImage } from '../../../../redux/profilePage-reducer'
import Profile from './Profile'
import { connect } from 'react-redux'
import Preloader from '../../../../assets/imgs/preloader.gif'
import { compose } from "redux"
import { getAuthorizedId, getNewPostText, getProfile, getProfilePostsData, getProfileStatus } from "../../../../redux/selectors"
import { useEffect } from "react"

const ProfileContainer = ({ setProfile, requestProfile, requestProfileStatus, ...props }) => {
    const userId = (useParams().userId || props.authorizedId)

    useEffect(() => {
        setProfile(null)
        if (userId) {
            requestProfile(userId)
            requestProfileStatus(userId)
        }
    }, [userId, setProfile, requestProfile, requestProfileStatus])

    if (!userId) {
        return <Navigate to='/login' />
    }
    return (
        (!props.profile) ? <img src={Preloader} alt="preloader" /> : <Profile {...props} userId={userId} />
    )
}

let mapStateToProps = (state) => {
    return {
        profile: getProfile(state),
        profilePostsData: getProfilePostsData(state),
        newPostText: getNewPostText(state),
        profileStatus: getProfileStatus(state),
        authorizedId: getAuthorizedId(state),
    }
}

export default compose(
    connect(mapStateToProps,
        { addPost, onChangeNewPost, requestProfile, setProfile, requestProfileStatus, updateProfileStatus, updateProfileImage }),
)(ProfileContainer)