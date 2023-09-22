import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Splash from '../pages/splash/Splash';
import CustomerLogin from '../pages/customer/auth/Login/CustomerLogin';
import navigationPath from '../constants/navigationPath';
import Onboarding from '../pages/onboarding/Onboarding';
import CustomerSignUp from '../pages/customer/auth/Login/CustomerSignUp';
import FieldWorkerLogin from '../pages/fieldworker/FieldWorkerLogin';
import {createStackNavigator} from '@react-navigation/stack';
import Categories from '../pages/customer/categories/Categories';
import OtpVerificationEmail from '../pages/customer/auth/OtpVerification/OtpVerificationEmail';
import SignInOtpVerification from '../pages/customer/auth/Login/SignInOtpVerification';
import SignUnOtpVerification from '../pages/customer/auth/Login/SignUpOtpVerification';
const Stack = createStackNavigator();
import PointCheckList from '../pages/checklist/point/PointCheckList';
import JobDetails from '../pages/customer/jobdetails/JobDetails';

const AuthNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name={navigationPath.SPLASH} component={Splash} />
        <Stack.Screen name={navigationPath.CATEGORIES} component={Categories} />
        <Stack.Screen name={navigationPath.ONBOARDING} component={Onboarding} />
        <Stack.Screen
        name={navigationPath.JOB_DETAILS}
        component={JobDetails}
      />
        <Stack.Screen
          name={navigationPath.CUSTOMER_LOGIN}
          component={CustomerLogin}
        />
        <Stack.Screen
          name={navigationPath.CUSTOMER_SIGNUP}
          component={CustomerSignUp}
        />
        <Stack.Screen
          name={navigationPath.FIELD_WORKER_LOGIN}
          component={FieldWorkerLogin}
        />
        <Stack.Screen
          name={navigationPath.OTP_VERIFICATION}
          component={SignInOtpVerification}
        /> 
        <Stack.Screen
        name={navigationPath.SIGNUP_OTP_VERIFICATION}
        component={SignUnOtpVerification}
      />
        <Stack.Screen
          name={navigationPath.OTP_VERIFICATION_EMAIL}
          component={OtpVerificationEmail}
        />
       
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthNavigator;
