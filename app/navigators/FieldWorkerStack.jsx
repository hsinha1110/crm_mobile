import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import navigationPath from '../constants/navigationPath';
import PointCheckList from '../pages/checklist/point/PointCheckList';
import BottomTabs from './BottomTabs';
import AppointmentDetails from '../pages/home/event/appointmentdetails/AppointmentDetails';
import UploadPhotos from '../pages/uploadphotos/UploadPhotos';
import CreateJob from '../pages/home/createjob/CreateJob';
import JobDetails from '../pages/fieldworker/JobDetails/JobDetails';
import Appointment from '../pages/home/event/appointment/Appointment';
import AppointmentStack from './AppointmentStack/AppointmentStack';
const Stack = createStackNavigator();
const FieldWorkerStack = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name={navigationPath.DASHBOARD} component={BottomTabs} />

        <Stack.Screen
          name={navigationPath.APPOINTMENT_DETAILS}
          component={AppointmentDetails}
        />
        <Stack.Screen
          name={navigationPath.UPLOAD_PHOTOS}
          component={UploadPhotos}
        />
        <Stack.Screen name={navigationPath.CREATE_JOB} component={CreateJob} />
        <Stack.Screen
          name={navigationPath.JOB_DETAILS}
          component={JobDetails}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default FieldWorkerStack;
