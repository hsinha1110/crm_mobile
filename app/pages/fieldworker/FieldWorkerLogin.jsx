import React, {useEffect, useRef, useState} from 'react';
import {View, Image, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import ButtonAtom from '../../components/atoms/Button/ButtonAtom';
import imagePath from '../../constants/imagePath';
import TextAtom from '../../components/atoms/TextAtom/TextAtom';
import {useDispatch} from 'react-redux';
import * as yup from 'yup';
import styles from './styles';
import PhoneInput from 'react-native-phone-number-input';
import navigationPath from '../../constants/navigationPath';

const FieldWorkerLogin = () => {
  const [show, setShow] = useState(false);
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const phoneInput = useRef(null);

  const r = yup.object().shape({
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
    <View style={styles.container}>
      <View style={{flex: 0.8, justifyContent: 'center'}}>
        <View style={styles.innerContainer}>
          <View style={[styles.box, styles.shadowProp]}>
            <Text
              style={{
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 18,
                marginVertical: responsiveHeight(3),
              }}>
              Login
            </Text>
            <Text
              style={{
                textAlign: 'left',
                width: '85%',
                fontSize: 14,
                marginBottom: 5,
              }}>
              Mobile Number
            </Text>
            <PhoneInput
              ref={phoneInput}
              // defaultValue={phoneNumber}
              defaultCode="IN"
              layout="first"
              withShadow
              autoFocus
              containerStyle={styles.phoneNumberView}
              textContainerStyle={{padding: 0}}
              
            />
            <TextAtom
              style={styles.otpTitle}
              title="A 4 digit OTP will be sent via SMS TO verify your number"
            />
            <ButtonAtom
              // onPress={handleSubmit}
              // disabled={!isValid}
              onPress={() =>
                navigation.navigate(navigationPath.OTP_VERIFICATION)
              }
              style={{
                width: responsiveWidth(60),
                marginVertical: responsiveHeight(2),
              }}
              title={'Send Otp'}
            />
          </View>
        </View>
      </View>
      <View
        style={{
          flex: 0.1,
          justifyContent: 'flex-start',
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
  );
};

export default FieldWorkerLogin;
