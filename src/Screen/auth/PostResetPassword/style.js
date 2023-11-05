/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import colors from '../../../constant/color';

const styles = StyleSheet.create({
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
    alignItems: 'center',
  },
  icon: {
    width: 60,
    height: 60,
    marginBottom: 100,
    marginTop: 20,
  },
  checkIcon:{
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  image: {
    width: 310,
    height: 310,
    marginTop: -292,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.black,
  },
  description: {
    fontSize: 16,
    width: 300,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 25,
  },
});

export default styles;
