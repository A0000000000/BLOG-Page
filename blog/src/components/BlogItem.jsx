import React from 'react'
import { connect } from 'react-redux'

class BlogItem extends React.Component {

    render() {
        return (
            <div>
                BlogItem
            </div>
        )
    }

}

const mapStateToProps = state => ({
    blogList: state.user.blogList
})

export default connect(mapStateToProps)(BlogItem)