import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    itemContainer: {
        paddingHorizontal: 10,
    },
    item: {
        fontSize: 12,
        color: 'rgba(0,0,0, .5)',
        fontWeight: 'normal',
        paddingVertical: 2,
        paddingHorizontal: 5,
    },
    selectedItem: {
        fontSize: 12,
        color: '#000000',
        paddingVertical: 2,
        paddingHorizontal: 5,
        borderBottomWidth: 1,
    },
    selectedItemContainer: {
        paddingHorizontal: 10,
    }
});

export default styles;