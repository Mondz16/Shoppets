/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import colors from '../../constant/color';

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: 350,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  editButton:{
    alignSelf: 'flex-end',
    marginRight: 50,
    marginTop: -50,
  },
  modalButtonHolder: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderBottomWidth: 2.2,
    borderBottomColor: colors.darkGreen,
    paddingVertical: 5,
    marginVertical: 5,
  },
  modalIcon: {
    width: 23,
    height: 23,
  },
  modalHeader: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    marginBottom: -5,
  },
  modalSubtitle: {
    fontFamily: 'Poppins-Light',
    letterSpacing: 1,
    fontSize: 14,
  },
  modalText: {
    fontFamily: 'Poppins-Light',
    fontSize: 13,
    textAlign: 'left',
    letterSpacing: 1,
    textAlignVertical: 'center',
    width: 200,
    marginHorizontal: 10,
    marginBottom: -5,
  },
  buttonClose: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: colors.darkGreen,
    alignSelf: 'flex-end',
  },
});

export default styles;
