import React, {useEffect, useRef, useState} from 'react';
import {View, Image, Text, SafeAreaView, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import ButtonAtom from '../../../../components/atoms/Button/ButtonAtom';
import imagePath from '../../../../constants/imagePath';
import TextAtom from '../../../../components/atoms/TextAtom/TextAtom';
import Colors from '../../../../styles/colors';
import {useDispatch, useSelector} from 'react-redux';
import * as yup from 'yup';
import styles from './styles';
import navigationPath from '../../../../constants/navigationPath';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import FontFamily from '../../../../constants/FontFamily';
import {loginAsync, registerOtpAsync} from '../../../../../redux/asyncThunk';
import {Formik} from 'formik';
import Header from '../../../../components/atoms/Header/Header';

const SignUpOtpVerification = props => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {mobile_number, email} = props.route.params;

  // const {role_type, mobile_number} = props.route.params;
  // const initialValue = {
  //   otp: null,
  // };
  // const [value, setValue] = useState(initialValue);
  // useEffect(() => {
  //   if (!role_type || !mobile_number) {
  //     navigation.goBack();
  //   }
  // }, [role_type, mobile_number]);
  // const onSubmitHandler = () => {
  //   let payload = {mobile_number, role_type, otp: value.otp};
  //   dispatch(loginAsync(payload))
  //     .unwrap()
  //     .then(res => {
  //       Toast.show({
  //         type: 'success',
  //         text1: 'Welcome',
  //         text2: 'Sign in Successfully',
  //       });
  //     })
  //     .catch(err => {
  //       Toast.show({
  //         type: 'error',
  //         text1: 'Error',
  //         text2: err.error.message,
  //       });
  //     });
  // };
  // const handleChange = code => {
  //   setValue({...initialValue, otp: code});
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
          <View style={[styles.innerContainer]}>
            <View style={[styles.box, styles.shadowProp]}>
              <Formik
                initialValues={{
                  email: email,
                  mobile_number: mobile_number,
                  email_otp: '',
                  mobile_otp: '',
                }}
                onSubmit={values => {
                  dispatch(registerOtpAsync(values))
                    .unwrap()
                    .then(originalPromiseResult => {
                      if (originalPromiseResult.status) {
                        Toast.show({
                          topOffset: 60,
                          position: 'top',
                          type: 'success',
                          text1: 'OTP send successfully',
                        });

                        setTimeout(() => {
                          navigation.navigate(navigationPath.LOGIN);
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
                        marginTop: responsiveHeight(20),
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: responsiveWidth(80),
                      }}>
                      <View
                        style={{
                          width: '80%',
                          bottom: responsiveHeight(20),
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            fontFamily: FontFamily.POPPINS_SEMIBOLD,
                            fontSize: responsiveFontSize(2),
                            color: Colors.BLACK,
                          }}>
                          OTP Verification
                        </Text>
                        <Text
                          style={{
                            fontFamily: FontFamily.POPPINS_SEMIBOLD,
                            fontSize: responsiveFontSize(1.4),
                            color: Colors.BLACK,
                          }}>
                          For mobile
                        </Text>
                      </View>
                      <View
                        style={{
                          width: '80%',
                          bottom: responsiveHeight(18),
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            fontFamily: FontFamily.POPPINS_SEMIBOLD,
                            fontSize: responsiveFontSize(2),
                            color: Colors.BLACK,
                          }}>
                          Enter the OTP you received on
                        </Text>
                        <View style={{width: '87%'}}>
                          <Text
                            style={{
                              fontFamily: FontFamily.POPPINS_SEMIBOLD,
                              fontSize: responsiveFontSize(1.2),
                              color: Colors.BLUE,
                            }}>
                            {mobile_number}
                          </Text>
                        </View>
                        <View
                          style={{
                            width: '90%',
                            height: 60,
                            alignItems: 'center',
                          }}>
                          <OTPInputView
                            style={{
                              alignItems: 'center',
                              width: '100%',
                              height: 30,
                              top: responsiveHeight(4),
                            }}
                            pinCount={4}
                            code={values.mobile_otp}
                            onCodeChanged={code =>
                              setFieldValue('mobile_otp', code)
                            }
                            autoFocusOnLoad
                            codeInputFieldStyle={styles.underlineStyleBase}
                            codeInputHighlightStyle={
                              styles.underlineStyleHighLighted
                            }
                            onCodeFilled={code => {}}
                          />
                        </View>
                      </View>

                      <View
                        style={{
                          width: '100%',
                          bottom: responsiveHeight(12),
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            fontFamily: FontFamily.POPPINS_SEMIBOLD,
                            fontSize: responsiveFontSize(1.4),
                            color: Colors.BLACK,
                          }}>
                          For E-mail-ID
                        </Text>
                      </View>

                      <View
                        style={{
                          width: '100%',
                          bottom: responsiveHeight(10),
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            fontFamily: FontFamily.POPPINS_SEMIBOLD,
                            fontSize: responsiveFontSize(2),
                            color: Colors.BLACK,
                          }}>
                          Enter the OTP you received on
                        </Text>
                        <View style={{alignItems: 'flex-start', width: '70%'}}>
                          <Text
                            style={{
                              fontFamily: FontFamily.POPPINS_SEMIBOLD,
                              fontSize: responsiveFontSize(1.2),
                              color: Colors.BLUE,
                            }}>
                            {email}
                          </Text>
                        </View>
                        <View
                          style={{
                            width: '72%',
                            height: 60,
                            alignItems: 'center',
                          }}>
                          <OTPInputView
                            style={{
                              alignItems: 'center',
                              width: '100%',
                              height: 30,
                              top: responsiveHeight(4),
                            }}
                            pinCount={4}
                            code={values.email_otp}
                            onCodeChanged={code =>
                              setFieldValue('email_otp', code)
                            }
                            autoFocusOnLoad
                            codeInputFieldStyle={styles.underlineStyleBase}
                            codeInputHighlightStyle={
                              styles.underlineStyleHighLighted
                            }
                            onCodeFilled={code => {}}
                          />
                        </View>
                      </View>
                      <ButtonAtom
                        style={{
                          width: '70%',
                          alignSelf: 'center',
                        }}
                        onPress={() => handleSubmit()}
                        type="submit"
                        title={'Verify OTP'}
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

export default SignUpOtpVerification;
