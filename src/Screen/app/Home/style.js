/* eslint-disable prettier/prettier */
import {StyleSheet , Dimensions} from 'react-native';
import colors from '../../../constant/color';
const {height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 18,
  },
  container2:{
    width: '100%',
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  topContainer:{
    width: '100%',
    height: 75,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  logo: {
    width: 50,
    height: 50,
  },
  header:{
    color: colors.black,
    fontSize: 18,
    fontWeight: '500',
  },
  topIcon:{
    width: 175,
    height: 50,
    marginLeft: 50,
  },
  sliderWrapper:{
    width: 380,
    height: 175,
    borderRadius: 7.5,
  },
  banner:{
    width: 380,
    height: 175,
    borderRadius: 7.5,
  },
  paginationStyle: {
    justifyContent: 'center',
    marginBottom: -50,
  },
  dotStyle:{
    width: 10,
    height: 10,
    borderRadius: 8,
    marginRight: 5,
    marginLeft: 5,
    backgroundColor: colors.grey,
  },
  activeDotStyle:{
    width: 10,
    height: 10,
    borderRadius: 8,
    marginRight: 5,
    marginLeft: 5,
    backgroundColor: colors.green,
  },
  swiperContent:{
    height: '100%',
    alignContent: 'center',
    justifyContent: 'space-between',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  textStyle: {
    fontFamily: 'Poppins-Medium',
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  internetImage:{
    width: 150,
    height: 150,
    marginBottom: 30,
  },
});

export default styles;
