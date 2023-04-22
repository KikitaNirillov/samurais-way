import React from 'react'
import * as yup from 'yup'
import { Form, Formik } from 'formik'
import s from './ProfileImageUpdate.module.scss'

const ProfileImageUpdate = ({ updateProfileImage }) => {
    return (
        <Formik
            initialValues={{ file: null }}
            validationSchema={yup.object().shape({
                file: yup.mixed().required('A file is required')
                    .test('fileType', "Unsupported File Format", value => [
                        'image/jpg', 'image/jpeg', 'image/gif', 'image/png'].includes(value?.type)),
            })}
            onSubmit={(values, { setSubmitting, resetForm, setStatus }) => {
                updateProfileImage(values.file, setStatus)
                resetForm({ values: '' })
                setSubmitting(false)
                setStatus('Data has been successfully updated, please wait')
                setTimeout(() => setStatus(''), 2000)
            }}
        >
            {formik =>
                <Form className={s.form}>
                    <p className={s.form_title}>Update avatar:</p>
                    <input id="file" name="file" type="file" className={s.form_fileInput} onChange={(event) => {
                        formik.setFieldValue("file", event.currentTarget.files[0])
                    }} />
                    <button type="submit" className={s.form_submitBtn}>Submit</button>
                    <p className={`${s.form_error} error`}>{formik.errors.file} {formik.status}</p>
                </Form>
            }
        </Formik>
    )
}

export default ProfileImageUpdate