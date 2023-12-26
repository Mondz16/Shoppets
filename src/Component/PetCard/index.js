/* eslint-disable prettier/prettier */


import React, {useState , useEffect} from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import styles from './style';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import colors from '../../constant/color';

const PetCard = ({ petId, petImage, petName, location, gender, breed , onPress }) => {

    const [wishlist , setWishlist] = useState([]);
    const [wishExists , setWishExists] = useState(false);

    const id = auth().currentUser?.uid;

    useEffect(() => {
      getFirestoreWishlistData();
    }, []);

    useEffect(() => {
      let checkIfExists = wishlist?.find(x => x === petId) !== null && wishlist?.find(x => x === petId) !== undefined;
      setWishExists(checkIfExists);
      console.log('list >> ', wishlist);
    },[wishlist]);

    async function getFirestoreWishlistData() {
      await firestore()
      .collection('PetCollection')
      .doc('UserData')
      .collection(id)
      .doc('Wishlist').onSnapshot(wish => {
        if (wish.data() !== undefined && wish.data().list !== null  && wish.data().list !== undefined){
          let jsonObj = JSON.parse(wish.data().list);
          setWishlist(jsonObj);
          setWishExists(wishlist?.find(x => x === petId) !== null);
        }
        else {
          setWishlist([]);
        }
      });
    }

    async function setFirestoreWishlistData() {
      const id = auth().currentUser.uid;
      let wish = wishlist.find(x => x === petId);

      if (wish !== null && wishlist?.find(x => x === petId) !== undefined){
        wishlist.pop(petId);
      }
      else {
        wishlist.push(petId);
      }

      await firestore()
        .collection('PetCollection')
        .doc('UserData')
        .collection(id)
        .doc('Wishlist')
        .set({
          'list' : JSON.stringify(wishlist),
        })
        .then(() => {
          console.log('Wish List updated!', wishlist);
        });
    }

    return (
      <TouchableOpacity onPress={onPress} style={styles.container}>
        <Image style={styles.petImage} source={{uri: petImage}} />
        <View style={styles.subContainer}>
          <View style={styles.descriptionHolder}>
            <Text style={styles.petName}>{petName}</Text>
          </View>
          <TouchableOpacity onPress={() => setFirestoreWishlistData()} style={[styles.favHolder, wishExists ? {backgroundColor: colors.white} : {backgroundColor: colors.green}]}>
            <Image
              style={styles.favIcon}
              source={wishExists ? require('../../assets/filledheart.png') : require('../../assets/heart.png')}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.genderAge}>
          {breed}
        </Text>
        <View style={styles.iconHolder}>
          <Image
            style={styles.icon}
            source={require('../../assets/location.png')}
          />
          <Text style={styles.subtitle}>{location}</Text>
        </View>
      </TouchableOpacity>
    );
};

export default React.memo(PetCard);
