import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import navigationPath from '../constants/navigationPath'; 
import BottomTabs from './BottomTabs';
import AppointmentDetails from '../pages/home/event/appointmentdetails/AppointmentDetails';
import UploadPhotos from '../pages/uploadphotos/UploadPhotos';
import PointCheckList from '../pages/checklist/point/PointCheckList';
import CreateJob from '../pages/home/createjob/CreateJob';
import Details from '../pages/home/event/details/Details';
import JobDetails from '../pages/fieldworker/JobDetails/JobDetails';
const Stack = createStackNavigator();
const CustomerStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {/* <Stack.Screen name={navigationPath.SERVICES} component={Services} /> */}
        <Stack.Screen name={navigationPath.DASHBOARD} component={BottomTabs} />

        <Stack.Screen
          name={navigationPath.JOB_DETAILS}
          component={JobDetails}
        />

        <Stack.Screen
          name={navigationPath.UPLOAD_PHOTOS}
          component={UploadPhotos}
        />
        <Stack.Screen name={navigationPath.CREATE_JOB} component={CreateJob} />
        <Stack.Screen name={navigationPath.HOME} component={BottomTabs} />
        <Stack.Screen
          name={navigationPath.APPOINTMENT_DETAILS}
          component={AppointmentDetails}
        />

        <Stack.Screen name={navigationPath.DETAILS} component={Details} />

        <Stack.Screen
          name={navigationPath.POINT_CHECK_LIST}
          component={PointCheckList}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default CustomerStack;
