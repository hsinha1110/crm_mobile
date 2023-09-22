import {StyleSheet} from 'react-native';

import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import FontFamily from '../../constants/FontFamily';
import Colors from '../../styles/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.WHITE,
  },
  body: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    backgroundColor: 'orange',
    alignItems: 'center',
  },
  footer: {
    width: '100%',
    height: 100,
    backgroundColor: '#EE5407',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute', //Here is the trick
    bottom: 0,
  },
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    backgroundColor: Colors.WHITE,
    borderColor: Colors.BLUE,
    borderWidth: 0.5,
    height: responsiveHeight(40),
    backgroundColor:Colors.WHITE,
    width: responsiveWidth(80),
    justifyContent: 'center',
    paddingHorizontal: responsiveWidth(3),
    marginTop: responsiveHeight(12),
  },
  innerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: responsiveHeight(2),
  },
  logoContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: responsiveWidth(80),
    height: responsiveHeight(10),
  },
  logo: {
    width: '60%',
    height: responsiveHeight(7),
    marginTop: responsiveHeight(3),
  },
  loginTitle: {
    fontWeight: '600',
    justifyContent: 'center',
    alignSelf: 'center',
    fontSize: responsiveFontSize(2.6),
    color: Colors.BLACK,
  },
  viewOtp: {
    flexDirection: 'row',
  },
  mobileTitle: {
    fontWeight: '600',
    fontSize: responsiveFontSize(1.9),
    marginTop: responsiveHeight(3),
    marginStart: responsiveWidth(2),
    color: Colors.BLACK,
  },
  otpTitle: {
    fontFamily: FontFamily.POPPINS_REGULAR,
    fontSize: responsiveFontSize(1.8),
    marginTop: responsiveHeight(3),
    marginStart: responsiveWidth(3),
    color: Colors.BLACK,
  },
  otpVerifyTitle: {
    fontFamily: FontFamily.POPPINS_SEMIBOLD,
    color: Colors.BLACK,
    justifyContent: 'center',
    alignSelf: 'center',
    bottom: 30,
    fontSize: responsiveFontSize(2.4),
  },
  outerContainer: {
    flex: 1,
    marginBottom: responsiveHeight(4),
    justifyContent: 'flex-end',
  },

  otpTitle: {
    color: Colors.NAVY_BLUE,
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
    marginStart: responsiveWidth(2),
    marginTop: responsiveHeight(3),
  },
  buttonStyle: {
    marginTop: responsiveHeight(18),
    justifyContent: 'flex-end',
  },
  MainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  heading: {
    fontSize: 24,
    textAlign: 'center',
    paddingBottom: 20,
    color: 'black',
  },

  phoneNumberView: {
    width: responsiveWidth(70),
    height: 50,
    marginTop: responsiveHeight(2),
    backgroundColor: 'white',
  },
  mobileNumber: {
    width: responsiveWidth(70),
    height: 50,
    marginStart: responsiveWidth(2),
    color: Colors.BLUE,
    fontWeight: 'bold',
    marginTop: responsiveHeight(0.6),
  },
  borderStyleBase: {
    width: 30,
    height: 45,
  },

  underlineStyleBase: {
    width: 40,
    height: 40,
    borderWidth: 0,
    marginHorizontal:2,
    backgroundColor: '#99999926',
    borderBottomWidth: 1,
    color: '#000',
  },

  underlineStyleHighLighted: {
    backgroundColor: '#99999926',
    color: '#000',
    borderRadius: 5,
  },
  otpResend: {
    fontFamily: FontFamily.POPPINS_BOLD,
    color: Colors.NAVY_BLUE,
    justifyContent: 'center',
    top: 50,
    marginStart: responsiveWidth(3),
    fontSize: responsiveFontSize(1.2),
  },
});
export default styles;
