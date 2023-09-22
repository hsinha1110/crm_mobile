import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import navigationPath from '../../constants/navigationPath';
import Appointment from '../../pages/home/event/appointment/Appointment';
import Details from '../../pages/home/event/details/Details';
import AppointmentDetails from '../../pages/home/event/appointmentdetails/AppointmentDetails';
import CreateJob from '../../pages/home/createjob/CreateJob';
import JobDetails from '../../pages/fieldworker/JobDetails/JobDetails';
import UploadPhotos from '../../pages/uploadphotos/UploadPhotos';
 const Stack = createStackNavigator();
const AppointmentStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={navigationPath.APPOINTMENT} component={Appointment} />
      {/* <Stack.Screen name={navigationPath.APPOINTMENT_DETAILS} component={AppointmentDetails} /> */}
      {/* <Stack.Screen name={navigationPath.UPLOAD_PHOTOS} component={UploadPhotos} /> */}

      {/* <Stack.Screen name={navigationPath.CREATE_JOB} component={CreateJob} /> */}

      <Stack.Screen name={navigationPath.JOB_DETAILS} component={JobDetails} />


    </Stack.Navigator>
  );
};

export default AppointmentStack;
