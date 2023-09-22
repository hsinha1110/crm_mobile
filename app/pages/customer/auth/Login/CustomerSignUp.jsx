import React, {useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Image,
  Text,
  ScrollView,
  Button,
  SafeAreaView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
// import { save } from "../../../storage/storage";
// import { useDispatch } from "react-redux";
// import { userLoginAsync } from "../../../redux/asyncThunk";
// import { Formik, Field } from "formik";
import Toast from 'react-native-toast-message';

import styles from './styles';
import PhoneInput from 'react-native-phone-number-input';
import DropShadow from 'react-native-drop-shadow';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import ButtonAtom from '../../../../components/atoms/Button/ButtonAtom';
import imagePath from '../../../../constants/imagePath';
import TextAtom from '../../../../components/atoms/TextAtom/TextAtom';
import navigationPath from '../../../../constants/navigationPath';
import Colors from '../../../../styles/colors';
import {useDispatch} from 'react-redux';
import {Formik, useFormik} from 'formik';
import * as yup from 'yup';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {registerAsync} from '../../../../../redux/asyncThunk';
import OtpAtom from '../../../../components/atoms/Otp/OtpAtom';
import TextInputField from '../../../../components/atoms/TextInput/TextInputField';
import FontFamily from '../../../../constants/FontFamily';
import Header from '../../../../components/atoms/Header/Header';
const CustomerSignUp = () => {
  const [show, setShow] = useState(false);
  const phoneInput = useRef(null);
  const navigation = useNavigation();

  const dispatch = useDispatch();

  // const loginValidationSchema = yup.object().shape({
  //   phoneNumber: yup
  //     .string()
  //     .matches(/(\d){8}\b/, 'Enter a valid phone number')
  //     .required('Phone number is required'),
  //   email: yup
  //     .string()
  //     .email('Please enter valid email')
  //     .required('Email is required'),
  // });

  const handleToggle = () => {
    setShow(true);
  };
  const handleChange = e => {
    setValue({...initialValue, mobile_number: e});
  };
  const submitHandler = () => {
    // dispatch(sendOtpAsync(value));
    navigation.navigate(navigationPath.SIGNUP_OTP_VERIFICATION);
  };
  // const handleOtpInput = e => {
  // };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: Colors.BLUE,
      }}
      behavior="height"
      enabled
      keyboardVerticalOffset={100}>
      <ScrollView>
        <View style={{height: 40, backgroundColor: Colors.WHITE}}>
          <Header image={imagePath.LEFT} onPress={() => navigation.goBack()} />
        </View>
        <View style={[styles.container]}>
          <View style={styles.innerContainer}>
            <View style={[styles.box]}>
              <Formik
                initialValues={{
                  email: '',
                  mobile_number: '',
                  name: '',
                }}
                onSubmit={values => {
                  dispatch(registerAsync(values))
                    .unwrap()
                    .then(originalPromiseResult => {
                      console.log('origial', originalPromiseResult);
                      if (originalPromiseResult.status) {
                        Toast.show({
                          topOffset: 60,
                          position: 'top',
                          type: 'success',
                          text1: 'OTP send successfully',
                        });

                        setTimeout(() => {
                          navigation.navigate(
                            navigationPath.SIGNUP_OTP_VERIFICATION,
                            {
                              email: values.email,
                              mobile_number: values.mobile_number,
                            },
                          );
                        }, 500);
                      }
                    })
                    .catch(err => {
                      console.log('error', err);
                      Toast.show({
                        topOffset: 60,
                        position: 'top',
                        type: 'error',
                        text1: err.error.message,
                      });
                    });
                }}>
                {({
                  values,
                  handleChange,
                  errors,
                  setFieldTouched,
                  touched,
                  isValid,
                  setFieldValue,
                  handleSubmit,
                }) => (
                  <>
                    <View
                      style={{
                        // marginVertical: responsiveHeight(2),

                        width: responsiveWidth(70),
                      }}>
                      <TextAtom style={[styles.loginTitle]} title="Sign Up" />
                      <View style={{marginTop: responsiveHeight(4)}}>
                        <View style={{bottom: responsiveHeight(11)}}>
                          {!show && (
                            <View
                              style={{
                                height: responsiveHeight(5),
                                justifyContent: 'space-between',
                              }}>
                              <Text
                                style={{
                                  fontSize: responsiveFontSize(1.4),
                                  color: Colors.BLACK,
                                  fontFamily: FontFamily.POPPINS_REGULAR,
                                }}>
                                Name
                              </Text>
                              <TextInput
                                style={{
                                  width: '100%',
                                  borderBottomColor: Colors.CARD_GREY,
                                  borderBottomWidth: 1,
                                  backgroundColor: Colors.WHITE,
                                }}
                                // placeholder="Name"
                                value={values.name}
                                onChangeText={text => {
                                  setFieldValue('name', text);
                                }}
                              />
                            </View>
                          )}
                        </View>
                      </View>
                      <View style={{marginTop: responsiveHeight(4)}}>
                        <View style={{bottom: responsiveHeight(11)}}>
                          {!show && (
                            <View
                              style={{
                                height: responsiveHeight(5),
                                justifyContent: 'space-between',
                              }}>
                              <Text
                                style={{
                                  fontSize: responsiveFontSize(1.4),
                                  color: Colors.BLACK,
                                  fontFamily: FontFamily.POPPINS_REGULAR,
                                }}>
                                Email
                              </Text>
                              <TextInput
                                style={{
                                  width: '100%',
                                  borderBottomColor: Colors.CARD_GREY,
                                  borderBottomWidth: 1,
                                  backgroundColor: Colors.WHITE,
                                }}
                                // placeholder="Email"
                                value={values.email}
                                onChangeText={text => {
                                  setFieldValue('email', text);
                                }}
                              />
                            </View>
                          )}
                        </View>
                      </View>
                      <View style={{marginTop: responsiveHeight(4)}}>
                        <View style={{bottom: responsiveHeight(11)}}>
                          {
                            !show && (
                              <View
                                style={{
                                  height: responsiveHeight(5),
                                  justifyContent: 'space-between',
                                }}>
                                <Text
                                  style={{
                                    fontSize: responsiveFontSize(1.4),
                                    color: Colors.BLACK,
                                    fontFamily: FontFamily.POPPINS_REGULAR,
                                  }}>
                                  Mobile
                                </Text>
                                <TextInput
                                  style={{
                                    width: '100%',
                                    borderBottomColor: Colors.CARD_GREY,
                                    borderBottomWidth: 1,
                                    backgroundColor: Colors.WHITE,
                                  }}
                                  // placeholder="Mobile"
                                  value={values.mobile_number}
                                  onChangeText={text => {
                                    setFieldValue('mobile_number', text);
                                  }}
                                />
                              </View>
                            )

                            //<TextInputField label="Mobile" value={values.mobile_number} onChangeText={()=>handleChange('mobile_number')}/>
                          }
                        </View>
                      </View>

                      <ButtonAtom
                        onPress={() => handleSubmit()}
                        style={{
                          width: '70%',
                          alignSelf: 'center',
                        }}
                        title={'Register'}
                      />
                    </View>
                  </>
                )}
              </Formik>
            </View>
          </View>
          <View style={styles.logoContainer}>
            <Image
              style={styles.logo}
              source={imagePath.LOGO}
              resizeMode={'contain'}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CustomerSignUp;
