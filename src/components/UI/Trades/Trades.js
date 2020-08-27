import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { sortBy } from 'lodash'
import Icon from 'react-native-vector-icons/FontAwesome'

import Table from '../Reusable/Table'

const headers = ['TIME', 'PRICE', 'AMOUNT']

export default function Trades(props) {
  const { tradesData, tradesChannel, wsSendRequest, wsClearTrades } = props

  const [sortedTrades, setSortedTrades] = React.useState([])

  React.useEffect(() => {
    const helper = sortBy(tradesData, (trade) => trade[1]).reverse()
    for ( let i = 0; i < helper.length; i++ ) {
    }
  }, [tradesData])

  const onUnsubscribe = React.useCallback(function onUnsubscribe() {
    wsSendRequest({
      event: 'unsubscribe',
      chanId: tradesChannel
    })
    wsClearTrades()
  }, [wsSendRequest, wsClearTrades])

  const onSubscribe = React.useCallback(function onSubscribe() {
    wsSendRequest({
      event: 'subscribe',
      channel: 'trades',
      symbol: 'tBTCUSD'
    })
  }, [wsSendRequest, wsClearTrades])

  return (
    <View>
      <View style={styles.headerRow}>
        <Text style={styles.headerText}>TRADES BOOK</Text>
        <Text style={styles.headerText}>BTC/USD</Text>
        { tradesChannel !== null
          ? <TouchableOpacity onPress={onUnsubscribe}>
              <Icon name="close" size={25} style={styles.icon} />
            </TouchableOpacity>
          : <TouchableOpacity onPress={onSubscribe}>
              <Icon name="refresh" size={25} style={styles.icon} />
            </TouchableOpacity>
        }
      </View>
      <Table
        headers={headers}
        data={tradesData}
        renderItem={({ item }) => {
          const date = new Date(item[1])
          const hours = date.getHours()
          const minutes = '0' + date.getMinutes()
          const seconds = '0' + date.getSeconds()
          const formattedTime = `${hours}:${minutes.substr(-2)}:${seconds.substr(-2)}`
          return (
            <View key={item[0]} style={styles.contentRow}>
              <Icon name={item[2] > 0 ? 'chevron-up' : 'chevron-down'} color={item[2] > 0 ? '#0f0' : '#f00'} size={10} />
              <Text style={{ flex: 1 / headers.length }}>{formattedTime}</Text>
              <Text style={{ flex: 1 / headers.length }}>{Math.round(item[3] * 10) / 10}</Text>
              <Text style={{ flex: 1 / headers.length }}>{Math.abs(item[2]).toFixed(4)}</Text>
            </View>
          )
        }}
        keyExtractor={(item) => item[0].toString()}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row'
  },
  headerText: {
    marginRight: 5,
    fontSize: 18
  },
  contentRow: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  icon: {
    marginHorizontal: 5
  }
})
