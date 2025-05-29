import { View, FlatList, ActivityIndicator } from 'react-native';
import { Text, Avatar, ListItem } from '@rneui/themed';

const CocktailList = ({ loading, error, data, navigation }) => {
  const renderItem = ({ item }) => (
    <ListItem
      key={item.idDrink}
      bottomDivider
      onPress={() => navigation.navigate('Details', { id: item.idDrink })}
    >
      <Avatar source={{ uri: item.strDrinkThumb }} />
      <ListItem.Content>
        <ListItem.Title>{item.strDrink}</ListItem.Title>
      </ListItem.Content>
    </ListItem>
  );

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
      <Text h3 style={{ marginBottom: 10 }}>Results</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.idDrink}
      />
    </View>
  );
};

export default CocktailList;