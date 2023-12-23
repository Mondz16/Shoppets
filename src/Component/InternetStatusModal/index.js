/* eslint-disable prettier/prettier */
import React from 'react';
import {Image, Text, Modal, View} from 'react-native';
import colors from '../../constant/color';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';

const InternetStatusModal = ({isVisible}) => {
  return (
    <Modal
        animationType="fade"
        transparent={true}
        visible={isVisible}
        >
        <View style={styles.modalContainer}>
          <LinearGradient
            style={styles.modalView}
            colors={[colors.lighBlue, colors.white]}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}>
            <Image
              style={styles.internetImage}
              source={require('../../assets/no-internet.png')}
            />
            <Text style={styles.modalHeader}>No Internet Conection</Text>
            <Text style={styles.modalSubtitle}>Turn on your Wifi or Cellular Data</Text>
          </LinearGradient>
        </View>
      </Modal>
  );
};

export default React.memo(InternetStatusModal);
