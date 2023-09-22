import {Text, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from '../Button/styles';
const ButtonAtom = ({title, onPress, style = {}}) => {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <Text style={[styles.buttonTitle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ButtonAtom;
