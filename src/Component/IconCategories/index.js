/* eslint-disable prettier/prettier */
import React from 'react';
import {FlatList, Text, TouchableOpacity, Image} from 'react-native';
import styles from './style';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../constant/color';

const IconCategories = ({data, selectedItem, onItemPressed}) => {
  return (
    <FlatList
      horizontal
      data={data}
      style={{marginLeft: 10, marginRight: 10}}
      keyExtractor={item => String(item?.categoryName)}
      showsHorizontalScrollIndicator={false}
      renderItem={({item , index}) => {
        const selected = selectedItem === item?.categoryName;
        const icon = item?.categoryIcon;

        return (
          <TouchableOpacity
            onPress={() => onItemPressed(item?.categoryName)}
            style={
              [selected ? styles.selectedItemContainer : styles.itemContainer, index === 0 ? {marginLeft: 5} : {}]
            }>
            {selected ? (
              <LinearGradient
                style={styles.selectedBG}
                colors={[colors.darkBlue, colors.green]}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}>
                <Image
                  style={styles.icon}
                  source={{uri : icon}}
                />
                <Text style={selected ? styles.selectedItem : styles.item}>
                  {item?.categoryName}
                </Text>
              </LinearGradient>
            ) : (
              <>
                <Image
                  style={styles.icon}
                  source={{uri : icon}}
                />
                <Text style={selected ? styles.selectedItem : styles.item}>
                  {item?.categoryName}
                </Text>
              </>
            )}
          </TouchableOpacity>
        );
      }}
    />
  );
};

export default React.memo(IconCategories);
