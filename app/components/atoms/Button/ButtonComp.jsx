import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import React from 'react';
import {horizontalScale, moderateScale} from '../../../utils/Dimensions';
import Colors from '../../../styles/colors';

const ButtonComp = ( props,btnText,btnStyle={}, onPress) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={{...styles.btnStyle, ...btnStyle}}>
      <Text>{btnText}</Text>
    </TouchableOpacity>
  );
  {props.children}
};
const styles = StyleSheet.create({
  btnStyle: {
    height: horizontalScale(48),
    backgroundColor: Colors.BLUE,
    borderRadius: moderateScale(4),
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnTextStyle: {
    fontSize: moderateScale(12),
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});
export default ButtonComp;
