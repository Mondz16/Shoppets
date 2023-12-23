/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  View,
  Dimensions,
  LogBox,
} from 'react-native';
import styles from './style';
import Title from '../../../Component/Title';
import InfoCard from '../../../Component/InfoCard';
import LinearGradient from 'react-native-linear-gradient';
import ClickableIcon from '../../../Component/ClickableIcon';
import colors from '../../../constant/color';
import Swiper from 'react-native-swiper';
import GradientButton from '../../../Component/GradientButton';
import NetInfo from '@react-native-community/netinfo';
import InternetStatusModal from '../../../Component/InternetStatusModal';
import SingleButtonModal from '../../../Component/SingleButtonModal';

const {width} = Dimensions.get('window');
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const PetOrderDetails = ({navigation, route}) => {
  const {item} = route?.params || {};
  const mainImage = item?.petImage?.length ? item?.petImage[0] : null;

  const [connectionStatus, setConnectionStatus] = useState(true);
  const [cancelModalVisible, setCancelModalVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setConnectionStatus(state.isConnected);
    });
    return () => {
      unsubscribe();
    };
  });

  const onBackButtonPressed = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView>
      <InternetStatusModal isVisible={!connectionStatus} />

      <SingleButtonModal
      icon={require('../../../assets/close.png')}
        title={'Order Cancelled!'}
        description={'Order has been cancelled!'}
        visible={cancelModalVisible}
        onRequestClose={() => {
          setCancelModalVisible(!cancelModalVisible);
        }}
       />
      <LinearGradient
        style={styles.topContainer}
        colors={[colors.darkBlue, colors.green]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        <ClickableIcon
          icon={require('../../../assets/back.png')}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.topText}>{item?.category}</Text>
      </LinearGradient>
      <View style={styles.container}>
        <View style={styles.swiperContainer}>
          <Swiper
            containerStyle={styles.sliderWrapper}
            showsButtons={item?.petImage?.length > 1}
            width={width - 45}
            height={280}
            loop={true}
            paginationStyle={styles.paginationStyle}
            dotStyle={styles.dotStyle}
            bounces={true}
            activeDotStyle={styles.activeDotStyle}>
            {item?.petImage.map(img => {
              return (
                <View>
                  <Image style={styles.banner} source={{uri: img}} />
                </View>
              );
            })}
          </Swiper>
        </View>
        <View style={styles.mainTitle}>
          <Title title={item.petName} isTitle={true} />
          <View style={styles.priceHolder}>
            <Image
              style={styles.priceIcon}
              source={require('../../../assets/peso.png')}
            />
            <Title title={item.price} isTitle={true} />
          </View>
        </View>

        <View style={styles.locationHolder}>
          <Image
            style={styles.icon}
            source={require('../../../assets/location.png')}
          />
          <Text style={styles.locationText}>{item.location}</Text>
        </View>

        <InfoCard
          profile={item.sellerImage}
          sellerName={item.sellerName}
          rate={item.sellerRating}
        />

        <View>
          <Text style={styles.paymentDetails}>Payment Details</Text>
          <View style={styles.statusHolder}>
              <Text style={styles.statusLabel}>Payment Method:</Text>
              <Text style={styles.status}>Gcash</Text>
            </View>
          <View style={styles.statusHolder}>
              <Text style={styles.statusLabel}>Order ID:</Text>
              <Text style={styles.status}>1312321321</Text>
            </View>
          <View style={styles.statusHolder}>
              <Text style={styles.statusLabel}>Pet Price:</Text>
              <Text style={styles.status}>P 8,000.00</Text>
            </View>
          <View style={styles.statusHolder}>
              <Text style={styles.statusLabel}>Delivery Fee:</Text>
              <Text style={styles.status}>P 120.00</Text>
            </View>
          <View style={styles.statusHolder}>
              <Text style={styles.statusLabel}>Pet Price:</Text>
              <Text style={styles.status}>P 8,000.00</Text>
            </View>
          <View style={styles.statusHolder}>
              <Text style={styles.statusLabel}>Total:</Text>
              <Text style={styles.status}>P 8,120.00</Text>
            </View>
        </View>
      </View>
      <View style={styles.gradientButtonHolder}>
        <GradientButton
          buttonStyle={{
            width: width / 2 - 20,
          }}
          title={'Cancel Order'}
          withBorder={true}
          clickable={true}
          onPress={() => setCancelModalVisible(true)}
        />
        <GradientButton
          buttonStyle={{
            width: width / 2 - 20,
          }}
          title={'Pay Now'}
          withBorder={true}
          clickable={true}
        />
      </View>
    </SafeAreaView>
  );
};

export default React.memo(PetOrderDetails);
