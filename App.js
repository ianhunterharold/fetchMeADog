import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ScrollView, SafeAreaView, Image, ActivityIndicator, RefreshControl } from 'react-native';
import Constants from 'expo-constants';



export default function App() {

  const [ pet, setPet ] = useState();
  const [ loading, setLoading ] = useState(false);

  const loadPet = async () => {
    setLoading(true);
    const res = await fetch('http://pet-library.moonhighway.com/api/randompet');
    const data = await res.json();
    await Image.prefetch(data.photo.full);
    
    setPet(data);
    setLoading(false);
  }

  useEffect(()=>{
    loadPet()
  },[])


  if (!pet) return <ActivityIndicator size="large"/>; 


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
      <RefreshControl refreshing={loading} onRefresh={loadPet}/> 
      <Image style={styles.pic} source={{uri: pet.photo.full}} /> 
        <Text style={styles.paragraph}>Type:{pet.category}</Text>
        <Text style={styles.paragraph}>Type:{pet.name}</Text>
        <Text style={styles.paragraph}>Type:{pet.weight}</Text>
      </ScrollView>
    </SafeAreaView>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 5,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  pic: {
    height: 500,
    width: 500,
    
  },
});
