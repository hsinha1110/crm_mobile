import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import navigationPath from '../constants/navigationPath';
import PointCheckList from '../pages/checklist/point/PointCheckList';
const Stack = createStackNavigator();
const CheckPointStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
          name={navigationPath.POINT_CHECK_LIST}
          component={PointCheckList}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default CheckPointStack;
