import React from 'react'
import { connect } from 'react-redux'

import wsActions from '../../../redux/actions/ws'

import Trades from './Trades'

const mapStateToProps = (state = {}) => {
  return {
    tradesChannel: state.ws.tradesChannel,
    tradesData: state.ws.tradesData
  }
}

const mapDispatchToProps = (dispatch) => ({
  wsSendRequest: (params) => {
    dispatch(wsActions.wsSendRequest(params))
  },
  wsClearTrades: () => {
    dispatch(wsActions.wsClearTrades())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Trades))
