import {View, Text} from 'react-native';
import React from 'react';
import {moderateScale, verticalScale} from '../../../utils/Dimensions';
import Colors from '../../../styles/colors';
import styles from '../../atoms/Card/styles';
const CardDetails = (props, cardStyle = {}) => {
  return (
    <View
      style={{
        ...styles.cardStyle,
      }}>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
        }}>
        <Text style={{fontWeight: '600', color: Colors.BLACK}}>
          {props.subtitle}
          {props.title}
        </Text>
        <Text
          style={{
            fontWeight: '600',
            color: Colors.BLACK,
            marginStart: moderateScale(10),
          }}>
          {props.content}
        </Text>
      </View>

      {props.children}
    </View>
  );
};

export default CardDetails;
