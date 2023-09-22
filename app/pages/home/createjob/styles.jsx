import {StyleSheet} from 'react-native';
import Colors from '../../../styles/colors';
import {moderateScale} from '../../../utils/Dimensions';

const styles = StyleSheet.create({
  container: {
    flex:1,
     width: '97%',
    backgroundColor: Colors.WHITE,
    justifyContent: 'center',
    marginStart: moderateScale(5),
  },
  safeAreaView: {
    flex: 1,
    backgroundColor:Colors.WHITE
  },
  radioStyle:{
    flexDirection:'row',
     marginTop:10,
     justifyContent:'space-between',
     marginStart:moderateScale(50)
   },
   dropdown: {
    borderColor: Colors.CARD_GREY,
    minHeight:35,
    borderRadius:5
  },
  placeholderStyles: {
    color: "grey",
  },
});
export default styles;
