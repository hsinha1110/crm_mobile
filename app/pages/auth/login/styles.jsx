import {StyleSheet} from 'react-native';

import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import FontFamily from '../../../constants/FontFamily';
import Colors from '../../../styles/colors';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
     backgroundColor: Colors.WHITE,
  },
  body: {
    flex:1,
     width: '100%',
    justifyContent: 'center',
    backgroundColor: Colors.WHITE,
    alignItems: 'center',
  },
  footer: {
    width: '100%',
    height: 100,
    flex:1,
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
    width: responsiveWidth(80),
    justifyContent: 'center',
     borderColor: Colors.BLUE,
    borderWidth: 0.5,
    height: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
   },
  shadowProp: {
    shadowColor: '#000',
  },
  innerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    },
  logoContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: responsiveWidth(80),
    height: responsiveHeight(80),
  },
  logo: {
    width: '100%',
    height: responsiveHeight(7),
    marginTop: responsiveHeight(3),
  },
  loginTitle: {
    fontFamily: FontFamily.POPPINS_SEMIBOLD,
    color: Colors.BLACK,
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 80,
    fontSize: responsiveFontSize(1.8),
  },
  mobileTitle: {
    fontFamily: FontFamily.POPPINS_REGULAR,
    fontSize: responsiveFontSize(1.4),
    color: Colors.BLACK,
  },
  otpTitle: {
    fontWeight: 'bold',
    fontSize: responsiveFontSize(2),
  },
  outerContainer: {
    flex: 1,
    marginBottom: responsiveHeight(4),
    justifyContent: 'flex-end',
  },

  otpTitle: {
    color: Colors.NAVY_BLUE,
    fontFamily: FontFamily.POPPINS_LIGHT,
    marginStart: responsiveWidth(2),
    width: '90%',
    marginBottom: responsiveHeight(3),
    fontSize: responsiveFontSize(1.7),
  },
  titleCustomer: {
    color: Colors.BLUE,
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
    marginStart: responsiveWidth(3),
    alignItems: 'center',
  },
  errorText: {
    fontSize: responsiveFontSize(1.2),
    color: 'red',
    marginStart: responsiveWidth(4),
  },
  borderStyleBase: {
    width: 30,
    height: 45,
  },

  underlineStyleBase: {
    width: 44,
    height: 40,
    borderWidth: 0,
    marginHorizontal: 2,
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
    fontFamily: FontFamily.POPPINS_REGULAR,
    color: Colors.NAVY_BLUE,
    justifyContent: 'center',
    top: 5,
    marginStart: responsiveWidth(2),
    fontSize: responsiveFontSize(1),
  },
});
export default styles;
