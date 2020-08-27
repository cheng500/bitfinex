import React from 'react'
import { StyleSheet, ScrollView, View, Text, TouchableOpacity } from 'react-native'
import { sortBy } from 'lodash'
import Icon from 'react-native-vector-icons/FontAwesome'

import Table from '../Reusable/Table'

const headers = ['COUNT', 'AMOUNT', 'PRICE']
const precisions = ['P0', 'P1', 'P2', 'P3', 'P4']

export default function Order(props) {
  const { orderChannel, askData, bidData, wsSendRequest, wsClearOrders } = props
  const [max, setMax] = React.useState(100)
  const [precision, setPrecision] = React.useState(0)

  React.useEffect(() => {
    if ( precision >= 0 ) {
      if ( orderChannel >= 0 ) {
        wsSendRequest({
          event: 'unsubcribe',
          chanId: orderChannel
        })
        wsClearOrders()
      }
      wsSendRequest({
        event: 'subscribe',
        channel: 'book',
        freq: 'F1',
        prec: precisions[precision],
        symbol: 'tBTCUSD'
      })
    }
  }, [precision])

  const onUnsubscribe = React.useCallback(function onUnsubscribe() {
    wsSendRequest({
      event: 'unsubscribe',
      chanId: orderChannel
    })
    wsClearOrders()
  }, [wsSendRequest, wsClearOrders])

  const onSubscribe = React.useCallback(function onSubscribe() {
    wsSendRequest({
      event: 'subscribe',
      channel: 'book',
      symbol: 'tBTCUSD'
    })
  }, [wsSendRequest, wsClearOrders])

  return (
    <View>
      <View style={styles.headerRow}>
        <Text style={styles.headerText}>ORDER BOOK</Text>
        <Text style={styles.headerText}>BTC/USD</Text>
        { orderChannel !== null
          ? <TouchableOpacity onPress={onUnsubscribe}>
              <Icon name="close" size={25} style={styles.icon} />
            </TouchableOpacity>
          : <TouchableOpacity onPress={onSubscribe}>
              <Icon name="refresh" size={25}  style={styles.icon} />
            </TouchableOpacity>
        }
        <TouchableOpacity onPress={() => {
          setPrecision((prevState) => prevState - 1)
          setMax((prevState) => prevState / 2)
        }} disabled={precision <= 0}>
          <Icon name="minus" size={25} style={styles.icon}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          setPrecision((prevState) => prevState + 1)
          setMax((prevState) => prevState + 100)
        }} disabled={precision >= precisions.length - 1}>
          <Icon name="plus" size={25} style={styles.icon}/>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setMax((prevState) => prevState - 100)}
          disabled={max <= 100}
        >
          <Icon name="compress" size={25} style={styles.icon}/>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setMax((prevState) => prevState + 100)}
          disabled={max >= 500}
        >
          <Icon name="expand" size={25} style={styles.icon}/>
        </TouchableOpacity>
      </View>
      <Table
        headers={headers}
        data={askData}
        renderItem={({ item }) => {
          return (
            <View key={item[0]} style={styles.contentRow}>
              <Text style={{ flex: 1 / headers.length }}>{item[1]}</Text>
              <Text style={{ flex: 1 / headers.length }}>{Math.abs(item[2]).toFixed(4)}</Text>
              <Text style={{ flex: 1 / headers.length }}>{item[0]}</Text>
              <View style={[styles.bar, { backgroundColor: '#f00', width: `${(Math.abs(item[2]) / max) * 100}%`, height: '100%', zIndex: -1 }]}></View>
            </View>
          )
        }}
        keyExtractor={(item) => item[0].toString()}
      />
      <Table
        data={bidData}
        renderItem={({ item }) => {
          return (
            <View key={item[0]} style={styles.contentRow}>
              <Text style={{ flex: 1 / headers.length }}>{item[1]}</Text>
              <Text style={{ flex: 1 / headers.length }}>{Math.abs(item[2]).toFixed(4)}</Text>
              <Text style={{ flex: 1 / headers.length }}>{item[0]}</Text>
              <View style={[styles.bar, { backgroundColor: '#0f0', width: `${(Math.abs(item[2]) / max) * 100}%`, height: '100%', zIndex: -1 }]}></View>
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
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  bar: {
    position: 'absolute'
  },
  scrollView: {
    height: 600
  },
  icon: {
    marginHorizontal: 5
  }
})
