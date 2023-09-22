import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Splash from '../pages/splash/Splash';
import BottomTabs from './BottomTabs';
import Onboarding from '../pages/onboarding/Onboarding';
import CreateJob from '../pages/home/createjob/CreateJob';
import Categories from '../pages/home/categories/Categories';
import PointCheckList from '../pages/checklist/point/PointCheckList';
import UploadPhotos from '../pages/uploadphotos/UploadPhotos';
import Login from '../pages/auth/login/Login';
import PageView from '../pages/checklist/pageview/PageView';
import JobDetails from '../pages/home/jobdetails/JobDetails';
import navigationPath from '../constants/navigationPath';
import OtpVerification from '../pages/verification/OtpVerification';
const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name={navigationPath.CREATE_JOB} component={CreateJob} />
        <Stack.Screen
          name={navigationPath.POINT_CHECK_LIST}
          component={PointCheckList}
        />
        <Stack.Screen
          name={navigationPath.UPLOAD_PHOTOS}
          component={UploadPhotos}
        />

        <Stack.Screen
          name={navigationPath.OTP_VERIFICATION}
          component={OtpVerification}
        />
        <Stack.Screen name={navigationPath.LOGIN} component={Login} />
        <Stack.Screen name={navigationPath.PAGE_VIEW} component={PageView} />
        <Stack.Screen name={navigationPath.DETAILS} component={JobDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default AppNavigator;
