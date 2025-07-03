import  { useState, useEffect } from 'react';
import { View, FlatList, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, ListItem, Icon, Text } from '@rneui/themed';

export default function MyDrinksScreen({ navigation }) {
  const [myDrinks, setMyDrinks] = useState([]);

  const load = () => {
    AsyncStorage.getItem('myDrinks')
      .then(data => setMyDrinks(data ? JSON.parse(data) : []))
      .catch(e => console.error('Load error', e));
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', load);
    load(); return unsubscribe;
  }, [navigation]);

  const deleteDrink = id => {
    Alert.alert('Delete?', 'This cannot be undone', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: async () => {
        const updated = myDrinks.filter(d => d.id !== id);
        setMyDrinks(updated);
        try { await AsyncStorage.setItem('myDrinks', JSON.stringify(updated)); }
        catch(e){ console.error('Write error', e); }
      }}  
    ]);
  };

  return (
    <View style={styles.container}>
      <Text h3 style={{ textAlign: 'center', margin: 10 }}>My Drinks</Text>
      <FlatList
        data={myDrinks}
        keyExtractor={d => d.id.toString()}
        renderItem={({ item }) => (
          <ListItem bottomDivider onPress={() => navigation.navigate('DrinkForm', { drink: item })}>
            <ListItem.Content>
              <ListItem.Title>{item.name}</ListItem.Title>
              <ListItem.Subtitle>{item.category} | {item.glass}</ListItem.Subtitle>
            </ListItem.Content>
            <Icon name="delete" color="red" onPress={() => deleteDrink(item.id)} />
          </ListItem>
        )}
      />
      <Button title="New Drink" onPress={()=>navigation.navigate('DrinkForm')} containerStyle={{ margin: 20 }}/>
    </View>
  );
}

const styles = StyleSheet.create({ container: { flex:1, backgroundColor:'#fff3e0'} });
