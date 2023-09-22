import { View, Text } from "react-native";
import React from "react";
import styles from "../atoms/styles";

const TextAtom = ({ title,titleMobile={},titleNote={}, ...props }) => {
  return (
    <View>
      <Text style={{ ...styles.loginTitle,...titleMobile ,...titleNote}} {...props}>
        {title}
      </Text>
    </View>
  );
};

export default TextAtom;
