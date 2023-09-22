import React, {useRef, useState} from 'react';
import {View, ScrollView, Image, Text, TouchableOpacity} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import OTPInputView from '@twotalltotems/react-native-otp-input';

import styles from '../../pages/verification/styles';
import TextAtom from '../../components/atoms/TextAtom/TextAtom';
import OtpAtom from '../../components/atoms/Otp/OtpAtom';
import {CommonActions, useNavigation} from '@react-navigation/native';
import ButtonAtom from '../../components/atoms/Button/ButtonAtom';
import navigationPath from '../../constants/navigationPath';
import imagePath from '../../constants/imagePath';
import Colors from '../../styles/colors';
const OtpVerification = ({route}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [show, setShow] = useState(false);

  const navigation = useNavigation();
  const number = route?.params;

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{flex: 6}}>
        <View style={{flex: 1}}>
          <View style={{flex: 3}}>
            <View style={{marginTop: responsiveHeight(2)}}>
              <View style={styles.innerContainer}>
                <View style={styles.box}>
                  <View style={{marginTop: responsiveHeight(2)}}>
                    {show && (
                      <TextAtom
                        style={styles.otpVerifyTitle}
                        title="OTP Verification"
                      />
                    )}
                  </View>
                  <OtpAtom
                    titleOtp="Enter the OTP you received on"
                    titleMobile="+31 858585 **** ***"
                  />
                  <OTPInputView
                    style={{
                      marginHorizontal: responsiveWidth(1),
                      alignItems: 'center',
                      width: 30,
                      top: 30,
                      height: 20,
                      borderRadius: responsiveWidth(2),
                      backgroundColor: Colors.GREY,
                    }}
                    pinCount={6}
                    // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                    // onCodeChanged = {code => { this.setState({code})}}
                    autoFocusOnLoad
                    codeInputFieldStyle={styles.underlineStyleBase}
                    codeInputHighlightStyle={styles.underlineStyleHighLighted}
                  />

                  <TextAtom style={styles.otpResend} title="Resend OTP" />
                  <View
                    style={{
                      width: '100%',
                      marginTop: responsiveHeight(9),
                      top: 12,
                      marginStart: responsiveWidth(3),
                    }}>
                    <ButtonAtom title={'Verify OTP'} />
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
      </View>
    </ScrollView>
  );
};

export default OtpVerification;
