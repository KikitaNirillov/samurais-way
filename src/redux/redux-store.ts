import { applyMiddleware, combineReducers, compose, legacy_createStore as createStore } from "redux"
import thunkMiddleware from "redux-thunk"
import appReducer from "./app-reducer"
import authReducer from "./auth-reducer"
import dialogsPageReducer from "./dialogsPage-reducer"
import profilePageReducer from "./profilePage-reducer"
import usersPageReducer from "./usersPage-reducer"

let rootReducer = combineReducers({
    app: appReducer,
    profilePage: profilePageReducer,
    dialogsPage: dialogsPageReducer,
    usersPage: usersPageReducer,
    auth: authReducer,
})
type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>

// let store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

//Расширение для Chrome - Redux DevTools:
//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunkMiddleware)
))

export type AppDispatch = typeof store.dispatch

export default store