import React from 'react'
import { connect } from 'react-redux'

import Ticker from './Ticker'

const mapStateToProps = (state = {}) => {
  return {
    tickerData: state.ws.tickerData
  }
}

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Ticker))
