/* eslint-disable prettier/prettier */
import React from 'react';
import {
  FlatList,
  Image,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './style';
import LinearGradient from 'react-native-linear-gradient';
import ClickableIcon from '../ClickableIcon';
import Button from '../Button';
import auth from '@react-native-firebase/auth';
import colors from '../../constant/color';

const MedicalModal = ({
  title,
  verifiedText,
  vaccination,
  description,
  buttonText,
  visible,
  onRequestClose,
}) => {
  console.log('vaccination >>', vaccination);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onRequestClose}>
      <View style={styles.modalContainer}>
        <LinearGradient
          style={styles.modalView}
          colors={[colors.lighBlue, colors.white]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}>
          <Text style={styles.modalHeader}>{title}</Text>
          <Text style={styles.modalText}>{verifiedText}</Text>

          <FlatList
            horizontal={false}
            data={vaccination}
            style={{flexGrow: 1}}
            ListEmptyComponent={
              <View style={{alignItems: 'center'}}>
                <Text>No item found.</Text>
              </View>
            }
            ListHeaderComponent={
              <View style={{flexDirection: 'row', width: 230, justifyContent: 'space-between', paddingRight: 20, marginTop: 15}}>
                <Text style={{fontFamily: 'Poppins-SemiBold', color: colors.black}}>Vaccine Name</Text>
                <Text style={{fontFamily: 'Poppins-SemiBold', color: colors.black}}>Date</Text>
              </View>
            }
            keyExtractor={item => String(item?.vaccineName)}
            renderItem={({item, index}) => {
              return (
                <View style={{flexDirection: 'row', width: 250, justifyContent: 'space-between'}}>
                  <Text style={{fontFamily: 'Poppins-Regular', color: colors.black, fontSize: 14}}>{item.vaccineName}</Text>
                  <Text style={{fontFamily: 'Poppins-Regular', color: colors.black, fontSize: 14}}>{item.vaccineDate}</Text>
                </View>
              );
            }}
          />
          <Button
            withBorder={true}
            title={buttonText ? buttonText : 'Close'}
            buttonStyle={{marginTop: 30}}
            onPress={onRequestClose}
          />
        </LinearGradient>
      </View>
    </Modal>
  );
};

export default React.memo(MedicalModal);
