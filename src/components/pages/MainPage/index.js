import { connect } from 'react-redux'

import wsActions from '../../../redux/actions/ws'

import MainPage from './MainPage'

const mapStateToProps = (state = {}) => {
  return state
}

const mapDispatchToProps = (dispatch) => ({
  wsConnect: (host) => {
    dispatch(wsActions.wsConnect(host))
  },
  wsSendRequest: (params) => {
    dispatch(wsActions.wsSendRequest(params))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)
