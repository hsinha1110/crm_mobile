import {View, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import React from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import FontFamily from '../../../../constants/FontFamily';
import Colors from '../../../../styles/colors';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import styles from './styles';
import imagePath from '../../../../constants/imagePath';
import navigationPath from '../../../../constants/navigationPath';
import {useNavigation} from '@react-navigation/native';

const OtpVerificationEmail = () => {
  const navigation = useNavigation();

  const handleOtpVerification = () => {
    navigation.navigate(navigationPath.JOB_DETAILS);
  };

  return (
    <View style={{flex: 1, backgroundColor: Colors.WHITE}}>
    <ScrollView>
    <View style={styles.body}>
    <View
        style={{
          flex: 0.8,
          backgroundColor: Colors.WHITE,
          marginHorizontal: responsiveWidth(4),
        }}>
        <View
          style={{
            marginTop: responsiveHeight(8),
          }}>
          <View
            style={{
              borderColor: Colors.BLUE,
              borderWidth: 0.5,
              height: responsiveHeight(65),
              marginHorizontal: responsiveWidth(3),
            }}>
            <View
              style={{
                marginTop: responsiveHeight(10),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontFamily: FontFamily.POPPINS_SEMIBOLD,
                  fontSize: responsiveFontSize(2),
                  color: Colors.BLACK,
                  marginTop: responsiveHeight(11),
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

              <View
                style={{
                  marginBottom: responsiveHeight(20),
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginHorizontal: responsiveWidth(8),
                }}>
                <Text
                  style={{
                    fontFamily: FontFamily.POPPINS_SEMIBOLD,
                    fontSize: responsiveFontSize(1.6),
                    color: Colors.BLACK,
                    marginStart: responsiveWidth(4),
                    alignSelf: 'flex-start',
                    marginTop: responsiveHeight(20),
                  }}>
                  Enter the OTP you received
                </Text>
                <Text
                  style={{
                    fontFamily: FontFamily.POPPINS_SEMIBOLD,
                    fontSize: responsiveFontSize(1.4),
                    color: Colors.BLUE,
                    marginStart: responsiveWidth(4),
                    alignSelf: 'flex-start',
                  }}>
                  +31 8585 **** ***
                </Text>
                <View>
                  <OTPInputView
                    style={{
                      alignItems: 'center',
                      width: '80%',
                      height: 30,
                      top: responsiveHeight(2),
                    }}
                    pinCount={4}
                    // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                    //   onCodeChanged={handleChange('otp')}
                    autoFocusOnLoad
                    codeInputFieldStyle={styles.underlineStyleBase}
                    codeInputHighlightStyle={styles.underlineStyleHighLighted}
                    onCodeFilled={code => {}}
                  />
                </View>
                <View style={{marginTop: responsiveHeight(4)}}>
                  <Text
                    style={{
                      fontSize: responsiveFontSize(1),
                      color: Colors.NAVY_BLUE,
                    }}>
                    Resend OTP
                  </Text>
                </View>
                <View
                  style={{
                    justifyContent: 'center',
                    marginTop: responsiveHeight(4),
                  }}>
                  <Text
                    style={{
                      fontFamily: FontFamily.POPPINS_SEMIBOLD,
                      fontSize: responsiveFontSize(2),
                      color: Colors.BLACK,
                      alignSelf: 'center',
                    }}>
                    For E-mail-ID
                  </Text>
                  <View style={{marginHorizontal: responsiveWidth(4)}}>
                    <Text
                      style={{
                        fontFamily: FontFamily.POPPINS_SEMIBOLD,
                        fontSize: responsiveFontSize(1.6),
                        color: Colors.BLACK,
                        marginTop: responsiveHeight(2),
                      }}>
                      Enter the OTP you received
                    </Text>
                    <Text
                      style={{
                        fontFamily: FontFamily.POPPINS_SEMIBOLD,
                        fontSize: responsiveFontSize(1.4),
                        color: Colors.BLUE,
                        alignSelf: 'flex-start',
                      }}>
                      asonfer@gmail.com
                    </Text>
                  </View>
                  <View>
                    <OTPInputView
                      style={{
                        alignItems: 'center',
                        width: '80%',
                        height: 30,
                        margin: 10,
                        top: responsiveHeight(2),
                      }}
                      pinCount={4}
                      // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                      //   onCodeChanged={handleChange('otp')}
                      autoFocusOnLoad
                      containerStyle={styles.phoneNumberView}
                      codeInputFieldStyle={styles.underlineStyleBase}
                      codeInputHighlightStyle={styles.underlineStyleHighLighted}
                      onCodeFilled={code => {}}
                    />
                  </View>
                  <View>
                    <Text
                      style={{
                        fontSize: responsiveFontSize(1),
                        fontFamily: FontFamily.POPPINS_REGULAR,
                        color: Colors.NAVY_BLUE,
                        alignSelf: 'center',
                        marginTop: responsiveHeight(4.5),
                      }}>
                      Resend OTP
                    </Text>
                  </View>
                  <View
                    style={{
                      marginTop: responsiveHeight(1),
                      justifyContent: 'center',
                      alignItems: 'center',
                      flex: 1,
                      marginBottom: responsiveHeight(38),
                    }}>
                    <TouchableOpacity
                      onPress={() => handleOtpVerification()}
                      style={{
                        width: '70%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: responsiveHeight(5),
                        backgroundColor: Colors.BLUE,
                        borderRadius: responsiveWidth(1),
                      }}>
                      <Text
                        style={{
                          fontSize: responsiveFontSize(1.6),
                          fontFamily: FontFamily.POPPINS_REGULAR,
                          color: Colors.WHITE,
                        }}>
                        Verify OTP
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
      </View>
     
      </ScrollView>
      <View style={styles.footer}>
      <View
       style={{
          justifyContent: 'flex-start',
          marginBottom:responsiveHeight(20),
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
     
  );
};

export default OtpVerificationEmail;
