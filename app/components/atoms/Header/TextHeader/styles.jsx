import {StyleSheet} from 'react-native';
import Colors from '../../../styles/colors';
import {horizontalScale, verticalScale} from '../../../utils/Dimensions';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: Colors.WHITE,
  },
  safeAreaView: {
    flex: 1,
  },
  logoContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: verticalScale(40),
    marginHorizontal: horizontalScale(10),
    alignItems: 'center',
  },
  backIcon: {
    width: horizontalScale(19),
    height: horizontalScale(19),
  },
});
export default styles;
