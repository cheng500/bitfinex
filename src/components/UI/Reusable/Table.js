import React from 'react'
import { StyleSheet, FlatList, View, Text } from 'react-native'
import { map } from 'lodash'

export default React.memo(function Table(props) {
  const { data = {}, headers, renderItem, keyExtractor } = props

  return (
    <View>
      { headers && (
        <View style={styles.headerBar}>
          { headers.map((header) => {
            return (
              <Text key={header} style={[styles.headerItem, { flex: 1 / headers.length }]}>{header}</Text>
            )
          }) }
        </View>
      )}
      <FlatList style={styles.content}
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        nestedScrollEnabled
      />
    </View>
  )
})

const styles = StyleSheet.create({
  headerBar: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  headerItem: {
  },
  content: {
    height: 300
  },
  contentRow: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
})
