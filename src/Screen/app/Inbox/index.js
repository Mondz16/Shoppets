/* eslint-disable prettier/prettier */
import React from 'react';
import {Alert, Image, Text, TouchableOpacity, View} from 'react-native';
import styles from './style';
import Button from '../../../Component/Button';
import auth from '@react-native-firebase/auth';

const Inbox = ({navigation}) => {

  const onLogout = () => {
    auth()
    .signOut()
    .then(() => console.log('User signed out!'));
  };

  return (
    <View>
        <Text>Inbox</Text>
      </View>
  );
};

export default React.memo(Inbox);
