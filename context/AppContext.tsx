import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface GroceryItem {
  id: string;
  name: string;
  category: string;
  completed: boolean;
  quantity: number;
}

interface Recipe {
  id: string;
  title: string;
  ingredients: {
    name: string;
    amount: string;
  }[];
  instructions: string[];
  imageUrl: string;
}

interface AppContextType {
  groceryList: GroceryItem[];
  recipes: Recipe[];
  addGroceryItem: (item: Omit<GroceryItem, 'id'>) => void;
  removeGroceryItem: (id: string) => void;
  toggleGroceryItem: (id: string) => void;
  addRecipe: (recipe: Omit<Recipe, 'id'>) => void;
  addRecipeIngredientsToList: (recipeId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [groceryList, setGroceryList] = useState<GroceryItem[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([
    {
      id: '1',
      title: 'Classic Spaghetti Bolognese',
      ingredients: [
        { name: 'Ground beef', amount: '500g' },
        { name: 'Spaghetti', amount: '400g' },
        { name: 'Tomato sauce', amount: '500ml' },
        { name: 'Onion', amount: '1 large' },
      ],
      instructions: [
        'Brown the ground beef in a large pan',
        'Add chopped onions and cook until translucent',
        'Pour in tomato sauce and simmer',
        'Cook spaghetti according to package instructions',
      ],
      imageUrl: 'https://images.unsplash.com/photo-1598866594230-a7c12756260f?q=80&w=2008&auto=format&fit=crop'
    }
  ]);

  useEffect(() => {
    loadGroceryList();
  }, []);

  const loadGroceryList = async () => {
    try {
      const savedList = await AsyncStorage.getItem('groceryList');
      if (savedList) {
        setGroceryList(JSON.parse(savedList));
      }
    } catch (error) {
      console.error('Error loading grocery list:', error);
    }
  };

  const saveGroceryList = async (list: GroceryItem[]) => {
    try {
      await AsyncStorage.setItem('groceryList', JSON.stringify(list));
    } catch (error) {
      console.error('Error saving grocery list:', error);
    }
  };

  const addGroceryItem = (item: Omit<GroceryItem, 'id'>) => {
    const newItem = {
      ...item,
      id: Math.random().toString(),
    };
    const newList = [...groceryList, newItem];
    setGroceryList(newList);
    saveGroceryList(newList);
  };

  const removeGroceryItem = (id: string) => {
    const newList = groceryList.filter(item => item.id !== id);
    setGroceryList(newList);
    saveGroceryList(newList);
  };

  const toggleGroceryItem = (id: string) => {
    const newList = groceryList.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    setGroceryList(newList);
    saveGroceryList(newList);
  };

  const addRecipe = (recipe: Omit<Recipe, 'id'>) => {
    const newRecipe = {
      ...recipe,
      id: Math.random().toString(),
    };
    setRecipes([...recipes, newRecipe]);
  };

  const addRecipeIngredientsToList = (recipeId: string) => {
    const recipe = recipes.find(r => r.id === recipeId);
    if (recipe) {
      recipe.ingredients.forEach(ingredient => {
        addGroceryItem({
          name: ingredient.name,
          category: 'Other',
          completed: false,
          quantity: 1,
        });
      });
    }
  };

  return (
    <AppContext.Provider value={{
      groceryList,
      recipes,
      addGroceryItem,
      removeGroceryItem,
      toggleGroceryItem,
      addRecipe,
      addRecipeIngredientsToList,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};