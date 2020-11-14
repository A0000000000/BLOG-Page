const user = (state = { id: -1, token: null, blogList: [] }, action = {}) => {
    switch (action.type) {
        case 'SET_ID':
            return {
                ...state,
                id: action.id
            }
        case 'SET_TOKEN':
            return {
                ...state,
                token: action.token
            }
        case 'SET_BLOG_LIST':
            return {
                ...state,
                blogList: action.blogList
            }
        default:
            return state
    }
}

export default user