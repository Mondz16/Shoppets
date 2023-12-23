/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {Image, Text, FlatList, View, Modal, Pressable} from 'react-native';
import Button from '../../../Component/Button';
import categories from '../../../data/categories.json';
import PetCard from '../../../Component/PetCard';
import styles from './style';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../../constant/color';
import ClickableIcon from '../../../Component/ClickableIcon';
import Swiper from 'react-native-swiper';
import IconCategories from '../../../Component/IconCategories';
import InputSearch from '../../../Component/InputSearch';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import NetInfo from '@react-native-community/netinfo';
import InternetStatusModal from '../../../Component/InternetStatusModal';

const AllCategories = ({navigation}) => {
  var RNFS = require('react-native-fs');

  const [selectedCategory, setSelectedCategory] = useState('Dog');
  const [data, setData] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);
  const [petData, setPetData] = useState();
  const [connectionStatus, setConnectionStatus] = useState(true);

  const user = auth().currentUser;
  const path = `${RNFS.DocumentDirectoryPath}/data.txt`;

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setConnectionStatus(state.isConnected);
    });
    return () => {
      unsubscribe();
    };
  });

  // retrieves the file from the local data or firestore
  useEffect(() => {
    getFile();
    setCategoriesData(categories);
    getFirestoreData();
  }, []);

  useEffect(() => {
    const filteredData = petData?.filter(item =>
      item?.category.includes(selectedCategory),
    );
    setData(filteredData);
  },[petData]);

  useEffect(() => {
    if (!petData) {return;}

    const filteredData = petData?.filter(item =>
      item?.category.includes(selectedCategory),
    );
    setData(filteredData);
  }, [selectedCategory]);

  async function getFirestoreData() {
    const petCollection = await firestore()
      .collection('PetCollection')
      .doc('PetData')
      .get();

      saveFile(petCollection.data().data);
  }

  async function saveFile(firestoreData){
    try {
      await RNFS.writeFile(path, firestoreData, 'utf8');
    } catch (e) {
      console.log('saveFile error', e);
    }
  }

  async function getFile() {
    const file = await RNFS.readFile(path);
    const jsonObj = JSON.parse(file);
    console.log('file >>', file);
    setPetData(jsonObj);
  }

  return (
    <View>
      <InternetStatusModal isVisible={!connectionStatus} />
      <FlatList
        data={data}
        numColumns={2}
        style={{flexGrow: 1}}
        ListEmptyComponent={
          <View style={{alignItems: 'center'}}>
            <Text>No {selectedCategory} found.</Text>
          </View>
        }
        ListHeaderComponent={
          <View style={styles.mainContainer}>
            <LinearGradient
              style={styles.topContainer}
              colors={[colors.darkBlue, colors.green]}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}>
              <ClickableIcon
                icon={require('../../../assets/back.png')}
                onPress={() => navigation.goBack()}
              />
              <Image
                style={styles.topIcon}
                source={require('../../../assets/ShoppetsTopIcon.png')}
              />
            </LinearGradient>
            <InputSearch
              showSearchIcon={true}
              pressable={true}
              placeholderText={'Search for pets name or breed'}
              style={{
                width: 380,
                height: 60,
                alignSelf: 'center',
                borderColor: colors.purple,
              }}
            />
            <View style={styles.container2}>
              <Text style={styles.header}>Categories</Text>
            </View>
            <IconCategories
              selectedItem={selectedCategory}
              onItemPressed={setSelectedCategory}
              data={categoriesData}
            />
          </View>
        }
        keyExtractor={item => String(item?.id)}
        renderItem={({item, index}) => (
          <PetCard
            key={item.id}
            petImage={item.petImage?.length ? item.petImage[0] : null}
            petName={item.petName}
            location={item.location}
            gender={item.petGender}
            age={item.petAge}
            onPress={() =>
              navigation.navigate('PetDetails', {navigation, item})
            }
          />
        )}
      />
    </View>
  );
};

export default React.memo(AllCategories);
