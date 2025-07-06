// DrinksFormScreen.js
// This screen allows users to create or edit a drink entry.
// It includes fields for name, category, glass type, and alcohol content.
// It uses React Hook Form for form management and AsyncStorage for persistence.
// It also fetches categories and glass types from the Cocktail DB API.
import { useEffect, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Button, Text, Input } from '@rneui/themed';
import { useForm, Controller } from 'react-hook-form';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const glasses = ['Highball glass', 'Cocktail glass', 'Martini Glass', 'Wine Glass'];
const alcoholOptions = ['Alcoholic', 'Non alcoholic'];

export default function DrinksFormScreen({ route, navigation }) {
  const editDrink = route.params?.drink;
  const [categories, setCategories] = useState([]);
  const [glasses, setGlasses] = useState([]);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: editDrink?.id || Date.now(),
      name: editDrink?.name || '',
      category: editDrink?.category || '',
      glass: editDrink?.glass || '',
      strAlcoholic: editDrink?.strAlcoholic || 'Alcoholic',
    },
  });

  // Fetch categories from API
  useEffect(() => {
  fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
    .then(res => res.json())
    .then(data => setCategories(data.drinks.map(item => item.strCategory)))
    .catch(err => console.error('Error fetching categories:', err));

  fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?g=list')
    .then(res => res.json())
    .then(data => setGlasses(data.drinks.map(item => item.strGlass)))
    .catch(err => console.error('Error fetching glass types:', err));
}, []);

  const onSubmit = async (data) => {
    try {
      const stored = await AsyncStorage.getItem('myDrinks');
      const list = stored ? JSON.parse(stored) : [];
      const updated = editDrink
        ? list.map(d => d.id === editDrink.id ? data : d)
        : [...list, data];

      await AsyncStorage.setItem('myDrinks', JSON.stringify(updated));
      navigation.goBack();
    } catch (e) {
      Alert.alert('Error', 'Could not save drink.');
      console.error('Save error:', e);
    }
  };

  return (
    <View style={styles.container}>
      <Text h3 style={styles.title}>
        {editDrink ? 'Edit Drink' : 'Create a New Drink'}
      </Text>

      <Controller
        control={control}
        name="name"
        rules={{ required: 'Name is required' }}
        render={({ field: { onChange, value } }) => (
          <Input
            label="Name"
            placeholder="Enter drink name"
            value={value}
            onChangeText={onChange}
            errorMessage={errors.name?.message}
          />
        )}
      />

      <Text style={styles.label}>Category</Text>
      {categories.length > 0 ? (
        <Controller
          control={control}
          name="category"
          rules={{ required: 'Category is required' }}
          render={({ field: { onChange, value } }) => (
            <Picker
              selectedValue={value}
              onValueChange={onChange}
              style={styles.picker}
            >
              <Picker.Item label="Select a category..." value="" />
              {categories.map((cat) => (
                <Picker.Item key={cat} label={cat} value={cat} />
              ))}
            </Picker>
          )}
        />
      ) : (
        <Text>Loading categories...</Text>
      )}
      {errors.category && <Text style={styles.error}>{errors.category.message}</Text>}

      <Text style={styles.label}>Glass</Text>
      <Controller
        control={control}
        name="glass"
        rules={{ required: 'Glass type is required' }}
        render={({ field: { onChange, value } }) => (
          <Picker selectedValue={value} onValueChange={onChange} style={styles.picker}>
            <Picker.Item label="Select a glass type..." value="" />
            {glasses.map(glass => (
              <Picker.Item rkey={glass} label={glass} value={glass} />
            ))}
          </Picker>
        )}
      />
      {errors.glass && <Text style={styles.error}>{errors.glass.message}</Text>}


      <Text style={styles.label}>Alcohol Content</Text>
      <Controller
        control={control}
        name="strAlcoholic"
        render={({ field: { onChange, value } }) => (
          <View style={styles.radioGroup}>
            {alcoholOptions.map(option => (
              <Button
                key={option}
                title={option}
                type={value === option ? 'solid' : 'outline'}
                onPress={() => onChange(option)}
                buttonStyle={[
                  styles.radioButton,
                  value === option && { backgroundColor: '#ffb74d' },
                ]}
                titleStyle={{ color: '#4F000B', fontFamily: 'Quicksand_700Bold' }}
              />
            ))}
          </View>
        )}
      />

      <Button
        title="Save Drink"
        onPress={handleSubmit(onSubmit)}
        buttonStyle={{ backgroundColor: '#ff6e40', marginTop: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff3e0', padding: 20 },
  title: { textAlign: 'center', fontFamily: 'PlayfairDisplay_700Bold', marginBottom: 20 },
  label: { marginTop: 10, fontFamily: 'Quicksand_700Bold', color: '#4F000B' },
  picker: {
    backgroundColor: '#ffe0b2',
    marginBottom: 5,
    borderRadius: 10,
  },
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 15,
  },
  radioButton: {
    paddingHorizontal: 20,
    borderColor: '#ffb74d',
    borderWidth: 1,
  },
  error: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
    marginLeft: 5,
    fontFamily: 'Quicksand_700Bold',
  },
});
