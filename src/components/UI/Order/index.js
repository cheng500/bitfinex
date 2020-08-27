import React from 'react'
import { connect } from 'react-redux'
import { filter, sortBy } from 'lodash'

import wsActions from '../../../redux/actions/ws'

import Order from './Order'

const mapStateToProps = (state = {}) => {
  return {
    orderChannel: state.ws.orderChannel,
    askData: sortBy(filter(state.ws.orderData, (order) => order[2] < 0), (item) => item[2]),
    bidData: sortBy(filter(state.ws.orderData, (order) => order[2] > 0), (item) => item[2]),
  }
}

const mapDispatchToProps = (dispatch) => ({
  wsSendRequest: (params) => {
    dispatch(wsActions.wsSendRequest(params))
  },
  wsClearOrders: () => {
    dispatch(wsActions.wsClearOrders())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Order))
