/* eslint-disable prettier/prettier */
import React from 'react';
import {Alert, Image, Text, TouchableOpacity, View} from 'react-native';
import Button from '../../../Component/Button';
import auth from '@react-native-firebase/auth';

const Home = ({navigation}) => {

  const onLogout = () => {
    auth()
    .signOut()
    .then(() => console.log('User signed out!'));
  };

  return (
    <View>
        <Text>Home</Text>
      </View>
  );
};

export default React.memo(Home);
