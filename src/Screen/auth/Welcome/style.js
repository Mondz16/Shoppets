/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import colors from '../../../constant/color';

const styles = StyleSheet.create({
  wrapper: {},
  container:{
    height: '100%',
    alignContent: 'center',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  slide1: {
    justifyContent: 'center',
    alignItems: 'left',
    width: '100%',
    padding: 25,
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  header:{
    color: '#fff',
    fontSize: 30,
  },
  text: {
    color: '#fff',
    fontSize: 18,
    width: 300,
    fontWeight: '400',
    marginTop: 0,
    marginBottom: 20,
  },
  paginationStyle: {
    marginBottom: 260,
    marginRight: 300,
    justifyContent: 'center',
  },
  dotStyle:{
    width: 10,
    height: 10,
    borderRadius: 8,
    marginRight: 5,
    marginLeft: 5,
    backgroundColor: colors.white,
  },
  activeDotStyle:{
    width: 15,
    height: 15,
    borderRadius: 8,
    marginRight: 5,
    marginLeft: 5,
    backgroundColor: colors.green,
  },
  icon: {
    width: 60,
    height: 60,
    marginBottom: 100,
    marginTop: 20,
    alignSelf: 'center',
  },
});

export default styles;
