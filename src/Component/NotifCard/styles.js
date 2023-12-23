/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';
import colors from '../../constant/color';

const styles = StyleSheet.create({
    container: {
      borderRadius: 10,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 10,
      paddingVertical: 5,
      marginTop: 5,
      width: '100%',
    },
    profile:{
        width: 30,
        height: 30,
        marginRight: 15,
    },
    icon:{
        width: 15,
        height: 15,
        marginRight: 2,
    },
    infoHolder:{
        width: '62%',
    },
    info:{
        fontFamily: 'Poppins-SemiBold',
        fontSize: 15,
        letterSpacing: 0.5,
        color: colors.black,
        marginBottom: -5,
    },
    rateHolder:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    rate:{
        fontSize: 13,
        color: 'rgba(0,0,0,.5)',
    },
    shopHolder:{
        width: '28%',
        height: 30,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
    },
    subtitle:{
        fontFamily: 'Poppins-Regular',
        color: colors.darkGrey2,
        fontSize: 12,
    },
    clickableIcon:{
        width: 30,
        height: 30,
    },
    timeReceived:{
        fontFamily: 'Poppins-Regular',
        color: colors.darkGrey2,
        textAlignVertical: 'bottom',
        fontSize: 12,
    },
});

export default styles;
