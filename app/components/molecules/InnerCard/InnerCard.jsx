import {View, Text} from 'react-native';
import React from 'react';
import {moderateScale} from '../../../utils/Dimensions';
import Colors from '../../../styles/colors';

const InnerCard = (props, innerCardStyle = {}) => {
  return (
    <View
      style={{
        justifyContent: 'center',
        marginHorizontal: moderateScale(10),
        backgroundColor: Colors.WHITE,
      }}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text
          style={{
            marginStart: moderateScale(10),
            marginTop: 15,
            fontWeight: 'bold',
            color: Colors.BLACK,
            fontSize: moderateScale(12),
          }}>
          {props.title}
        </Text>

        {props.children}
      </View>
    </View>
  );
};

export default InnerCard;
