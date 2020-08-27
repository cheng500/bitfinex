import wsActions from '../actions/ws'

export default () => {
  let socket = null

  const onOpen = (store) => () => {
    store.dispatch(wsActions.wsConnected())
  }

  const onClose = (store) => () => {
    store.dispatch(wsActions.wsDisconnected())
  }

  const onMessage = (store) => (event) => {
    const data = JSON.parse(event.data)
      console.log(data)
    if ( data.event == 'subscribed' ) {
      switch (data.channel) {
        case 'book':
          store.dispatch(wsActions.wsSetOrderChannel(data.chanId))
          break
        case 'ticker':
          store.dispatch(wsActions.wsSetTickerChannel(data.chanId))
          break
        case 'trades':
          store.dispatch(wsActions.wsSetTradesChannel(data.chanId))
          break
        default:
          break
      }
    } else if ( ! data.event ) {
      store.dispatch(wsActions.wsHandleData(data))
    }
  }

  return (store) => (next) => (action) => {
    switch (action.type) {
      case wsActions.types.WS_CONNECT:
        if ( socket !== null ) {
          socket.close()
        }
        socket = new WebSocket(action.host)
        socket.onmessage = onMessage(store)
        socket.onclose = onClose(store)
        socket.onopen = onOpen(store)

        break
      case wsActions.types.WS_DISCONNECT:
        if ( socket !== null ) {
          socket.close()
        }
        socket = null
        break
      case wsActions.types.WS_SEND_REQUEST:
        if ( socket !== null ) {
          socket.send(JSON.stringify(action.params))
        }
        break
      default:
        return next(action)
    }
  }
}
