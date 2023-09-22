import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from '../styles';
import Colors from '../../../../styles/colors';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import FontFamily from '../../../../constants/FontFamily';
const TextHeader = ({title_one, title_two, view_all, onPress}) => {
  return (
    <View style={styles.container}>
      <View style={styles.viewStyle}>
        <Text
          style={{
            color: Colors.BLACK,
            fontFamily: FontFamily.POPPINS_MEDIUM,
            fontSize: responsiveFontSize(1.6),
          }}>
          {title_one}
        </Text>

        {!!title_one ? (
          <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
            <Text
              style={{
                color: Colors.BLACK,
                fontFamily: FontFamily.POPPINS_MEDIUM,
                fontSize: responsiveFontSize(1.4),
              }}>
              {title_two}
            </Text>
          </View>
        ) : null}
        {!!title_two ? (
          <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
            <Text style={{color: Colors.BLUE, fontWeight: '500'}}>
              {title_two}
            </Text>
          </View>
        ) : null}
        {!!view_all ? (
          <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
            <TouchableOpacity onPress={onPress}>
              <Text
                style={{
                  color: Colors.NAVY_BLUE,
                  fontFamily: FontFamily.POPPINS_REGULAR,
                  fontSize: 12,
                }}>
                {view_all}
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default TextHeader;
