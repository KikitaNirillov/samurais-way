import React from 'react'
import s from './Profile.module.scss'
import ProfilePost from './ProfilePost/ProfilePost'
import ProfileStatus from './ProfileStatus/ProfileStatus'
import userImg from '../../../../assets/imgs/user.png'
import { NavLink } from 'react-router-dom'
import ProfileImageUpdate from './ProfileImageUpdate/ProfileImageUpdate'

const ContactsTitles = ['github', 'vk', 'facebook', 'instagram', 'twitter', 'website', 'youtube', 'mainLink']

const CreateContactsString = ({ title, contacts }) => {
    if (!contacts[title] || contacts[title] === '') return null
    return (
        <p className={s.profile__info_contacts_item}>
            {title}: <a href={contacts[title]} className={s.profile__info_contacts_item_link}>
                {contacts[title]}
            </a>
        </p>
    )
}

const Profile = (props) => {

    let addPost = () => {
        props.addPost()
    }

    let onChangeNewPost = (event) => {
        let text = event.target.value
        props.onChangeNewPost(text)
    }

    const isAuthorizedId = (element) => {
        if (props.profile.userId === props.authorizedId) return element
        return null
    }

    return (
        <div className={s.profile}>
            <section className={s.profile__info}>
                {isAuthorizedId(<ProfileImageUpdate updateProfileImage={props.updateProfileImage} />)}
                <img src={props.profile.photos.large || userImg} className={s.profile__info_avatar} alt="avatar" />
                {isAuthorizedId(<NavLink to='/profile/editing' className={s.profile__info_editing} >Edit profile info</NavLink>)}
                <p className={s.profile__info_fullname}>{props.profile.fullName}</p>
                <ProfileStatus updateProfileStatus={props.updateProfileStatus} requestProfileStatus={props.requestProfileStatus} userId={props.userId} authorizedId={props.authorizedId} profileStatus={props.profileStatus} />
                <p className={s.profile__info_aboutMe}>About me: {props.profile.aboutMe}</p>
                <p className={s.profile__info_lookingForAJob}>Looking for a job: {props.profile.lookingForAJob ? 'yes' : 'no'}</p>
                <p className={s.profile__info_lookingForAJobDescription}>Looking for a job decription: {props.profile.lookingForAJobDescription}</p>
                <div className={s.profile__info_contacts}>
                    {/* <h3>Contacts: </h3> */}
                    {
                        ContactsTitles.map((item, index) => {
                            return (
                                <CreateContactsString title={item} contacts={props.profile.contacts} key={index} />
                            )
                        })
                    }
                </div>
            </section>
            {isAuthorizedId(<section className={s.profile__posts}>
                <h2>(This form was done at the beginning just for training, actually, it doesn't work correctly)</h2>
                <div>
                    <textarea onChange={onChangeNewPost} value={props.newPostText} />
                    <button onClick={addPost}>Add post</button>
                </div>
                <ul className={s.profile__posts_list}>
                    {props.profilePostsData.map(
                        post => <ProfilePost post={post.post} id={post.id} key={post.id} />
                    ).reverse()}
                </ul>
            </section>)}
        </div>
    )
}

export default (Profile)