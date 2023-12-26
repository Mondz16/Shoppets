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
    width: 300,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    paddingTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
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
    width: 100,
    height: 100,
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
    marginVertical: 10,
  },
  modalSubtitle: {
    fontFamily: 'Poppins-Light',
    letterSpacing: 1,
    fontSize: 14,
    width: 250,
  },
  modalText: {
    fontFamily: 'Poppins-Light',
    fontSize: 13,
    textAlign: 'center',
    letterSpacing: 1,
    textAlignVertical: 'center',
    width: 200,
    marginHorizontal: 10,
    marginBottom: -5,
  },
  buttonClose: {
    borderRadius: 20,
    padding: 0,
    backgroundColor: colors.darkGreen,
    alignSelf: 'flex-end',
    marginTop: -20,
  },
  container: {
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginVertical: 10,
    width: '100%',
  },
  infoHolder: {
    width: '68%',
  },
  shopHolder: {
    width: '32%',
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default styles;
