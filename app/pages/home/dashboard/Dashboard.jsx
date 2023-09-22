import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../../components/atoms/Header/Header';
import imagePath from '../../../constants/imagePath';
import Pie from 'react-native-pie';
import Colors from '../../../styles/colors';
import {moderateScale, verticalScale} from '../../../utils/Dimensions';
import {chartData, dashboard} from '../../../constants/listData';
import Card from '../../../components/atoms/Card/Card';
import TextHeader from '../../../components/atoms/Header/TextHeader/TextHeader';
import FontFamily from '../../../constants/FontFamily';
import {StackActions} from '@react-navigation/native';

import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {
  getAllAppointment,
  appointmentStatusListThunk,
  getAllAppointmentByCustomer,
  appointmentStatusListThunkByCustomer,
  getAppointmentByIDByCustomer,
  getDashboardDataForCustomer,
  getDashboardData,
} from '../../../../redux/asyncThunk';
import {useDispatch, useSelector} from 'react-redux';
import {
  appointmentStatus,
  chartState,
  formateDate,
  getStatusColor,
} from '../../../helpers';
import {useNavigation} from '@react-navigation/native';
import navigationPath from '../../../constants/navigationPath';
import {Dimensions} from 'react-native';
// import {PieChart} from 'react-native-chart-kit';
import {ActivityIndicator, Button, IconButton} from 'react-native-paper';
import {Loader} from '../../../components/atoms/Loader/Loader';
import {ROLE_TYPE} from '../../../../redux/constants/services.constant';
import Toast from 'react-native-toast-message';
import moment from 'moment';
import PieChart from 'react-native-pie-chart';
import {useIsFocused} from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;

const Dashboard = () => {
  const isFocused = useIsFocused();

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [chartData, setChartData] = useState([]);
  let [page, setPage] = useState(1);
  const {user, role, dashboardData} = useSelector(state => state.auth);
  // console.log('user', user);
  const {appointmentList} = useSelector(state => state.appointment);
  const {appointmentStatusList} = useSelector(state => state.appointment);
  const [view_all, setViewAll] = useState(false);
  const [data, setData] = useState([]);
  const widthAndHeight = 180;
  // let series = [];
  // const series = [123, 321, 123, 789, 537];?
  const sliceColor = [
    '#666666',
    '#2196F3',
    '#0A84FF',
    '#97DC21',
    '#FF9800',
    '#F44336',
  ];

  useEffect(() => {
    setData(appointmentList);
  }, [appointmentList, appointmentStatus]);

  useEffect(() => {
    if (isFocused) {
      if (role === ROLE_TYPE.CUSTOMER) {
        dispatch(getDashboardDataForCustomer());
        // dispatch(getAppointmentByIDByCustomer({id: user.id}));
        dispatch(getAllAppointmentByCustomer({page: page}));
        dispatch(appointmentStatusListThunkByCustomer());
      } else {
        dispatch(getDashboardData({company_id: user.company_id}));
        dispatch(getAllAppointment({company_id: user.company_id}));

        dispatch(appointmentStatusListThunk({company_id: user.company_id}));
      }
    }
  }, []);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', e => {
      handleNavigate();
    });

    return unsubscribe;
  }, [navigation]);
  const handleNavigate = () => {
    navigation.navigate(navigationPath.DASHBOARD);
    if (role === ROLE_TYPE.FIELD_WORKER) {
      dispatch(getAllAppointment({company_id: user.company_id}));
    } else {
      dispatch(getAllAppointmentByCustomer());
    }
  };

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
          setViewAll(true);
          setPage(page++), refreshList();
        }}
        mode="contained-tonal"
      />
    </View>
  );

  const refreshList = () => {
    // console.log('calll', refreshist);
    dispatch(appointmentStatusListThunk({company_id: 1}));
    dispatch(getDashboardData({company_id: user.company_id}));

    dispatch(getDashboardDataForCustomer());

    if (role === ROLE_TYPE.CUSTOMER) {
      dispatch(getAllAppointmentByCustomer({page: page}))
        .unwrap()
        .then(res => {
          // console.log('res', res);
          setData([...res.data.data]);
        })
        .catch(rejectedValueOrSerializedError => {
          Toast.show({
            topOffset: 60,
            position: 'top',
            type: 'error',
            text1: 'There is no appointment left to show',
          });
        });
    } else {
      dispatch(getAllAppointment({company_id: user.company_id}))
        .unwrap()
        .then(res => {
          // console.log('res', res);
          setData([...res.data.data]);
        })
        .catch(rejectedValueOrSerializedError => {
          Toast.show({
            topOffset: 60,
            position: 'top',
            type: 'error',
            text1: 'There is no appointment left to show',
          });
        });
    }
  };

  useEffect(() => {
    refreshList();
    // setData([...data, appointmentList]);
  }, [page]);

  useEffect(() => {
    let data = dashboardData.map(obj => {
      return {
        name: obj.status,
        population: obj.count,
        color: getStatusColor(obj.status),
        legendFontColor: '#000',
        legendFontSize: 8,
      };
    });
    setChartData(data);
  }, [dashboardData]);

  const _renderItem = ({index, item}) => {
    if (!item && !item.job) {
      return <Loader />;
    }

    return (
      <>
        <TouchableOpacity
          style={{
            marginVertical: responsiveHeight(1),
            borderColor: Colors.CARD_GREY,
            borderTopLeftRadius: moderateScale(5),
            borderTopRightRadius: moderateScale(5),
            borderWidth: 1,
            marginHorizontal: 20,
          }}
          onPress={() =>
            navigation.navigate(navigationPath.APPOINTMENT_DETAILS, {
              id: item.id,
            })
          }>
          <View
            style={{
              height: moderateScale(35),
              backgroundColor:
                index % 2 === 1 ? Colors.CARD_GREY : Colors.CARD_HEADER,
              justifyContent: 'center',
              alignItems: 'center',
              borderTopLeftRadius: moderateScale(5),
              borderTopRightRadius: moderateScale(5),
            }}>
            <Text
              style={{
                fontFamily: FontFamily.POPPINS_SEMIBOLD,
                fontSize: responsiveFontSize(1.2),
                color: Colors.BLACK,
                textAlign: 'center',
              }}>
              {item?.work_type?.title?.toUpperCase()}
            </Text>
          </View>
          <View
            style={{
              marginHorizontal: moderateScale(11),
              paddingVertical: verticalScale(10),
              flex: 1,
            }}>
            {/* <View
              style={{
                flexDirection: 'row',
                marginTop: verticalScale(5),
                flex: 0.7,
              }}>
              <Text
                style={{
                  fontFamily: FontFamily.POPPINS_REGULAR,
                  color: Colors.BLACK,
                  fontSize: responsiveFontSize(1.2),
                }}>
                Appt Id :
              </Text>
              <View style={{flex: 0.63, alignItems: 'center'}}>
                <Text
                  style={{
                    fontFamily: FontFamily.POPPINS_MEDIUM,
                    color: Colors.DARK_GREY,
                    fontSize: responsiveFontSize(1.2),
                    marginLeft: responsiveWidth(10),
                  }}>
                  {item?.ref_id}
                </Text>
              </View>
            </View> */}
            <View
              style={{
                flexDirection: 'row',
                flex: 2,
              }}>
              <View style={{flex: 0.5}}>
                <Text
                  style={{
                    fontSize: responsiveFontSize(1.2),
                    fontFamily: FontFamily.POPPINS_REGULAR,
                    color: Colors.BLACK,
                  }}>
                  Appt ID :
                </Text>
              </View>
              <View style={{flex: 1}}>
                <Text
                  style={{
                    fontSize: responsiveFontSize(1.2),
                    fontFamily: FontFamily.POPPINS_REGULAR,
                    color: Colors.DARK_GREY,
                    flex: 1,
                  }}>
                  {item?.ref_id}
                </Text>
              </View>
            </View>
            {/* <View
              style={{
                flexDirection: 'row',
                marginTop: verticalScale(5),
                flex: 0.7,
              }}>
              <Text
                style={{
                  fontFamily: FontFamily.POPPINS_REGULAR,
                  color: Colors.BLACK,
                  fontSize: responsiveFontSize(1.2),
                }}>
                Customer Name :
              </Text>
              <View style={{flex: 0.34, alignItems: 'center'}}>
                <Text
                  style={{
                    fontFamily: FontFamily.POPPINS_MEDIUM,
                    color: Colors.DARK_GREY,
                    fontSize: responsiveFontSize(1.2),
                    marginLeft: responsiveWidth(10),
                  }}>
                  {item?.job?.first_name} {item?.job?.last_name}
                </Text>
              </View>
            </View> */}
            <View
              style={{
                flexDirection: 'row',
                flex: 2,
              }}>
              <View style={{flex: 0.5}}>
                <Text
                  style={{
                    fontSize: responsiveFontSize(1.2),
                    fontFamily: FontFamily.POPPINS_REGULAR,
                    color: Colors.BLACK,
                  }}>
                  Customer Name :
                </Text>
              </View>
              <View style={{flex: 1}}>
                <Text
                  style={{
                    fontSize: responsiveFontSize(1.2),
                    fontFamily: FontFamily.POPPINS_REGULAR,
                    color: Colors.DARK_GREY,
                    flex: 1,
                  }}>
                  {item?.job?.first_name} {item?.job?.last_name}
                </Text>
              </View>
            </View>
            {/* <View
              style={{
                flexDirection: 'row',
                marginTop: verticalScale(5),
                flex: 0.5,
              }}>
              <Text
                style={{
                  fontFamily: FontFamily.POPPINS_REGULAR,
                  fontSize: responsiveFontSize(1.2),
                  color: Colors.BLACK,
                }}>
                Mobile Number :
              </Text>
              <View style={{flex: 0.7, alignItems: 'center'}}>
                <Text
                  style={{
                    fontFamily: FontFamily.POPPINS_MEDIUM,
                    color: Colors.DARK_GREY,
                    fontSize: responsiveFontSize(1.2),
                  }}>
                  {item?.job?.mobile_number}
                </Text>
              </View>
            </View> */}

            <View
              style={{
                flexDirection: 'row',
                flex: 2,
              }}>
              <View style={{flex: 0.5}}>
                <Text
                  style={{
                    fontSize: responsiveFontSize(1.2),
                    fontFamily: FontFamily.POPPINS_REGULAR,
                    color: Colors.BLACK,
                  }}>
                  Mobile Number :
                </Text>
              </View>
              <View style={{flex: 1}}>
                <Text
                  style={{
                    fontSize: responsiveFontSize(1.2),
                    fontFamily: FontFamily.POPPINS_REGULAR,
                    color: Colors.DARK_GREY,
                    flex: 1,
                  }}>
                  {item?.job?.mobile_number}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                flex: 2,
              }}>
              <View style={{flex: 0.5}}>
                <Text
                  style={{
                    fontSize: responsiveFontSize(1.2),
                    fontFamily: FontFamily.POPPINS_REGULAR,
                    color: Colors.BLACK,
                  }}>
                  Scheduled Date {'\n'}and Time :
                </Text>
              </View>
              <View style={{flex: 1}}>
                <Text
                  style={{
                    fontSize: responsiveFontSize(1.2),
                    fontFamily: FontFamily.POPPINS_REGULAR,
                    color: Colors.DARK_GREY,
                    flex: 1,
                  }}>
                  {item?.start_date ? (
                    <>
                      {moment(item?.start_date).format(
                        'MMMM Do YYYY, h:mm:ss a',
                      )}{' '}
                      To
                      {moment(item?.end_date).format('MMMM Do YYYY, h:mm:ss a')}
                    </>
                  ) : (
                    '--'
                  )}
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                flex: 2,
              }}>
              <View style={{flex: 0.5}}>
                <Text
                  style={{
                    fontSize: responsiveFontSize(1.2),
                    fontFamily: FontFamily.POPPINS_REGULAR,
                    color: Colors.BLACK,
                  }}>
                  Status:
                </Text>
              </View>
              <View style={{flex: 1}}>
                <Text
                  style={{
                    fontSize: responsiveFontSize(1.2),
                    fontFamily: FontFamily.POPPINS_REGULAR,
                    color: Colors.DARK_GREY,
                    fontFamily: FontFamily.POPPINS_REGULAR,
                    color: Colors.WHITE,
                    textAlign: 'center',
                    width: responsiveWidth(35),
                    backgroundColor: getStatusColor(item?.appointment_status),
                    flex: 1,
                  }}>
                  {appointmentStatus(
                    appointmentStatusList,
                    item?.appointment_status,
                  )}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
        {view_all
          ? index === data.length - 1 && reloadConst
          : index === data.slice(0, 2).length - 1 && reloadConst}
      </>
    );
  };
  let dashboardListCount = 0;
  const handleDashboardList = items => {
    const todo = items
      ?.filter(i => i.status == 'Waiting')
      ?.map(i => i.count)
      ?.reduce((a, b) => a + b);
    const pending = items
      ?.filter(i => i.status == 'Assessment Complete')
      ?.map(i => i.count)
      ?.reduce((a, b) => a + b);
    const done = items
      ?.filter(i => ['Confirmed', 'Audited', 'Published'].includes(i.status))
      ?.map(i => i.count)
      ?.reduce((a, b) => a + b);
    dashboardListCount = done + pending + todo;
    return [
      {
        count: done,
        text: 'Done',
        color: '#0A84FF',
      },

      {
        count: todo,
        text: 'To-do',
        color: '#97DC21',
      },
      {
        count: pending,
        text: 'Pending',
        color: '#FED000',
      },
    ];
  };
  console.log(dashboardData, dashboardListCount, 'awdasda');
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.WHITE}}>
      <View style={{height: 40}}>
        <Header
          onPress={() => BackHandler.exitApp()}
          image={imagePath.LEFT}
          title="Dashboard"
          notification={imagePath.NOTIFICATION}
        />
      </View>
      <View style={{flex: 1, backgroundColor: Colors.WHITE}}>
        {chartData.length > 0 && (
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: 'white',
              marginHorizontal: moderateScale(20),
            }}>
            <View
              style={{
                marginTop: responsiveHeight(3),
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  position: 'absolute',
                  textAlign: 'center',
                  width: '100%',
                  zIndex: 999,
                }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 18,
                    color: 'black',
                  }}>
                  {' '}
                  {dashboardData.length ? dashboardData[0]?.count : null}
                </Text>
                {'\n'}
                <Text>Upcoming </Text>
                {'\n'}
                <Text>Appointment</Text>
                {/* {handleDashboardList(dashboardData).find(o.text == 'Pending')} */}
              </Text>
              {console.log(
                handleDashboardList(dashboardData)?.map(o => o.count),
              )}
              {dashboardData?.length && dashboardListCount > 0 && (
                <PieChart
                  widthAndHeight={widthAndHeight}
                  series={handleDashboardList(dashboardData)?.map(o => o.count)}
                  sliceColor={handleDashboardList(dashboardData)?.map(
                    o => o.color,
                  )}
                  doughnut={true}
                  coverRadius={0.7}
                  coverFill={'#FFF'}
                />
              )}
            </View>

            {dashboardData?.length && dashboardListCount > 0 && (
              <View
                style={{
                  marginLeft: responsiveWidth(4),
                  marginTop: responsiveHeight(3),
                  flexDirection: 'row',
                  alignSelf: 'center',
                }}>
                <View>
                  {dashboardData?.length &&
                    handleDashboardList(dashboardData)?.map((item, index) => {
                      console.log('item', item);
                      return (
                        <View
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            marginBottom: 8,
                            marginLeft: responsiveWidth(14),
                          }}>
                          <View
                            style={{
                              width: 12,
                              height: 12,
                              marginVertical: responsiveHeight(0.4),
                              borderRadius: 44 / 2,
                              backgroundColor: item.color,
                              marginEnd: responsiveWidth(4),
                              top: responsiveHeight(0.5),
                            }}>
                            {/* {item.} */}
                          </View>
                          <Text
                            style={{
                              color: 'black',
                              fontWeight: 'bold',
                              fontSize: 18,
                            }}>
                            {Math.round(
                              (item?.count / dashboardListCount) * 100,
                            )}{' '}
                            %{' \n'}
                            <Text
                              style={{
                                color: 'gray',
                                fontWeight: 'bold',
                                fontSize: 13,
                              }}>
                              {item?.text}
                            </Text>
                          </Text>
                        </View>
                      );
                    })}
                </View>
              </View>
            )}
          </View>
        )}

        <View
          style={{
            marginHorizontal: moderateScale(10),
            paddingVertical: 12,
            backgroundColor: Colors.WHITE,
            justifyContent: 'center',
          }}>
          {/* <TextHeader
            title_one="Upcoming Appointments"
            view_all={data.length ? (view_all ? 'View Less' : 'View All') : ''}
            onPress={() => setViewAll(!view_all)}
          /> */}
          {dashboardListCount > 0 && (
            <TextHeader
              title_one="Upcoming Appointments"
              view_all={
                data?.length ? (view_all ? 'View Less' : 'View All') : ''
              }
              onPress={() => setViewAll(!view_all)}
            />
          )}
        </View>
        {data.length ? (
          <View style={{flex: 1, paddingBottom: moderateScale(5)}}>
            <FlatList
              contentContainerStyle={{marginBottom: responsiveHeight(2)}}
              showsVerticalScrollIndicator={false}
              data={view_all ? data : data.slice(0, 2)}
              renderItem={_renderItem}
            />
          </View>
        ) : (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>
              No Appointment Available
            </Text>
            {reloadConst}
          </View>
        )}
        {/* {!view_all && data?.length > 2 ? (
          <>
            <TouchableOpacity
              onPress={() => setViewAll(true)}
              style={{
                marginBottom: responsiveHeight(7),
                marginHorizontal: 18,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 15}}>{data?.length - 2} more</Text>
            </TouchableOpacity>
          </>
        ) : null} */}
      </View>

      {/* {
        data.length > 2 ?
      (
        {data.l<Text></Text>}
      ):null
      } */}
    </SafeAreaView>
  );
};
export default Dashboard;
