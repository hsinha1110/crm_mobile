import {StyleSheet} from 'react-native';
import Colors from '../../styles/colors';
import {horizontalScale, verticalScale} from '../../utils/Dimensions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.WHITE,
  },
  safeAreaView: {
    flex: 1,
    backgroundColor:Colors.WHITE
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: horizontalScale(200),
    height: verticalScale(270),
  },
  logo: {
    flex: 1,
    resizeMode : "contain"
  },
});
export default styles;
