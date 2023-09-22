import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import imagePath from '../../../constants/imagePath';
import TextHeader from '../../../components/atoms/Header/TextHeader/TextHeader';
import styles from '../jobdetails/styles';
import CardJob from '../../../components/atoms/Card/CardJob';
import InnerCard from '../../../components/molecules/InnerCard/InnerCard';
import Header from '../../../components/atoms/Header/Header';
import {smsConsentType, workType} from '../../../constants/listData';
import TextInput from '../../../components/atoms/TextInput/TextInputComp';
import {moderateScale, verticalScale} from '../../../utils/Dimensions';
import Card2 from '../../../components/atoms/Card/Card2';
import Colors from '../../../styles/colors';
import RadioButtonComp from '../../../components/atoms/RadioButton/RadioButtonComp';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import FontFamily from '../../../constants/FontFamily';
import {useNavigation} from '@react-navigation/native';
const JobDetails = () => {
  const [value, setValue] = useState(null);
  const [status, setStatus] = useState(true);
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.safeAreaView}>
     
      <View style={styles.container}>
        <View
          style={{
            marginStart: responsiveWidth(2),
            backgroundColor: Colors.WHITE,
            marginTop: responsiveHeight(2),
          }}>
          <TextHeader title_one="Select the Work Type" />
        </View>
        <ScrollView
          style={{marginBottom: responsiveHeight(4)}}
          showsVerticalScrollIndicator={false}>
          <View style={{marginTop: responsiveHeight(2)}}>
            <View style={styles.container}>
              <View
                style={{
                  marginHorizontal: responsiveWidth(4.2),
                  borderWidth: 1,
                  borderColor: Colors.CARD_GREY,
                }}>
                <CardJob title="Work Type" />

                <InnerCard>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: verticalScale(10),
                    }}>
                    <RadioButtonComp
                      data={workType}
                      value={value}
                      setValue={setValue}
                    />
                  </View>
                </InnerCard>
              </View>
            </View>
            <View
              style={{
                marginBottom: responsiveHeight(2),
              }}>
              <InnerCard title="Enter Instructions" />

              <View
                style={{
                  borderTopLeftRadius: moderateScale(5),
                  borderTopRightRadius: moderateScale(5),
                  borderWidth: 1,
                  marginHorizontal: 20,
                  marginTop: responsiveHeight(2),
                  borderColor: Colors.CARD_GREY,
                }}>
                <Card2 title="Instructions" />
                <View
                  style={{
                    right: responsiveWidth(3),
                    borderColor: Colors.DARK_GREY,
                  }}>
                  <TextInput
                    inputStyle={{
                      bottom: verticalScale(20),
                      width: '80%',
                      marginEnd: responsiveWidth(6),
                    }}
                    placeholder={'Enter instructions for the appointment'}
                    placeholderTextColor={Colors.DARK_GREY}
                  />
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
        <View style={styles.bottomView}>
          <TouchableOpacity
            onPress={() => {}}
            style={{
              backgroundColor: Colors.BLUE,
              width: '100%',
              height: responsiveHeight(5),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: Colors.WHITE,
                fontFamily: FontFamily.POPPINS_MEDIUM,
                fontSize: responsiveFontSize(1.4),
              }}>
              Create Appointment
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default JobDetails;
