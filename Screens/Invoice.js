import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {Card, ListItem, Button, Icon, colors} from 'react-native-elements';

const Invoice = () => {
  return (
    <View>
      <View styles={styles.totalSection}>
        <Text title1> Order Summary </Text>
        <View style={styles.divider} />
        <View style={{marginTop: 15}} />
        <View style={{flexDirection: 'row'}}>
          <Text caption size={16} color="black">
            subtotal
          </Text>
          <Text style={{marginLeft: 300}} caption size={16} color="black">
            500/Day
          </Text>
        </View>

        <View style={{flexDirection: 'row', marginTop: 5}}>
          <Text caption size={16} color="black">
            Shipping
          </Text>
          <Text style={{marginLeft: 300}} caption size={18} color="black">
            0
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Invoice;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    marginHorizontal: 29,
    paddingBottom: 32,
  },
  totalSection: {
    margintop: 32,
  },
  divider: {
    height: 1,
    borderColor: '#dddddd',
    borderWidth: StyleSheet.hairlineWidth,
    alignSelf: 'stretch',
    flex: 1,
    marginHorizontal: 16,
    margintop: 5,
  },
});
