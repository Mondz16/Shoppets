/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';
import colors from '../../constant/color';

const styles = StyleSheet.create({
    itemContainer: {
        marginHorizontal: 5,
        marginVertical: 10,
        width: 85,
        height: 85,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        backgroundColor: colors.white,
    },
    item: {
        fontSize: 12,
        color: 'rgba(0,0,0, .5)',
        fontWeight: 'normal',
    },
    selectedBG:{
        width: 85,
        height: 85,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
    selectedItem: {
        fontSize: 12,
        color: '#000000',
    },
    selectedItemContainer: {
        marginHorizontal: 5,
        marginVertical: 10,
        width: 85,
        height: 85,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
    icon:{
        borderRadius: 25,
        width: 50,
        height: 50,
    },
});

export default styles;
