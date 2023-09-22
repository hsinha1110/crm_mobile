import {useNavigation} from '@react-navigation/core';
import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import FontFamily from '../../../constants/FontFamily';
import imagePath from '../../../constants/imagePath';
import navigationPath from '../../../constants/navigationPath';
import Colors from '../../../styles/colors';
import styles from './styles';
export default function LoginAs() {
  const [selected, setSelected] = useState('FieldWorker');
  const navigation = useNavigation();
  const handleSelected = value => {
    setSelected(value);
    if (value === 'FieldWorker') {
      navigation.navigate(navigationPath.CUSTOMER_LOGIN, {
        otpType: 1,
        LoginPerson: 'field_worker',
      });
    } else {
      navigation.navigate(navigationPath.CUSTOMER_LOGIN, {
        otpType: 2,
        LoginPerson: 'customer',
      });
    }
  };
  return (
    <View style={styles.container}>
      <View style={{flex: 0.1, justifyContent: 'flex-end'}}>
        <Text
          style={{
            color: Colors.NAVY_BLUE,
            fontSize: responsiveFontSize(1.8),
            textAlign: 'center',
            fontFamily: FontFamily.POPPINS_REGULAR,
          }}>
          Let's organize your works with priority and do everything without
          stress
        </Text>
      </View>
      <View
        style={{
          flex: 0.62,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <CategoriesCard
          title={'Login as Fieldworker'}
          onPress={handleSelected}
          type={'FieldWorker'}
          value={selected}
          resizeMode={'center'}
          imageSource={imagePath.FIELD_WORKER}
        />
        <CategoriesCard
          title={'Login as Customer'}
          onPress={handleSelected}
          type={'Customer'}
          value={selected}
          imageSource={imagePath.ACCOUNT}
        />
      </View>
      <View
        style={{
          flex: 0.2,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={imagePath.LOGO}
            resizeMode={'contain'}
          />
        </View>
      </View>
    </View>
  );
}

const CategoriesCard = ({imageSource, title, onPress, value, type}) => {
  return (
    <TouchableOpacity
      style={[
        styles.frame,
        {
          backgroundColor: value === type ? Colors.BLUE : Colors.CARD_GREY,
        },
      ]}
      onPress={() => onPress(type)}>
      <Text
        style={[
          styles.title,
          {color: value === type ? Colors.WHITE : Colors.BLACK},
        ]}
        numberOfLines={2}>
        {title}
      </Text>
      <Image
        style={{
          width: 60,
          height: 60,
          marginTop: responsiveHeight(2),
          //  tintColor: selected ? Colors.WHITE : Colors.CARD_GREY,
          // tintColor :selected?Colors.WHITE:Colors.CARD_GREY
        }}
        resizeMode={'contain'}
        source={imageSource}
      />
    </TouchableOpacity>
  );
};
