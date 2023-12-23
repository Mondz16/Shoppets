/* eslint-disable prettier/prettier */
import React , {useEffect , useState} from 'react';
import {Alert, Image, Text, TouchableOpacity, View} from 'react-native';
import styles from './style';
import Button from '../../../Component/Button';
import auth from '@react-native-firebase/auth';
import NetInfo from '@react-native-community/netinfo';
import InternetStatusModal from '../../../Component/InternetStatusModal';

const Inbox = ({navigation}) => {

  const [connectionStatus, setConnectionStatus] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setConnectionStatus(state.isConnected);
    });
    return () => {
      unsubscribe();
    };
  });

  const onLogout = () => {
    auth()
    .signOut()
    .then(() => console.log('User signed out!'));
  };

  return (
    <View>

    <InternetStatusModal isVisible={!connectionStatus} />
        <Text>Inbox</Text>
      </View>
  );
};

export default React.memo(Inbox);
