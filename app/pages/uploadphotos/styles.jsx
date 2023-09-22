import { StyleSheet } from "react-native";
import Colors from "../../styles/colors";
 
const styles = StyleSheet.create({
    bottomView: {
        width: '100%',
        height: 50,
        backgroundColor: Colors.WHITE,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute', //Here is the trick
        bottom: 0, //Here is the trick,
       },
})
export default styles;