import React, {useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Image,
  Text,
  ScrollView,
  Button,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
// import { save } from "../../../storage/storage";
// import { useDispatch } from "react-redux";
// import { userLoginAsync } from "../../../redux/asyncThunk";
// import { Formik, Field } from "formik";
import Toast from 'react-native-toast-message';

import styles from '../../auth/login/styles';
import PhoneInput from 'react-native-phone-number-input';
import DropShadow from 'react-native-drop-shadow';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import ButtonAtom from '../../../components/atoms/Button/ButtonAtom';
import imagePath from '../../../constants/imagePath';
import TextAtom from '../../../components/atoms/TextAtom/TextAtom';
import navigationPath from '../../../constants/navigationPath';
import Colors from '../../../styles/colors';
import {useDispatch} from 'react-redux';
import {Formik, useFormik} from 'formik';
import * as yup from 'yup';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {userLoginAsync} from '../../../../redux/asyncThunk';
import OtpAtom from '../../../components/atoms/Otp/OtpAtom';
const Login = () => {
  // const [mobileNumber, setMobileNumber] = useState('');
  // const [emailId, setEmailId] = useState('');
  const [show, setShow] = useState(false);
  const phoneInput = useRef(null);
  const navigation = useNavigation();

  // const [userEmail, setuserEmail] = useState("");
  // const [userpassword, setuserPassword] = useState("");
  // const [form, setForm] = useState("");
  // const [form, setForm] = useState({
  //   userEmail: "",
  //   userpassword: "",
  // });
  // const handleTextInput = (value) => {
  //   setForm(value);
  // };
  const dispatch = useDispatch();

  // storeToken = async () => {
  //   const data = await save('userToken', 'mqcogncise');
  // };

  const handleSignIn = () => {
    // dispatch(userLoginAsync(data))
    //   .unwrap()
    //   .then(originalPromiseResult => {
    //     if (originalPromiseResult.status) {
    //       form;
    setShow(true);

    //     }
    //   })
    //   .catch(rejectedValueOrSerializedError => {
    //     // handle error here
    // });
  };

  // const loginValidationSchema = yup.object().shape({
  //   email: yup
  //     .string()
  //     .email("Please enter valid email")
  //     .required("Email Address is Required"),
  //   password: yup
  //     .string()
  //     .min(8, ({ min }) => `Password must be at least ${min} characters`)
  //     .required("Password is required"),
  // });
  //   <Formik
  //   initialValues={{
  //     email: "companyadmin0@crm.com",
  //     password: "Test4321",
  //   }}
  //   validationSchema={loginValidationSchema}
  //   onSubmit={(values) => {
  //     handleSignIn(values);
  //   }}
  // >
  //   {({ handleChange, handleBlur, handleSubmit, values }) => (
  //     <View>
  //       <Field
  //         component={InputField}
  //         name="email"
  //         placeholder="Enter email "
  //         placeholderTextColor={"#fff"}
  //         errors={""}
  //       />
  //       <Field
  //         component={InputField}
  //         name="password"
  //         placeholder="Password"
  //         placeholderTextColor={"#fff"}
  //         errors={""}
  //       />
  //       <ButtonAtom title={"LOGIN"} onPress={handleSubmit} />
  //     </View>
  //   )}
  // </Formik>
  //   <View style={styles.box}>
  //   <View style={styles.body}>
  //     <View style={styles.innerContainer}>
  //       <View style={{ marginTop: responsiveHeight(2), width: "100%" }}>
  //         <TextAtom style={styles.mobileTitle} title="Mobile Number" />

  //         <PhoneInput
  //           ref={phoneInput}
  //           defaultValue={phoneNumber}
  //           defaultCode="IN"
  //           layout="first"
  //           withShadow
  //           autoFocus
  //           containerStyle={styles.phoneNumberView}
  //           textContainerStyle={{ paddingVertical: 0 }}
  //           onChangeFormattedText={(text) => {
  //             setPhoneNumber(text);
  //           }}
  //         />
  //       </View>

  //       <View style={styles.buttonStyle}>
  //         <ButtonAtom title="Send OTP" />
  //       </View>
  //     </View>
  //   </View>
  // </View>
  // <View style={styles.foot}>
  // <View style={styles.outerContainer}>
  // <View style={styles.logoContainer}>
  //  <Image
  //    style={styles.logo}
  //    source={imagePath.LOGO_2X}
  //    resizeMode={"center"}
  //  />
  // </View>
  // </View>
  // </View>
  const loginValidationSchema = yup.object().shape({
    phoneNumber: yup
      .string()
      .matches(/(\d){8}\b/, 'Enter a valid phone number')
      .required('Phone number is required'),
    email: yup
      .string()
      .email('Please enter valid email')
      .required('Email is required'),
  });

  const handleToggle = () => {
    setShow(true);
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{flex: 1, backgroundColor: Colors.WHITE}}>
      <View style={styles.container}>
        <View style={{flex: 6}}>
          <View style={{flex: 1}}>
            <View style={{flex: 3}}>
              <View style={{marginTop: responsiveHeight(2)}}>
                <View style={styles.innerContainer}>
                  <View style={[styles.box, styles.shadowProp]}>
                    <View
                      style={{
                        marginHorizontal: responsiveWidth(3),
                      }}>
                      <Formik
                        initialValues={{
                          mobile_number: '',
                          otp: '',
                          role_type: '',
                        }}
                        onSubmit={values => {
                          dispatch(userLoginAsync(values))
                            .unwrap()
                            .then(originalPromiseResult => {
                              if (originalPromiseResult.status) {
                                Toast.show({
                                  topOffset: 60,
                                  position: 'top',
                                  type: 'success',
                                  text1: 'Hiii',
                                });

                                setTimeout(() => {
                                  navigation.navigate(navigationPath.DASHBOARD);
                                }, 500);
                              }
                            })
                            .catch(rejectedValueOrSerializedError => {});
                        }}>
                        {({
                          values,
                          handleChange,
                          errors,
                          setFieldTouched,
                          touched,
                          isValid,
                          handleSubmit,
                        }) => (
                          <View>
                            <View>
                              <View
                                style={{
                                  marginTop: responsiveHeight(20),
                                }}></View>
                              {!show && (
                                <TextAtom
                                  style={[
                                    styles.loginTitle,
                                    {marginTop: responsiveHeight(20)},
                                  ]}
                                  title="Login"
                                />
                              )}
                              <View style={{bottom: responsiveHeight(5)}}>
                                {!show && (
                                  <TextInput
                                    style={{
                                      borderColor: Colors.CARD_GREY,
                                      borderWidth: 1,
                                    }}
                                    value={values.mobile_number}
                                    onChangeText={handleChange('mobile_number')}
                                    onBlur={() =>
                                      setFieldTouched('mobile_number')
                                    }
                                    placeholder="Enter Email here"
                                  />
                                )}
                              </View>
                              <View style={{bottom: responsiveHeight(4)}}>
                                {!show && (
                                  <TextAtom
                                    style={styles.otpTitle}
                                    title="A 4 digit OTP will be sent via SMS TO verify your number"
                                  />
                                )}
                              </View>
                            </View>

                            <View style={{marginTop: responsiveHeight(8)}}>
                              {show && (
                                <TextAtom
                                  style={styles.loginTitle}
                                  title="OTP Verification"
                                />
                              )}
                              <View style={{bottom: responsiveHeight(8)}}>
                                {show && (
                                  <OtpAtom
                                    titleOtp="Enter the OTP you received on"
                                    titleMobile="+31 858585 **** ***"
                                  />
                                )}
                                <View style={{top: responsiveHeight(2)}}>
                                  {!show && (
                                    <ButtonAtom
                                      onPress={() => handleToggle()}
                                      disabled={!isValid}
                                      title={'Send Otp'}
                                    />
                                  )}
                                </View>
                              </View>
                            </View>
                            <View>
                              {show && (
                                <OTPInputView
                                  style={{
                                    marginHorizontal: responsiveWidth(1),
                                    alignItems: 'center',
                                    width: '80%',
                                    height: 20,
                                    bottom: responsiveHeight(6),
                                  }}
                                  pinCount={6}
                                  // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                                  onCodeChanged={handleChange('otp')}
                                  autoFocusOnLoad
                                  codeInputFieldStyle={
                                    styles.underlineStyleBase
                                  }
                                  codeInputHighlightStyle={
                                    styles.underlineStyleHighLighted
                                  }
                                />
                              )}
                            </View>
                            <View
                              style={{
                                marginVertical: responsiveHeight(3),
                                alignItems: 'center',
                              }}>
                              {show && (
                                <TextAtom
                                  style={styles.otpResend}
                                  title="Resend Otp"
                                />
                              )}
                            </View>

                            <View style={{marginBottom: responsiveHeight(30)}}>
                              {show && (
                                <ButtonAtom
                                  onPress={handleSubmit}
                                  disabled={!isValid}
                                  title={'Verify Otp'}
                                />
                              )}
                            </View>
                          </View>
                        )}
                      </Formik>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View
          style={{
            flex: 1,
            height: responsiveHeight(30),
            justifyContent: 'flex-end',
            marginBottom: responsiveHeight(2),
            alignItems: 'center',
          }}>
          <View style={styles.logoContainer}>
            <Image
              style={styles.logo}
              source={imagePath.LOGO}
              resizeMode={'cover'}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Login;
