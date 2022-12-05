import React, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, View, Pressable, TextInput } from 'react-native';
import * as Location from 'expo-location';
//import YELP_API_KEY from '../.env'

function HomeScreen({ navigation }) {

  const [userlocation, setUserLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  //const [name, setName] = useState('');
  const [userAddress, setUserAddress] = useState(null)

  const onPressHandler = () => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        alert('Please go to settings and allow location services');
        console.log('Location permission denied');
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      console.log(loc)
      setUserLocation(loc);
    })()
  }

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        console.log('Location permission denied');
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setUserLocation(loc);
    })();
  }, []);

  // function latitude() {
  //   if (userlocation) {
  //     console.log(userlocation.coords.latitude)
  //   }
  // }
  // latitude()

  // function longitude() {
  //   if (userlocation) {
  //     console.log(userlocation.coords.longitude)
  //   }
  // }
  // longitude()

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (userlocation) {
    text = JSON.stringify(userlocation);
  }

  const navToObject = () => {
    navigation.navigate('Object')
  }

  //const userAddress = '20 WEST 34th street ny ny 10001' 
  const radius = '8000'
  const YELP_API_KEY = 'gChaVU_NPBoWTsWwmuSwZ4AbrwCyPuBFw9hHIe3irRKszbN22YZGUgbAssxD-HE8VGFLnLbQhpqyEmKl45I2BcRKdr9FSQuCMOMFIu1uf3_mrPdHeUPeBxaJv5SKY3Yx'

  const getYelpRestaurants = async () => {
    //await {userAddress}
    // console.log(userAddress)
    if (!userlocation) {
      const yelpUrl = `https://api.yelp.com/v3/businesses/search?location=${userAddress}&term=food, restaurants&radius=${radius}`
      const apiOptions = {
        headers: {
          Authorization: `Bearer ${YELP_API_KEY}`,
        },
      }
              return await fetch(yelpUrl, apiOptions)
                .then((res) => res.json())
                .then((json) =>
                console.log(userAddress),
                  console.log(json),
                  // setRestaurantData(
                  //   json.businesses.filter((business) =>
                  //     business.transactions.includes(activeTab.toLowerCase())
                )
    } else {
      const yelpUrl = `https://api.yelp.com/v3/businesses/search?term=food, restaurants&radius=${radius}&latitude=${userlocation.coords.latitude}&longitude=${userlocation.coords.longitude}`
      const apiOptions = {
        headers: {
          Authorization: `Bearer ${YELP_API_KEY}`

        }
      }
      return await fetch(yelpUrl, apiOptions)
        .then((res) => res.json())
        .then((json) =>
          console.log(json),
          console.log(userlocation),
        )
    }


  //   if (userlocation) {
  //     const yelpUrl = `https://api.yelp.com/v3/businesses/search?term=food, restaurants&radius=${radius}&latitude=${userlocation.coords.latitude}&longitude=${userlocation.coords.longitude}`
  //     const apiOptions = {
  //       headers: {
  //         Authorization: `Bearer ${YELP_API_KEY}`

  //       }
  //     }
  //     return await fetch(yelpUrl, apiOptions)
  //       .then((res) => res.json())
  //       .then((json) =>
  //         console.log(json),
  //         console.log(userlocation),
  //       )
  //   } else {
  //     const yelpUrl = `https://api.yelp.com/v3/businesses/search?location=${userAddress}&term=food, restaurants&radius=${radius}`
  //     const apiOptions = {
  //       headers: {
  //         Authorization: `Bearer ${YELP_API_KEY}`,
  //       },
  //     }
  //     //await userAddress
  //     if (userAddress) {
  //       console.log(userAddress)
  //       return await fetch(yelpUrl, apiOptions)
  //         .then((res) => res.json())
  //         .then((json) =>
  //           console.log(json),
  //           console.log(userAddress),
  //           // setRestaurantData(
  //           //   json.businesses.filter((business) =>
  //           //     business.transactions.includes(activeTab.toLowerCase())
  //         )
  //       //   )
  //       // );
  //     }
  //   }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.img} source={require('../assets/Feed-Your-Hangry.png')} />
      <Text style={styles.text}>Welcome to Iffy Eats!</Text>
      {!userlocation ? <View>
        <Pressable
          style={({ pressed }) => [({ backgroundColor: pressed ? 'purple' : 'hotpink' }), styles.wrapperCustom]}
          onPress={onPressHandler}
        >
          <Text style={styles.btnText}>Use My Location</Text>
        </Pressable>
        <Text style={styles.textSpacer}>------------------- OR ------------------</Text>
        <TextInput
          style={styles.input}
          keyboardType={'default'}
          placeholder={'Enter Address'}
          value ={userAddress}
          onChange={(e) => setUserAddress(e.target.value)}
        ></TextInput>

        <Pressable
          style={({ pressed }) => [({ backgroundColor: pressed ? 'purple' : 'hotpink' }), styles.wrapperCustom]}
          onPress={getYelpRestaurants}
        >
          <Text style={styles.btnText}>Enter Address</Text>
        </Pressable>
      </View> :
        <View>
          {/* <TextInput
            placeholder='Address'
            onChange={(e) => setUserAddress(e.target.value)}
          ></TextInput> */}
          {/* <Pressable
            style={({ pressed }) => [({ backgroundColor: pressed ? 'purple' : 'hotpink' }), styles.wrapperCustom]}
            onPress={getYelpRestaurants}
          >
          </Pressable> */}
          <Pressable
            style={({ pressed }) => [({ backgroundColor: pressed ? 'purple' : 'hotpink' }), styles.wrapperCustom]}
            onPress={navToObject}
          >
            <Text style={styles.btnText}>Click to feed your hangry!</Text>
          </Pressable>
          <StatusBar style="auto" />
        </View>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    height: 300,
    width: 300,
    margin: 30,
  },
  input: {
    borderWidth: 3,
    borderColor: "chartreuse",
    fontSize: 30,
  },
  text: {
    marginBottom: 60,
    textAlign: 'center'
  },
  textSpacer: {
    marginTop: 10,
    marginBottom: 12,
    textAlign: 'center'
  },
  wrapperCustom: {
    borderRadius: 8,
    padding: 6,
    margin: 10,
    width: 150,
    textAlign: 'center',
    alignSelf: 'center',
  },
  btnText: {
    textAlign: 'center'
  }
});

export default HomeScreen