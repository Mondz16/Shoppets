/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {Image, StyleSheet} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';

import SignUp from './Screen/auth/SignUp';
import Login from './Screen/auth/Login';
import PostSignUp from './Screen/auth/PostSignUp';
import ResetPassword from './Screen/auth/ResetPassword';
import PostResetPassword from './Screen/auth/PostResetPassword';
import Home from './Screen/app/Home';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Profile from './Screen/app/Profile';
import colors from './constant/color';
import Inbox from './Screen/app/Inbox';
import Orders from './Screen/app/Orders';
import Sell from './Screen/app/Sell';
import Notification from './Screen/app/Notification';
import Welcome from './Screen/auth/Welcome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LogBox } from 'react-native';
import PetDetails from './Screen/app/PetDetails';
import SignUpConfirmCode from './Screen/auth/SignUpConfirmCode';
import Cart from './Screen/app/Cart';
import AllCategories from './Screen/app/AllCategories';
import SearchPet from './Screen/app/SearchPet';
import AddToStore from './Screen/app/AddToStore';
import PetOrderDetails from './Screen/app/PetOrderDetails';
import SellerPetDetails from './Screen/app/SellerPetDetails';
import SellerEditPetDetails from './Screen/app/SellerEditPetDetails';
import Wishlist from './Screen/app/Wishlist';
import HelpCenter from './Screen/app/HelpCenter';
import ProfileAboutApp from './Screen/app/ProfileAboutApp';
import ProfileTermsAndPolicy from './Screen/app/ProfileTermsAndPolicy';
import ProfilePrivacyPolicy from './Screen/app/ProfilePrivacyPolicy';
import ProfileResetPassword from './Screen/app/ProfileResetPassword';
import SellerPetOrderDetails from './Screen/app/SellerPetOrderDetails';
import ProfileBankGcash from './Screen/app/ProfileBankGcash';
import Chat from './Screen/app/Chat';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Routes = () => {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [firstLaunch, setFirstLaunch] = useState(true);

  const controlStorage = async () => {
    try {
      const value = await AsyncStorage.getItem('FIRST_LAUNCH');
      if (!value) {
        AsyncStorage.setItem('FIRST_LAUNCH', 'false');
      } else {
        setFirstLaunch(false);
      }
    } catch (e) {
      console.error('error >>', e);
    }
  };

  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  }

  useEffect(() => {
    controlStorage().then(() => {
      const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
      return subscriber; // unsubscribe on unmount
    });
  }, []);

  useEffect(() => {
    console.log('First Launch >>', firstLaunch);
  }, [firstLaunch]);

  if (initializing) {
    console.log('Initializing Firebase');
    return null;
  }

  if (user) {
    console.log(`User Signed in with ${user.email} | id: ${user.uid}`);
  }

  function MainApp() {
    return (
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: colors.darkGreen,
          tabBarInactiveTintColor: colors.grey,
          tabBarLabelStyle: styles.tabLabel,
        }}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({focused}) => (
              <Image
                style={styles.tabIcon}
                source={
                  focused
                    ? require('./assets/home_active.png')
                    : require('./assets/home_inactive.png')
                }
              />
            ),
          }}
        />
        <Tab.Screen
          name="Orders"
          component={Orders}
          options={{
            tabBarIcon: ({focused}) => (
              <Image
                style={styles.tabIcon}
                source={
                  focused
                    ? require('./assets/orders_active.png')
                    : require('./assets/orders_inactive.png')
                }
              />
            ),
          }}
        />
        <Tab.Screen
          name="Notification"
          component={Notification}
          options={{
            tabBarIcon: ({focused}) => (
              <Image
                style={styles.tabIcon}
                source={
                  focused
                    ? require('./assets/notification_active.png')
                    : require('./assets/notification_inactive.png')
                }
              />
            ),
          }}
        />
        <Tab.Screen
          name="Sell"
          component={Sell}
          options={{
            tabBarIcon: ({focused}) => (
              <Image
                style={styles.tabIcon}
                source={
                  focused
                    ? require('./assets/sell_active.png')
                    : require('./assets/sell_inactive.png')
                }
              />
            ),
          }}
        />
        <Tab.Screen
          name="Cart"
          component={Cart}
          options={{
            tabBarIcon: ({focused}) => (
              <Image
                style={styles.tabIcon}
                source={
                  focused
                    ? require('./assets/cart_active.png')
                    : require('./assets/cart_inactive.png')
                }
              />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }

  return (
    <Stack.Navigator
      initialRouteName={firstLaunch ? 'Welcome' : user ? 'MainApp' : 'Login'}
      screenOptions={{headerShown: false , gestureEnabled: false}}
      >
      <Stack.Screen
        name="MainApp"
        component={MainApp}
      />
      <Stack.Screen
        name="Welcome"
        component={Welcome}
      />
      <Stack.Screen
        name="Login"
        component={Login}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ gestureEnabled: true}}
      />
      <Stack.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={{ gestureEnabled: true}}
      />
      <Stack.Screen
        name="PostResetPassword"
        component={PostResetPassword}
      />
      <Stack.Screen
        name="SignUpConfirmCode"
        component={SignUpConfirmCode}
      />
      <Stack.Screen
        name="PostSignUp"
        component={PostSignUp}
      />
      <Stack.Screen
        name="PetDetails"
        component={PetDetails}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
      />
      <Stack.Screen
        name="AllCategories"
        component={AllCategories}
      />
      <Stack.Screen
        name="SearchPet"
        component={SearchPet}
      />
      <Stack.Screen
        name="AddToStore"
        component={AddToStore}
      />
      <Stack.Screen
        name="PetOrderDetails"
        component={PetOrderDetails}
      />
      <Stack.Screen
        name="SellerPetDetails"
        component={SellerPetDetails}
      />
      <Stack.Screen
        name="SellerEditPetDetails"
        component={SellerEditPetDetails}
      />
      <Stack.Screen
        name="Wishlist"
        component={Wishlist}
      />
      <Stack.Screen
        name="HelpCenter"
        component={HelpCenter}
      />
      <Stack.Screen
        name="ProfileAboutApp"
        component={ProfileAboutApp}
      />
      <Stack.Screen
        name="ProfileTermsAndPolicy"
        component={ProfileTermsAndPolicy}
      />
      <Stack.Screen
        name="ProfilePrivacyPolicy"
        component={ProfilePrivacyPolicy}
      />
      <Stack.Screen
        name="ProfileResetPassword"
        component={ProfileResetPassword}
      />
      <Stack.Screen
        name="SellerPetOrderDetails"
        component={SellerPetOrderDetails}
      />
      <Stack.Screen
        name="ProfileBankGcash"
        component={ProfileBankGcash}
      />
      <Stack.Screen
        name="Chat"
        component={Chat}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  tabIcon: {
    width: 24,
    height: 24,
  },
  tabLabel: {
    fontWeight: '500',
  },
});

export default React.memo(Routes);
