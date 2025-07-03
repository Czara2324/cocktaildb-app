import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, Input, Text } from '@rneui/themed';
import { Picker } from '@react-native-picker/picker';

export default function DrinkFormScreen({ route, navigation }) {
  const edit = route.params?.drink;
  const [name, setName] = useState(edit?.name || '');
  const [category, setCategory] = useState(edit?.category || '');
  const [glass, setGlass] = useState(edit?.glass || '');
  
  const save = async () => {
    try {
      const data = await AsyncStorage.getItem('myDrinks');
      const list = data ? JSON.parse(data) : [];
      const updated = edit 
        ? list.map(d=> d.id===edit.id ? {...d, name, category, glass} : d)
        : [...list, { id: Date.now(), name, category, glass }];
      await AsyncStorage.setItem('myDrinks', JSON.stringify(updated));
      navigation.goBack();
    } catch(e) { console.error('Save error', e); }
  };

  return (
    <View style={styles.container}>
      <Text h4>Name</Text>
      <Input value={name} onChangeText={setName} />
      <Text h4>Category</Text>
      <Picker selectedValue={category} onValueChange={setCategory}>
        <Picker.Item label="Select category" value="" />
        <Picker.Item label="Cocktail" value="Cocktail" />
        <Picker.Item label="Shot" value="Shot" />
        <Picker.Item label="Beer" value="Beer" />
      </Picker>
      <Text h4>Glass</Text>
      <Picker selectedValue={glass} onValueChange={setGlass}>
        <Picker.Item label="Select glass" value="" />
        <Picker.Item label="Highball" value="Highball glass" />
        <Picker.Item label="Cocktail glass" value="Cocktail glass" />
      </Picker>
      <Button title="Save" onPress={save} buttonStyle={{ marginTop:20, backgroundColor:'#ff6e40' }}/>
    </View>
  );
}

const styles = StyleSheet.create({ container:{ flex:1,padding:20,backgroundColor:'#fff3e0'} });
