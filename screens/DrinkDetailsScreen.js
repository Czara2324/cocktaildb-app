import { useEffect, useState } from 'react';

import { View, ScrollView, StyleSheet, ActivityIndicator, Image, ImageBackground } from 'react-native';
import { Text, Divider, Icon } from '@rneui/themed';

import { useFavorites } from '../services/FavoritesContext';

export default function DrinkDetails({ route }) { //
  const [cocktail, setCocktail] = useState(null);
  const { toggleFavorite, isFavorite } = useFavorites();

useEffect(() => {
  const { cocktail: passedCocktail, id } = route.params || {};

  if (passedCocktail) {
    console.log('Loaded from local:', passedCocktail);
    setCocktail(passedCocktail);
  } else if (id) {
    console.log('Fetching from API with ID:', id);
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then(res => res.json())
      .then(data => {
        if (data?.drinks?.[0]) {
          setCocktail(data.drinks[0]);
        } else {
          console.warn('No drink found from API');
        }
      })
      .catch(err => {
        console.error('Error fetching drink:', err);
      });
  } else {
    console.warn('No cocktail or id passed to DrinkDetails');
  }
  }, [route.params]);


  if (!cocktail) {
  return (
    <View style={styles.loading}>
      <ActivityIndicator size="large" color="#CE4257" />
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

  const isFav = isFavorite(cocktail.idDrink || cocktail.id);

  console.log('Rendering cocktail details for:', cocktail);

  return (
    <ImageBackground
      source={require('../assets/home-bg.jpg')} 
      style={{ flex: 1 }}
      resizeMode='cover'>
    <ScrollView style={styles.container}>
      <Icon
        name={isFav ? 'heart' : 'heart-outline'}
        type="ionicon"
        color={isFav ? '#CE4257' : '#CE4257'}
        onPress={() => toggleFavorite(cocktail)}
        containerStyle={styles.icon}
      />
        <Image
          source={
            cocktail.image
              ? typeof cocktail.image === 'string'
                ? { uri: cocktail.image }
                : cocktail.image
              : cocktail.strDrinkThumb
                ? { uri: cocktail.strDrinkThumb }
                : require('../assets/placeholder.jpg') 
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
      {ingredients.map((ing) => (
        <Text key={ing} style={styles.text}>• {ing}</Text>
      ))}

      <Divider style={styles.divider} />

      <Text h4 style={styles.text}>Instructions</Text>
      {Array.isArray(cocktail.instructions)
        ? cocktail.instructions.map((step, i) => (
            <Text key={i} style={styles.text}>{i + 1}. {step}</Text>
          ))
        : (cocktail.instructions || cocktail.strInstructions || '')
            .split('\n')
            .filter(line => line.trim() !== '')
            .map((line, i) => (
              <Text key={i} style={styles.text}>{i + 1}. {line}</Text>
            ))
      }
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
  icon: {
    
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 50,
    padding: 15,
  },
});
