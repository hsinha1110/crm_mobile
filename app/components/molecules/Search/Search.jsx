import {View, Text, TextInput, Image} from 'react-native';
import React from 'react';
import imagePath from '../../../constants/imagePath';
import Colors from '../../../styles/colors';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import FontFamily from '../../../constants/FontFamily';

const Search = ({placeholder, placeholderTextColor}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        width: '92%',
        alignItems: 'center',
        borderColor: Colors.CARD_GREY,
        borderWidth: 1,
        marginTop: responsiveHeight(2),
        justifyContent: 'center',
      }}>
      <Image
        style={{
          width: 20,
          height: 20,
          borderColor: Colors.CARD_GREY,
          marginStart: responsiveWidth(4),
          tintColor: Colors.DARK_GREY,
        }}
        source={imagePath.SEARCH}
      />
      <TextInput
        style={{
          width: '88%',
          marginStart: responsiveWidth(2),
          height: 40,
          alignItems: 'center',
          alignContent: 'center',
          top:4,
          fontSize: responsiveFontSize(1.6),
          fontFamily: FontFamily.POPPINS_REGULAR,
        
        }}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
      />
    </View>
  );
};

export default Search;
