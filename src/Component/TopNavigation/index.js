/* eslint-disable prettier/prettier */

import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import styles from './style';

const TopNavigation = ({ onPress , onBackPressed, showBack }) => {
    return (
        <View style={styles.container}>
            { showBack === true ?
            <TouchableOpacity onPress={onBackPressed}>
                <Image style={styles.icon} source={require('../../assets/back.png')} />
            </TouchableOpacity>
            : <Image source={null}/> }
            <TouchableOpacity onPress={onPress}>
                <Image style={styles.icon} source={require('../../assets/shopping-cart.png')} />
            </TouchableOpacity>
        </View>
    );
};

export default React.memo(TopNavigation);
