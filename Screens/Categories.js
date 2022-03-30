import React from 'react'
import { StyleSheet, Text, View,Image ,TouchableOpacity} from 'react-native'
export default function Categories(){
    return(
        <View>
            <TouchableOpacity style={{margin:10}}>
                <Text>camera</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{margin:10}}>
            <Text>Entertainment</Text>
            </TouchableOpacity>  

            <TouchableOpacity style={{margin:10}}>
            <Text>Gaming</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{margin:10}}>
            <Text>Fitness</Text>
            </TouchableOpacity>            
        </View>

    )
}