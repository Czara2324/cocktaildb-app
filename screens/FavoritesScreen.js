import { useState } from 'react';

import { View, StyleSheet, Switch, ImageBackground } from 'react-native';
import { Text } from '@rneui/themed';

import { useFavorites } from '../services/FavoritesContext';

import CocktailList from '../components/CocktailList';

export default function FavoritesScreen({ navigation }) {
  const { favorites } = useFavorites();
  const [hideAlcoholic, setHideAlcoholic] = useState(false);

  const filteredFavorites = hideAlcoholic
    ? favorites.filter(drink => drink.strAlcoholic !== 'Alcoholic')
    : favorites;

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/bubbles-bg.jpeg')}
        style={styles.background}
        resizeMode="cover"
        imageStyle={{ opacity: 0.3 }}
      >
        {favorites.length === 0 ? (
          <Text style={styles.emptyText}>
            No favorite drinks yet. Add some from the Home screen!
          </Text>
        ) : (
          <>
            <View style={styles.toggleRow}>
              <Text style={styles.label}>Hide Alcoholic Drinks</Text>
              <Switch
                value={hideAlcoholic}
                onValueChange={setHideAlcoholic}
                trackColor={{ false: '#ccc', true: '#ffb74d' }}
                thumbColor={hideAlcoholic ? '#ff6e40' : '#f4f3f4'}
              />
            </View>
            <CocktailList data={filteredFavorites} navigation={navigation} />
          </>
        )}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#de7f8d' },
  background: {
    flex: 1,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  label: {
    fontFamily: 'Quicksand_700Bold',
    fontSize: 22,
    marginRight: 10,
    color: '#fff',
  },
  emptyText: {
    textAlign: 'center',
    alignContent: 'center',
    fontFamily: 'Quicksand_400Regular',
    fontSize: 28,
    color: '#fff',
    marginTop: 20,
    padding: 20,
  }
});
