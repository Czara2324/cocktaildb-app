import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons';

import { useFonts } from 'expo-font';
import { Aladin_400Regular } from '@expo-google-fonts/aladin';
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
          headerShown: true,
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
          options={{ title: 'Home', headerStyle: { backgroundColor: '#CE4257' }, headerTintColor: '#fff', headerTitleStyle: { fontFamily: 'PlayfairDisplay_700Bold', fontSize: 24 } }} 
          icon ={{ name: 'home', type: 'ionicon', color: '#fff' }}
        />
        <Tab.Screen 
          name="Favorites" 
          component={FavoritesScreen} 
          options={{ title: 'Favorites', headerStyle: { backgroundColor: '#CE4257' }, headerTintColor: '#fff', headerTitleStyle: { fontFamily: 'PlayfairDisplay_700Bold', fontSize: 24 }}} 
        />
        <Tab.Screen 
          name="My Drinks" 
          component={MyDrinksScreen} 
          options={{ title: 'My Drinks', headerStyle: { backgroundColor: '#CE4257' }, headerTintColor: '#fff', headerTitleStyle: { fontFamily: 'PlayfairDisplay_700Bold', fontSize: 24 } }}
        />
      </Tab.Navigator>
    )
  }

export default function App() {
  let [fontsLoaded ] = useFonts({
    Aladin_400Regular, Quicksand_400Regular, Quicksand_700Bold
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
              name="Tabs"
              component={MainTabs}
              options={{ 
                headerShown: false,
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
              options={({ route }) => ({ title:  'New Drink',
                headerStyle: { backgroundColor: '#CE4257' },
                headerTintColor: '#fff',
                headerTitleStyle: { fontFamily: 'PlayfairDisplay_700Bold', fontSize: 24 },
               })} 
            />  
          </Stack.Navigator> 
        </NavigationContainer> 
      </FavoritesProvider>
    </SafeAreaProvider>
  );
}
