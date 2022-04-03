import React from 'react';
import {View, Text, SafeAreaView, Image,ScrollView} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {Component} from 'react/cjs/react.production.min';
import {Card, ListItem, Button, Icon} from 'react-native-elements';

function DetailScreen(props) {
    return (
        <ScrollView>
        <View>
        <Card title="CARD WITH DIVIDER">
        <Image
          source={require('../pictures/images/1.png')}
          style={{
            width: 350,
            height: 200,
            borderRadius: 20,
            marginBottom: 15,
          }}></Image>
        <Button
          style={{}}
          onPress={() => {
            navigation.navigate('Detail');
          }}
          title="Add to Cart"
          color="#841584"
        />
      </Card>
      <Card>
          <Text>
              Product Detail
          </Text>
          <Text>
              name:"Play Station 4"
          </Text>
          <Text>
              Price:500/Day
          </Text>

      </Card>
      <Card>
          <Text>
             Description
          </Text>
          <Text>
            this is ps4 hhusdfjfsjdoosdhcisdichisdhcisdhichdsichisdcisdibsidvbdbkbxkd
          </Text>
      </Card>
      <Card>
          <Text>
             Reviews
          </Text>
          <Text>
            this is ps4 hhusdfjfsjdoosdhcisdichisdhcisdhichdsichisdcisdibsidvbdbkbxkd
          </Text>
      </Card>
      </View>
      </ScrollView>
    );
}

export default DetailScreen;