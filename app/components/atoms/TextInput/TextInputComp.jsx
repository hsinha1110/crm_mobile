import {View, Text, TextInput} from 'react-native';
import React from 'react';
import styles from '../../atoms/TextInput/styles';
const TextInputComp = ({placeholder, inputStyle,input}) => {
  return (
        <View style={{flexDirection:'row'}}>
        <TextInput
        style={{...styles.inputStyle, ...inputStyle,...input}}
        placeholder={placeholder}
      />
        </View>
   );
};

export default TextInputComp;
