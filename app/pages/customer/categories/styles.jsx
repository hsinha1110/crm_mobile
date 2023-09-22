import { StyleSheet } from "react-native";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import FontFamily from "../../../constants/FontFamily";
import Colors from "../../../styles/colors";

const styles = StyleSheet.create({

    containerMain: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor : Colors.DOT_COLOR 
      },
      bottomView: {
        width: '100%',
        height: 50,
         justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute', //Here is the trick
        bottom: 0, //Here is the trick
      },
      title:{
        fontSize:responsiveFontSize(1.4),
        fontFamily:FontFamily.POPPINS_REGULAR,
        marginTop:responsiveHeight(2)
      },
      frame: {
        borderWidth: 1,
        width: 50,
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 8,
        margin: 5,
        padding: 10,
      },
      logoContainer: {
        alignItems: 'center',
        justifyContent : "center",
        height : "100%",
        width : "100%"
      },
      logo: {
        width: '100%',
        height: responsiveHeight(20),
      },
      container: {
        flex: 1,
        backgroundColor: Colors.WHITE,
        padding: 8,
      },
      frame: {
        alignItems: 'center',
        width: responsiveWidth(50),
        height: responsiveHeight(20),
        backgroundColor: '#fff',
        margin: 10,
        padding: 10,
        borderRadius: 5,
      },
})
export default styles;