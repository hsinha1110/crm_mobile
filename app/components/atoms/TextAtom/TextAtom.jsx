import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import styles from "../../../components/atoms/TextAtom/styles";

const TextAtom = ({ onPress,title,titleMobile={},titleNote={},titleCustomer={}, ...props }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={{ ...styles.loginTitle,...titleMobile ,...titleNote,...titleCustomer}} {...props}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default TextAtom;
