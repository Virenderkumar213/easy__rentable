import { StyleSheet } from 'react-native'
import {colors} from './colors'

// import { colors } from '../../../../styles/colors'

export const style = StyleSheet.create({
    container:{
        flex:1, 
        backgroundColor:colors.BACKGROUNDCOLOR,

    },
    dummytext:{
        fontSize:24,
        color:colors.PRIMARYBLUE,
        fontWeight:'bold'
    },
    dummytext2:{
        fontSize:22,
        color:colors.PRIMARYBLUE,
        fontWeight:'bold'
    },
    dummytext4:{
        fontSize:14,
        color:colors.PRIMARYBLUE,
        fontWeight:'bold',
    },
    appbar: { flex: 1,  justifyContent:'center',  alignItems: 'center', paddingHorizontal: '5%', marginTop:'6%'  },
    textcont: { height:55, backgroundColor: colors.WHITE, justifyContent: 'center', alignItems: 'center',flexDirection: 'row' },

})