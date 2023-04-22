import { ProfileType } from '../components/common/commonTypes'
import profilePageReducer, { addPost, ProfilePostsDataItemType } from './profilePage-reducer'

let initialState = {
    profilePostsData: [
        { id: 1, post: '- Who am I?' },
        { id: 2, post: 'Ayanami Rey.' },
        { id: 3, post: '- Who are you?' },
    ] as Array<ProfilePostsDataItemType>,
    newPostText: '' as string,
    profile: null as ProfileType | null,
    profileStatus: null as string | null,
}

test('new post should be added', () => {
    const action = addPost()
    const newState = profilePageReducer(initialState, action)
    expect(newState.profilePostsData.length).toBe(4)
})