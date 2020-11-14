import React from 'react'
import { connect } from 'react-redux'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'

import BlogList from './components/BlogList'
import Blog from './components/Blog'

function getQueryStringParams(name) {
  let result = window.location.search.match(new RegExp('[?&]' + name + '=([^&]+)', 'i'))
  if (result == null || result.length < 1) {
    return ''
  }
  return result[1]
}

class App extends React.Component {

  componentDidMount() {
    this.props.dispatch({
      type: 'SET_ID',
      id: getQueryStringParams('id') || -1
    })
  }

  render() {
    return (
      <div style={{ fontSize: '100px' }}>
        <Router>
          <Switch>
            <Route path={'/blog/:id'} component={Blog}></Route>
            <Route path={'/'} component={BlogList}></Route>
          </Switch>
        </Router>
      </div>
    )
  }

}

const mapStateToProps = state => ({
  id: state.user.id,
  token: state.user.token
})

export default connect(mapStateToProps)(App)