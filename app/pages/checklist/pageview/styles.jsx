import {StyleSheet} from 'react-native';
import Colors from '../../../styles/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.WHITE,
  },
  bottomView: {
    width: '100%',
     position: 'absolute', //Here is the trick
    bottom: 0, //Here is the trick
  },
});
export default styles;
