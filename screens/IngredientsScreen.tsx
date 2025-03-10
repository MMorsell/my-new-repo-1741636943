import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  FlatList, 
  TouchableOpacity,
  Animated
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import * as Haptics from 'expo-haptics';

const ingredients = [
  { id: '1', name: 'Tomatoes', category: 'Vegetables', unit: 'piece' },
  { id: '2', name: 'Onions', category: 'Vegetables', unit: 'piece' },
  { id: '3', name: 'Chicken Breast', category: 'Meat', unit: 'lb' },
  { id: '4', name: 'Rice', category: 'Grains', unit: 'lb' },
  { id: '5', name: 'Milk', category: 'Dairy', unit: 'gallon' },
  { id: '6', name: 'Eggs', category: 'Dairy', unit: 'dozen' },
  { id: '7', name: 'Pasta', category: 'Grains', unit: 'lb' },
  { id: '8', name: 'Bell Peppers', category: 'Vegetables', unit: 'piece' },
  { id: '9', name: 'Ground Beef', category: 'Meat', unit: 'lb' },
  { id: '10', name: 'Cheese', category: 'Dairy', unit: 'lb' },
];

const IngredientsScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { addGroceryItem } = useApp();
  const [scaleAnim] = useState(new Animated.Value(1));

  const filteredIngredients = ingredients.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddItem = (item) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    addGroceryItem({
      name: item.name,
      category: item.category,
      completed: false,
      quantity: 1
    });

    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const renderItem = ({ item }) => (
    <Animated.View style={[styles.ingredientCard, { transform: [{ scale: scaleAnim }] }]}>
      <View style={styles.ingredientInfo}>
        <Text style={styles.ingredientName}>{item.name}</Text>
        <Text style={styles.ingredientCategory}>{item.category}</Text>
      </View>
      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => handleAddItem(item)}
      >
        <MaterialCommunityIcons name="plus" size={24} color="white" />
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <MaterialCommunityIcons name="magnify" size={24} color="#95a5a6" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search ingredients..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#95a5a6"
        />
      </View>
      <FlatList
        data={filteredIngredients}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.list}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8E1',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 16,
    padding: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  searchIcon: {
    marginHorizontal: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#2C3E50',
  },
  list: {
    flex: 1,
  },
  listContent: {
    padding: 16,
  },
  ingredientCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  ingredientInfo: {
    flex: 1,
  },
  ingredientName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
  },
  ingredientCategory: {
    fontSize: 14,
    color: '#95a5a6',
    marginTop: 4,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default IngredientsScreen;