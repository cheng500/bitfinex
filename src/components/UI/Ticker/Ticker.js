import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

export default function Ticker(props) {
  const { tickerData } = props

  if ( tickerData.length > 0 ) {
    return (
      <View style={styles.ticker}>
        <Icon name="bitcoin" size={30} style={styles.icon}/>
        <View style={styles.block}>
          <Text>BTC/USD</Text>
          <Text>{`VOL ${tickerData[7].toFixed(0)} BTC`}</Text>
          <Text>{`LOW ${tickerData[9].toFixed(1)}`}</Text>
        </View>
        <View style={styles.block}>
          <Text>{tickerData[6].toFixed(1)}</Text>
          <View style={styles.percentRow}>
            <Text>{tickerData[4].toFixed(2)}</Text>
            <Icon name={tickerData[4] > 0 ? 'caret-up' : 'caret-down'} size={15} />
            <Text>{`(${(tickerData[5] * 100).toFixed(2)})`}</Text>
          </View>
          <Text>{`HIGH ${tickerData[8]}`}</Text>
        </View>
      </View>
    )
  } else {
    return <View style={styles.ticker}></View>
  }
}

const styles = StyleSheet.create({
  ticker: {
    width: '100%',
    flexDirection: 'row',
    height: 100,
    alignItems: 'center'
  },
  icon: {
    margin: 10
  },
  percentRow: {
    flexDirection: 'row'
  },
  block: {
    flex: 1,
  }
})
