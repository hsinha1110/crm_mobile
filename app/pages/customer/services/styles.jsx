import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  mainBody: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  bottomView: {
    width: '100%',
     position: 'absolute', //Here is the trick
    bottom: 0, //Here is the trick
  },
});

export default styles;
