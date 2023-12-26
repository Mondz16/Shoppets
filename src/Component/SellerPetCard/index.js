/* eslint-disable prettier/prettier */


import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import styles from './style';

const SellerPetCard = ({ petImage, petName, location, gender, breed , onPress, showIcon }) => {
    return (
      <TouchableOpacity onPress={onPress} style={styles.container}>
        <Image style={styles.petImage} source={{uri: petImage}} />
        <View style={styles.subContainer}>
          <View style={styles.descriptionHolder}>
            <Text style={styles.petName}>{petName}</Text>
          </View>
          {
            showIcon ? (
            <TouchableOpacity style={styles.favHolder}>
            <Image
              style={styles.favIcon}
              source={require('../../assets/edit.png')}
            />
            </TouchableOpacity>) : null
          }
        </View>

        <Text style={styles.genderAge}>
          {breed}
        </Text>
        <View style={styles.iconHolder}>
          <Image
            style={styles.icon}
            source={require('../../assets/location.png')}
          />
          <Text style={styles.subtitle}>{location}</Text>
        </View>
      </TouchableOpacity>
    );
};

SellerPetCard.defaultProps = {
  showIcon: true,
};

export default React.memo(SellerPetCard);
