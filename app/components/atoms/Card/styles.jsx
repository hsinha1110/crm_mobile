import { StyleSheet } from "react-native";
import Colors from "../../../styles/colors";
import { moderateScale, verticalScale } from "../../../utils/Dimensions";

const styles = StyleSheet.create({
    cardStyle:{
        borderTopLeftRadius:moderateScale(5),
        borderTopRightRadius:moderateScale(5),
         backgroundColor: Colors.WHITE,
         width:'100%',
         marginTop:verticalScale(5),
         flexDirection:'row',
        
    }
})
export default styles