import React from 'react'
import { connect } from 'react-redux'

class Blog extends React.Component {
    render() {
        return (
            <div>
                Blog
            </div>
        )
    }
}

const mapStateToProps = state => ({
    blogList: state.user.blogList
})

export default connect(mapStateToProps)(Blog)