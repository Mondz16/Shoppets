/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import {Text, View, Image} from 'react-native';
import Swiper from 'react-native-swiper';
import styles from './style';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../../constant/color';
import Button from '../../../Component/Button';

const Welcome = ({navigation}) => {
  return (
    <Swiper
      style={styles.wrapper}
      showsButtons={true}
      buttonWrapperStyle={{
        alignItems: 'flex-end',
        paddingBottom: 40,
      }}
      prevButton={(<Text style={styles.buttonText} />	)}
      nextButton={(
        <Button
                clickable={false}
                title={'Next'}
                buttonStyle={{
                  width: 170,
                  borderRadius: 10,
                  }}
                withBorder={true}
              />
      )}
      loop={false}
      paginationStyle={styles.paginationStyle}
      dotStyle={styles.dotStyle}
      activeDotStyle={styles.activeDotStyle}
      >
      <LinearGradient
        style={styles.container}
        colors={[colors.darkBlue, colors.green]}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}>
        <Image
          style={{width: '100%', position: 'absolute'}}
          source={require('../../../assets/background.png')}
        />
        <Image
          style={{width: '100%', position: 'absolute'}}
          source={require('../../../assets/slide-1.png')}
        />
        <Image
          style={styles.icon}
          source={require('../../../assets/paws.png')}
        />
        <View style={styles.slide1}>
          <Text style={styles.header}>Welcome to</Text>
          <Text
            style={[
              styles.header,
              {fontSize: 39, fontWeight: 'bold', marginTop: -10},
            ]}>
            SHOPETS!
          </Text>
          <Text style={styles.text}>
            Explore adorable pets waiting for a loving home.
          </Text>
          <View style={styles.buttonContainer}>
            <Button
              title={'Skip'}
              buttonStyle={{
                width: '45%',
                height: 50,
                borderRadius: 10,
                backgroundColor: colors.grey,
              }}
              style={{color: colors.black}}
              withBorder={false}
            />
          </View>
        </View>
      </LinearGradient>
      <LinearGradient
        style={styles.container}
        colors={[colors.darkBlue, colors.green]}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}>
        <Image
          style={{width: '100%', position: 'absolute'}}
          source={require('../../../assets/background.png')}
        />
        <Image
          style={{width: '100%', position: 'absolute'}}
          source={require('../../../assets/slide-2.png')}
        />
        <Image
          style={styles.icon}
          source={require('../../../assets/paws.png')}
        />
        <View style={styles.slide1}>
          <Text style={styles.header}>Welcome to</Text>
          <Text
            style={[
              styles.header,
              {fontSize: 39, fontWeight: 'bold', marginTop: -10},
            ]}>
            SHOPETS!
          </Text>
          <Text style={styles.text}>
            Explore adorable pets waiting for a loving home.
          </Text>
          <View style={styles.buttonContainer}>
            <Button
              title={'Skip'}
              buttonStyle={{
                width: '45%',
                height: 50,
                borderRadius: 10,
                backgroundColor: colors.grey,
              }}
              style={{color: colors.black}}
              withBorder={false}
            />
          </View>
        </View>
      </LinearGradient>
      <LinearGradient
        style={styles.container}
        colors={[colors.darkBlue, colors.green]}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}>
        <Image
          style={{width: '100%', position: 'absolute'}}
          source={require('../../../assets/background.png')}
        />
        <Image
          style={{width: '100%', position: 'absolute'}}
          source={require('../../../assets/slide-3.png')}
        />
        <Image
          style={styles.icon}
          source={require('../../../assets/paws.png')}
        />
        <View style={styles.slide1}>
          <Text style={styles.header}>Welcome to</Text>
          <Text
            style={[
              styles.header,
              {fontSize: 39, fontWeight: 'bold', marginTop: -10},
            ]}>
            SHOPETS!
          </Text>
          <Text style={styles.text}>
            Where Pets and People Connect.
          </Text>
          <View style={styles.buttonContainer}>
            <Button
              title={'Skip'}
              buttonStyle={{
                width: '45%',
                height: 50,
                borderRadius: 10,
                backgroundColor: colors.grey,
              }}
              style={{color: colors.black}}
              withBorder={false}
            />
            <Button
              title={'Next'}
              buttonStyle={{width: '45%', borderRadius: 10}}
              withBorder={true}
              onPress={() => navigation.navigate('Login', {navigation})}
            />
          </View>
        </View>
      </LinearGradient>
    </Swiper>
  );
};

export default React.memo(Welcome);
