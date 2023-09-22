import {StyleSheet} from 'react-native';
import {responsiveHeight, responsiveWidth} from 'react-native-responsive-dimensions';
import Colors from '../../../styles/colors';
import {moderateScale} from '../../../utils/Dimensions';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.WHITE,
    justifyContent: 'center',
    borderWidth: 0.2,
    flex: 1,
    borderColor: Colors.CARD_GREY,
    borderTopLeftRadius: moderateScale(5),
    borderTopRightRadius: moderateScale(5),
    borderWidth: 0.3,
    
  },
  safeAreaView: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  bottomView: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute', //Here is the trick
    bottom: 10, //Here is the trick
  },
});
export default styles;
