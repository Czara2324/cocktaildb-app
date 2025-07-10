import { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Alert, ImageBackground } from 'react-native';
import { ListItem, Icon, Button, Image, Text } from '@rneui/themed';

import AsyncStorage from '@react-native-async-storage/async-storage';
import StaticDrinks from '../assets/StaticDrinks'; // Importing the initial drinks data


export default function MyDrinksScreen({ navigation }) {
  const [myDrinks, setMyDrinks] = useState([]);

useEffect(() => {
  const loadData = async () => {
    try {
      const stored = await AsyncStorage.getItem('myDrinks');
      const storedDrinks = stored ? JSON.parse(stored) : [];

      // Filter out static drinks that might already be stored to avoid duplication
      const merged = [
        ...StaticDrinks,
        ...storedDrinks.filter(d => !StaticDrinks.some(s => s.id === d.id))
      ];
      setMyDrinks(merged);
    } catch (e) {
      console.error('Error loading drinks:', e);
      setMyDrinks(StaticDrinks); // Fallback to static drinks only
    }
  };

  const unsubscribe = navigation.addListener('focus', loadData);
  return unsubscribe;
}, [navigation]);



  const deleteDrink = async (id) => {
    Alert.alert('Delete this drink?', 'This action cannot be undone.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          const updated = myDrinks.filter(d => d.id !== id);
          setMyDrinks(updated);
          try {
            await AsyncStorage.setItem('myDrinks', JSON.stringify(updated));
          } catch (e) {
            console.error('Error saving updated drinks:', e);
          }
        },
      },
    ]);
  };
  return (
  <View style={styles.container}> 
  <ImageBackground
    source={require('../assets/bar.jpeg')}
    style={{ flex: 1 }}
    resizeMode='cover'
    opacity={0.3}
  >
  <Text style={styles.header}>My Drink Collection</Text>
  
  {myDrinks.length === 0 ? (
  <Text style={styles.emptyText}>No drinks saved. Add one to get started!</Text>
  ) : (
    <FlatList
      data={myDrinks}
      style={{  margin: 10 }}
      renderItem={({ item }) => (
        <ListItem
        style={{ padding:5 }}
           bottomDivider
           onPress={() => navigation.navigate('Details', { cocktail: item })}
        >
            {item.image && (
              <Image
                source={item.image}
                style={styles.image}
            />
          )}
          <ListItem.Content style={styles.content}>
             <ListItem.Title style={styles.content}>{item.name}</ListItem.Title>
             <ListItem.Subtitle style={styles.text}>{item.category} | {item.glass}</ListItem.Subtitle>
            <ListItem.Subtitle style={styles.text}>{item.strAlcoholic}</ListItem.Subtitle>
          </ListItem.Content>
          <Icon
            name="delete"
            onPress={() => deleteDrink(item.id)}
          />
        </ListItem>

      )}
      ListFooterComponent={
        <Button
          title="+"
          onPress={() => navigation.navigate('DrinkForm')}
          buttonStyle={{ backgroundColor: '#ffad33',  borderRadius: 50, alignSelf: 'center' , width: 60, height: 60, fontSize: 30 }}
        />
      }
    /> 
    )}
    <Button
      title="Clear All Drinks"
      onPress={() => {
        Alert.alert('Confirm', 'Are you sure you want to delete all drinks?', [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Clear All',
            style: 'destructive',
            onPress: async () => {
              try {
                await AsyncStorage.removeItem('myDrinks');
                setMyDrinks([]);
              } catch (e) {
                console.error('Failed to clear drinks', e);
              }
            }
          }
        ]);
      }}
      buttonStyle={{
        backgroundColor: '#ff6e40',
        marginTop: 10,
        borderRadius: 10,
        padding: 15,
        margin : 20,
      }}/>
    </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff3e0',  },
  header: { textAlign: 'center', fontFamily: 'Quicksand_700Bold', margin: 20, color: '#4F000B', fontSize: 24 },
  content: { fontFamily: 'Quicksand_700Bold', fontSize: 18, color: '#4F000B' },
  text: { fontFamily: 'Quicksand_400Regular', color: '#4F000B' },
  image: { width: 70, height: 70, borderRadius: 10 },
  emptyText: {
  textAlign: 'center',
  fontFamily: 'Quicksand_700Bold',
  fontSize: 18,
  color: '#4F000B',
  marginVertical: 20,
}
});
