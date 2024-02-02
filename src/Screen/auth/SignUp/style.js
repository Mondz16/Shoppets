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
    paddingTop: 0,
    borderRadius: 15,
    marginTop: 30,
    marginBottom: 30,
  },
  icon: {
    width: 60,
    height: 60,
    marginBottom: 100,
    marginTop: 20,
  },
  buttonHolder:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  rememberMeHolder:{
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox:{
    width: 18,
    height: 18,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: -145,
    alignSelf: 'center',
  },
  label: {
    width: '100%',
    fontSize: 15,
    textAlign: 'left',
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
    marginTop: 0,
    marginBottom: -20,
  },
  login:{
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  detailText:{
    color: colors.darkGrey2,
    marginLeft: 15,
    marginVertical: 10,
    fontSize: 12,
  },
  forgotPassText: {
    color: colors.blue,
    marginVertical: 10,
    fontSize: 12,
    marginLeft: 3,
  },
  signUpText: {
    color: colors.blue,
    marginLeft: 5,
  },
  text: {
    color: colors.black,
    fontWeight: '300',
  },
  error:{
    color: colors.red,
    fontWeight: '300',
    textAlign: 'center',
  },
});

export default styles;
