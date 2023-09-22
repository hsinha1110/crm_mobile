import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, View, TouchableOpacity, Text} from 'react-native';
import imagePath from '../constants/imagePath';
import navigationPath from '../constants/navigationPath';
import Dashboard from '../pages/home/dashboard/Dashboard';
import Event from '../pages/home/event/Event';
import Profile from '../pages/home/profile/Profile';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useIsFocused} from '@react-navigation/native';

import Colors from '../styles/colors';
const Stack = createNativeStackNavigator();

import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../utils/Dimensions';
import JobDetails from '../pages/home/jobdetails/JobDetails';
import Appointment from '../pages/home/event/appointment/Appointment';
import Details from '../pages/home/event/details/Details';
import AppointmentStack from './AppointmentStack/AppointmentStack';
import {appointmentDetails, createJob} from '../constants/listData';
import AppointmentDetails from '../pages/home/event/appointmentdetails/AppointmentDetails';
import CreateJob from '../pages/home/createjob/CreateJob';
import AppointmentCalendar from '../pages/home/event/appointment/AppointmentCalendar';
import {useDispatch, useSelector} from 'react-redux';
import {getAllAppointment, getUserProfile} from '../../redux/asyncThunk';
import {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import CreateJobStack from './CreaJobStack/CreateJobStack';
import {ROLE_TYPE} from '../../redux/constants/services.constant';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {role, user} = useSelector(state => state.auth);
  const isFocused = useIsFocused();
  useEffect(() => {
    dispatch(getUserProfile());
  }, []);

  return (
    <>
      <Tab.Navigator
        initialRouteName={navigationPath.DASHBOARD}
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: 'red',
          tabBarInactiveTintColor: 'gray',
          tabBarShowLabel: false,
          tabBarStyle: {
            // position: 'absolute',
            backgroundColor: Colors.WHITE,
            // borderTopLeftRadius: 21,
            // borderTopRightRadius: 21,
            // borderRadius: 50,
            // bottom: 20,
            // marginHorizontal: 16
            display: 'flex',
            height: 80,
          },
        }}>
        <Tab.Screen
          name={navigationPath.DASHBOARD}
          component={Dashboard}
          options={{
            tabBarItemStyle: {
              flex: role === 'customer' ? 0.45 : 1,
            },
            tabBarIcon: ({focused}) => {
              return (
                <View>
                  <Image
                    style={{
                      // marginTop: verticalScale(10),
                      tintColor: focused ? Colors.BLUE : null,
                      width: moderateScale(25),
                      height: moderateScale(25),
                    }}
                    source={imagePath.HOME}
                  />
                  <View
                    style={{
                      borderRadius: 2.5,
                      width: 5,
                      height: 5,
                      marginTop: verticalScale(5),
                      backgroundColor: focused ? Colors.BLUE : null,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: verticalScale(5),
                      marginLeft: horizontalScale(10),
                    }}></View>
                </View>
              );
            },
          }}
        />
        {role === 'customer' && (
          <Tab.Screen
            name={navigationPath.CREATE_JOB}
            component={CreateJob}
            options={{
              tabBarItemStyle: {
                flex: 0.1,
              },
              tabBarIcon: () => {
                return (
                  <TouchableOpacity
                    style={{
                      backgroundColor: Colors.WHITE,
                      shadowColor: '#000',
                      shadowOffset: {width: 1, height: 1},
                      shadowOpacity: 1,
                      shadowRadius: 3,
                      elevation: 5,
                      width: 45,
                      height: 45,
                      position: 'absolute',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 45 / 2,
                      bottom: 57,
                      // left: -8,
                    }}
                    onPress={() =>
                      navigation.navigate(navigationPath.CREATE_JOB)
                    }>
                    <View
                      style={{
                        backgroundColor: Colors.BLUE,
                        width: 30,
                        height: 30,
                        justifyContent: 'center',
                        alignContent: 'center',
                        alignItems: 'center',
                        borderRadius: 30 / 2,
                      }}>
                      <View>
                        <View style={{}}>
                          <Image
                            style={{width: 15, height: 15}}
                            source={imagePath.ADD}
                          />
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              },
            }}
          />
        )}
        {role !== 'customer' ? (
          <Tab.Screen
            name={navigationPath.APPOINTMENT}
            component={AppointmentStack}
            options={{
              tabBarItemStyle: {
                flex: role === 'customer' ? 0.45 : 1,
              },
              tabBarIcon: ({focused}) => {
                return (
                  <View style={{display: 'flex', flex: 1}}>
                    <View
                      style={{
                        // backgroundColor: 'red',
                        flex: 0.3,
                        minWidth: '100%',
                        alignItems: 'center',
                        position: 'relative',
                      }}>
                      <View
                        style={{
                          backgroundColor: Colors.WHITE,
                          shadowColor: '#000',
                          shadowOffset: {width: 1, height: 1},
                          shadowOpacity: 1,
                          shadowRadius: 3,
                          elevation: 5,
                          width: 45,
                          height: 45,
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: 45 / 2,
                          position: 'absolute',
                          bottom: 0,
                        }}>
                        <TouchableOpacity
                          style={{
                            backgroundColor: Colors.BLUE,
                            width: 30,
                            height: 30,
                            justifyContent: 'center',
                            alignContent: 'center',
                            alignItems: 'center',
                            borderRadius: 45 / 2,
                          }}
                          onPress={() =>
                            navigation.navigate(navigationPath.CREATE_JOB)
                          }>
                          <View>
                            <View style={{}}>
                              <Image
                                style={{width: 15, height: 15}}
                                source={imagePath.ADD}
                              />
                            </View>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate(navigationPath.APPOINTMENT)
                      }
                      style={{
                        // backgroundColor: 'blue',
                        minWidth: '100%',
                        flex: 0.8,
                        alignItems: 'center',
                      }}>
                      <View>
                        <Image
                          style={{
                            // marginTop: verticalScale(10),
                            tintColor: focused ? Colors.BLUE : null,
                            width: moderateScale(25),
                            marginTop: responsiveHeight(1),
                            height: moderateScale(25),
                          }}
                          source={imagePath.CALENDAR}
                        />
                        <View
                          style={{
                            borderRadius: 2.5,
                            width: 5,
                            height: 5,
                            marginTop: verticalScale(5),
                            backgroundColor: focused
                              ? Colors.BLUE
                              : Colors.null,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: verticalScale(5),
                            marginLeft: horizontalScale(10),
                          }}></View>
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              },
            }}
          />
        ) : null}

        <Tab.Screen
          name={navigationPath.PROFILE}
          component={Profile}
          options={{
            tabBarItemStyle: {
              flex: role === 'customer' ? 0.45 : 1,
            },
            tabBarIcon: ({focused}) => {
              return (
                <TouchableOpacity
                  onPress={() => navigation.navigate(navigationPath.PROFILE)}>
                  <Image
                    style={{
                      // marginTop: verticalScale(10),
                      tintColor: focused ? Colors.BLUE : Colors.DARK_GREY,
                      width: moderateScale(25),
                      height: moderateScale(25),
                    }}
                    source={imagePath.ACCOUNT}
                  />
                  <View
                    style={{
                      borderRadius: 2.5,
                      width: 5,
                      height: 5,
                      marginTop: verticalScale(5),
                      backgroundColor: focused ? Colors.BLUE : Colors.null,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: verticalScale(5),
                      marginLeft: horizontalScale(10),
                    }}></View>
                </TouchableOpacity>
              );
            },
          }}
        />
      </Tab.Navigator>
    </>
  );
};
export default BottomTabs;
