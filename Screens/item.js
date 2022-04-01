import React from 'react';
import {View, Text, SafeAreaView,Image} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {Component} from 'react/cjs/react.production.min';
import {Card,ListItem, Button, Icon} from 'react-native-elements';
//import DetailScreen from '../Screens/DetailScreen';

class Item extends Component {
  
  render() {
    const users = [
      {
        name: 'brynn',
      },
    ];
    
    return (
      <View>
        <Text>Virender</Text>
        <Card title="CARD WITH DIVIDER">
        <Image
            source={require('../pictures/images/1.png')}
            style={{
              width: 350,
              height: 200,
              borderRadius: 20,
              marginBottom: 15,
            }}></Image>
            <Text style ={{}}>
            ps4
            </Text>
            <Text>
              500/Day
            </Text>
            <Text>
              this is Ps4 game ahjbbsbsbdbdw
            </Text>
            <Button>
              Add to Cart
            </Button>
            <Button  style={{}}
            //onPress={() =>navigation.navigate('Detail')}
             title="Show More"
             color="#841584"
            /> 
              
         

        </Card>
      </View>
      //   <View
      //     style={{
      //       flex: 1,
      //       paddingHorizontal: 20,
      //       backgroundColor: 'grey',
      //     }}>
      //     <View style={{marginTop:200}}>
      //     <Text>
      //         Virender
      //     </Text>
      //       {/* <View>
      //         <Text style={{fontSize: 25, fontWeight: 'bold'}}>Welcome to</Text>
      //         <Text style={{fontSize: 38, color: 'green', fontWeight: 'bold'}}>
      //           Plant Shop
      //         </Text>
      //       </View> */}
      //     </View>
      //   </View>
    );
  }
}

export default Item;
