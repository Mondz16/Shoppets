/* eslint-disable prettier/prettier */
import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import styles from './style';
import Button from '../../../Component/Button';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../../constant/color';
import Input from '../../../Component/Input';

const PostSignUp = ({navigation}) => {
  return (
    <View>
      <LinearGradient
            style={styles.container}
            colors={[colors.darkBlue, colors.green]}
            start={{x: 0, y: 0}}
            end={{x: 0, y: 1}}
        >
        <Image style={{width: '100%', position: 'absolute'}} source={require('../../../assets/background.png')} />
        <Image style={styles.icon} source={require('../../../assets/paws.png')} />
        <LinearGradient
            style={styles.inputHolder}
            colors={[colors.lighBlue, colors.white]}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
        >
          <Image style={styles.image} source={require('../../../assets/HappyDog.png')} />
          <Image style={styles.checkIcon} source={require('../../../assets/check-mark.png')} />
          <Text style={styles.title} >Reset Password Sent!</Text>
          <Text style={styles.description}>You can now reset your password through the link sent in your gmail!</Text>

          <Button onPress={() => navigation.navigate('Login',{navigation})} title={'Continue'} withBorder={true}/>
        </LinearGradient>
      </LinearGradient>
    </View>
  );
};

export default React.memo(PostSignUp);
