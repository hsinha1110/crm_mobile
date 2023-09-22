import {View, Text} from 'react-native';
import React from 'react';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../utils/Dimensions';

const HeaderNote = ({note, title}) => {
  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <View
        style={{
          flexDirection: 'row',
          marginTop: moderateScale(8),
          margin: horizontalScale(18),
        }}>
        <Text
          style={{
            color: '#E02020',
            fontWeight: 'bold',
            marginStart: horizontalScale(10),
          }}>
          {note}
        </Text>
        <Text style={{fontWeight: 'bold'}}>{title}</Text>
      </View>
    </View>
  );
};

export default HeaderNote;
