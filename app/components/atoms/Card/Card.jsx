import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import Colors from '../../../styles/colors';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../utils/Dimensions';
import imagePath from '../../../constants/imagePath';
import {
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import FontFamily from '../../../constants/FontFamily';

const Card = ({title, onPress}) => {
  return (
    <View
      style={{
        borderColor: Colors.CARD_GREY,
        borderWidth: 1,
        marginHorizontal: responsiveWidth(4),

        borderTopLeftRadius: responsiveWidth(2),
        borderTopRightRadius: responsiveWidth(2),
      }}>
      <View
        style={{
          backgroundColor: Colors.CARD_GREY,
          borderTopLeftRadius: responsiveWidth(2),
          borderTopRightRadius: responsiveWidth(2),
          height: verticalScale(35),
          justifyContent: 'center',
          borderColor: Colors.CARD_GREY,
          borderWidth: 1,
        }}>
        <Text
          style={{
            fontSize: responsiveFontSize(1.2),
            fontFamily: FontFamily.POPPINS_SEMIBOLD,
            textAlign: 'center',
            color: Colors.BLACK,
          }}>
          {title}
        </Text>
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: verticalScale(34),
          marginHorizontal: responsiveWidth(6),
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Image
            source={imagePath.UPLOAD}
            style={{
              width: horizontalScale(30),
              height: verticalScale(30),

              marginHorizontal: horizontalScale(18),
            }}
          />
          <Image
            source={imagePath.PREVIEW}
            style={{
              width: horizontalScale(30),
              height: verticalScale(30),
              marginHorizontal: horizontalScale(18),
            }}
          />
        </View>
        <View
          style={{
            marginTop: verticalScale(10),
            paddingVertical: verticalScale(10),
          }}>
          <Text style={{color: Colors.DARK_GREY, fontSize: moderateScale(10)}}>
            DRAG & DROP OR BROWSE TO FOREIGN PASSPORT
          </Text>
        </View>
        <View style={{marginTop: verticalScale(18)}}>
          <TouchableOpacity
            onPress={onPress}
            style={{
              backgroundColor: Colors.BLUE,
              width: horizontalScale(130),
              height: verticalScale(32),
              borderRadius: moderateScale(5),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: Colors.WHITE}}>Upload</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Card;
