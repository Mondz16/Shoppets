/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {TextInput, View, Image} from 'react-native';
import styles from './style';
import ClickableIcon from '../ClickableIcon';
import DatePicker from 'react-native-date-picker';

const VaccineInput = ({vaccineName , vaccineDate , onChangeVaccine, onChangeDate , onRemoveVaccine}) => {
  const [date, setDate] = useState(new Date());
  const [openDate, setOpenDate] = useState(false);

  return (
    <View>
      <DatePicker
        modal
        mode="date"
        open={openDate}
        date={date}
        minimumDate={new Date('2000-1-1')}
        maximumDate={new Date('2023-11-23')}
        onConfirm={onChangeDate}
        onCancel={() => {
          setOpenDate(false);
        }}
      />
      <View style={styles.vaccineInputHolder}>
        <TextInput onChangeText={onChangeVaccine} style={styles.inputField} editable={true} value={vaccineName} placeholder={'Vaccine Name'} />
        <>
          <TextInput style={styles.inputField} editable={false} value={vaccineDate} placeholder={'Date'} />
          <ClickableIcon
            iconStyle={styles.icon}
            icon={require('../../assets/calendar.png')}
            onPress={() => setOpenDate(true)}
          />
        </>
        <ClickableIcon
            iconStyle={styles.removeIcon}
            icon={require('../../assets/remove.png')}
            onPress={onRemoveVaccine}
          />
      </View>
    </View>
  );
};

export default React.memo(VaccineInput);
