/* eslint-disable prettier/prettier */
import { StyleSheet, Dimensions } from 'react-native';
import colors from '../../constant/color';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container:{
        borderColor:'rgba(0,0,0,.3)',
        borderRadius: 10,
        width: (width / 2) - 30,
        height: 200,
        marginRight: 3,
        marginLeft: 15,
        marginTop: 5,
        padding: 7,
        alignItems: 'flex-start',
        backgroundColor: colors.white,
    },
    subContainer: {
        flexDirection: 'row',
    },
    iconHolder:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'left',
    },
    favHolder:{
        width: 30,
        height: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -15,
        borderRadius: 15,
        backgroundColor: colors.green,
    },
    descriptionHolder:{
        width: '75%',
    },
    petImage:{
        width:'100%',
        height:110,
        borderRadius: 10,
    },
    icon:{
        width: 15,
        height: 15,
    },
    favIcon:{
        width: 30,
        height: 30,
    },
    petName:{
        fontFamily: 'Poppins-SemiBold',
        fontSize: 18,
        color: '#000',
        marginTop: 2,
    },
    subtitle:{
        fontFamily: 'Poppins-Regular',
        fontSize: 12,
        color: colors.darkGrey2,
    },
    genderAge:{
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
        color: '#000',
    },
});

export default styles;
