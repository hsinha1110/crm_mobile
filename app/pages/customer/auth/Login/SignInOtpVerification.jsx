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
import {loginAsync} from '../../../../../redux/asyncThunk';

const SignInOtpVerification = props => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {role_type, mobile_number} = props.route.params;
  const initialValue = {
    otp: null,
  };
  const [value, setValue] = useState(initialValue);
  useEffect(() => {
    if (!role_type || !mobile_number) {
      navigation.goBack();
    }
  }, [role_type, mobile_number]);
  const onSubmitHandler = () => {
    let payload = {mobile_number, role_type, otp: value.otp};
    dispatch(loginAsync(payload))
      .unwrap()
      .then(res => {
        Toast.show({
          type: 'success',
          text1: 'Welcome',
          text2: 'Sign in Successfully',
        });
      })
      .catch(err => {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: err.error.message,
        });
      });
  };
  const handleChange = code => {
    setValue({...initialValue, otp: code});
  };
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
        <View style={[styles.container]}>
          <View style={[styles.innerContainer]}>
            <View style={[styles.box, styles.shadowProp]}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: responsiveFontSize(1.8),
                  fontFamily: FontFamily.POPPINS_SEMIBOLD,
                  color: Colors.BLACK,
                }}>
                OTP Verification
              </Text>
              <View style={{width: '90%'}}>
                <Text
                  style={{
                    fontSize: responsiveFontSize(1.4),
                    fontFamily: FontFamily.POPPINS_REGULAR,
                    color: Colors.BLACK,
                    marginTop: responsiveHeight(3),
                  }}>
                  Enter the OTP you received on
                </Text>
                <Text
                  style={{
                    fontSize: responsiveFontSize(1.2),
                    fontFamily: FontFamily.POPPINS_REGULAR,
                    marginBottom: 5,
                    textAlign: 'left',
                    color: Colors.BLUE,
                  }}>
                  {mobile_number}
                </Text>
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignContent: 'center',
                  alignSelf: 'center',
                  width: '80%',
                }}>
                <OTPInputView
                  pinCount={4}
                  style={{height: 80, width: '100%'}}
                  autoFocusOnLoad
                  keyboardType="number-pad"
                  codeInputFieldStyle={[styles.underlineStyleBase]}
                  codeInputHighlightStyle={[styles.underlineStyleHighLighted]}
                  onCodeFilled={code => {
                    handleChange(code);
                  }}
                />
              </View>
              <View
                style={{
                  width: '90%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View style={{bottom: responsiveHeight(1)}}>
                  <TextAtom
                    onPress={() => navigation.navigate(navigationPath.LOGIN)}
                    style={styles.otpTitle}
                    title={`Resend OTP`}
                  />
                </View>
              </View>
              <View
                style={{
                  bottom: responsiveHeight(2),
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <ButtonAtom
                  // onPress={handleSubmit}
                  // disabled={!isValid}
                  onPress={() => onSubmitHandler()}
                  style={{
                    width: '70%',
                  }}
                  title={'Verify OTP'}
                />
              </View>
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

export default SignInOtpVerification;
