import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import TextHeader from '../../../../components/atoms/Header/TextHeader/TextHeader';
import styles from '../appointmentdetails/styles';
import Header from '../../../../components/atoms/Header/Header';
import imagePath from '../../../../constants/imagePath';
import InnerCard from '../../../../components/molecules/InnerCard/InnerCard';
import CardJob from '../../../../components/atoms/Card/CardJob';
import {moderateScale, verticalScale} from '../../../../utils/Dimensions';
import {appointmentDetails, dashboard} from '../../../../constants/listData';
import CardDetails from '../../../../components/atoms/Card/CardDetails';
import Colors from '../../../../styles/colors';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import FontFamily from '../../../../constants/FontFamily';
import {useDispatch, useSelector} from 'react-redux';
import {
  appointmentStatusListThunk,
  getAllAppointmentByCustomer,
  getAppointmentByID,
  getAppointmentByIDByCustomer,
} from '../../../../../redux/asyncThunk';
import {useEffect} from 'react';
import navigationPath from '../../../../constants/navigationPath';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {
  appointmentStatus,
  formateDate,
  getStatusColor,
  truncateString,
} from '../../../../helpers';
import moment from 'moment';
import {ActivityIndicator, Button, IconButton} from 'react-native-paper';
import ModalComment from '../../../../components/atoms/Modal/ModalComment';
import {ROLE_TYPE} from '../../../../../redux/constants/services.constant';

const AppointmentDetails = props => {
  const navigation = useNavigation();
  const [details, setDetails] = useState({});
  const [loadingDetails, setLoadingDetails] = useState(false);
  const {params} = props.route;
  const {user, role} = useSelector(state => state.auth);
  const [commentModalVisible, setCommentModalVisible] = useState(false);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const handlerefreshList = () => {
    if (role === 'customer') {
      dispatch(getAppointmentByIDByCustomer({id: params.id}))
        .unwrap()
        .then(res => {
          setDetails(res?.data);
          setLoadingDetails(false);
        });
      dispatch(appointmentStatusListThunk({company_id: 1}));
    } else {
      dispatch(getAppointmentByID({company_id: user.company_id, id: params.id}))
        .unwrap()
        .then(res => {
          setDetails(res?.data);
          setLoadingDetails(false);
        });
      dispatch(appointmentStatusListThunk({company_id: user.company_id}));
    }
  };

  useEffect(() => {
    if (isFocused) {
      setLoadingDetails(true);
      handlerefreshList();
    }
  }, []);
  const {appointmentStatusList} = useSelector(state => state.appointment);

  const _renderItem = ({item}) => {
    if (!Object.keys(item).length) {
      return null;
    }

    const refreshList = () => {
      console.log('refreshList');
      dispatch(appointmentStatusListThunk({company_id: 1}));
      dispatch(getDashboardDataForCustomer());
      if (role === ROLE_TYPE.CUSTOMER) {
        dispatch(getAllAppointmentByCustomer({page: page}))
          .unwrap()
          .then(res => {
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
    return (
      <View>
        <ModalComment
          handlerefreshList={handlerefreshList}
          setCommentModalVisible={setCommentModalVisible}
          details={details}
          visible={commentModalVisible}
          onCancel={() => setCommentModalVisible(false)}
        />
        <View
          style={{
            height: moderateScale(30),
            backgroundColor: Colors.CARD_GREY,
            marginHorizontal: moderateScale(10),
            justifyContent: 'center',
            alignItems: 'center',
            borderTopLeftRadius: moderateScale(5),
            borderTopRightRadius: moderateScale(5),
            position: 'relative',
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: moderateScale(12),
              color: Colors.BLACK,
            }}>
            Job Details
          </Text>
          {role !== 'customer' && (
            <View style={{position: 'absolute', right: 10}}>
              <Pressable onPress={() => setCommentModalVisible(true)}>
                <Text
                  style={{
                    color: '#0C1559',
                    fontSize: 12,
                    textDecorationLine: 'underline',
                  }}>
                  Add Comment
                </Text>
              </Pressable>
            </View>
          )}
        </View>
        <View
          style={{
            borderColor: Colors.CARD_GREY,
            borderWidth: 1,
            marginHorizontal: moderateScale(11),
          }}>
          <View
            style={{
              marginHorizontal: moderateScale(10),
              flexDirection: 'row',
              marginVertical: moderateScale(20),
              flex: 2,
            }}>
            <View style={{flex: 0.5}}>
              <Text
                style={{
                  marginStart: moderateScale(20),
                  fontSize: responsiveFontSize(1.2),
                  fontFamily: FontFamily.POPPINS_REGULAR,
                  color: Colors.BLACK,
                }}>
                Job ID :
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
                {item?.job.ref_id}
              </Text>
            </View>
          </View>
          <View
            style={{
              marginHorizontal: moderateScale(10),
              flexDirection: 'row',
              flex: 2,
            }}>
            <View style={{flex: 0.5}}>
              <Text
                style={{
                  marginStart: moderateScale(20),
                  fontSize: responsiveFontSize(1.2),
                  fontFamily: FontFamily.POPPINS_REGULAR,
                  color: Colors.BLACK,
                }}>
                Status :
              </Text>
            </View>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <Text
                style={{
                  fontSize: responsiveFontSize(1.2),
                  fontFamily: FontFamily.POPPINS_REGULAR,
                  color: Colors.WHITE,
                  textAlign: 'center',
                  width: responsiveWidth(35),
                  backgroundColor: getStatusColor(item?.appointment_status),
                }}>
                {appointmentStatus(
                  appointmentStatusList,
                  item?.appointment_status,
                )}
              </Text>
            </View>
          </View>
          <View
            style={{
              marginHorizontal: moderateScale(10),
              flexDirection: 'row',
              marginTop: verticalScale(10),
              flex: 2,
            }}>
            <View style={{flex: 0.5}}>
              <Text
                style={{
                  fontSize: responsiveFontSize(1.2),
                  marginStart: moderateScale(20),
                  fontFamily: FontFamily.POPPINS_REGULAR,
                  color: Colors.BLACK,
                }}>
                {`Scheduled Date \n& Time :`}
              </Text>
            </View>
            <View style={{flex: 1}}>
              {item?.start_date ? (
                <>
                  <Text
                    style={{
                      fontFamily: FontFamily.POPPINS_REGULAR,

                      fontSize: responsiveFontSize(1.2),
                      fontSize: moderateScale(10),
                      color: Colors.DARK_GREY,
                      flex: 1,
                    }}>
                    from : {/* <Text style={{fontWeight: 'bold'}}> */}
                    {/* {formateDate(item?.start_date)} */}
                    {
                      moment(item?.start_date).format('MMMM Do YYYY, h:mm:ss a')
                      // moment(item?.start_date).format("DD-MM-YYYY","hh:mm:ss")
                    }
                    {/* </Text> */}
                  </Text>
                </>
              ) : (
                <Text>- -</Text>
              )}
              {item?.end_date ? (
                <Text
                  style={{
                    fontFamily: FontFamily.POPPINS_REGULAR,

                    fontSize: responsiveFontSize(1.2),
                    fontSize: moderateScale(10),
                    color: Colors.DARK_GREY,
                    flex: 1,
                  }}>
                  To : {/* <Text style={{fontWeight: 'bold'}}> */}
                  {moment(item?.end_date).format('MMMM Do YYYY, h:mm:ss a')}
                  {/* </Text> */}
                </Text>
              ) : (
                <Text>{'- -'}</Text>
              )}
            </View>
          </View>
          <View
            style={{
              marginHorizontal: moderateScale(10),
              flexDirection: 'row',
              marginTop: verticalScale(10),
              flex: 2,
            }}>
            <View style={{flex: 0.5}}>
              <Text
                style={{
                  marginStart: moderateScale(20),
                  fontSize: responsiveFontSize(1.2),
                  fontFamily: FontFamily.POPPINS_REGULAR,
                  color: Colors.BLACK,
                }}>
                Duration
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
                {item?.duration ? item?.duration : '--'}
              </Text>
            </View>
          </View>
          <View
            style={{
              marginHorizontal: moderateScale(10),
              flexDirection: 'row',
              marginTop: verticalScale(10),
              marginVertical: moderateScale(6),
              flex: 2,
            }}>
            <View style={{flex: 0.5}}>
              <Text
                style={{
                  marginStart: moderateScale(20),
                  fontFamily: FontFamily.POPPINS_REGULAR,

                  fontSize: responsiveFontSize(1.2),

                  color: Colors.BLACK,
                }}>
                Job Instructions :
              </Text>
            </View>
            <View style={{flex: 1}}>
              <Text
                style={{
                  fontFamily: FontFamily.POPPINS_REGULAR,

                  fontSize: responsiveFontSize(1.2),
                  color: Colors.DARK_GREY,
                }}>
                {item?.instruction}
              </Text>
            </View>
          </View>
          <View
            style={{
              marginHorizontal: moderateScale(10),
              flexDirection: 'row',
              marginVertical: moderateScale(10),
              flex: 2,
            }}>
            <View style={{flex: 0.5}}>
              <Text
                style={{
                  marginStart: moderateScale(20),
                  fontFamily: FontFamily.POPPINS_REGULAR,

                  fontSize: responsiveFontSize(1.2),
                  color: Colors.BLACK,
                }}>
                Comment :
              </Text>
            </View>
            <View style={{flex: 1}}>
              <Text
                style={{
                  fontFamily: FontFamily.POPPINS_REGULAR,
                  fontSize: responsiveFontSize(1.2),
                  color: Colors.DARK_GREY,
                }}>
                {item?.latest_comment
                  ? item.latest_comment?.description
                  : 'Comment not available'}
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            height: moderateScale(35),
            marginTop: responsiveHeight(2),
            backgroundColor: Colors.CARD_GREY,
            marginHorizontal: moderateScale(10),
            justifyContent: 'center',
            alignItems: 'center',
            borderTopLeftRadius: moderateScale(5),
            borderTopRightRadius: moderateScale(5),
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: moderateScale(12),
              color: Colors.BLACK,
            }}>
            Customer Details
          </Text>
        </View>
        <View
          style={{
            borderColor: Colors.CARD_GREY,
            borderWidth: 1,
            marginHorizontal: moderateScale(11),
          }}>
          <View
            style={{
              marginHorizontal: moderateScale(10),
              flexDirection: 'row',
              marginVertical: moderateScale(20),
              flex: 2,
            }}>
            <View style={{flex: 0.5}}>
              <Text
                style={{
                  marginStart: moderateScale(20),
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
          <View
            style={{
              marginHorizontal: moderateScale(10),
              flexDirection: 'row',
              flex: 2,
            }}>
            <View style={{flex: 0.4}}>
              <Text
                style={{
                  marginStart: moderateScale(20),
                  fontSize: responsiveFontSize(1.2),
                  fontFamily: FontFamily.POPPINS_REGULAR,
                  color: Colors.BLACK,
                }}>
                Company Name :
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: 'flex-start',
                marginStart: responsiveWidth(6),
              }}>
              <Text
                style={{
                  fontSize: responsiveFontSize(1.2),
                  fontFamily: FontFamily.POPPINS_REGULAR,
                  color: Colors.DARK_GREY,
                  textAlign: 'center',
                  marginEnd: responsiveWidth(5),
                  // width: responsiveWidth(20),
                }}>
                {item?.company?.name}
              </Text>
            </View>
          </View>
          <View
            style={{
              marginHorizontal: moderateScale(10),
              flexDirection: 'row',
              marginTop: verticalScale(10),
              flex: 2,
            }}>
            <View style={{flex: 0.5}}>
              <Text
                style={{
                  fontSize: responsiveFontSize(1.2),
                  marginStart: moderateScale(20),
                  fontFamily: FontFamily.POPPINS_REGULAR,
                  color: Colors.BLACK,
                }}>
                {`Mobile Number :`}
              </Text>
            </View>
            <View style={{flex: 1}}>
              <Text
                style={{
                  fontFamily: FontFamily.POPPINS_REGULAR,

                  fontSize: responsiveFontSize(1.2),
                  color: Colors.DARK_GREY,
                  flex: 1,
                }}>
                {item?.job?.mobile_number}
              </Text>
            </View>
          </View>
          <View
            style={{
              marginHorizontal: moderateScale(10),
              flexDirection: 'row',
              marginTop: verticalScale(10),
              flex: 2,
            }}>
            <View style={{flex: 0.5}}>
              <Text
                style={{
                  marginStart: moderateScale(20),
                  fontSize: responsiveFontSize(1.2),
                  fontFamily: FontFamily.POPPINS_REGULAR,
                  color: Colors.BLACK,
                }}>
                E-mail ID :
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
                {item?.job?.email}
              </Text>
            </View>
          </View>
          <View
            style={{
              marginHorizontal: moderateScale(10),
              flexDirection: 'row',
              marginTop: verticalScale(10),
              marginVertical: moderateScale(10),
              flex: 2,
            }}>
            <View style={{flex: 0.5}}>
              <Text
                style={{
                  marginStart: moderateScale(20),
                  fontFamily: FontFamily.POPPINS_REGULAR,

                  fontSize: responsiveFontSize(1.2),
                  color: Colors.BLACK,
                }}>
                Address :
              </Text>
            </View>
            <View style={{flex: 1}}>
              <Text
                style={{
                  fontFamily: FontFamily.POPPINS_REGULAR,
                  fontSize: responsiveFontSize(1.2),
                  color: Colors.DARK_GREY,
                }}>
                {item?.job?.property_address?.building_number}{' '}
                {item?.job?.property_address?.building_number ? ' ' : ' '}
                {item?.job?.property_address?.state}{' '}
                {item?.job?.property_address?.street_number}
                {item?.job?.property_address?.street_name}{' '}
                {item?.job?.property_address?.suburb}
                {/* {item?.job?.property_address.formatted_address
                  ? item?.job?.property_address.formatted_address
                  : (item?.job?.property_address.building_number,
                    item?.job?.property_address.street_number,
                    item?.job?.property_address.street_name,
                    item?.job?.property_address.state)} */}
              </Text>
            </View>
          </View>
          <View
            style={{
              marginHorizontal: moderateScale(10),
              flexDirection: 'row',
              marginTop: verticalScale(10),
              marginVertical: moderateScale(20),
              flex: 2,
            }}>
            <View style={{flex: 0.5}}>
              <Text
                style={{
                  marginStart: moderateScale(20),
                  fontFamily: FontFamily.POPPINS_REGULAR,

                  fontSize: responsiveFontSize(1.2),
                  color: Colors.BLACK,
                }}>
                Post Code :
              </Text>
            </View>
            <View style={{flex: 1}}>
              <Text
                style={{
                  fontFamily: FontFamily.POPPINS_REGULAR,

                  fontSize: responsiveFontSize(1.2),

                  fontSize: moderateScale(10),
                  color: Colors.DARK_GREY,
                }}>
                {item?.job.property_address.pincode}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };
  if (loadingDetails) {
    return (
      <View style={{display: 'flex', flex: 1, justifyContent: 'center'}}>
        <ActivityIndicator size={'large'} />
      </View>
    );
  }
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{height: 40}}>
        <Header
          onPress={() => navigation.goBack()}
          image={imagePath.LEFT}
          title="Appointment Details"
          notification={imagePath.NOTIFICATION}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          height: responsiveHeight(5),
          alignItems: 'center',
          backgroundColor: Colors.WHITE,
          marginHorizontal: responsiveWidth(4),
        }}>
        <Text
          style={{
            color: Colors.BLACK,
            fontFamily: FontFamily.POPPINS_MEDIUM,
            fontSize: responsiveFontSize(1.6),
          }}>
          {truncateString(details?.work_type?.title.toUpperCase())}
          {/* {details?.work_type?.title.toUpperCase()} */}
        </Text>
        <Text
          style={{
            color: Colors.BLUE,
            fontFamily: FontFamily.POPPINS_MEDIUM,
            fontSize: responsiveFontSize(1.6),
          }}>
          APPT ID: {details?.ref_id}
        </Text>
      </View>

      <View style={styles.containerMain}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={[details]}
          renderItem={_renderItem}
        />

        {details?.assessment_by === user.role_type &&
          details?.appointment_status < 3 && (
            <View style={styles.bottomView}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(navigationPath.UPLOAD_PHOTOS, {
                    id: details?.id,
                    PageName: details?.job?.title,
                    base_price: details?.base_price,
                    ref_id: details?.ref_id,
                  })
                }
                style={{
                  height: moderateScale(42),
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: Colors.BLUE,
                }}>
                <Text
                  style={{color: Colors.WHITE, fontSize: moderateScale(14)}}>
                  Enter Base Price & Upload Photos
                </Text>
              </TouchableOpacity>
            </View>
          )}
      </View>
      <View
        style={{
          justifyContent: 'flex-end',
          alignItems: 'center',
          marginTop: 10,
          marginBottom: 10,
          // backgroundColor: 'red',
        }}>
        <IconButton
          icon="reload"
          size={20}
          style={{borderWidth: 1}}
          onPress={() => {
            // setPage(page++), refreshList();
            handlerefreshList();
          }}
          mode="contained-tonal"
        />
      </View>
    </SafeAreaView>
  );
};

export default AppointmentDetails;
