import { View, FlatList, ActivityIndicator, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import { Text,  Card , Image } from '@rneui/themed';
import { Icon } from '@rneui/themed';
import  { useFavorites } from '../services/FavoritesContext';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width-60) / 2;
const CocktailList = ({ loading, error, data, navigation }) => {
  const { toggleFavorite, isFavorite} = useFavorites();
  const renderItem = ({ item }) => (
    <TouchableOpacity
    onPress={() => navigation.navigate('Details', { id: item.idDrink })}>
        <Card containerStyle={styles.card}>
          <Image
            source={{ uri: item.strDrinkThumb }}
            style={styles.image}
            resizeMode='cover'
          />
          <Text style={styles.title}> {item.strDrink}</Text> 
          <Icon
            name={isFavorite(item.idDrink) ? 'heart' : 'heart-outline'}
            type='ionicon'
            color={isFavorite(item.idDrink) ? '#CE4257' : '#1c1c1c'}
            onPress={() => toggleFavorite(item)}
            size={30}
            containerStyle={{ position: 'absolute', top: 10, right: 10 }}
          />
        </Card>
    </TouchableOpacity>
    
  );
  //
  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 20 }} />;
  }

  if (!data) {
    return <Text>No cocktails found for this category.</Text>;
  }

  return (
    <View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.idDrink}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    paddingBottom: 0,
  },
  row: {
    marginBottom: 0,
  },
  card: {
    width: CARD_WIDTH,
    padding:0,
    borderRadius: 20,
    borderColor: 'transparent',
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255,0.1)',
  },
  image: {
    width: '100%',
    height: '180',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  title: {
    fontFamily: 'Aladin_400Regular',
    fontSize: 22,
    padding: 10,
    textAlign: 'center',
    color: '#4F000B', 
    backgroundColor: '#fff3e0'
  },
});

export default CocktailList;