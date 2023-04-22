import React from 'react'
import { connect } from 'react-redux'
import Content from './Content/Content'
import NavBar from './NavBar/NavBar'
import './Main.scss'
import displayIfAuthorized from '../common/displayIfAuthorized'

const Main = (props) => {
    return (
        <main className='main'>
            <div className='container'>
                {displayIfAuthorized(<NavBar />, props.isAuth)}
                <Content />
            </div>
        </main>
    )
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
    }
}

export default connect(mapStateToProps)(Main)