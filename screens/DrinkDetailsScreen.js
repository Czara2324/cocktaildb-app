import { useEffect, useState } from 'react';

import { View, ScrollView, StyleSheet, ActivityIndicator, Image, ImageBackground } from 'react-native';
import { Text, Divider, Icon } from '@rneui/themed';

import { useFavorites } from '../services/FavoritesContext';

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

  const { toggleFavorite, isFavorite } = useFavorites();
  const isFav = isFavorite(cocktail.idDrink);

  return (
    <ImageBackground
      source={require('../assets/home-bg.jpg')} 
      style={{ flex: 1 }}
      resizeMode='cover'>
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{cocktail.strDrink}</Text>
        <Icon style={styles.icon}
          name={isFav ? 'heart' : 'heart-outline'}
          type="ionicon"
          color={isFav ? '#ff6e40' : '#fff'}
          size={40}
          onPress={() => toggleFavorite(cocktail)}
        />
      </View>
      <Image source={{ uri: cocktail.strDrinkThumb }} style={styles.image} />
      <Text style={styles.text}>Category: {cocktail.strCategory}</Text>
      <Text style={styles.text}>Type: {cocktail.strAlcoholic}</Text>
      <Text style={styles.text}>Glass: {cocktail.strGlass}</Text>

      <Divider style={styles.divider} />
      <Text style={{fontFamily:'Aladin_400Regular', fontSize: 32}}>Ingredients</Text>
      {ingredients.map((ing, index) => (
        <Text key={index} style={styles.text}>{ing}</Text>
      ))}

      <Divider style={styles.divider} />
      <Text style={{fontFamily:'Aladin_400Regular', fontSize: 32}}>Instructions</Text>
      <Text style={styles.text}>{cocktail.strInstructions}</Text>
    
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
