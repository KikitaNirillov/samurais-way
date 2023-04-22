import React, { useEffect } from 'react'
import './App.scss'
import 'normalize.css'
import HeaderContainer from './components/header/HeaderContainer'
import Main from './components/main/Main'
import { getAuthUserData } from './redux/auth-reducer'
import { setInitialization } from './redux/app-reducer'
import { connect } from 'react-redux'
import Preloader from './assets/imgs/preloader.gif'

const App = ({ getAuthUserData, setInitialization, ...props }) => {

  useEffect(() => {
    getAuthUserData().then(() => { setInitialization(true) })
  }, [getAuthUserData, setInitialization])

  if (!props.initialization) return <img src={Preloader} alt="preloader" />
  else return (
    <div className='appWrapper'>
      <HeaderContainer />
      <Main />
      {props.errors.length === 0 ? null :
        <div className='appWrapper__errors'>
          {
            props.errors.map(error => {
              return (
                <p className='error'>{error}</p>
              )
            })
          }
        </div>
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    initialization: state.app.initialization,
    errors: state.app.errors,
  }
}

export default connect(mapStateToProps, { getAuthUserData, setInitialization })(App)
