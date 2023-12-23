/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import colors from '../../../constant/color';

const styles = StyleSheet.create({
  topContainer: {
    width: '100%',
    height: 75,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  topIcon: {
    width: 175,
    height: 50,
    marginLeft: 50,
  },
  mainContainer:{
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  textHeader:{
    fontFamily: 'Poppins-SemiBold',
    fontSize: 24,
  },
  dropDownHolder: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 360,
    marginTop: 15,
  },
  dropdownLabel:{
    fontFamily: 'Poppins-Regular',
    width: 70,
  },
  dropdown: {
    width: 280,
    borderRadius: 30,
    paddingHorizontal: 20,
  },
  dropdownContainer:{
    width: 280,
    borderRadius: 30,
    paddingHorizontal: 20,
  },
  birthdateHolder:{
    flexDirection: 'row',
    alignItems: 'center',
    width: 370,
    marginTop: 15,
  },
  birthdate:{
    width: 200,
    marginTop: 0,
  },
  birthdateIcon:{
    width: 30,
    height: 30,
    marginLeft: -100,
  },
  weight:{
    width: 150,
    marginTop: 0,
    marginLeft: -25,
  },
  description:{
    height: 85,
    borderRadius: 10,
    alignItems: 'flex-start',
    paddingVertical: 0,
    paddingLeft: 10,
  },
  descriptionInput:{
    textAlignVertical: 'top',
  },
  vaccinationHolder:{
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  vaccinationText:{
    flexDirection: 'row',
  },
  vaccinationHeader:{
    fontFamily: 'Poppins-Regular',
    marginRight: 5,
  },
  vaccinationSubtitle:{
    fontFamily: 'Poppins-Light',
  },
  addVaccineButton:{
    width: 30,
    height: 30,
  },
  imageContainer: {
    marginTop: 30,
    marginBottom: 50,
    alignItems: 'center',
  },
  imageBox: {
    width: 300,
    height: 300,
  },
});

export default styles;
