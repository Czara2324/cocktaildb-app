import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, ActivityIndicator } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useFonts } from 'expo-font';
import { Aladin_400Regular } from '@expo-google-fonts/aladin';
import { PlayfairDisplay_400Regular, PlayfairDisplay_700Bold } from '@expo-google-fonts/playfair-display';
import { Quicksand_400Regular, Quicksand_700Bold } from '@expo-google-fonts/quicksand'

import WelcomeScreen from './screens/WelcomeScreen';
import DrinkDetailsScreen from './screens/DrinkDetailsScreen';
import HomeScreen from './screens/HomeScreen';

export default function App() {
  const Stack = createNativeStackNavigator();

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
        <NavigationContainer>
          <Stack.Navigator initialRouteName='Welcome'>
            <Stack.Screen 
              name="Welcome"
              component={WelcomeScreen} 
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Home"
              component={HomeScreen}
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
          </Stack.Navigator>
        </NavigationContainer> 
    </SafeAreaProvider>
  );
}
