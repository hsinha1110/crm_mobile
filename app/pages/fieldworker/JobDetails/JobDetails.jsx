import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {useNavigation} from '@react-navigation/native';
import styles from '../JobDetails/styles';
import {moderateScale, verticalScale} from '../../../utils/Dimensions';
import Colors from '../../../styles/colors';
import FontFamily from '../../../constants/FontFamily';
import Header from '../../../components/atoms/Header/Header';
import imagePath from '../../../constants/imagePath';
import TextHeader from '../../../components/atoms/Header/TextHeader/TextHeader';
import CardJob from '../../../components/atoms/Card/CardJob';
import InnerCard from '../../../components/molecules/InnerCard/InnerCard';
import Card2 from '../../../components/atoms/Card/Card2';
import RadioButtonComp from '../../../components/atoms/RadioButton/RadioButtonComp';
import {workType, workTypeData} from '../../../constants/listData';
import {useDispatch, useSelector} from 'react-redux';
import {createAppointmentThunk} from '../../../../redux/asyncThunk/appointment.Thunk';
import SweetAlert from 'react-native-sweet-alert';
import navigationPath from '../../../constants/navigationPath';
import {createAppointmentThunkByCustomer} from '../../../../redux/asyncThunk';
import moment from 'moment';
import Toast from 'react-native-toast-message';
const JobDetails = props => {
  const {job, customer} = props.route.params;

  const [value, setValue] = useState(null);
  const [status, setStatus] = useState(true);
  const {user, role} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const date = new Date();
  const [initialValues, setInitialValues] = useState({
    assessment_by: role,
    work_type: '',
    instruction: '',
    status: 1,
    agent: '',
    start_date: moment(date).format('YYYY-MM-DD'),
    end_date: moment(date).add('day').format('YYYY-MM-DD'),
  });

  const navigation = useNavigation();

  const onSubmitHandler = () => {
    const date = new Date();
    if (role === 'customer') {
      dispatch(
        createAppointmentThunkByCustomer({
          ...initialValues,
          job,
          // customer : user.id,
        }),
      )
        .unwrap()
        .then(res => {
          Toast.show({
            type: 'success',
            text1: 'Great!',
            text2: 'Appointment Created Successfully',
          });
          navigation.navigate(navigationPath.DASHBOARD);
        })
        .catch(err => {
          Toast.show({
            type: 'error',
            text1: 'Opps!',
            text2: err.error.message,
          });
        });
    } else {
      dispatch(
        createAppointmentThunk({
          ...initialValues,
          company_id: user.company_id,
          job,
          customer,
          agent: user.id,
        }),
      )
        .unwrap()
        .then(res => {
          Toast.show({
            type: 'success',
            text1: 'Great!',
            text2: 'Appointment Created Successfully',
          });
          navigation.navigate(navigationPath.DASHBOARD);
        })
        .catch(err => {
          Toast.show({
            type: 'error',
            text1: 'Opps!',
            text2: err.error.message,
          });
        });
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={{height: 40, width: '100%'}}>
        <Header
          onPress={() => navigation.goBack()}
          image={imagePath.LEFT}
          title="Job Details"
          notification={imagePath.NOTIFICATION}
        />
      </View>

      <View style={styles.container}>
        <ScrollView
          style={{marginBottom: responsiveHeight(4)}}
          showsVerticalScrollIndicator={false}>
          <View>
            <View
              style={{
                marginStart: responsiveWidth(2),
                backgroundColor: Colors.WHITE,
                paddingVertical: 10,
              }}>
              <Text
                style={{
                  marginStart: responsiveWidth(2),
                  color: Colors.BLACK,
                  fontFamily: FontFamily.POPPINS_MEDIUM,
                }}>
                Select the work type Here
              </Text>
            </View>
            <View style={styles.container}>
              <View
                style={{
                  marginHorizontal: responsiveWidth(4.2),
                  borderWidth: 1,
                  borderTopLeftRadius: responsiveWidth(2),
                  borderTopRightRadius: responsiveWidth(2),

                  borderColor: Colors.CARD_GREY,
                }}>
                <View
                  style={{
                    backgroundColor: Colors.CARD_GREY,
                    borderTopLeftRadius: responsiveWidth(2),
                    borderTopRightRadius: responsiveWidth(2),
                    padding: 7,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontFamily: FontFamily.POPPINS_MEDIUM,
                      color: Colors.BLACK,
                      fontSize: responsiveFontSize(1.4),
                    }}>
                    Work Type
                  </Text>
                </View>
                <InnerCard>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: verticalScale(10),
                      paddingBottom: 10,
                    }}>
                    <RadioButtonComp
                      setInitialValues={setInitialValues}
                      initialValues={initialValues}
                    />
                  </View>
                </InnerCard>
              </View>
            </View>
            <View
              style={{
                marginBottom: responsiveHeight(2),
              }}>
              <InnerCard title="Enter Instructions here" />

              <View
                style={{
                  backgroundColor: Colors.CARD_GREY,
                  borderTopLeftRadius: responsiveWidth(2),
                  borderTopRightRadius: responsiveWidth(2),
                  padding: 7,
                  marginHorizontal: responsiveWidth(4),
                  marginTop: responsiveHeight(2),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: FontFamily.POPPINS_MEDIUM,
                    color: Colors.BLACK,
                    fontSize: responsiveFontSize(1.4),
                  }}>
                  Instructions
                </Text>
              </View>
              <View
                style={{
                  borderWidth: 1,
                  marginHorizontal: responsiveWidth(4),
                  padding: 10,
                  borderColor: Colors.CARD_GREY,
                }}>
                <View>
                  <TextInput
                    value={initialValues.instruction}
                    onChangeText={text =>
                      setInitialValues({...initialValues, instruction: text})
                    }
                    style={{
                      height: 70,
                      textAlignVertical: 'top',
                      fontFamily: FontFamily.POPPINS_REGULAR,
                      fontSize: responsiveFontSize(1.4),
                    }}
                    placeholder="Enter instructions for appointment"
                  />
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
        <View style={styles.bottomView}>
          <TouchableOpacity
            onPress={() => {
              onSubmitHandler();
            }}
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
