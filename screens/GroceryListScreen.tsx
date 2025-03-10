import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';

const GroceryListScreen = () => {
  const { groceryList, addGroceryItem, removeGroceryItem, toggleGroceryItem } = useApp();
  const [newItem, setNewItem] = useState('');

  const handleAddItem = () => {
    if (newItem.trim()) {
      addGroceryItem({
        name: newItem.trim(),
        category: 'Other',
        completed: false,
        quantity: 1,
      });
      setNewItem('');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity 
        style={styles.checkbox}
        onPress={() => toggleGroceryItem(item.id)}
      >
        {item.completed && (
          <MaterialCommunityIcons name="check" size={20} color="#4CAF50" />
        )}
      </TouchableOpacity>
      <Text style={[
        styles.itemText,
        item.completed && styles.completedText
      ]}>
        {item.name}
      </Text>
      <TouchableOpacity 
        onPress={() => removeGroceryItem(item.id)}
        style={styles.deleteButton}
      >
        <MaterialCommunityIcons name="delete-outline" size={24} color="#FF5722" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newItem}
          onChangeText={setNewItem}
          placeholder="Add new item..."
          onSubmitEditing={handleAddItem}
        />
        <TouchableOpacity 
          style={styles.addButton}
          onPress={handleAddItem}
        >
          <MaterialCommunityIcons name="plus" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={groceryList}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8E1',
    padding: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    marginRight: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    flex: 1,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#4CAF50',
    borderRadius: 4,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    flex: 1,
    fontSize: 16,
    color: '#2C3E50',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#95a5a6',
  },
  deleteButton: {
    padding: 4,
  },
});

export default GroceryListScreen;