import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import HomeScreen from './screens/HomeScreen';
import GroceryListScreen from './screens/GroceryListScreen';
import RecipesScreen from './screens/RecipesScreen';
import RecipeDetailScreen from './screens/RecipeDetailScreen';
import IngredientsScreen from './screens/IngredientsScreen';
import { AppProvider } from './context/AppContext';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppProvider>
        <NavigationContainer>
          <StatusBar style="dark" />
          <Stack.Navigator 
            initialRouteName="Home"
            screenOptions={{
              headerStyle: {
                backgroundColor: '#4CAF50',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: '600',
              },
            }}
          >
            <Stack.Screen 
              name="Home" 
              component={HomeScreen} 
              options={{ title: 'Grocery Hero' }}
            />
            <Stack.Screen 
              name="GroceryList" 
              component={GroceryListScreen}
              options={{ title: 'Shopping List' }}
            />
            <Stack.Screen 
              name="Recipes" 
              component={RecipesScreen}
              options={{ title: 'Recipes' }}
            />
            <Stack.Screen 
              name="RecipeDetail" 
              component={RecipeDetailScreen}
              options={{ title: 'Recipe Details' }}
            />
            <Stack.Screen 
              name="Ingredients" 
              component={IngredientsScreen}
              options={{ title: 'Ingredients' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </AppProvider>
    </GestureHandlerRootView>
  );
}