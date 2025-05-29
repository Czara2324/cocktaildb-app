import { useState, useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator, FlatList } from 'react-native';
import { Text, Avatar, Divider, ListItem, ButtonGroup } from '@rneui/themed';

import CocktailList from '../components/CocktailList';

export default function CategoriesScreen({ navigation }) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cocktailResult, setCocktailResult] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const arrCategories = ['Ordinary_Drink', 'Cocktail', 'Shake'];

  useEffect(() => {
    setLoading(false);
    const uri = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=' + encodeURIComponent(arrCategories[selectedIndex]);

    fetch(uri)
      .then(res => res.json())
      .then(
        (result) => {
          setLoading(false);
          setCocktailResult(result.drinks);
        },
        (error) => {
          setLoading(true);
          setError(error);
        }
      );
  }, [selectedIndex]);

  return (
    <View style={styles.container}>
      <ButtonGroup
        buttons={arrCategories}
        selectedIndex={selectedIndex}
        onPress={(value) => setSelectedIndex(value)}
      />

      <Text h3>Current State Variables</Text>
      <Text>Current Category: {arrCategories[selectedIndex]}</Text>
      <Divider style={{ margin: 15 }} />

      <CocktailList
        loading={loading}
        error={error}
        data={cocktailResult}
        navigation={navigation}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
});
