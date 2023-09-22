import {View, Text} from 'react-native';
import React from 'react';
import {moderateScale, verticalScale} from '../../../utils/Dimensions';
import Colors from '../../../styles/colors';
import FontFamily from '../../../constants/FontFamily';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

const CardJob = (props, cardStyle = {}) => {
  return (
    <View
      style={{
        borderTopLeftRadius: moderateScale(5),
        borderTopRightRadius: moderateScale(5),
        height: verticalScale(35),
        backgroundColor: Colors.CARD_GREY,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={{fontFamily:FontFamily.POPPINS_SEMIBOLD,fontSize:responsiveFontSize(1.4), color: Colors.BLACK}}>
        {props.title}
      </Text>
      {props.children}
    </View>
  );
};

export default CardJob;
