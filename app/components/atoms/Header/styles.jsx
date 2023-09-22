import {StyleSheet} from 'react-native';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import Colors from '../../../styles/colors';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../utils/Dimensions';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: moderateScale(2),
    backgroundColor: Colors.WHITE,
  },
  safeAreaView: {
    flex: 1,
  },
  logoContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: verticalScale(40),
    backgroundColor: Colors.WHITE,
    marginHorizontal: horizontalScale(10),
    alignItems: 'center',

  },
  backIcon: {
    width: horizontalScale(20),
    height: horizontalScale(20),
    marginHorizontal:responsiveWidth(2)
  },
  radioStyle: {
    width: '83%',
    flexDirection: 'row',
  },
  viewStyle:{
    flexDirection:'row',
    justifyContent:'space-between',
    backgroundColor:Colors.WHITE,
    marginHorizontal:responsiveWidth(2)
  }
});
export default styles;
