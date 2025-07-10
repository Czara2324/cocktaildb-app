// DrinksFormScreen.js
// This screen allows users to create or edit a drink entry.
// It includes fields for name, category, glass type, and alcohol content.
// It uses React Hook Form for form management and AsyncStorage for persistence.
// It also fetches categories and glass types from the Cocktail DB API.
import { useEffect, useState } from 'react';
import { View, StyleSheet, Alert, ScrollView, Image, ImageBackground } from 'react-native';
import { Button, Text, Input, Divider, Icon } from '@rneui/themed';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const alcoholOptions = ['Alcoholic', 'Non alcoholic'];

export default function DrinksFormScreen({ route, navigation }) {
  const [categories, setCategories] = useState([]);
  const [glasses, setGlasses] = useState([]);
  const [imageUri, setImageUri] = useState(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: Date.now(),
      image: '',
      name: '',
      category: '',
      glass: '',
      strAlcoholic: 'Alcoholic',
      ingredients: [''],
      instructions: [''],
    }
  });

  const { fields: ingredientFields, append: addIngredient, remove: removeIngredient } = useFieldArray({
  control,
  name: 'ingredients'
  });
  
  const { fields: instructionFields, append: addInstruction, remove: removeInstruction } = useFieldArray({
  control,
  name: 'instructions'
  });

  // Handle image selection
  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permission.status !== 'granted') {
      Alert.alert('Permission required', 'Permission to access media library is needed.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
    });

    if (!result.cancelled) {
      setImageUri(result.assets[0].uri);
    }
  };

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
  if (data.ingredients.filter(i => i.trim() !== '').length === 0) {
    Alert.alert('Validation', 'Please add at least one ingredient.');
    return;
  }

  if (data.instructions.filter(i => i.trim() !== '').length === 0) {
    Alert.alert('Validation', 'Please add at least one instruction step.');
    return;
  }

  try {
    const stored = await AsyncStorage.getItem('myDrinks');
    const storedDrinks = stored ? JSON.parse(stored) : [];

    const newDrink = { ...data, image: imageUri };

    await AsyncStorage.setItem('myDrinks', JSON.stringify([...storedDrinks, newDrink]));
    Alert.alert('Success', 'Drink saved successfully!');
    navigation.goBack();
  } catch (e) {
    Alert.alert('Error', 'Could not save drink.');
    console.error('Save error:', e);
  }
};

  return (
    <ScrollView style={styles.container}>
    
      <View style={styles.form}>
      <Text style={styles.title}>Create a New Drink</Text>
      <Text style={styles.label}>Name</Text>
      <Controller
        control={control}
        name="name"
        rules={{ required: 'Name is required' }}
        render={({ field: { onChange, value } }) => (
          <Input
            inputContainerStyle={{ backgroundColor: '#ffe0b2', borderRadius: 10, }}
            placeholder="Enter drink name"
            value={value}
            onChangeText={onChange}
            errorMessage={errors.name?.message}
            inputStyle={{ fontFamily: 'Quicksand_400Regular' }}
          />
        )}
      />
      <Text style={styles.label}>Image</Text>
      <Button
        title={imageUri ? "Change Image" : "Add Image"}
        onPress={pickImage}
        buttonStyle={{ backgroundColor: '#ffb74d', marginBottom: 10, borderRadius: 10, padding: 10, marginTop: 10 }}
      />
      {imageUri && (
        <Image source={{ uri: imageUri }} style={styles.previewImage} />
      )}

      <Text style={styles.label}>Category</Text>
      {categories.length > 0 ? (
        <Controller 
          control={control}
          name="category"
          rules={{ required: 'Category is required' }}
          inputStyle={{ fontFamily: 'Quicksand_400Regular' }}
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
              <Picker.Item key={glass} label={glass} value={glass} />
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

    <Text style={styles.label}>Ingredients</Text>
    {ingredientFields.map((item, index) => (
      <Controller
        key={item.id || `ingredient-${index}`}
        control={control}
        name={`ingredients.${index}`}
        rules={{ required: `Ingredient ${index + 1} is required` }}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <Input
            placeholder={`Ingredient ${index + 1}`}
            value={value}
            onChangeText={onChange}
            errorMessage={error?.message}
            rightIcon={<Icon name="close" onPress={() => removeIngredient(index)} />}
          />
        )}
      />
    ))}
    <Button 
      title="Add Ingredient" 
      onPress={() => addIngredient('')}
      buttonStyle={{ marginBottom: 10, backgroundColor: '#ff6e40', borderRadius: 10, padding: 10, marginTop: 10 }}
      />

    <Divider />

    <Text style={styles.label}>Instructions</Text>
    {instructionFields.map((item, index) => (
      <Controller
        key={item.id || `instruction-${index}`}
        control={control}
        name={`instructions.${index}`}
        rules={{ required: `Step ${index + 1} is required` }}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <Input
            placeholder={`Step ${index + 1}`}
            value={value}
            onChangeText={onChange}
            errorMessage={error?.message}
            rightIcon={<Icon name="close" onPress={() => removeInstruction(index)} />}
          />
        )}
      />
    ))}
    <Button 
      title="Add Step"
      onPress={() => addInstruction('')} 
      buttonStyle={{ marginBottom: 10,marginTop: 10, backgroundColor: '#ff6e40', borderRadius: 10, padding: 10 }}
      />

    <Divider />
      <Button 
        title="Save Drink"
        onPress={handleSubmit(onSubmit)}
        buttonStyle={{ backgroundColor: '#CE4257', marginTop: 20, borderRadius: 10 ,padding: 15, marginBottom: 50}}
      />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#fff3e0'},
  title: { textAlign: 'center',fontFamily: 'Quicksand_700Bold', margin: 10, color: '#4F000B', fontSize: 30 },
  label: { fontFamily: 'Quicksand_700Bold', color: '#4F000B', fontSize: 18 },
  form: { padding: 20 },
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
    borderColor: '#ffe0b2',
    borderWidth: 1,
    borderRadius: 10,

  },
  error: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
    marginLeft: 5,
    fontFamily: 'Quicksand_700Bold',
  },
});
