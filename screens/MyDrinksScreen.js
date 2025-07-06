import { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Alert } from 'react-native';
import { ListItem, Icon, Button, Image, Text } from '@rneui/themed';

import AsyncStorage from '@react-native-async-storage/async-storage';
import StaticDrinks from '../assets/StaticDrinks'; // Importing the initial drinks data


export default function MyDrinksScreen({ navigation }) {
  const [myDrinks, setMyDrinks] = useState([]);

  // Load saved drinks
  const loadDrinks = async () => {
    try {
      const data = await AsyncStorage.getItem('myDrinks');
      if (data) setMyDrinks(JSON.parse(data));
    } catch (e) {
      console.error('Error loading drinks:', e);
    }
  };

  useEffect(() => {
    setMyDrinks(StaticDrinks);
  }, []);

  const deleteDrink = (id) => {
  Alert.alert('Delete this drink?', 'This action cannot be undone.', [
    { text: 'Cancel', style: 'cancel' },
    { text: 'Delete', style: 'destructive', onPress: () => {
      const updated = myDrinks.filter(d => d.id !== id);
      setMyDrinks(updated);
    }}
  ]);
  };

  const handleNewDrink = (newDrink) => {
    setMyDrinks([...myDrinks, newDrink]);
  };

  const handleEditDrink = (updatedDrink) => {
    const updated = myDrinks.map(d => d.id === updatedDrink.id ? updatedDrink : d);
    setMyDrinks(updated);
  };

  return (
  <View style={styles.container}>
  <FlatList
  data={myDrinks}
  keyExtractor={item => item.id.toString()}
  renderItem={({ item }) => (
    <ListItem
      bottomDivider
      onPress={() =>navigation.navigate('Details', { cocktail: item })}
    >
      {item.image && (
        <Image source={item.image} style={{ width: 60, height: 60, borderRadius: 10 }} />
      )}
      <ListItem.Content>
        <ListItem.Title>{item.name}</ListItem.Title>
        <ListItem.Subtitle>{item.category} | {item.glass}</ListItem.Subtitle>
      </ListItem.Content>
      <Icon name="delete" onPress={() => deleteDrink(item.id)} />
    </ListItem>
  )}
/>

      <Button
        title="Add New Drink"
        onPress={() => navigation.navigate('DrinkForm', { onSave: handleNewDrink })}
        buttonStyle={{ backgroundColor: '#ff6e40', marginTop: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff3e0', padding: 10 },
});
