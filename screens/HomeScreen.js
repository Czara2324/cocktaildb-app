import { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { SearchBar } from '@rneui/themed';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CategorySearch from '../components/CategorySearch';

const Tab = createMaterialTopTabNavigator();

export default function CategoriesSearch({ navigation }) {
  const [search, setSearch] = useState('');
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  useEffect(() => {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
      .then((res) => res.json())
      .then((data) => {
        const categoryList = data.drinks.map((item) => item.strCategory);
        setCategories(categoryList);
        setLoadingCategories(false);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
        setLoadingCategories(false);
      });
  }, []);

  if (loadingCategories) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#ff6e40" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
    <SearchBar
      placeholder="Search in categories..."
      onChangeText={(text) => setSearch(text)}
      value={search}
      round
      containerStyle={styles.searchContainer}
      inputContainerStyle={styles.inputContainer}
      inputStyle={{ fontFamily: 'Quicksand_400Regular', fontSize: 18 }}
      placeholderTextColor="#4F000B"
    />

      <Tab.Navigator
        screenOptions={{
          tabBarIndicatorStyle: { backgroundColor: '#FF7F51', height: 5, borderRadius: 5 },
          tabBarActiveTintColor: '#4F000B',
          tabBarScrollEnabled: true,
          tabBarStyle: { backgroundColor: '#fff3e0' },
          tabBarLabelStyle: { fontFamily: 'Quicksand_700Bold', fontSize: 17 },
          
        }}
      >
        {categories.map((category) => (
          <Tab.Screen key={category} name={category}>
            {() => (
              <CategorySearch
                category={category}
                search={search}
                navigation={navigation}
              />
            )}
          </Tab.Screen>
        ))}
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff3e0' },
  searchContainer: {
    backgroundColor: 'transparent',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
    paddingHorizontal: 5,
  },
  inputContainer: {
    backgroundColor: '#ffe0b2',
    borderRadius: 10,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
