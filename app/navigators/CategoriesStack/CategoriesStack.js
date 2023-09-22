import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import navigationPath from '../../constants/navigationPath';
import Categories from '../../pages/home/categories/Categories';
import BottomTabs from '../BottomTabs';
const Stack = createStackNavigator();
const CategoriesStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name={navigationPath.HOME} component={BottomTabs} />

      <Stack.Screen name={navigationPath.CATEGORIES} component={Categories} />
    </Stack.Navigator>
  );
};

export default CategoriesStack;
