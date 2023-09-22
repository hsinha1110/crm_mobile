import {View, Text, SafeAreaView, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import Header from '../../../components/atoms/Header/Header';
import imagePath from '../../../constants/imagePath';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../utils/Dimensions';
import Colors from '../../../styles/colors';
import ToggleSwitch from 'toggle-switch-react-native';
import styles from '../profile/styles';
import FontFamily from '../../../constants/FontFamily';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../../../../redux/slices/auth.slice';
import navigationPath from '../../../constants/navigationPath';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';

const Profile = () => {
  const [toggle, setToggle] = useState(false);
  const {email, last_name, first_name, mobile_number} = useSelector(
    state => state.auth.user,
  );

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const handleLogOut = () => {
    dispatch(logout());
  };
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Header
        onPress={() => navigation.goBack()}
        image={imagePath.LEFT}
        title="Profile"
        notification={imagePath.NOTIFICATION}
      />
      <View
        style={{
          marginHorizontal: moderateScale(20),
          marginTop: verticalScale(45),
          flexDirection: 'row',
        }}>
        <View
          style={{
            backgroundColor: Colors.GREY,
            width: 50,
            height: 50,
            borderRadius: 25,
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: responsiveWidth(2),
            flexDirection: 'row',
            borderRadius: responsiveWidth(2),
          }}>
          <View
            style={{
              borderRadius: 30,
              width: 60,
              height: 60,
              borderColor: Colors.BLUE,
              borderWidth: 1,
              justifyContent: 'center',
              alignItems: 'center',
              top: 10,
              backgroundColor: Colors.CARD_HEADER,
            }}>
            <TouchableOpacity>
              <Image
                source={imagePath.ACCOUNT}
                style={{width: 30, height: 30, tintColor: Colors.BLUE}}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{marginStart: horizontalScale(20), width: '74%'}}>
          <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
            <Text
              style={{
                fontFamily: FontFamily.POPPINS_BOLD,
                fontSize: responsiveFontSize(1.4),
                color: Colors.BLACK,
              }}>
              {first_name} {last_name}
            </Text>
            <Image style={{width: 15, height: 15}} source={imagePath.EDIT} />
          </View>
          <View style={{flexDirection: 'row'}}>
            <Image style={{width: 20, height: 20}} source={imagePath.EMAIL} />

            <Text
              style={{
                marginStart: moderateScale(10),
                fontFamily: FontFamily.POPPINS_REGULAR,
                fontSize: responsiveFontSize(1.4),
                color: Colors.DARK_GREY,
              }}>
              {email}
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Image style={{width: 20, height: 20}} source={imagePath.PHONE} />
            <Text
              style={{
                marginStart: moderateScale(10),
                fontFamily: FontFamily.POPPINS_REGULAR,
                fontSize: responsiveFontSize(1.4),
                color: Colors.DARK_GREY,
              }}>
              {mobile_number}
            </Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={{
          marginTop: verticalScale(100),
          marginHorizontal: moderateScale(20),
          justifyContent: 'space-between',
          paddingVertical: responsiveHeight(2),
          flexDirection: 'row',
          alignItems: 'center',
          borderColor: Colors.CARD_GREY,
          borderWidth: 1,
          borderRadius: responsiveWidth(1.5),
        }}>
        <View
          style={{flexDirection: 'row', marginHorizontal: responsiveWidth(5)}}>
          <Image
            style={{width: 20, height: 20, tintColor: Colors.BLACK}}
            source={imagePath.NOTIFI}
          />
          <Text
            style={{
              marginStart: responsiveWidth(5),
              fontFamily: FontFamily.POPPINS_REGULAR,
              color: Colors.BLACK,
              fontSize: responsiveFontSize(1.4),
            }}>
            Notification
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            alignItems: 'flex-end',
            marginEnd: moderateScale(10),
          }}>
          <ToggleSwitch
            isOn={!toggle}
            onColor="#97DC21"
            offColor="#666666"
            labelStyle={{color: 'black', fontWeight: '900'}}
            size="medium"
            onToggle={toggle => setToggle(!toggle)}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleLogOut}
        style={{
          marginTop: verticalScale(10),
          marginHorizontal: moderateScale(20),
          justifyContent: 'space-between',
          paddingVertical: responsiveHeight(2),
          flexDirection: 'row',
          alignItems: 'center',
          borderColor: Colors.CARD_GREY,
          borderWidth: 1,
          borderRadius: responsiveWidth(1.5),
        }}>
        <View
          style={{flexDirection: 'row', marginHorizontal: responsiveWidth(5)}}>
          <Image
            style={{width: 20, height: 20}}
            resizeMode={'center'}
            source={imagePath.LOGOUT}
          />
          <Text
            style={{
              marginStart: responsiveWidth(5),
              responsiveFontSize: responsiveFontSize(1.4),
              color: Colors.BLACK,
              fontSize: responsiveFontSize(1.4),
              fontFamily: FontFamily.POPPINS_REGULAR,
            }}>
            Logout
          </Text>
        </View>
      </TouchableOpacity>
      <View
        style={{marginTop: 20, alignItems: 'center', justifyContent: 'center'}}>
        <Text
          style={{
            fontSize: 18,
            fontFamily: 'Roboto',
            color: Colors.BLACK,
          }}>
          version<Text> 5.0.4 </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
