import { useState } from 'react';

import { View, StyleSheet, Switch } from 'react-native';
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
      {favorites.length === 0 ? (
      <Text style={styles.emptyText}>No favorite drinks yet. Add some from the Home screen!</Text>
      ) : (
      <View style={styles.toggleRow}>
        <Text style={styles.label}>Hide Alcoholic Drinks</Text>
        <Switch
          value={hideAlcoholic}
          onValueChange={setHideAlcoholic}
          trackColor={{ false: '#ccc', true: '#ffb74d' }}
          thumbColor={hideAlcoholic ? '#ff6e40' : '#f4f3f4'}
        />
      </View>
      )}
      <CocktailList data={filteredFavorites} navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff3e0' },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  label: {
    fontFamily: 'Quicksand_700Bold',
    fontSize: 16,
    marginRight: 10,
    color: '#4F000B',
  },
  emptyText: {
    textAlign: 'center',
    alignContent: 'center',
    fontFamily: 'Quicksand_400Regular',
    fontSize: 24,
    color: '#4F000B',
    marginTop: 20,
    padding: 20,
  }
});
