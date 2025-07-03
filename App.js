import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons';

import { useFonts } from 'expo-font';
import { Aladin_400Regular } from '@expo-google-fonts/aladin';
import { PlayfairDisplay_400Regular, PlayfairDisplay_700Bold } from '@expo-google-fonts/playfair-display';
import { Quicksand_400Regular, Quicksand_700Bold } from '@expo-google-fonts/quicksand'
import { FavoritesProvider } from './services/FavoritesContext';

import WelcomeScreen from './screens/WelcomeScreen';
import DrinkDetailsScreen from './screens/DrinkDetailsScreen';
import HomeScreen from './screens/HomeScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import MyDrinksScreen from './screens/MyDrinksScreen';
import DrinksFormScreen from './screens/DrinksFormScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

  function MainTabs() {
    return (
      <Tab.Navigator
        screenOptions={({route}) => ({
          headerShown: false,
          tabBarStyle: { backgroundColor: '#CE4257' },
          tabBarActiveTintColor: '#fff',
          tabBarInactiveTintColor: '#fff',
          tabBarLabelStyle: { fontFamily: 'Quicksand_400Regular' },
          tabBarIcon: ({ color, size, focused }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Favorites') {
              iconName = focused ? 'heart' : 'heart-outline';
            } else if (route.name === 'My Drinks') {
              iconName = focused ? 'wine' : 'wine-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          }
        })}
      >
        <Tab.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ tabBarLabel: 'Home' }} 
          icon ={{ name: 'home', type: 'ionicon', color: '#fff' }}
        />
        <Tab.Screen 
          name="Favorites" 
          component={FavoritesScreen} 
          options={{ tabBarLabel: 'Favorites' }} 
        />
        <Tab.Screen 
          name="My Drinks" 
          component={MyDrinksScreen} 
          options={{ tabBarLabel: 'My Drinks' }} 
        />
      </Tab.Navigator>
    )
  }

export default function App() {
  let [fontsLoaded ] = useFonts({
    Aladin_400Regular, 
    PlayfairDisplay_400Regular, PlayfairDisplay_700Bold
    , Quicksand_400Regular, Quicksand_700Bold
  });
  
  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#ff6e40" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <FavoritesProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName='Welcome'>
            <Stack.Screen 
              name="Welcome"
              component={WelcomeScreen} 
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Main"
              component={MainTabs}
              options={{ 
                headerStyle: { backgroundColor: '#CE4257' },
                headerTintColor: '#fff',
                headerTitleStyle: { fontFamily: 'PlayfairDisplay_700Bold', fontSize: 24 }
              }}
            />
            <Stack.Screen
              name="Details"
              component={DrinkDetailsScreen}
              options={{ title: 'Drink Details',
                headerStyle: { backgroundColor: '#CE4257' },
                headerTintColor: '#fff',
                headerTitleStyle: { fontFamily: 'PlayfairDisplay_700Bold', fontSize: 24 }
              }}
            />
            <Stack.Screen 
              name="DrinkForm"
              component={DrinksFormScreen} 
              options={({ route }) => ({ title: route.params?.drink ? 'Edit Drink' : 'New Drink' })} 
            />  
          </Stack.Navigator> 
        </NavigationContainer> 
      </FavoritesProvider>
    </SafeAreaProvider>
  );
}
