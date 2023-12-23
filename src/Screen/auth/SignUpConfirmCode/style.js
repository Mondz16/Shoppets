/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import colors from '../../../constant/color';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  scrollView: {
    width: '100%',
  },
  modalHolder: {
    height: '100%',
    alignItems: 'center',
  },
  inputHolder: {
    width: '90%',
    backgroundColor: colors.lighBlue,
    padding: 30,
    paddingTop: 10,
    borderRadius: 15,
    marginTop: 200,
    marginBottom: 30,
  },
  icon: {
    width: 60,
    height: 60,
    marginBottom: 100,
    marginTop: 20,
  },
  image: {
    width: 300,
    height: 300,
    marginTop: -229,
    alignItems: 'center',
  },
  label: {
    width: '100%',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inputField: {
    borderRadius: 30,
    width: '100%',
    padding: 10,
    paddingLeft: 20,
    marginTop: 20,
    backgroundColor: colors.grey,
    color: colors.black,
    letterSpacing: 1,
    fontWeight: '300',
  },
  signUp:{
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  forgotPassText: {
    color: colors.blue,
    marginLeft: 15,
    marginVertical: 10,
    fontSize: 12,
  },
  signUpText: {
    color: colors.blue,
    marginLeft: 5,
  },
  text: {
    color: colors.black,
    fontSize: 13,
    fontWeight: '300',
    textAlign: 'center',
    marginVertical: 5,
  },
  numberText: {
    color: colors.black,
    fontWeight: '500',
    textAlign: 'center',
    marginVertical: 5,
  },
  error:{
    color: colors.red,
    fontWeight: '300',
    textAlign: 'center',
  },
});

export default styles;
