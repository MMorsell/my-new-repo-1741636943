
import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useApp } from '../context/AppContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RouteProp } from '@react-navigation/native';

type RecipeDetailParams = {
  RecipeDetail: {
    recipeId: string;
  };
};

type RecipeDetailScreenProps = {
  route: RouteProp<RecipeDetailParams, 'RecipeDetail'>;
};

const RecipeDetailScreen: React.FC<RecipeDetailScreenProps> = ({ route }) => {
  const { recipeId } = route.params;
  const { recipes, addRecipeIngredientsToList } = useApp();
  const recipe = recipes.find(r => r.id === recipeId);

  if (!recipe) {
    return (
      <View style={styles.container}>
        <Text>Recipe not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: recipe.imageUrl }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{recipe.title}</Text>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ingredients</Text>
          {recipe.ingredients.map((ingredient, index) => (
            <Text key={index} style={styles.ingredient}>
              • {ingredient.amount} {ingredient.name}
            </Text>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Instructions</Text>
          {recipe.instructions.map((step, index) => (
            <Text key={index} style={styles.instruction}>
              {index + 1}. {step}
            </Text>
          ))}
        </View>

        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => addRecipeIngredientsToList(recipe.id)}
        >
          <MaterialCommunityIcons name="cart-plus" size={24} color="white" />
          <Text style={styles.addButtonText}>Add ingredients to list</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8E1',
  },
  image: {
    width: '100%',
    height: 250,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 12,
  },
  ingredient: {
    fontSize: 16,
    color: '#2C3E50',
    marginBottom: 8,
  },
  instruction: {
    fontSize: 16,
    color: '#2C3E50',
    marginBottom: 12,
    lineHeight: 24,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default RecipeDetailScreen;
