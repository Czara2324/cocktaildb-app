import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WelcomeScreen from './screens/WelcomeScreen';
import CategoriesScreen from './screens/CategoriesScreen';
import DrinkDetailsScreen from './screens/DrinkDetailsScreen';

export default function App() {
  const Stack = createNativeStackNavigator();
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
            component={CategoriesScreen}
            options={{ title: 'Browse Cocktails'}}
          />
          <Stack.Screen
            name="Details"
            component={DrinkDetailsScreen}
            options={{ title: 'Drink Details'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>COCKTAIL DB</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
