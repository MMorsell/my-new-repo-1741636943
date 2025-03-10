import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Grocery Hero</Text>
      
      <TouchableOpacity 
        style={styles.card}
        onPress={() => navigation.navigate('GroceryList')}
      >
        <MaterialCommunityIcons name="cart-outline" size={32} color="#4CAF50" />
        <Text style={styles.cardTitle}>Shopping List</Text>
        <Text style={styles.cardDescription}>Manage your grocery items</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.card}
        onPress={() => navigation.navigate('Recipes')}
      >
        <MaterialCommunityIcons name="book-open-variant" size={32} color="#4CAF50" />
        <Text style={styles.cardTitle}>Recipes</Text>
        <Text style={styles.cardDescription}>Browse and add ingredients to your list</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF8E1',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 30,
    textAlign: 'center',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C3E50',
    marginTop: 10,
  },
  cardDescription: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 5,
    textAlign: 'center',
  },
});

export default HomeScreen;