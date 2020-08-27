const types = {
  WS_CONNECT: 'WS_CONNECT',
  //WS_CONNECTING: 'WS_CONNECTING',
  WS_CONNECTED: 'WS_CONNECTED',
  WS_DISCONNECT: 'WS_DISCONNECT',
  WS_DISCONNECTED: 'WS_DISCONNECTED',
  WS_SEND_REQUEST: 'WS_SEND_REQUEST',
  WS_SETORDER_CHANNEL: 'WS_SETORDER_CHANNEL',
  WS_SETTICKER_CHANNEL: 'WS_SETTICKER_CHANNEL',
  WS_SETTRADES_CHANNEL: 'WS_SETTRADES_CHANNEL',
  WS_HANDLE_DATA: 'WS_HANDLE_DATA',
  WS_CLEAR_ORDERS: 'WS_CLEAR_ORDERS',
  WS_CLEAR_TRADES: 'WS_CLEAR_TRADES',
}

const wsConnect = (host) => ({ type: types.WS_CONNECT, host })
//const wsConnecting = (host) => ({ type: types.WS_CONNECTING, host })
const wsConnected = () => ({ type: types.WS_CONNECTED })
const wsDisconnect = () => ({ type: types.WS_DISCONNECT })
const wsDisconnected = () => ({ type: types.WS_DISCONNECTED })
const wsSendRequest = (params) => ({ type: types.WS_SEND_REQUEST, params })
const wsSetOrderChannel = (id) => ({ type: types.WS_SETORDER_CHANNEL, payload: id })
const wsSetTickerChannel = (id) => ({ type: types.WS_SETTICKER_CHANNEL, payload: id })
const wsSetTradesChannel = (id) => ({ type: types.WS_SETTRADES_CHANNEL, payload: id })
const wsHandleData = (array) => ({ type: types.WS_HANDLE_DATA, payload: array })
const wsClearOrders = () => ({ type: types.WS_CLEAR_ORDERS })
const wsClearTrades = () => ({ type: types.WS_CLEAR_TRADES })

export default {
  types,
  wsConnect,
  //wsConnecting,
  wsConnected,
  wsDisconnect,
  wsDisconnected,
  wsSendRequest,
  wsSetOrderChannel,
  wsSetTickerChannel,
  wsSetTradesChannel,
  wsHandleData,
  wsClearOrders,
  wsClearTrades
}
