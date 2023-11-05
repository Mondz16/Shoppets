/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {Text, View} from 'react-native';
import styles from './style';
import Button from '../../../Component/Button';
import auth from '@react-native-firebase/auth';

const Profile = ({navigation}) => {
  const user = auth().currentUser;

  const onLogout = () => {
    auth()
      .signOut()
      .then(() => {
        console.log('User signed out!');
        navigation.navigate('Login',{navigation});
      });
  };

  return (
    <View>
      <Text>Profile {user?.email}</Text>
      {!user?.isAnonymous ? (
        <Button withBorder={true} title={'Sign Out'} onPress={onLogout} />
      ) : <Button
        withBorder={true}
        title={'Login'}
        onPress={() => navigation.navigate('Login', {navigation})}
      />}
    </View>
  );
};

export default React.memo(Profile);
