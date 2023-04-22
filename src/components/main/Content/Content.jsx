import React, { Suspense } from 'react'
import s from './Content.module.scss'
import ProfileContainer from './Profile/ProfileContainer'
import UsersPageContainer from './UsersPage/UsersPageContainer'
import { Route, Routes } from 'react-router-dom'
import Login from '../../login/login'
import { Navigate } from 'react-router-dom'
import ProfileEditingInfoContainer from './Profile/ProfileEditing/ProfileEditingInfoContainer'
const DialogsContainer = React.lazy(() => import('./Dialogs/DialogsContainer'))


const Content = () => {
    return (
        <div className={s.content}>
            <Suspense fallback={<div>loading...</div>}>
                <Routes>
                    <Route path='/' element={<Navigate to='/profile' />} />
                    <Route path='/profile' element={<ProfileContainer />} >
                        <Route path=':userId' element={<ProfileContainer />} />
                        <Route path='me' element={<ProfileContainer />} />
                    </Route>
                    <Route path='/profile/editing' element={<ProfileEditingInfoContainer />} />
                    <Route path='/dialogs/*' element={<DialogsContainer />} />
                    <Route path='/users/*' element={<UsersPageContainer />} />
                    <Route path='/login/*' element={<Login />} />
                    <Route path='*' element={<div>404 Not found</div>} />
                </Routes>
            </Suspense>
        </div>
    )
}

export default Content