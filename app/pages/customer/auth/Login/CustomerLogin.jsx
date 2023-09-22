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
import {useDispatch} from 'react-redux';
import * as yup from 'yup';
import styles from './styles';
import navigationPath from '../../../../constants/navigationPath';
import PhoneInput from 'react-native-phone-number-input';
import {sendOtpAsync} from '../../../../../redux/asyncThunk';
import FontFamily from '../../../../constants/FontFamily';
import _ from 'lodash';
const CustomerLogin = props => {
  const phoneInput = useRef(null);
  const {otpType, LoginPerson} = props.route.params;
  const initialValue = {mobile_number: null, otp_type: 1};
  const [value, setValue] = useState(initialValue);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const loginValidationSchema = yup.object().shape({
    phoneNumber: yup
      .string()
      .matches(/(\d){8}\b/, 'Enter a valid phone number')
      .required('Phone number is required'),
  });
  const handleChange = e => {
    setValue({...initialValue, mobile_number: e});
  };
  const submitHandler = () => {
    dispatch(sendOtpAsync(value))
      .unwrap()
      .then(res => {
        Toast.show({
          type: 'success',
          text1: 'Welcome',
          text2: 'Please Enter',
        });
        navigation.navigate(navigationPath.OTP_VERIFICATION, {
          role_type: LoginPerson,
          mobile_number: value.mobile_number,
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
          <View style={styles.innerContainer}>
            <View style={[styles.box]}>
              <Text
                style={{
                  textAlign: 'center',
                  color: Colors.BLACK,
                  fontSize: responsiveFontSize(1.8),
                  fontFamily: FontFamily.POPPINS_SEMIBOLD,
                  marginVertical: responsiveHeight(3),
                  bottom: responsiveHeight(3),
                }}>
                Login
              </Text>
              <View style={{marginTop: responsiveWidth(2), width: '90%'}}>
                <Text
                  style={{
                    color: Colors.BLACK,
                    fontSize: responsiveFontSize(1.4),
                    fontFamily: FontFamily.POPPINS_REGULAR,
                  }}>
                  Mobile Number
                </Text>
              </View>
              <View style={{height: 50, marginTop: responsiveHeight(1)}}>
                <PhoneInput
                  ref={phoneInput}
                  defaultValue={value.mobile_number}
                  defaultCode="AU"
                  layout="first"
                  withShadow
                  autoFocus
                  value={value.mobile_number}
                  containerStyle={styles.phoneNumberView}
                  textContainerStyle={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onChangeFormattedText={text => {
                    handleChange(text);
                  }}
                />
              </View>

              <View style={{width: '90%', marginTop: responsiveHeight(5)}}>
                <TextAtom
                  style={styles.otpTitle}
                  title={`A 4 digit OTP will be sent via SMS TO verify \nyour number`}
                />
              </View>
              <View
                style={{
                  width: '90%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  bottom: 2,
                  marginVertical: responsiveHeight(1),
                }}>
                <ButtonAtom
                  onPress={() => submitHandler()}
                  style={{
                    width: '70%',
                  }}
                  title={'Send OTP'}
                />
              </View>
            </View>
            {LoginPerson === 'customer' && (
              <Text
                onPress={() =>
                  navigation.navigate(navigationPath.CUSTOMER_SIGNUP)
                }
                style={{
                  textAlign: 'center',
                  marginTop: responsiveHeight(3),
                  color: Colors.BLUE,
                }}>
                Sign Up as {_.capitalize(LoginPerson)}
              </Text>
            )}
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

export default CustomerLogin;
