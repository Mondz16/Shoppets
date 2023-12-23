/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {Image, Pressable, Text, View} from 'react-native';
import styles from './styles';
import ClickableIcon from '../ClickableIcon';
import colors from '../../constant/color';
import GradientButton from '../GradientButton';
import Button from '../Button';
import LinearGradient from 'react-native-linear-gradient';
import CheckBox from '@react-native-community/checkbox';

const CartCard = ({
  icon,
  buttonText,
  name,
  breed,
  location,
  price,
  onPress,
  onCheckout,
}) => {
  const [isSelected, setSelection] = useState(false);

  return (
    <Pressable style={styles.mainContainer} onPress={onPress}>
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
                <Text style={styles.breed}>{breed}</Text>
              </View>
              <View style={styles.statusHolder}>
                <Image
                  source={require('../../assets/location.png')}
                  style={styles.locationIcon}
                />
                <Text style={styles.subtitle}>{location}</Text>
              </View>
              <View style={styles.statusHolder}>
                <Text style={styles.statusLabel}>₱</Text>
                <Text style={styles.status}>{price}</Text>
              </View>
            </View>
          </View>
          <Button
            title={buttonText ? buttonText : 'View'}
            withBorder={true}
            buttonStyle={{
              width: 80,
              height: 30,
              marginVertical: 5,
              alignSelf: 'flex-end',
              marginRight: 30,
              marginBottom: 10,
              marginTop: -40,
            }}
            style={{fontSize: 12}}
            onPress={onCheckout}
          />
        </View>
      </LinearGradient>
    </Pressable>
  );
};

export default React.memo(CartCard);
