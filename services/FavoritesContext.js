import AsyncStorage from '@react-native-async-storage/async-storage';

import { createContext, useContext, useEffect, useState } from 'react';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('favorites')
      .then((data) => {
        if (data) setFavorites(JSON.parse(data));
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('favorites', JSON.stringify(favorites)).catch(console.error);
  }, [favorites]);

const toggleFavorite = async (drink) => {
    const exists = favorites.some((item) => item.idDrink === drink.idDrink);

    if (exists) {
        const updated = favorites.filter((item) => item.idDrink !== drink.idDrink);
        setFavorites(updated);
    } else {
        try {
        const res = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drink.idDrink}`);
        const data = await res.json();
        const fullDrink = data.drinks[0];
        setFavorites([...favorites, fullDrink]);
        } catch (e) {
        console.error('Error fetching full drink details:', e);
        }
    }
};



  const isFavorite = (idDrink) => favorites.some((item) => item.idDrink === idDrink);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
