import { useEffect, useState } from 'react';

import { View, ScrollView, StyleSheet, ActivityIndicator, Image, ImageBackground } from 'react-native';
import { Text, Divider, Icon } from '@rneui/themed';

import { useFavorites } from '../services/FavoritesContext';

export default function DrinkDetails({ route }) {
  const { id } = route.params;
  const [cocktail, setCocktail] = useState(null);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  if (route.params?.cocktail) {
    setCocktail(route.params.cocktail); // use local drink data
  } else if (route.params?.id) {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${route.params.id}`)
      .then(res => res.json())
      .then(data => setCocktail(data.drinks[0]))
      .catch(console.error);
  }
}, []);

  if (!cocktail) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const ingredients = Array.isArray(cocktail.ingredients)
  ? cocktail.ingredients
  : Array.from({ length: 15 }, (_, i) => {
      const ing = cocktail[`strIngredient${i + 1}`];
      const measure = cocktail[`strMeasure${i + 1}`];
      return ing ? `${measure || ''} ${ing}`.trim() : null;
  }).filter(Boolean);

  const { toggleFavorite, isFavorite } = useFavorites();
  const isFav = isFavorite(cocktail.idDrink);

  return (
    <ImageBackground
      source={require('../assets/home-bg.jpg')} 
      style={{ flex: 1 }}
      resizeMode='cover'>
    <ScrollView style={styles.container}>
        <Image
          source={
            cocktail.image
              ? typeof cocktail.image === 'string'
                ? { uri: cocktail.image }
                : cocktail.image
              : { uri: cocktail.strDrinkThumb }
          }
          style={styles.image}
        />
      <Text style={styles.title}>{cocktail.name || cocktail.strDrink}</Text>

      <Divider style={styles.divider} />

      <Text style={styles.text}>Category: {cocktail.category || cocktail.strCategory}</Text>
      <Text style={styles.text}>Glass: {cocktail.glass || cocktail.strGlass}</Text>
      <Text style={styles.text}>Type: {cocktail.strAlcoholic || 'Unknown'}</Text>

      <Divider style={styles.divider} />

      <Text h4 style={styles.text}>Ingredients</Text>
      {ingredients.map((ing, i) => (
        <Text key={i} style={styles.text}>• {ing}</Text>
      ))}

      <Divider style={styles.divider} />

      <Text h4 style={styles.text}>Instructions</Text>
      {(cocktail.instructions || cocktail.strInstructions)?.split('\n').map((line, i) => (
      <Text key={i} style={styles.text}>{i + 1}. {line}</Text>
      ))}
    </ScrollView>

    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  header:{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom:10 },
  loading: { flex: 1, justifyContent: 'center' },
  title: { fontFamily: 'Aladin_400Regular', fontSize: 40 },
  image: { width: '100%', height: 300, borderRadius: 10, marginBottom: 15 },
  text: { fontFamily: 'Quicksand_700Bold',fontSize: 18, marginVertical: 2 },
  divider: { marginVertical: 10, borderColor: '#fff3e0', borderWidth: 1 },
  
});
