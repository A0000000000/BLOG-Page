import React from 'react'
import { connect } from 'react-redux'

class BlogList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            page: 1,
            count: 10
        }
    }

    render() {
        return (
            <div>
                BlogList
            </div>
        )
    }
}

const mapStateToProps = state => ({
    blogList: state.user.blogList
})

export default connect(mapStateToProps)(BlogList)
