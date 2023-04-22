import { connect } from "react-redux"
import { getAuthorizedId, getProfile } from "../../../../../redux/selectors"
import ProfileEditingInfo from "./ProfileEditingInfo"
import { requestProfile, setProfile, updateProfileInfo } from '../../../../../redux/profilePage-reducer'
import { compose } from "redux"
import { withAuthredirect } from "../../../../hoc/withAuthRedirect"
import Preloader from '../../../../../assets/imgs/preloader.gif'
import { useEffect } from "react"

const ProfileEditingInfoContainer = ({ authorizedId, requestProfile, setProfile, ...props }) => {

    useEffect(() => {
        if (!props.profile || props.profile.userId !== authorizedId) {
            setProfile(null)
            requestProfile(authorizedId)
        }
    }, [authorizedId, setProfile, requestProfile, props.profile ])

    return (
        (!props.profile) ? <img src={Preloader} alt="preloader" /> : <ProfileEditingInfo {...props} />
    )
}

const mapStateToProps = (state) => {
    return {
        profile: getProfile(state),
        authorizedId: getAuthorizedId(state),
    }
}

export default compose(
    connect(mapStateToProps, { updateProfileInfo, setProfile, requestProfile }),
    withAuthredirect,
)(ProfileEditingInfoContainer)