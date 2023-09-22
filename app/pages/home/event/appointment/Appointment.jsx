import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Pressable,
  FlatList,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
// import styles from '../appointmentdetails/styles';
import Colors from '../../../../styles/colors';
import Header from '../../../../components/atoms/Header/Header';
import imagePath from '../../../../constants/imagePath';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../../utils/Dimensions';

import MapView, {Marker, Polyline, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import TextHeader from '../../../../components/atoms/Header/TextHeader/TextHeader';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import navigationPath from '../../../../constants/navigationPath';
import {useNavigation} from '@react-navigation/native';
import {listMap} from '../../../../constants/listData';
import CalendarStrip from 'react-native-calendar-strip';
import FontFamily from '../../../../constants/FontFamily';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import {getAllAppointment} from '../../../../../redux/asyncThunk';
import {appointmentStatus, getStatusColor} from '../../../../helpers';
import {ActivityIndicator, IconButton} from 'react-native-paper';
import {PermissionsAndroid} from 'react-native';
const Appointment = () => {
  const [viewAllHandler, setViewAllHandler] = useState(false);

  const [selected, setSelected] = useState('List');
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [apptList, setApptList] = useState('');
  const [selectedStartDate, setSelectedStartDate] = useState(new Date());
  const [loading, setLoading] = useState(false);

  const handleSelected = value => {
    setSelected(value);
  };
  let customDatesStyles = [];
  let startDate = moment();
  for (let i = 0; i < 1; i++) {
    customDatesStyles.push({
      startDate: startDate.clone().add(i, 'days'), // Single date since no endDate provided
      dateNameStyle: styles.dateNameStyle,
      dateNumberStyle: styles.dateNumberStyle,
      // Random color...
      dateContainerStyle: {backgroundColor: Colors.BLUE},
    });
  }
  //   const navigation = useNavigation();
  const [coordinates] = useState([
    {
      latitude: 48.8587741,
      longitude: 2.2069771,
    },
    {
      latitude: 48.8323785,
      longitude: 2.3361663,
    },
  ]);
  // useEffect(() => {
  //   Geolocation.getCurrentPosition(pos => {
  //     const crd = pos.coords;
  //     setPosition({
  //       latitude: crd.latitude,
  //       longitude: crd.longitude,
  //       latitudeDelta: 0.0421,
  //       longitudeDelta: 0.0421,
  //     });
  //   });
  // }, []);
  const [position, setPosition] = useState({
    latitude: -31.9523,
    longitude: 115.8613,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  });

  // useEffect(() => {
  //   const requestLocationPermission = async () => {
  //     if (Platform.OS === 'ios') {
  //       getOneTimeLocation();
  //       subscribeLocationLocation();
  //     } else {
  //       try {
  //         const granted = await PermissionsAndroid.request(
  //           PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //           {
  //             title: 'Location Access Required',
  //             message: 'This App needs to Access your location',
  //           },
  //         );
  //         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //           //To Check, If Permission is granted
  //           getOneTimeLocation();
  //           subscribeLocationLocation();
  //         } else {
  //           setLocationStatus('Permission Denied');
  //         }
  //       } catch (err) {
  //         console.warn(err);
  //       }
  //     }
  //   };
  //   requestLocationPermission();

  //   return () => {
  //     Geolocation.clearWatch(watchID);
  //   };
  // }, []);

  // useEffect(() => {
  //   Geolocation.getCurrentPosition(pos => {
  //     const crd = pos.coords;

  //     setPosition({
  //       latitude: crd.latitude,
  //       longitude: crd.longitude,
  //       latitudeDelta: 0.0421,
  //       longitudeDelta: 0.0421,
  //     });
  //   });
  // }, []);

  const onDateChange = date => {
    setSelectedStartDate(date);
  };
  const {user} = useSelector(state => state?.auth);

  useEffect(() => {
    if (startDate) {
      const data = moment(selectedStartDate).format('YYYY-MM-DD');
      setLoading(true);
      dispatch(
        getAllAppointment({
          start_date__date: data,
          company_id: user.company_id,
        }),
      )
        .unwrap()
        .then(res => {
          setApptList(res?.data?.data);
          setLoading(false);
        })
        .catch(err => {});
    }
  }, [selectedStartDate]);

  const datesBlacklistFunc = date => {
    return date.isoWeekday() === 6; // disable Saturdays
  };
  console.log('appptList', apptList);
  const CategoriesCard = ({imageSource, title, onPress, value}) => {
    return (
      <View style={{flexDirection: 'row', width: '100%'}}>
        <TouchableOpacity
          style={[
            styles.frame,
            {backgroundColor: value === title ? Colors.BLUE : Colors.CARD_GREY},
          ]}
          onPress={() => onPress(title)}>
          <Text
            style={[
              styles.title,
              {color: value === title ? Colors.WHITE : Colors.BLACK},
            ]}
            numberOfLines={2}>
            {title}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  const handleGoBack = event => {
    dispatch(getAllAppointment({company_id: user.company_id}))
      .unwrap()
      .then(res => {
        navigation.goBack();
      });
  };

  const {appointmentStatusList} = useSelector(state => state.appointment);
  const reloadConst = (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
      }}>
      <IconButton
        icon="reload"
        size={20}
        style={{borderWidth: 1}}
        onPress={() => {
          // setViewAll(true);
          // setPage(page++), refreshList();
        }}
        mode="contained-tonal"
      />
    </View>
  );
  const [coordinatesAll] = useState([
    {
      latitude: 48.8587741,
      longitude: 2.2069771,
    },
    {
      latitude: 48.8323785,
      longitude: 2.3361663,
    },
  ]);

  console.log('appptList', apptList);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{height: 40}}>
        <Header
          onPress={() => handleGoBack()}
          image={imagePath.LEFT}
          title="Appointment Calendar"
          notification={imagePath.NOTIFICATION}
        />
      </View>
      <View style={styles.container}>
        <CalendarStrip
          onDateSelected={e => onDateChange(e)}
          scrollable
          style={{
            height: 100,
            paddingTop: 10,
            paddingBottom: 10,
            marginTop: 10,
            marginBottom: 10,
          }}
          calendarColor={Colors.WHITE}
          dayContainerStyle={{
            backgroundColor: Colors.WHITE,
            borderColor: Colors.BORDER_GREY,
            borderWidth: 1,
          }}
          calendarHeaderStyle={{color: 'black'}}
          leftSelector={[]}
          rightSelector={[]}
          selectedDate={[]}
          dateNumberStyle={{color: 'black'}}
          dateNameStyle={{color: 'black'}}
          calendarHeaderContainerStyle={{marginBottom: 15}}
          highlightDateContainerStyle={{
            backgroundColor: Colors.BLUE,
            color: Colors.WHITE,
          }}
          highlightDateNameStyle={{color: Colors.WHITE}}
          highlightDateNumberStyle={{color: Colors.WHITE}}
          daySelectionAnimation={{
            type: 'border',
            duration: 200,
            borderWidth: 1,
            borderHighlightColor: Colors.BLUE,
            height: 30,
            width: 30,
            borderRadius: 15,
          }}
        />
        <View
          style={{
            marginHorizontal: responsiveHeight(0.3),
          }}></View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View>
            <CategoriesCard
              title={'List'}
              onPress={() => handleSelected('List')}
              value={selected}
            />
          </View>
          <View>
            <CategoriesCard
              title={'Map'}
              onPress={() => handleSelected('Map')}
              value={selected}
            />
          </View>
        </View>
        {selected === 'Map' ? (
          <>
            {/* <View>
              <Text>Appointments Map</Text>
            </View> */}
            {apptList?.length >= 1 ? (
              <MapView
                // style={styles.map}
                // region="austalia"
                // setMapBoundaries={
                //   ({
                //     latitude: -25.5736,
                //     longitude: 145.612793,
                //   },
                //   {
                //     latitude: -34.0557,
                //     longitude: 116.0414,
                //   })
                // }
                style={styles.mapStyle}
                showsUserLocation={true}
                focusable={true}
                // initialRegion={position}
                zoomEnabled={true}
                // minZoomLevel={5}
                // maxZoomLevel={1000}
                provider={PROVIDER_GOOGLE}
                // customMapStyle={mapStyle}
              >
                {/* <Marker coordinate={{latitude: 22.7196, longitude: 75.8577}} /> */}
                {apptList?.map(item => {
                  console.log('item', item);
                  return (
                    <Marker
                      pointForCoordinate={{
                        latitude: +item?.job.property_address?.lat,
                        longitude: +item?.job.property_address.long,
                      }}
                      title={item.job?.property_address.formatted_address}
                      description={item?.work_type.title}
                      coordinate={{
                        latitude: +item?.job.property_address?.lat,
                        longitude: +item?.job.property_address.long,
                      }}
                    />
                  );
                })}

                <Polyline
                  coordinates={coordinates}
                  strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
                  strokeColors={['#7F0000']}
                  strokeWidth={6}
                />
              </MapView>
            ) : null}
          </>
        ) : (
          <>
            <View style={{marginTop: 20}}>
              <TextHeader
                onPress={() => setViewAllHandler(!viewAllHandler)}
                title_one={apptList?.length > 0 ? 'Appointments List' : null}
                view_all={
                  apptList?.length > 0
                    ? viewAllHandler
                      ? 'View Less'
                      : 'View All'
                    : null
                }
              />
            </View>
            {loading ? (
              <ActivityIndicator size={'large'} color={Colors.BLUE} />
            ) : apptList?.length >= 1 ? (
              <>
                <FlatList
                  data={viewAllHandler ? apptList : apptList?.slice(0, 2)}
                  renderItem={({item}) => {
                    return (
                      <View
                        style={{
                          marginVertical: responsiveHeight(1.5),
                          marginHorizontal: responsiveWidth(3),
                        }}>
                        <View
                          style={{
                            width: '100%',
                            flexDirection: 'row',
                          }}>
                          <Text
                            numberOfLines={3}
                            style={{
                              fontWeight: 'bold',
                              fontSize: responsiveFontSize(1),
                              color: Colors.DARK_GREY,
                              fontFamily: FontFamily.POPPINS_REGULAR,
                            }}>
                            {moment(item.start_date).format('  hh:mm A')}
                          </Text>
                          <View
                            style={{
                              width: '90%',
                              bottom: 13,
                              marginStart: responsiveWidth(4),
                              borderBottomColor: Colors.CARD_GREY,
                              borderBottomWidth: 1,
                            }}></View>
                        </View>
                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate(
                              navigationPath.APPOINTMENT_DETAILS,
                              {
                                id: item.id,
                              },
                            )
                          }
                          style={{
                            padding: 10,
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'row',
                            marginStart: responsiveWidth(10),
                            borderRadius: responsiveWidth(2),
                            backgroundColor: Colors.CARD_HEADER,
                          }}>
                          <View
                            style={{
                              borderRadius: 20,
                              justifyContent: 'center',
                              alignItems: 'center',
                              width: 40,
                              height: 40,
                              backgroundColor: Colors.WHITE,
                              padding: 10,
                            }}>
                            <Image
                              source={imagePath.TODO}
                              style={{
                                width: 16,
                                height: 16,
                                tintColor: Colors.BLUE,
                              }}
                              resizeMode="center"
                            />
                          </View>
                          <View
                            style={{
                              marginHorizontal: responsiveWidth(2),
                              justifyContent: 'space-between',
                              flex: 1,
                            }}>
                            <View
                              style={{
                                marginHorizontal: responsiveWidth(2),
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                flex: 1,
                              }}>
                              <Text
                                style={{
                                  fontSize: responsiveFontSize(1),
                                  color: Colors.BLACK,
                                  fontFamily: FontFamily.POPPINS_SEMIBOLD,
                                }}>
                                {item?.work_type.title}
                              </Text>
                              <View
                                style={{
                                  left: 15,
                                  flexDirection: 'row',
                                  justifyContent: 'space-between',
                                }}>
                                <Text
                                  style={{
                                    fontSize: responsiveFontSize(1),
                                    color: Colors.BLACK,
                                    fontFamily: FontFamily.POPPINS_MEDIUM,
                                  }}>
                                  {'APPT ID'}
                                </Text>
                                <View
                                  style={{
                                    marginHorizontal: responsiveWidth(3.5),
                                  }}></View>
                                <Text
                                  style={{
                                    fontSize: responsiveFontSize(1),
                                    color: Colors.BLACK,
                                    fontFamily: FontFamily.POPPINS_MEDIUM,
                                  }}>
                                  {item.ref_id}
                                </Text>
                              </View>
                            </View>
                            <View
                              style={{
                                marginHorizontal: responsiveWidth(2),
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                flex: 1,
                              }}>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  margin: 10,
                                  marginBottom: responsiveHeight(1),
                                }}>
                                <Image
                                  style={{width: 12, height: 12}}
                                  source={imagePath.CLOCK}
                                />
                                <Text
                                  style={{
                                    fontSize: responsiveFontSize(1),
                                    color: Colors.BLACK,
                                    marginStart: responsiveWidth(1),
                                    fontFamily: FontFamily.POPPINS_MEDIUM,
                                  }}>
                                  {moment(item.start_date).format(
                                    '  hh:mm a, DD/MM/YYYY ',
                                  )}
                                  {'\n '}
                                  {moment(item.end_date).format(
                                    '  hh:mm a, DD/MM/YYYY ',
                                  )}
                                </Text>
                              </View>
                              <View
                                style={{
                                  backgroundColor: getStatusColor(
                                    item.appointment_status,
                                  ),
                                  alignItems: 'center',
                                  // width: responsiveWidth(15),
                                  left: 20,
                                  // backgroundColor: Colors.DARK_GREY,
                                  height: responsiveHeight(3),
                                  justifyContent: 'center',
                                  marginTop: responsiveHeight(0.5),
                                  paddingHorizontal: 5,
                                  borderRadius: 5,
                                }}>
                                <Text
                                  style={{
                                    fontSize: responsiveFontSize(1),
                                    color: Colors.WHITE,
                                    textAlign: 'center',
                                    fontFamily: FontFamily.POPPINS_MEDIUM,
                                    padding: 0,
                                  }}>
                                  {appointmentStatus(
                                    appointmentStatusList,
                                    item.appointment_status,
                                  )}
                                </Text>
                              </View>
                            </View>
                            <View
                              style={{
                                marginHorizontal: responsiveWidth(2),
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                flex: 1,
                              }}>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  marginStart: responsiveWidth(2),
                                  bottom: responsiveHeight(1),
                                }}>
                                <Image
                                  style={{width: 12, height: 12}}
                                  source={imagePath.LOCATION}
                                  resizeMode={'center'}
                                />
                                <View>
                                  <Text
                                    style={{
                                      fontSize: responsiveFontSize(1),
                                      color: Colors.BLACK,
                                      alignSelf: 'center',
                                      marginStart: responsiveWidth(1),
                                      fontFamily: FontFamily.POPPINS_MEDIUM,
                                      top: responsiveHeight(0.5),
                                      right: responsiveWidth(0.5),
                                    }}>
                                    {item?.job?.property_address
                                      .formatted_address
                                      ? item?.job?.property_address
                                          .formatted_address
                                      : (item?.job?.property_address
                                          .building_number,
                                        item?.job?.property_address
                                          .street_number,
                                        item?.job?.property_address.street_name,
                                        item?.job?.property_address.state)}
                                  </Text>
                                </View>
                              </View>
                            </View>
                          </View>
                        </TouchableOpacity>
                      </View>
                    );
                  }}
                />
                {/* {reloadConst} */}
              </>
            ) : (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                  No Appointment Available
                </Text>
                {reloadConst}
              </View>
            )}
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

const mapStyle = [
  {elementType: 'satelite', stylers: [{color: '#242f3e'}]},
  {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
  {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e', height: 3}]},
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{color: '#d59563'}],
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    backgroundColor: Colors.WHITE,
    marginHorizontal: horizontalScale(4),
  },
  mapStyle: {
    position: 'absolute',
    top: 200,
    left: 0,
    right: 0,
    bottom: 0,
  },
  frame: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    padding: 8,
    paddingHorizontal: responsiveWidth(20),
  },
});

export default Appointment;
