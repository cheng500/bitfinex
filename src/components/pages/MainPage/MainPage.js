import React from 'react'
import { ScrollView, Text } from 'react-native'
import Order from '../../UI/Order/'
import Ticker from '../../UI/Ticker'
import Trades from '../../UI/Trades/'

export default function (props) {
  const { ws, wsConnect, wsSendRequest } = props
  const { connected } = ws

  React.useEffect(() => {
    if ( ! connected ) {
      wsConnect('wss://api-pub.bitfinex.com/ws/2')
    } else {
      wsSendRequest({
        event: 'subscribe',
        channel: 'book',
        freq: 'F1',
        symbol: 'tBTCUSD'
      })
      wsSendRequest({
        event: 'subscribe',
        channel: 'ticker',
        symbol: 'tBTCUSD'
      })
      wsSendRequest({
        event: 'subscribe',
        channel: 'trades',
        symbol: 'tBTCUSD'
      })
    }
  }, [connected])

  return (
    <ScrollView>
      <Ticker />
      <Order />
      <Trades />
    </ScrollView>
  )
}
