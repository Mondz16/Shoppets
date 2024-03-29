/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import colors from '../../../constant/color';

const styles = StyleSheet.create({
  mainContainer:{
    padding: 10,
  },
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
  container: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputHolder: {
    width: '90%',
    backgroundColor: colors.lighBlue,
    padding: 30,
    paddingTop: 70,
    borderRadius: 15,
    marginBottom: 30,
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
  icon: {
    width: 60,
    height: 60,
    marginBottom: 100,
    marginTop: 20,
  },
  image: {
    width: 300,
    height: 300,
    marginTop: -310,
    alignItems: 'center',
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
    marginTop: 5,
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
    fontWeight: '300',
  },
  error:{
    color: colors.red,
    fontWeight: '300',
    textAlign: 'center',
  },
  header:{
    marginTop: 10,
    fontFamily: 'Poppins-SemiBold',
    paddingLeft: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.darkGrey,
  },
  showAllButton:{
    color: colors.darkGrey2,
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    fontWeight: 'normal',
  },
  showButton:{
    borderTopWidth: 1,
    borderTopColor: colors.darkGrey,
  },
});

export default styles;
