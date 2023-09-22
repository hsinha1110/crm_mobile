import { StyleSheet } from "react-native";
import Colors from "../../../../styles/colors";
import { moderateScale } from "../../../../utils/Dimensions";

const styles = StyleSheet.create({
  container: {
    width: '97%',
    backgroundColor: Colors.WHITE,
    justifyContent: 'center',
    marginStart: moderateScale(5),
  },
  safeAreaView: {
    flex: 1,
  },
  containerMain: {
    flex: 1,
    justifyContent: 'center',
  },
  bottomView: {
    flex: 1,
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute', //Here is the trick
    bottom: 0, //Here is the trick
  },
});
export default styles;