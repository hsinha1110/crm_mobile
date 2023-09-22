import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import navigationPath from '../../constants/navigationPath';
import CreateJob from '../../pages/home/createjob/CreateJob';
import JobDetails from '../../pages/fieldworker/JobDetails/JobDetails';

const Stack = createStackNavigator();
const CreateJobStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
       <Stack.Screen name={navigationPath.CREATE_JOB} component={CreateJob} />
      <Stack.Screen name={navigationPath.JOB_DETAILS} component={JobDetails} />
    </Stack.Navigator>
  );
};

export default CreateJobStack;
