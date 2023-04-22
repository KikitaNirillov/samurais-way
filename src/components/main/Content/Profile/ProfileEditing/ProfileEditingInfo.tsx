import { FormikProps, Formik, Form, FormikErrors } from 'formik'
import React from 'react'
import { NavLink } from 'react-router-dom'
import * as yup from 'yup'
import { ProfileType } from '../../../../common/commonTypes'
import s from './ProfileEditingInfo.module.scss'

export type MyFormValues = {
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    aboutMe: string
    contacts: {
        github: string
        facebook: string
        instagram: string
        twitter: string
        website: string
        youtube: string
        mainLink: string
        vk: string
    }
}

type CreateFieldPropsType = {
    formik: FormikProps<MyFormValues>
    valueTitle: keyof MyFormValues
    extraValueTitle?: string
    fieldTitle: string
    type: string
}
const CreateField: React.FC<CreateFieldPropsType> = ({formik, valueTitle, extraValueTitle, fieldTitle, type }) => {
    return (
        <div className={s.form_field}>
            <p className={s.form_field_title}>{fieldTitle}:&nbsp;</p>
            <input name={!extraValueTitle ? valueTitle : (valueTitle + '.' + extraValueTitle)}
                placeholder={fieldTitle}
                type={type}
                onChange={formik.handleChange}
                value={!extraValueTitle ? formik.values[valueTitle] : 
                    //@ts-ignore
                    formik.values[valueTitle][extraValueTitle]}
                onBlur={formik.handleBlur}
                className={s.form_field_input}
                checked={formik.values[valueTitle] as boolean}
            />
            {(formik.touched[valueTitle] && formik.errors[valueTitle]) ? <p className={`${s.form_field_error} error`}><>{formik.errors[valueTitle]}</></p> : null}
        </div>
    )
}

const profileFields: Array<{type: string, valueTitle: keyof MyFormValues, fieldTitle: string}> = [
    { type: 'text', valueTitle: 'fullName', fieldTitle: 'Full name' },
    { type: 'checkbox', valueTitle: 'lookingForAJob', fieldTitle: 'Looking for a job' },
    { type: 'text', valueTitle: 'lookingForAJobDescription', fieldTitle: 'Looking for a job description' },
    { type: 'text', valueTitle: 'aboutMe', fieldTitle: 'About me' },
]

type ProfileEditingInfoPropsType = {
    updateProfileInfo: (info: any, setStatus: any) => void
    setProfile: (profile: ProfileType) => void
    requestProfile: (userId: number) => void
    profile: ProfileType | null
    authorizedId: number | null
}

const ProfileEditingInfo: React.FC<ProfileEditingInfoPropsType> = ({ updateProfileInfo, ...props }) => {
    const initialValues: MyFormValues = { // as const in order to have access to an object in onSumbit()
        lookingForAJob: props.profile?.lookingForAJob || false,
        lookingForAJobDescription: props.profile?.lookingForAJobDescription || '',
        fullName: props.profile?.fullName || '',
        aboutMe: props.profile?.aboutMe || '',
        contacts: {
            github: props.profile?.contacts.github || '',
            vk: props.profile?.contacts.vk || '',
            facebook: props.profile?.contacts.facebook || '',
            instagram: props.profile?.contacts.instagram || '',
            twitter: props.profile?.contacts.twitter || '',
            website: props.profile?.contacts.website || '',
            youtube: props.profile?.contacts.youtube || '',
            mainLink: props.profile?.contacts.mainLink || '',
        },
    }
    return (
        <Formik
            initialValues = {initialValues}
            validationSchema ={yup.object({
                lookingForAJob: yup.bool(),
                lookingForAJobDescription: yup.string(),
                fullName: yup.string().required('required'),
                aboutMe: yup.string(),
                contacts: yup.object({
                    github: yup.string(),
                    vk: yup.string(),
                    facebook: yup.string(),
                    instagram: yup.string(),
                    twitter: yup.string(),
                    website: yup.string(),
                    youtube: yup.string(),
                    mainLink: yup.string(),
                })
            })}
            onSubmit={(values, { setSubmitting, setStatus }) => {
                if (JSON.stringify(values) === JSON.stringify(initialValues)) {
                    setStatus('If you want submit, please, enter new data')
                }
                else {
                    updateProfileInfo(values, setStatus)
                    setSubmitting(false)
                    setStatus('Data has been successfully updated')
                    setTimeout(() => setStatus(''), 2000)
                }
            }}>
            {formik =>
                <Form className={s.form}>
                    <NavLink to='/profile' className={s.navLink}>Back</NavLink>
                    <h3>Main Information: </h3>
                    {
                        profileFields.map((item, index) => {
                            return (
                                <CreateField formik={formik} type={item.type}
                                    valueTitle={item.valueTitle}
                                    fieldTitle={item.fieldTitle}
                                    key={index}
                                />
                            )
                        })
                    }
                    <h3>Contacts: </h3>
                    {Object.keys(formik.values.contacts).map(key =>
                        <CreateField formik={formik} type='text' key={key}
                            valueTitle={'contacts'}
                            extraValueTitle={key}
                            fieldTitle={key} />
                    )}
                    <button type="submit" className={s.form_submitBtn}> Submit </button>
                    <p className={`${s.form_field_error} error`}>{formik.status}</p>
                </Form>
            }
        </Formik>
    )
}

export default ProfileEditingInfo