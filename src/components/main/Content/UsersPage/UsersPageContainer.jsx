import React from "react"
import { connect } from 'react-redux'
import { setIsLoaded, getUsers, followRequest, unfollowRequest } from "../../../../redux/usersPage-reducer"
import UsersPage from "./UsersPage"
import { withAuthredirect } from "../../../hoc/withAuthRedirect"
import { compose } from "redux"

class UsersPageContainer extends React.Component {
    constructor(props) {
        super(props)
        this.onPageChanged = this.onPageChanged.bind(this)
        this.props.setIsLoaded(false)
    }
    componentDidMount() {
        this.props.getUsers(1, this.props.usersPage.pageSize)
    }
    onPageChanged(i) {
        this.props.setIsLoaded(false)
        this.props.getUsers(i, this.props.usersPage.pageSize)
    }
    render() {
        return <>
            <UsersPage totalUserCount={this.props.usersPage.totalUserCount}
                isLoaded={this.props.usersPage.isLoaded}
                pageSize={this.props.usersPage.pageSize}
                users={this.props.usersPage.users}
                followingInProcess={this.props.usersPage.followingInProcess}
                onPageChanged={this.onPageChanged}
                followRequest={this.props.followRequest}
                unfollowRequest={this.props.unfollowRequest}
            />
        </>
    }
}

let mapStateToProps = (state) => {
    return {
        usersPage: state.usersPage,
    }
}

export default compose(
    connect(mapStateToProps,
        {
            setIsLoaded,
            getUsers,
            followRequest,
            unfollowRequest,
        }),
    withAuthredirect,
)(UsersPageContainer)