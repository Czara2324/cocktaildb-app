import { useState } from 'react';
import { View, StyleSheet, Switch } from 'react-native';
import { Text } from '@rneui/themed';
import CocktailList from '../components/CocktailList';
import { useFavorites } from '../services/FavoritesContext';

export default function FavoritesScreen({ navigation }) {
  const { favorites } = useFavorites();
  const [hideAlcoholic, setHideAlcoholic] = useState(false);

  const filteredFavorites = hideAlcoholic
    ? favorites.filter(drink => drink.strAlcoholic !== 'Alcoholic')
    : favorites;
    
  return (
    <View style={styles.container}>
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
});
