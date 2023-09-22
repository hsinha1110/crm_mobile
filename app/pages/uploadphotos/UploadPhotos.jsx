import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../components/atoms/Header/Header';
import Colors from '../../styles/colors';
import {upload} from '../../constants/listData';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import styles from './styles';
import {StackActions, useNavigation} from '@react-navigation/native';
import {Loader} from '../../components/atoms/Loader/Loader';
import imagePath from '../../constants/imagePath';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../utils/Dimensions';
import FontFamily from '../../constants/FontFamily';
import navigationPath from '../../constants/navigationPath';
import {TextInput} from 'react-native-gesture-handler';
import TextInputField from '../../components/atoms/TextInput/TextInputField';
import {useDispatch, useSelector} from 'react-redux';
import {
  getAppointmentByID,
  getAppointmentQuestions,
  getAppointmentUploadedDocuments,
  getAppointmentUploadedDocumentsByCustomer,
  updateSheduledAppointment,
} from '../../../redux/asyncThunk';
import UploadModel from './UploadModelComponent';
import {Button, IconButton, Modal} from 'react-native-paper';
import Toast from 'react-native-toast-message';
import {ROLE_TYPE} from '../../../redux/constants/services.constant';
import {
  getAppointmentByIDByCustomer,
  updateAppointmentThunkByCustomer,
} from '../../../redux/asyncThunk/customer.appointment.thunk';

const UploadPhotos = props => {
  const {user} = useSelector(state => state.auth);
  const {appointmentQuestionsList, apptUplodedDocuments} = useSelector(
    state => state.appointment,
  );

  const {id, PageName, base_price, ref_id} = props.route.params;
  const [basePrice, setBasePrice] = useState(base_price);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentDocId, setCurrentDocId] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isBasePriceUpdated, setIsBasePriceUpdated] = useState(false);
  const [preview, setPreview] = useState(false);
  const [loadingBasePrice, setLoadingBasePrice] = useState(true);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {role} = useSelector(state => state.auth);
  const [visible, setVisible] = useState(false);
  const handelOnPress = () => {
    setLoadingBasePrice(true);
    if (basePrice) {
      if (user.role_type === ROLE_TYPE.FIELD_WORKER) {
        dispatch(
          updateSheduledAppointment({
            company_id: user.company_id || 1,
            id,
            data: {base_price: parseInt(basePrice)},
          }),
        )
          .unwrap()
          .then(res => {
            // setBasePrice('');
            setIsBasePriceUpdated(true);
            setLoadingBasePrice(false);
            Toast.show({
              type: 'success',
              text1: 'Great',
              text2: 'Base Price Updated Successfully',
            });
          })
          .catch(err => {
            setLoadingBasePrice(false);
            Toast.show({
              type: 'error',
              text1: 'Opps!',
              text2: err.error.message,
            });
          });
      } else {
        dispatch(
          updateAppointmentThunkByCustomer({
            data: {base_price: parseInt(basePrice)},
            id,
          }),
        )
          .unwrap()
          .then(res => {
            setIsBasePriceUpdated(true);
            setLoadingBasePrice(false);
            Toast.show({
              type: 'success',
              text1: 'Great',
              text2: 'Base Price Updated Successfully',
            });
          })
          .catch(err => {
            setLoadingBasePrice(false);
            Toast.show({
              type: 'error',
              text1: 'Opps!',
              text2: err.error.message,
            });
          });
      }
    } else {
      setLoadingBasePrice(false);
      Toast.show({
        type: 'error',
        text1: 'Please Enter Base Price',
        text2: '',
      });
    }
  };
  const showModal = props => {
    setModalVisible(true);
    setCurrentDocId(props);
  };
  const hideModal = () => {
    setModalVisible(false);
  };
  useEffect(() => {
    dispatch(getAppointmentQuestions({company_id: user.company_id || 1}));
    if (user) {
      if (user.role_type === ROLE_TYPE.FIELD_WORKER) {
        dispatch(
          getAppointmentUploadedDocuments({
            appointment: id,
            companyId: user.company_id || 1,
          }),
        );
      } else {
        dispatch(
          getAppointmentUploadedDocumentsByCustomer({
            appointment: id,
          }),
        )
          .unwrap()
          .then(res => {
            console.log('ressss', res);
          });
      }
    }
  }, []);
  const onhandleComplete = () => {
    if (role === 'customer') {
      dispatch(getAppointmentByIDByCustomer({id}));
    } else {
      dispatch(getAppointmentByID({id, company_id: user?.company_id}));
    }
    navigation.navigate(navigationPath.APPOINTMENT_DETAILS, {
      id,
    });
  };
  console.log('appointment', apptUplodedDocuments);
  const isAlreadyUploaded = id => {
    if (apptUplodedDocuments?.length) {
      let uploded = apptUplodedDocuments.filter(doc => doc.question === id);
      if (uploded.length) {
        return true;
      } else {
        return false;
      }
    }
  };
  const renderPreview = id => {
    if (apptUplodedDocuments?.length) {
      let uploded = apptUplodedDocuments.filter(doc => doc.question === id);
      if (uploded.length) {
        return (
          <TouchableOpacity
            onPress={() => {
              setPreviewImage(uploded[0].attachment);
              setPreview(true);
            }}>
            <Image
              source={imagePath.PREVIEW}
              style={{
                width: horizontalScale(30),
                height: verticalScale(30),
                marginHorizontal: horizontalScale(18),
              }}
            />
          </TouchableOpacity>
        );
      } else {
        return null;
      }
    }
  };

  console.log('apptUplodedDocuments', apptUplodedDocuments);
  console.log('baseprice', basePrice);

  return (
    <>
      <SafeAreaView style={{backgroundColor: Colors.WHITE, flex: 1}}>
        <ScrollView>
          <View style={{paddingBottom: 60}}>
            <View style={{height: 40}}>
              <Header
                onPress={() =>
                  navigation.navigate(navigationPath.APPOINTMENT_DETAILS, {id})
                }
                image={imagePath.LEFT}
                title="Base Price & Photos"
                notification={imagePath.NOTIFICATION}
              />
            </View>
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                padding: 10,
                marginHorizontal: horizontalScale(10),
              }}>
              <Text
                style={{
                  color: Colors.BLACK,
                  fontSize: responsiveFontSize(1.6),
                  fontFamily: FontFamily.POPPINS_MEDIUM,
                }}>
                {PageName}
              </Text>
              <Text
                style={{
                  color: Colors.BLUE,
                  fontSize: responsiveFontSize(1.6),
                  fontFamily: FontFamily.POPPINS_REGULAR,
                }}>
                APP ID : {ref_id ? ref_id : '--'}
              </Text>
            </View>
            <View
              style={{backgroundColor: Colors.WHITE, justifyContent: 'center'}}>
              <View
                style={{
                  borderTopLeftRadius: responsiveWidth(5),
                  borderTopRightRadius: responsiveWidth(5),
                  borderColor: Colors.CARD_GREY,
                  borderWidth: 0.5,
                  marginHorizontal: responsiveWidth(4),
                  paddingBottom: responsiveHeight(3),
                  backgroundColor: Colors.WHITE,
                }}>
                <View
                  style={{
                    backgroundColor: Colors.CARD_GREY,
                    height: verticalScale(35),
                    justifyContent: 'center',
                    borderTopLeftRadius: moderateScale(5),
                    borderTopRightRadius: moderateScale(5),
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontFamily: FontFamily.POPPINS_SEMIBOLD,
                      fontSize: responsiveFontSize(1.2),
                      color: Colors.BLACK,
                    }}>
                    Enter Base Price
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginHorizontal: responsiveWidth(6),
                    marginTop: responsiveHeight(2),
                    paddingVertical: responsiveHeight(3),
                    borderTopLeftRadius: moderateScale(5),
                    borderTopRightRadius: moderateScale(5),
                  }}>
                  <Text
                    style={{
                      color: Colors.BLACK,
                      fontWeight: 'bold',
                      marginStart: responsiveWidth(4),
                    }}>
                    Base Price
                  </Text>
                  <TextInput
                    style={{
                      color: Colors.BLACK,
                      fontWeight: 'bold',
                      borderWidth: 2,
                      borderColor: Colors.CARD_GREY,
                      marginStart: responsiveWidth(2),
                      width: responsiveWidth(60),
                      height: 40,
                    }}
                    keyboardType={'number-pad'}
                    value={basePrice}
                    onChangeText={text => {
                      setBasePrice(text);
                    }}
                    placeholder={'Please Enter Price'}
                  />
                </View>
                <View
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Button
                    // loading={loadingBasePrice}
                    disabled={!basePrice && loadingBasePrice}
                    style={{backgroundColor: Colors.BLUE, width: '40%'}}
                    mode="contained"
                    onPress={() => handelOnPress()}>
                    Save
                  </Button>
                </View>
              </View>
              {/* ====================Input Filed Above==================== */}
              {/* ===================Render Item List====================== */}

              {appointmentQuestionsList?.map(item => (
                <>
                  <View
                    style={{
                      borderColor: Colors.CARD_GREY,
                      borderWidth: 1,
                      marginHorizontal: responsiveWidth(4),
                      marginVertical: responsiveHeight(1.5),
                      borderTopLeftRadius: responsiveWidth(2),
                      borderTopRightRadius: responsiveWidth(2),
                    }}>
                    <View
                      style={{
                        backgroundColor: Colors.CARD_GREY,
                        borderTopLeftRadius: responsiveWidth(2),
                        borderTopRightRadius: responsiveWidth(2),
                        height: verticalScale(35),
                        justifyContent: 'center',
                        borderColor: Colors.CARD_GREY,
                        borderWidth: 1,
                      }}>
                      <Text
                        style={{
                          fontSize: responsiveFontSize(1.2),
                          fontFamily: FontFamily.POPPINS_SEMIBOLD,
                          textAlign: 'center',
                          color: Colors.BLACK,
                        }}>
                        {item?.content}
                      </Text>
                    </View>
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingVertical: verticalScale(34),
                        marginHorizontal: responsiveWidth(6),
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <Image
                          source={imagePath.UPLOAD}
                          style={{
                            width: horizontalScale(30),
                            height: verticalScale(30),

                            marginHorizontal: horizontalScale(18),
                          }}
                        />
                        {renderPreview(item.id)}
                      </View>
                      <View
                        style={{
                          marginTop: verticalScale(10),
                          paddingVertical: verticalScale(10),
                        }}>
                        <Text
                          style={{
                            color: Colors.DARK_GREY,
                            fontSize: moderateScale(10),
                          }}>
                          DRAG & DROP OR BROWSE TO CHOOSE A FILE
                        </Text>
                      </View>
                      <View style={{marginTop: verticalScale(18)}}>
                        <TouchableOpacity
                          onPress={() => showModal(item.id)}
                          style={{
                            backgroundColor: Colors.BLUE,
                            width: horizontalScale(130),
                            height: verticalScale(32),
                            borderRadius: moderateScale(5),
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Text style={{color: Colors.WHITE}}>
                            {isAlreadyUploaded(item.id)
                              ? 'Re-Upload'
                              : 'Upload'}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </>
              ))}
            </View>
          </View>
          {/* =====================Submit Button======================= */}
          {apptUplodedDocuments?.length === 5 &&
            (base_price || isBasePriceUpdated) && (
              <View style={styles.bottomView}>
                <TouchableOpacity
                  onPress={() => onhandleComplete()}
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: Colors.BLUE,
                    height: responsiveHeight(5),
                  }}>
                  <Text
                    style={{
                      fontSize: responsiveFontSize(1.4),
                      fontFamily: FontFamily.POPPINS_MEDIUM,
                      color: Colors.WHITE,
                    }}>
                    Assessment Complete
                  </Text>
                </TouchableOpacity>
              </View>
            )}
        </ScrollView>
      </SafeAreaView>

      <UploadModel
        visible={modalVisible}
        onCancel={hideModal}
        question={currentDocId}
        camera={'Open Camera'}
        imgCamera={imagePath.CAMERA}
        imgGallery={imagePath.GALLERY}
        gallery={'Choose from gallery'}
        appointmentId={id}
        navigation={navigation}
      />

      <Modal
        onDismiss={() => {
          setPreviewImage(null);
          setPreview(false);
        }}
        visible={preview}
        contentContainerStyle={{
          backgroundColor: 'white',
          padding: 0,
          flex: 1,
          // marginTop: -30,
        }}
        animationType="slide">
        <View
          style={{
            marginVertical: verticalScale(25),
          }}>
          <IconButton
            icon={'close'}
            style={{alignSelf: 'flex-end'}}
            onPress={() => {
              setPreviewImage(null);
              setPreview(false);
            }}
          />
          <Image
            source={{uri: previewImage || ''}}
            style={{
              resizeMode: 'contain',
              width: '100%',
              height: '100%',
              // justifyContent: 'center',
              // alignContent: 'center',
              // alignSelf: 'center',
            }}
          />
        </View>
      </Modal>
    </>
  );
};

export default UploadPhotos;

// <TouchableOpacity
//                     onPress={handelOnPress}
//                     style={{
//                       marginTop: responsiveHeight(3),
//                       justifyContent: 'center',
//                       backgroundColor: Colors.BLUE,
//                       width: '40%',
//                       justifyContent: 'center',
//                       padding: 6,
//                       borderRadius: responsiveWidth(1),
//                       alignItems: 'center',
//                     }}>
//                     <Text
//                       style={{
//                         fontFamily: FontFamily.POPPINS_REGULAR,
//                         fontSize: responsiveFontSize(1.6),
//                         color: Colors.WHITE,
//                       }}>
//                       Save
//                     </Text>
//                   </TouchableOpacity>
