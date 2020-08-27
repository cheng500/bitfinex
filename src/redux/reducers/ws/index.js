import { findIndex } from 'lodash'
import wsActions from '../../actions/ws'

const initialState = {
  connected: false,
  orderChannel: null,
  tickerChannel: null,
  tradesChannel: null,
  orderData: [],
  tickerData: [],
  tradesData: []
}

export default function reducer(state = {...initialState}, action = {}) {
  const { type, payload = {} } = action

  switch ( type ) {
    case wsActions.types.WS_CONNECTED:
      return {
        ...state,
        connected: true,
      }
    case wsActions.types.WS_DISCONNECTED:
      return {
        ...state,
        connected: false,
      }
    case wsActions.types.WS_SETORDER_CHANNEL:
      return {
        ...state,
        orderChannel: payload
      }
    case wsActions.types.WS_SETTICKER_CHANNEL:
      return {
        ...state,
        tickerChannel: payload
      }
    case wsActions.types.WS_SETTRADES_CHANNEL:
      return {
        ...state,
        tradesChannel: payload
      }
    case wsActions.types.WS_HANDLE_DATA:
      switch (payload[0]) {
        case state.orderChannel:
          if ( state.orderData.length <= 0 ) {
            return {
              ...state,
              orderData: payload[1],
            }
          } else {
            const index = findIndex(state.orderData, (order) => order[0] == payload[1][0])
            const data = JSON.parse(JSON.stringify(state.orderData))
            if ( payload[1][1] > 0 ) {
              if ( index >= 0 ) {
                data[index] = payload[1]
              } else {
                data.push(payload[1])
              }
            } else {
              if (index) data.splice(index, 1)
            }
            return {
              ...state,
              orderData: data
            }
          }
        case state.tickerChannel:
          if ( payload[1] != 'hb' ) {
            return {
              ...state,
              tickerData: payload[1]
            }
          } else {
            return state
          }
        case state.tradesChannel:
          if ( state.tradesData.length <= 0 ) {
            return {
              ...state,
              tradesData: payload[1]
            }
          } else {
            if ( payload[2] && payload[1] == 'tu') {
              const index = findIndex(state.tradesData, (order) => order[0] == payload[2][0])
              let data = JSON.parse(JSON.stringify(state.tradesData))
              data.unshift(payload[2])
              return {
                ...state,
                tradesData: data
              }
            } else {
              return state
            }
          }
        default:
          return state
      }
    case wsActions.types.WS_CLEAR_ORDERS:
      return {
        ...state,
        orderChannel: null,
        orderData: []
      }
    case wsActions.types.WS_CLEAR_TRADES:
      return {
        ...state,
        tradesChannel: null,
        tradesData: []
      }
    default:
      return state
  }
}
