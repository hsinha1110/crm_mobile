import React, {useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Image,
  Text,
  ScrollView,
  Button,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
// import { save } from "../../../storage/storage";
// import { useDispatch } from "react-redux";
// import { userLoginAsync } from "../../../redux/asyncThunk";
// import { Formik, Field } from "formik";
import Toast from 'react-native-toast-message';

import styles from '../../auth/login/styles';
import PhoneInput from 'react-native-phone-number-input';
import DropShadow from 'react-native-drop-shadow';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import ButtonAtom from '../../../components/atoms/Button/ButtonAtom';
import imagePath from '../../../constants/imagePath';
import TextAtom from '../../../components/atoms/TextAtom/TextAtom';
import navigationPath from '../../../constants/navigationPath';
import Colors from '../../../styles/colors';
import {useDispatch} from 'react-redux';
import {Formik, useFormik} from 'formik';
import * as yup from 'yup';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {userLoginAsync} from '../../../../redux/asyncThunk';
import OtpAtom from '../../../components/atoms/Otp/OtpAtom';
const Categories = () => {
  const [show, setShow] = useState(false);
  const phoneInput = useRef(null);
  const navigation = useNavigation();

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{flex: 1, backgroundColor: Colors.WHITE}}>
      <View style={styles.container}>
        <View style={{flex: 6}}>
          <View style={{flex: 1}}>
            <View style={{flex: 3}}>
              <View style={{marginTop: responsiveHeight(2)}}>
                <View style={styles.innerContainer}>
                  <View style={[styles.box, styles.shadowProp]}>
                    <View
                      style={{
                        marginHorizontal: responsiveWidth(3),
                      }}>
                      <Text style={{color:Colors.NAVY_BLUE,fontSize:responsiveFontSize(1.8)}}>
                        Let's organize your works with priority and do
                        everything without stress
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View
          style={{
            flex: 1,
            height: responsiveHeight(30),
            justifyContent: 'flex-end',
            marginBottom: responsiveHeight(2),
            alignItems: 'center',
          }}>
          <View style={styles.logoContainer}>
            <Image
              style={styles.logo}
              source={imagePath.LOGO}
              resizeMode={'cover'}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Categories;
