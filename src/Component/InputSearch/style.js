/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';
import colors from '../../constant/color';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: colors.lightGray,
        paddingVertical: 10,
        marginTop: 16,
    },
    input: {
        color: colors.black,
        fontSize: 18,
        fontFamily: 'Poppins-Regular',
        padding: 0,
        paddingTop: 5,
        flex: 1,
        margin: 0,
        marginLeft: 16,
    },
    icon: {
        width: 25,
        height: 25,
        marginHorizontal: 16,
    },
});

export default styles;
