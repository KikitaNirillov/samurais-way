import React from 'react'
import { Navigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { AppStateType } from '../../redux/redux-store'

type StatePropsType = {
    isAuth: boolean
}

let mapStateToProps = (state: AppStateType): StatePropsType => {
    return {
        isAuth: state.auth.isAuth,
    }
}

export const withAuthredirect = <P,>(Component: React.ComponentType<P>) => {
    const RedirectComponent: React.FC<StatePropsType> = (props) => {
        let {isAuth, ...restProps} = props
        return (
            (!isAuth) ? <Navigate to='/login' /> : <Component {...restProps as P & StatePropsType} />
        )
    }
    return connect<StatePropsType, null, null, AppStateType>(mapStateToProps)(RedirectComponent)
}


