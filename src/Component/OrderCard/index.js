/* eslint-disable prettier/prettier */
import React from 'react';
import {Image, Text, View} from 'react-native';
import styles from './styles';
import ClickableIcon from '../ClickableIcon';
import colors from '../../constant/color';
import GradientButton from '../GradientButton';
import Button from '../Button';
import LinearGradient from 'react-native-linear-gradient';

const OrderCard = ({icon, buttonText, name, breed, location, status, onPress}) => {
  return (
    <LinearGradient
      style={styles.container}
      colors={[colors.lighBlue, colors.white]}
      start={{x: 0, y: 0}}
      end={{x: 0, y: 1}}>
      <Image source={icon} style={styles.profile} />
      <View>
        <View style={styles.petInfoContainer}>
          <View style={styles.infoHolder}>
            <View style={styles.rateHolder}>
              <Text style={styles.info}>{name}</Text>
            </View>
            <View style={styles.statusHolder}>
              <Image source={require('../../assets/location.png')} style={styles.locationIcon} />
              <Text style={styles.subtitle}>{location}</Text>
            </View>
            {
              status ?
            <View style={styles.statusHolder}>
              <Text style={styles.statusLabel}>Status:</Text>
              <Text style={styles.status}>{status}</Text>
            </View> : null
            }
          </View>
          <View style={styles.shopHolder}>
            <ClickableIcon
              icon={require('../../assets/chat.png')}
              buttonStyle={styles.chatButton}
              iconStyle={styles.chatButton}
            />
          </View>
        </View>
        <Button
          title={buttonText ? buttonText : 'View'}
          withBorder={true}
          buttonStyle={{width: 180, height: 30, marginVertical: 5, marginLeft: 25}}
          style={{fontSize: 13}}
          onPress={onPress}
        />
      </View>
    </LinearGradient>
  );
};

export default React.memo(OrderCard);
