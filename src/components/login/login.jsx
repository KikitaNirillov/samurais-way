import { useFormik } from 'formik'
import React from 'react'
import { connect } from 'react-redux'
import * as yup from 'yup'
import { login, getCaptcha } from '../../redux/auth-reducer'
import { Navigate } from 'react-router-dom'
import s from './login.module.scss'

const Login = (props) => {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
            captcha: '',
        },
        onSubmit(values, { setSubmitting, setStatus }) {
            setStatus('')
            props.login(values, setStatus)
            setSubmitting(false)
        },
        validationSchema: yup.object({
            email: yup.string().email('Invalid email address').required('required'),
            password: yup.string().max(20, '20 or less please...').min(4, '4 or more please...').required('required'),
            captcha: (props.captchaUrl) ? yup.string().required('required') : null,
        }),
    })
    if (props.isAuth) return (<Navigate to='/profile' />)
    return (
        <div className={s.login}>
            <h2 className={s.login_title}>LOGIN</h2>
            <p className={s.login_text}>
                You can use test accaunt:
                Email: free@samuraijs.com
                Password: free
            </p>
            <form onSubmit={formik.handleSubmit} className={s.login_form}>
                <input name='email'
                    placeholder='email'
                    type='text'
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    onBlur={formik.handleBlur}
                    className={s.login_form_field}
                />
                {(formik.touched.email && formik.errors.email) ? <p className={`${s.form_field_error} error`}>{formik.errors.email}</p> : null}
                <input name='password'
                    placeholder='password'
                    type='current-password'
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    onBlur={formik.handleBlur}
                    className={s.login_form_field}
                />
                {(formik.touched.password && formik.errors.password) ? <p className={`${s.form_field_error} error`}>{formik.errors.password}</p> : null}
                <div className={s.login_form_field}>
                    <p>Remember me (doesn't work): </p>
                    <input name='rememberMe'
                        type='checkbox'
                        onChange={formik.handleChange}
                        value={formik.values.rememberMe}
                        className={s.login_form_field_checkbox}
                    />
                </div>
                {!props.captchaUrl ? null :
                    <div className={s.login_form_captcha}>
                        <img src={props.captchaUrl} alt='captcha' />
                        <button onClick={props.getCaptcha} type="button">Request another img</button>
                        <input name='captcha'
                            placeholder='captcha'
                            type='text'
                            onChange={formik.handleChange}
                            value={formik.values.captcha}
                            onBlur={formik.handleBlur}
                            className={s.login_form_field}
                        />
                        {(formik.touched.captcha && formik.errors.captcha) ? <p className={`${s.form_field_error} error`}>{formik.errors.captcha}</p> : null}
                    </div>
                }
                <button type="submit" className={s.login_form_submitBtn}> Login </button>
                <p className={`${s.login_form_error} error`}>{formik.status}</p>
            </form>

        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        captchaUrl: state.auth.captchaUrl,
    }
}

export default connect(mapStateToProps, { login, getCaptcha })(Login)