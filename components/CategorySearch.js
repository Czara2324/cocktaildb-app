import { useState, useEffect } from 'react';
import { View, ImageBackground } from 'react-native';

import CocktailList from './CocktailList';

export default function CategorySearch({ category, search, navigation }) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cocktailResult, setCocktailResult] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(category)}`)
      .then((res) => res.json())
      .then(
        (result) => {
          setCocktailResult(result.drinks);
          setLoading(false);
        },
        (error) => {
          setError(error);
          setLoading(false);
        }
      );
  }, [category]);

  // Apply global search filter
  const filteredResult = cocktailResult?.filter(item =>
    item.strDrink.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require('../assets/home-bg.jpg')}
        style={{ flex: 1 }}
        resizeMode='cover'
        >
        <CocktailList
          loading={loading}
          error={error}
          data={filteredResult}
          navigation={navigation}
        />
      </ImageBackground>
    </View>
  );
}
