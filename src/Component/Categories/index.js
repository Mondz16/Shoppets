/* eslint-disable no-undef */
import React from "react";
import { FlatList, Text, TouchableOpacity } from "react-native";
import styles from './style';

const Categories = ({ data , selectedItem , onItemPressed }) => {
    return (
        <FlatList 
            horizontal
            data={data}
            style={{marginLeft: 10, marginRight: 10}}
            keyExtractor={(item) => String(item)}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => {
                const selected = selectedItem === item;

                return(
                    <TouchableOpacity onPress={() => onItemPressed(item)} style={selected ? styles.selectedItemContainer : styles.itemContainer}>
                        <Text style={selected ? styles.selectedItem : styles.item}>{item}</Text>
                    </TouchableOpacity>
                )
            }}
        />
    );
}

export default React.memo(Categories);