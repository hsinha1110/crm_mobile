import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import styles from '../../../components/atoms/Otp/styles' 
const OtpAtom = ({ titleOtp, titleMobile,onPress }) => {
  return (
    <View>
      <Text style={styles.otpTitle}>{titleOtp}</Text>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.mobileNumber}>{titleMobile}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OtpAtom;
