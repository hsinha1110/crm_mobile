import {StyleSheet} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Colors from '../../../styles/colors';

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },

  bottomView: {
    width: '100%',
    backgroundColor: Colors.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
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
    marginBottom: responsiveHeight(4),
  },
  selectedView: {
    height: responsiveHeight(20),
    width: responsiveWidth(50),
    backgroundColor: Colors.BLUE,
  },
  unselectedView: {
    height: responsiveHeight(20),
    width: responsiveWidth(50),
    marginTop:responsiveHeight(2.5),
    backgroundColor: Colors.CARD_GREY,
  },
});
export default styles;
