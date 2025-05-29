import { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { Text, Divider } from '@rneui/themed';

export default function DrinkDetails({ route }) {
  const { id } = route.params;
  const [cocktail, setCocktail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then(res => res.json())
      .then(data => {
        setCocktail(data.drinks[0]);
        setLoading(false);
      });
  }, []);

  if (loading || !cocktail) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const ingredients = [];
  for (let i = 1; i <= 15; i++) {
    const ingredient = cocktail[`strIngredient${i}`];
    const measure = cocktail[`strMeasure${i}`];
    if (ingredient) {
      ingredients.push(`${measure || ''} ${ingredient}`.trim());
    }
  }

  return (
    <ScrollView style={styles.container}>
      <Text h2 style={styles.title}>{cocktail.strDrink}</Text>
      <Image source={{ uri: cocktail.strDrinkThumb }} style={styles.image} />
      <Text style={styles.text}>Category: {cocktail.strCategory}</Text>
      <Text style={styles.text}>Type: {cocktail.strAlcoholic}</Text>
      <Text style={styles.text}>Glass: {cocktail.strGlass}</Text>

      <Divider style={{ marginVertical: 10 }} />
      <Text h4>Ingredients</Text>
      {ingredients.map((ing, index) => (
        <Text key={index} style={styles.text}>{ing}</Text>
      ))}

      <Divider style={{ marginVertical: 10 }} />
      <Text h4>Instructions</Text>
      <Text style={styles.text}>{cocktail.strInstructions}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 15 },
  loading: { flex: 1, justifyContent: 'center' },
  title: { marginBottom: 10 },
  image: { width: '100%', height: 250, borderRadius: 10, marginBottom: 15 },
  text: { fontSize: 16, marginVertical: 2 }
});
