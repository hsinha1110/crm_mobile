import React, {useEffect, useState, useMemo, useCallback} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
  Pressable,
} from 'react-native';
import Header from '../../../components/atoms/Header/Header';
import imagePath from '../../../constants/imagePath';
import Colors from '../../../styles/colors';
import styles from './styles';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Search from '../../../components/molecules/Search/Search';
import FontFamily from '../../../constants/FontFamily';
import {
  RadioButton,
  Checkbox,
  Portal,
  Modal,
  List,
  IconButton,
} from 'react-native-paper';
import ButtonAtom from '../../../components/atoms/Button/ButtonAtom';
import {
  createJobThunk,
  getCustomers,
} from '../../../../redux/asyncThunk/job.asyncThunk';
import Toast from 'react-native-toast-message';
import {useDispatch, useSelector} from 'react-redux';
import BusinessAddForm from './BusinessAddForm';
import navigationPath from '../../../constants/navigationPath';
import {useNavigation} from '@react-navigation/native';
import {
  createAppointmentThunk,
  createJobThunkByCustomer,
} from '../../../../redux/asyncThunk';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {ROLE_TYPE} from '../../../../redux/constants/services.constant';
import axios from 'axios';
import {getAddressDetails} from '../../../helpers';

const CreateJob = () => {
  const {role} = useSelector(state => state.auth);
  const [list, setList] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [intialState, setIntialState] = useState({
    customer_type: '',
    first_name: '',
    last_name: '',
    email: '',
    mobile_number: '',
    job_status: 1,

    sms_consent_type: 'no',
    business_address: {
      building_number: '',
      level_number: '',
      unit_type: '',
      unit_number: '',
      lot_number: '',
      street_number: '',
      street_name: '',
      street_type: '',
      suffix: '',
      suburb: '',
      state: '',
      pincode: '',
      lga: '',
    },
    property_address: {
      building_number: '',
      level_number: '',
      unit_type: '',
      unit_number: '',
      lot_number: '',
      street_number: '',
      street_name: '',
      street_type: '',
      suffix: '',
      suburb: '',
      state: '',
      pincode: '',
      lga: '',
    },
  });
  const [showBusinessForm, setShowBusinessForm] = useState(true);
  const [businessAddSameProperty, setBusinessAddSameProperty] = useState(true);
  const [customerSearchVisible, setCustomerSearchVisible] = useState(false);
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.auth);
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [customerSelected, setCustomerSelected] = useState(false);
  const [personalDetailsError, setPersonalDetailsError] = useState({});
  const checkValidation = payload => {
    let err = {};
    let hasError = false;
    if (!payload.first_name || !payload.first_name.length) {
      err['first_name'] = 'First Name Required';
      hasError = true;
    }
    if (/[^a-zA-Z\s]/.test(payload.first_name)) {
      // Alert.alert('No symbols allowed');
      err['first_name'] = 'Invalid First Name';
      hasError = true;
    }

    // if (pattern.test(payload.first_name)) {
    //   err['first_name'] = 'First Name Rd';
    //   hasError = true;
    // }

    if (!payload.last_name || !payload.last_name.length) {
      err['last_name'] = 'Last Name Required';
      hasError = true;
    }
    if (/[^a-zA-Z\s]/.test(payload.last_name)) {
      // Alert.alert('No symbols allowed');
      err['last_name'] = 'Invalid Last Name';
      hasError = true;
    }
    if (!payload.mobile_number || !payload.mobile_number.length) {
      err['mobile_number'] = 'Mobile Number Required';
      hasError = true;
    }
    if (/^[0]?[789]\d{9}$/.test(payload.mobile_number)) {
      // Alert.alert('No symbols allowed');
      err['mobile_number'] = 'Invalid Mobile Number';
      hasError = true;
    }
    if (!payload.email || !payload.email.length) {
      err['email'] = 'Email Required';
      hasError = true;
    }
    let emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g;

    if (!emailRegex.test(String(payload.email).toLowerCase())) {
      // Alert.alert('No symbols allowed');
      err['email'] = 'Invalid Email';
      hasError = true;
    }
    setPersonalDetailsError(err);
    return hasError;
  };
  // console.log('err', personalDetailsError);
  const handleSubmit = async () => {
    if (role === 'customer') {
      let bussiness = await getAddressDetails(intialState, 'business');
      let newState = await getAddressDetails(
        bussiness ? bussiness : intialState,
        'property',
      );
      setIntialState(newState);

      dispatch(
        createJobThunkByCustomer({
          data: {...intialState, company_id: 1},
        }),
      )
        .unwrap()
        .then(res => {
          console.log('res...........', res);
          Toast.show({
            type: 'success',
            text1: 'Great!',
            text2: 'Job Created Successfully',
          });
          navigation.navigate(navigationPath.JOB_DETAILS, {
            job: res?.data?.id,
            customer: selectedUser.id,
          });
        })
        .catch(err => {
          console.log('error.........', err);
          if (err.errorType === 'fieldError') {
            for (const key in err.error.data) {
              Toast.show({
                type: 'error',
                text1: key.toUpperCase(),
                text2: err.error.data[key][0],
                // autoHide : false
              });
            }
            return;
          }
          Toast.show({
            type: 'error',
            text1: 'Opps!',
            text2: err.error.message,
          });
        });
    } else {
      let isError = checkValidation(intialState);
      // console.log(isError, 'isError');
      if (isError) {
        return;
      }
      let bussiness = await getAddressDetails(intialState, 'business');
      let newState = await getAddressDetails(
        bussiness ? bussiness : intialState,
        'property',
      );
      setIntialState(newState);
      // debugger
      let payload = {
        ...newState,
      };
      if (selectedUser?.id) {
        payload['customer'] = selectedUser.id;
      }
      dispatch(
        createJobThunk({
          data: payload,
          company_id: user.company_id,
        }),
      )
        .unwrap()
        .then(res => {
          Toast.show({
            type: 'success',
            text1: 'Great!',
            text2: 'Job Created Successfully',
          });
          navigation.navigate(navigationPath.JOB_DETAILS, {
            job: res?.data?.id,
            customer: selectedUser?.id ? selectedUser.id : res?.data.customer,
          });
        })
        .catch(err => {
          if (err.errorType === 'fieldError') {
            for (const key in err.error.data) {
              Toast.show({
                type: 'error',
                text1: key.toUpperCase(),
                text2: err.error.data[key][0],
                // autoHide : false
              });
            }
            return;
          }
          Toast.show({
            type: 'error',
            text1: 'Opps!',
            text2: err.error.message,
          });
        });
    }
  };

  useEffect(() => {
    if (showBusinessForm) {
      setIntialState({
        ...intialState,
        business_address: intialState.property_address,
      });
      return;
    }
  }, [intialState?.property_address, showBusinessForm]);
  useEffect(() => {
    if (user.role_type === ROLE_TYPE.FIELD_WORKER) {
      dispatch(getCustomers({search: '', company_id: user.company_id}))
        .unwrap()
        .then(res => {
          setList(res?.data?.data);
        });
    } else {
      if (user) {
        let preFilledData = {
          customer_type: user.customer_type,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          mobile_number: user.mobile_number,
          job_status: 1,
          sms_consent_type: user.sms_consent_type,
        };
        setIntialState({
          ...intialState,
          ...preFilledData,
        });
        setSelectedUser(user);
      }
    }
  }, []);

  const handleSearchCustomer = useCallback(
    text => {
      setSearchText(text);
      dispatch(getCustomers({search: text, company_id: user.company_id}))
        .unwrap()
        .then(res => {
          setList(res?.data?.data);
        });
    },
    [list, searchText],
  );
  function fillInPrimaryAddress(address_components, type) {
    let address = {
      building_number: '',
      level_number: '',
      unit_type: '',
      unit_number: '',
      lot_number: '',
      street_number: '',
      street_name: '',
      street_type: '',
      suffix: '',
      suburb: '',
      state: '',
      pincode: '',
      lga: '',
    };
    for (const component of address_components) {
      // @ts-ignore remove once typings fixed
      const componentType = component.types[0];

      switch (componentType) {
        //building name
        case 'premise': {
          address.building_number = component.long_name;
          break;
        }
        //level_number
        case 'subpremise': {
          address.level_number = component.long_name;
          break;
        }
        //street number
        case 'street_number': {
          address.street_number = component.long_name;
          break;
        }
        //street name
        case 'route': {
          address.street_name = component.long_name;
          break;
        }
        //suffix
        case 'postal_code_suffix': {
          address.suffix = component.long_name;
          break;
        }
        //state
        case 'administrative_area_level_1': {
          address.state = component.short_name;
          break;
        }
        //pincode
        case 'postal_code': {
          address.pincode = component.long_name;
          break;
        }
        //LGA
        case 'sublocality_level_1': {
          address.lga = component.long_name;
          break;
        }
      }
    }

    if (type === 'business') {
      setIntialState({
        ...intialState,
        business_address: {...intialState.business_address, ...address},
      });
    }
    if (type === 'property') {
      setIntialState({
        ...intialState,
        property_address: {...intialState.property_address, ...address},
      });
    }
  }
  const handleSelectCustumer = item => {
    setIntialState({
      ...intialState,
      first_name: item.first_name,
      last_name: item.last_name,
      email: item.email,
      mobile_number: item.mobile_number,
      sms_consent_type: item.sms_consent_type,
      user_type: item.user_type,
    });
    setSelectedUser(item);
    setPersonalDetailsError({});
    setCustomerSearchVisible(false);
    setCustomerSelected(true);
  };
  const handleClearUser = () => {
    setIntialState({
      ...intialState,
      first_name: '',
      last_name: '',
      email: '',
      mobile_number: '',
      sms_consent_type: '',
      user_type: '',
    });
    setSelectedUser(null);
    setCustomerSelected(false);
  };
  return (
    <>
      <SafeAreaView style={styles.safeAreaView}>
        {/* <Toast /> */}

        <View style={{height: 40}}>
          <Header
            onPress={() => navigation.goBack()}
            image={imagePath.LEFT}
            title="Create Job"
            notification={imagePath.NOTIFICATION}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginHorizontal: responsiveWidth(1),
            padding: 3,
            marginTop: 10,
          }}>
          <Text
            style={{
              fontSize: responsiveFontSize(1.5),
              fontFamily: FontFamily.POPPINS_MEDIUM,
              marginStart: responsiveWidth(3),
              color: Colors.BLACK,
              flex: 1,
            }}>
            Fill in the details to create job
          </Text>
          <View>
            <Text
              style={{
                fontSize: responsiveFontSize(1.5),
                fontFamily: FontFamily.POPPINS_MEDIUM,
                marginEnd: responsiveWidth(2),
                color: Colors.BLUE,
                flex: 1,
              }}>
              View Map
            </Text>
          </View>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps={'handled'}>
          <View style={{flex: 1, backgroundColor: Colors.WHITE}}>
            <View
              style={{
                backgroundColor: Colors.CARD_GREY,
                borderTopLeftRadius: responsiveWidth(2),
                borderTopRightRadius: responsiveWidth(2),
                padding: 7,
                marginHorizontal: responsiveWidth(4),
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: responsiveHeight(1),
              }}>
              <Text
                style={{
                  fontFamily: FontFamily.POPPINS_MEDIUM,
                  color: Colors.BLACK,
                  fontSize: responsiveFontSize(1.4),
                }}>
                Customer Details
              </Text>
            </View>
          </View>
          <View
            style={{
              marginHorizontal: responsiveWidth(4),
              borderWidth: 1,
              borderColor: Colors.CARD_GREY,
            }}>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  marginStart: responsiveWidth(7),
                  marginTop: responsiveHeight(2),
                }}>
                <View
                  style={{
                    flex: 0.3,
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: responsiveFontSize(1.2),
                      fontFamily: FontFamily.POPPINS_REGULAR,
                      color: Colors.BLACK,
                    }}>
                    Ref ID
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    // alignItems: 'flex-end',
                    marginEnd: responsiveWidth(5),
                    width: '100%',
                  }}>
                  <Pressable
                    onPress={() =>
                      setCustomerSearchVisible(
                        user.role_type === ROLE_TYPE.FIELD_WORKER
                          ? true
                          : false,
                      )
                    }>
                    <View
                      style={{
                        width: '90%',
                        borderColor: Colors.CARD_GREY,
                        borderWidth: 0.5,
                        height: 40,
                        paddingLeft: 10,
                        alignSelf: 'flex-end',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        color: Colors.BLACK,
                        flexDirection: 'row',
                      }}>
                      <Text>{selectedUser?.ref_id || ''}</Text>
                      {user?.role_type === ROLE_TYPE.FIELD_WORKER && (
                        <IconButton
                          icon="close"
                          size={20}
                          onPress={() => handleClearUser()}
                          mode="contained-tonal"
                        />
                      )}
                    </View>
                  </Pressable>
                  {/* here. */}
                </View>
              </View>
            </View>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  marginStart: responsiveWidth(7),
                  marginTop: responsiveHeight(2),
                }}>
                <View
                  style={{
                    flex: 0.28,
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: responsiveFontSize(1.2),
                      fontFamily: FontFamily.POPPINS_REGULAR,
                      color: Colors.BLACK,
                    }}>
                    Customer Type
                  </Text>
                </View>
                <View
                  style={{
                    flex: 0.6,
                    alignItems: 'flex-end',
                    marginEnd: responsiveWidth(2),
                  }}>
                  <View style={{flexDirection: 'row', width: '100%'}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <RadioButton
                        value="residential"
                        color={Colors.BLACK}
                        status={
                          intialState.customer_type === 'residential'
                            ? 'checked'
                            : 'unchecked'
                        }
                        onPress={() =>
                          setIntialState({
                            ...intialState,
                            customer_type: 'residential',
                          })
                        }
                      />
                      <Text
                        style={{
                          fontFamily: FontFamily.POPPINS_MEDIUM,
                          fontSize: responsiveFontSize(1.5),
                          color: Colors.BLACK,
                        }}>
                        Residential
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <RadioButton
                        value="business"
                        color={Colors.BLACK}
                        status={
                          intialState.customer_type === 'business'
                            ? 'checked'
                            : 'unchecked'
                        }
                        onPress={() =>
                          setIntialState({
                            ...intialState,
                            customer_type: 'business',
                          })
                        }
                      />
                      <Text
                        style={{
                          fontFamily: FontFamily.POPPINS_MEDIUM,
                          fontSize: responsiveFontSize(1.5),
                          color: Colors.BLACK,
                        }}>
                        Business
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginStart: responsiveWidth(7),
                  marginTop: responsiveHeight(2),
                }}>
                <View
                  style={{
                    flex: 0.3,
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: responsiveFontSize(1.2),
                      fontFamily: FontFamily.POPPINS_REGULAR,
                      color: Colors.BLACK,
                    }}>
                    First Name
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    alignItems: 'flex-end',
                    marginEnd: responsiveWidth(5),
                  }}>
                  <TextInput
                    style={{
                      width: '90%',
                      borderColor: Colors.CARD_GREY,
                      paddingLeft: 10,
                      borderWidth: 0.5,
                      height: 40,
                      color: Colors.BLACK,
                    }}
                    value={intialState.first_name}
                    onChangeText={text =>
                      setIntialState({...intialState, first_name: text})
                    }
                    editable={
                      !customerSelected &&
                      user.role_type === ROLE_TYPE.FIELD_WORKER
                    }
                    placeholder=""
                  />
                  <Text style={{color: Colors.RED}}>
                    {personalDetailsError.first_name}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginStart: responsiveWidth(7),
                  marginTop: responsiveHeight(2),
                }}>
                <View
                  style={{
                    flex: 0.3,
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: responsiveFontSize(1.2),
                      fontFamily: FontFamily.POPPINS_REGULAR,
                      color: Colors.BLACK,
                    }}>
                    Last Name
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    alignItems: 'flex-end',
                    marginEnd: responsiveWidth(5),
                  }}>
                  <TextInput
                    value={intialState.last_name}
                    onChangeText={text =>
                      setIntialState({...intialState, last_name: text})
                    }
                    style={{
                      width: '90%',
                      borderColor: Colors.CARD_GREY,
                      borderWidth: 0.5,
                      height: 40,
                      paddingLeft: 10,
                      color: Colors.BLACK,
                    }}
                    editable={
                      !customerSelected &&
                      user.role_type === ROLE_TYPE.FIELD_WORKER
                    }
                    // onChangeText={(text) => setLastName(text)}
                    placeholder=""
                  />
                  <Text style={{color: Colors.RED}}>
                    {personalDetailsError.last_name}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginStart: responsiveWidth(7),
                  marginTop: responsiveHeight(2),
                }}>
                <View
                  style={{
                    flex: 0.3,
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: responsiveFontSize(1.2),
                      fontFamily: FontFamily.POPPINS_REGULAR,
                      color: Colors.BLACK,
                    }}>
                    Mobile No
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    alignItems: 'flex-end',
                    marginEnd: responsiveWidth(5),
                  }}>
                  <TextInput
                    value={intialState.mobile_number}
                    onChangeText={text =>
                      setIntialState({...intialState, mobile_number: text})
                    }
                    style={{
                      width: '90%',
                      borderColor: Colors.CARD_GREY,
                      borderWidth: 0.5,
                      height: 40,
                      paddingLeft: 10,
                      color: Colors.BLACK,
                    }}
                    editable={
                      !customerSelected &&
                      user.role_type === ROLE_TYPE.FIELD_WORKER
                    }
                    // onChangeText={(text) => setEmail(text)}
                    placeholder=""
                  />
                  <Text style={{color: Colors.RED}}>
                    {personalDetailsError.mobile_number}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  marginStart: responsiveWidth(7),
                  marginTop: responsiveHeight(2),
                }}>
                <View
                  style={{
                    flex: 0.3,
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: responsiveFontSize(1.2),
                      fontFamily: FontFamily.POPPINS_REGULAR,
                      color: Colors.BLACK,
                    }}>
                    Email
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    alignItems: 'flex-end',
                    marginEnd: responsiveWidth(5),
                  }}>
                  <TextInput
                    value={intialState.email}
                    onChangeText={text =>
                      setIntialState({...intialState, email: text})
                    }
                    style={{
                      width: '90%',
                      borderColor: Colors.CARD_GREY,
                      borderWidth: 0.5,
                      height: 40,
                      paddingLeft: 10,
                      color: Colors.BLACK,
                    }}
                    editable={
                      !customerSelected &&
                      user.role_type === ROLE_TYPE.FIELD_WORKER
                    }
                    // onChangeText={(text) => setEmail(text)}
                    placeholder=""
                  />
                  <Text style={{color: Colors.RED}}>
                    {personalDetailsError.email}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  marginStart: responsiveWidth(5),
                  marginTop: responsiveHeight(2),
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flex: 0.2,
                    }}>
                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          fontSize: responsiveFontSize(1.2),
                          fontFamily: FontFamily.POPPINS_REGULAR,
                          color: Colors.BLACK,
                        }}>
                        SMS Consent Type
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      flex: 0.8,
                      justifyContent: 'center',
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginStart: responsiveWidth(3),
                      }}>
                      <RadioButton
                        value="inferred"
                        color="black"
                        status={
                          intialState.sms_consent_type === 'inferred'
                            ? 'checked'
                            : 'unchecked'
                        }
                        onPress={() =>
                          setIntialState({
                            ...intialState,
                            sms_consent_type: 'inferred',
                          })
                        }
                      />
                      <Text
                        style={{
                          fontFamily: FontFamily.POPPINS_MEDIUM,
                          fontSize: responsiveFontSize(1.5),
                          color: Colors.BLACK,
                          alignSelf: 'center',
                        }}>
                        Infrerred
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        // justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <RadioButton
                        value="expressed"
                        color="black"
                        status={
                          intialState.sms_consent_type === 'expressed'
                            ? 'checked'
                            : 'unchecked'
                        }
                        onPress={() =>
                          setIntialState({
                            ...intialState,
                            sms_consent_type: 'expressed',
                          })
                        }
                      />
                      <Text
                        style={{
                          fontFamily: FontFamily.POPPINS_MEDIUM,
                          fontSize: responsiveFontSize(1.5),
                          color: Colors.BLACK,
                        }}>
                        Expressed
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        // justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <RadioButton
                        color="black"
                        value="no"
                        status={
                          intialState.sms_consent_type === 'no'
                            ? 'checked'
                            : 'unchecked'
                        }
                        onPress={() =>
                          setIntialState({
                            ...intialState,
                            sms_consent_type: 'no',
                          })
                        }
                      />
                      <Text
                        style={{
                          fontFamily: FontFamily.POPPINS_MEDIUM,
                          fontSize: responsiveFontSize(1.5),
                          color: Colors.BLACK,
                        }}>
                        No
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>

          <View style={{flex: 1, backgroundColor: Colors.WHITE}}>
            <View
              style={{
                backgroundColor: Colors.CARD_GREY,
                borderTopLeftRadius: responsiveWidth(2),
                borderTopRightRadius: responsiveWidth(2),
                padding: 7,
                marginHorizontal: responsiveWidth(4),
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: responsiveHeight(1),
              }}>
              <Text
                style={{
                  fontFamily: FontFamily.POPPINS_MEDIUM,
                  color: Colors.BLACK,
                  fontSize: responsiveFontSize(1.4),
                }}>
                Property Details
              </Text>
            </View>
            <View
              style={{
                borderColor: Colors.CARD_GREY,
                borderWidth: 1,
                marginHorizontal: responsiveWidth(4),
              }}>
              {/* <View
              style={{
                marginTop: responsiveHeight(1),
                justifyContent: 'center',
                alignItems: 'center',
                marginHorizontal: responsiveWidth(4),
              }}> */}
              <GooglePlacesAutocomplete
                // searchOptions={{componentRestrictions: {country: ['au']}}}
                placeholder="Search Address"
                fetchDetails={true}
                onPress={(data, details) => {
                  fillInPrimaryAddress(details.address_components, 'property');
                }}
                styles={{
                  container: {
                    color: Colors.BLACK,
                  },
                  listView: {
                    color: Colors.BLACK,
                  },
                  textInputContainer: {
                    marginTop: responsiveHeight(1),
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginHorizontal: responsiveWidth(4),
                    color: Colors.BLACK,
                  },
                  textInput: {
                    width: '90%',
                    borderColor: Colors.CARD_GREY,
                    borderWidth: 0.5,
                    height: 40,
                    color: Colors.BLACK,
                  },
                }}
                currentLocation={true}
                GooglePlacesDetailsQuery={{
                  types: ['route', 'geocode', 'address'],
                }}
                query={{
                  components: 'country:au',

                  key: 'AIzaSyBO-6AKRGl3NxAyPB3g4ns9mb_qHdirGq0',
                  language: 'en',
                  types: ['address', 'route', 'geocode'],
                }}
              />
              {/* </View> */}
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginStart: responsiveWidth(7),
                    marginTop: responsiveHeight(2),
                  }}>
                  <View
                    style={{
                      flex: 0.3,
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: responsiveFontSize(1.2),
                        fontFamily: FontFamily.POPPINS_REGULAR,
                        color: Colors.BLACK,
                      }}>
                      Building Name
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'flex-end',
                      marginEnd: responsiveWidth(5),
                    }}>
                    <TextInput
                      value={intialState.property_address.building_number}
                      onChangeText={text =>
                        setIntialState({
                          ...intialState,
                          property_address: {
                            ...intialState.property_address,
                            building_number: text,
                          },
                        })
                      }
                      style={{
                        width: '90%',
                        borderColor: Colors.CARD_GREY,
                        borderWidth: 0.5,
                        height: 40,
                        paddingLeft: 10,
                        color: Colors.BLACK,
                      }}
                      // onChangeText={(text) => setPropertyAddress({ ...property_address, building_name: text })}
                      placeholder=""
                    />
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginStart: responsiveWidth(7),
                    marginTop: responsiveHeight(2),
                  }}>
                  <View
                    style={{
                      flex: 0.3,
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: responsiveFontSize(1.2),
                        fontFamily: FontFamily.POPPINS_REGULAR,
                        color: Colors.BLACK,
                      }}>
                      Level No.
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'flex-end',
                      marginEnd: responsiveWidth(5),
                    }}>
                    <TextInput
                      value={intialState.property_address.level_number}
                      onChangeText={text =>
                        setIntialState({
                          ...intialState,
                          property_address: {
                            ...intialState.property_address,
                            level_number: text,
                          },
                        })
                      }
                      style={{
                        width: '90%',
                        borderColor: Colors.CARD_GREY,
                        borderWidth: 0.5,
                        height: 40,
                        paddingLeft: 10,
                        color: Colors.BLACK,
                      }}
                      // onChangeText={(text) => { setPropertyAddress({ ...property_address, level_no: text }) }}
                      placeholder=""
                    />
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginStart: responsiveWidth(7),
                    marginTop: responsiveHeight(2),
                  }}>
                  <View
                    style={{
                      flex: 0.3,
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: responsiveFontSize(1.2),
                        fontFamily: FontFamily.POPPINS_REGULAR,
                        color: Colors.BLACK,
                      }}>
                      Unit Type
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'flex-end',
                      marginEnd: responsiveWidth(5),
                    }}>
                    <TextInput
                      value={intialState.property_address.unit_type}
                      onChangeText={text =>
                        setIntialState({
                          ...intialState,
                          property_address: {
                            ...intialState.property_address,
                            unit_type: text,
                          },
                        })
                      }
                      style={{
                        width: '90%',
                        borderColor: Colors.CARD_GREY,
                        borderWidth: 0.5,
                        height: 40,
                        paddingLeft: 10,
                        color: Colors.BLACK,
                      }}
                      // onChangeText={(text) => setPropertyAddress({ ...property_address, unit_type: text })}
                      placeholder=""
                    />
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginStart: responsiveWidth(7),
                    marginTop: responsiveHeight(2),
                  }}>
                  <View
                    style={{
                      flex: 0.3,
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: responsiveFontSize(1.2),
                        fontFamily: FontFamily.POPPINS_REGULAR,
                        color: Colors.BLACK,
                      }}>
                      Unit No
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'flex-end',
                      marginEnd: responsiveWidth(5),
                    }}>
                    <TextInput
                      value={intialState.property_address.unit_number}
                      onChangeText={text =>
                        setIntialState({
                          ...intialState,
                          property_address: {
                            ...intialState.property_address,
                            unit_number: text,
                          },
                        })
                      }
                      style={{
                        width: '90%',
                        borderColor: Colors.CARD_GREY,
                        borderWidth: 0.5,
                        height: 40,
                        paddingLeft: 10,
                        color: Colors.BLACK,
                      }}
                      // onChangeText={(text) => setPropertyAddress({ ...property_address, unit_no: text })}
                      placeholder=""
                    />
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginStart: responsiveWidth(7),
                    marginTop: responsiveHeight(2),
                  }}>
                  <View
                    style={{
                      flex: 0.3,
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: responsiveFontSize(1.2),
                        fontFamily: FontFamily.POPPINS_REGULAR,
                        color: Colors.BLACK,
                      }}>
                      Lot No
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'flex-end',
                      marginEnd: responsiveWidth(5),
                    }}>
                    <TextInput
                      value={intialState.property_address.lot_number}
                      onChangeText={text =>
                        setIntialState({
                          ...intialState,
                          property_address: {
                            ...intialState.property_address,
                            lot_number: text,
                          },
                        })
                      }
                      style={{
                        width: '90%',
                        borderColor: Colors.CARD_GREY,
                        borderWidth: 0.5,
                        height: 40,
                        paddingLeft: 10,
                        color: Colors.BLACK,
                      }}
                      // onChangeText={(text) => setPropertyAddress({ ...property_address, lot_no: text })}
                      placeholder=""
                    />
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginStart: responsiveWidth(7),
                    marginTop: responsiveHeight(2),
                  }}>
                  <View
                    style={{
                      flex: 0.3,
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: responsiveFontSize(1.2),
                        fontFamily: FontFamily.POPPINS_REGULAR,
                        color: Colors.BLACK,
                      }}>
                      Street No
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'flex-end',
                      marginEnd: responsiveWidth(5),
                    }}>
                    <TextInput
                      value={intialState.property_address.street_number}
                      onChangeText={text =>
                        setIntialState({
                          ...intialState,
                          property_address: {
                            ...intialState.property_address,
                            street_number: text,
                          },
                        })
                      }
                      style={{
                        width: '90%',
                        borderColor: Colors.CARD_GREY,
                        borderWidth: 0.5,
                        height: 40,
                        paddingLeft: 10,
                        color: Colors.BLACK,
                      }}
                      // onChangeText={(text) => setPropertyAddress({ ...property_address, street_no: text })}
                      placeholder=""
                    />
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginStart: responsiveWidth(7),
                    marginTop: responsiveHeight(2),
                  }}>
                  <View
                    style={{
                      flex: 0.3,
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: responsiveFontSize(1.2),
                        fontFamily: FontFamily.POPPINS_REGULAR,
                        color: Colors.BLACK,
                      }}>
                      Street Name
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'flex-end',
                      marginEnd: responsiveWidth(5),
                    }}>
                    <TextInput
                      value={intialState.property_address.street_name}
                      onChangeText={text =>
                        setIntialState({
                          ...intialState,
                          property_address: {
                            ...intialState.property_address,
                            street_name: text,
                          },
                        })
                      }
                      style={{
                        width: '90%',
                        borderColor: Colors.CARD_GREY,
                        borderWidth: 0.5,
                        height: 40,
                        paddingLeft: 10,
                        color: Colors.BLACK,
                      }}
                      // onChangeText={(text) => setPropertyAddress({ ...property_address, street_name: text })}
                      placeholder=""
                    />
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    marginStart: responsiveWidth(7),
                    marginTop: responsiveHeight(2),
                  }}>
                  <View
                    style={{
                      flex: 0.3,
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: responsiveFontSize(1.2),
                        fontFamily: FontFamily.POPPINS_REGULAR,
                        color: Colors.BLACK,
                      }}>
                      Street Type
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'flex-end',
                      marginEnd: responsiveWidth(5),
                    }}>
                    <TextInput
                      value={intialState.property_address.street_type}
                      onChangeText={text =>
                        setIntialState({
                          ...intialState,
                          property_address: {
                            ...intialState.property_address,
                            street_type: text,
                          },
                        })
                      }
                      style={{
                        width: '90%',
                        borderColor: Colors.CARD_GREY,
                        borderWidth: 0.5,
                        height: 40,
                        paddingLeft: 10,
                        color: Colors.BLACK,
                      }}
                      placeholder=""
                    />
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginStart: responsiveWidth(7),
                    marginTop: responsiveHeight(2),
                  }}></View>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  marginStart: responsiveWidth(7),
                  marginTop: responsiveHeight(2),
                }}>
                <View
                  style={{
                    flex: 0.3,
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: responsiveFontSize(1.2),
                      fontFamily: FontFamily.POPPINS_REGULAR,
                      color: Colors.BLACK,
                    }}>
                    Suffix
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    alignItems: 'flex-end',
                    marginEnd: responsiveWidth(5),
                  }}>
                  <TextInput
                    value={intialState.property_address.suffix}
                    onChangeText={text =>
                      setIntialState({
                        ...intialState,
                        property_address: {
                          ...intialState.property_address,
                          suffix: text,
                        },
                      })
                    }
                    style={{
                      width: '90%',
                      borderColor: Colors.CARD_GREY,
                      borderWidth: 0.5,
                      height: 40,
                      paddingLeft: 10,
                      color: Colors.BLACK,
                    }}
                    placeholder=""
                  />
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginStart: responsiveWidth(7),
                  marginTop: responsiveHeight(2),
                }}>
                <View
                  style={{
                    flex: 0.3,
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: responsiveFontSize(1.2),
                      fontFamily: FontFamily.POPPINS_REGULAR,
                      color: Colors.BLACK,
                    }}>
                    Suburb
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    alignItems: 'flex-end',
                    marginEnd: responsiveWidth(5),
                  }}>
                  <TextInput
                    value={intialState.suburb}
                    onChangeText={text =>
                      setIntialState({
                        ...intialState,
                        property_address: {
                          ...intialState.property_address,
                          suburb: text,
                        },
                      })
                    }
                    style={{
                      width: '90%',
                      borderColor: Colors.CARD_GREY,
                      borderWidth: 0.5,
                      height: 40,
                      paddingLeft: 10,
                      color: Colors.BLACK,
                    }}
                    // onChangeText={(text) => setPropertyAddress({ ...property_address, suburb: text })}
                    placeholder=""
                  />
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginStart: responsiveWidth(7),
                  marginTop: responsiveHeight(2),
                }}>
                <View
                  style={{
                    flex: 0.3,
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: responsiveFontSize(1.2),
                      fontFamily: FontFamily.POPPINS_REGULAR,
                      color: Colors.BLACK,
                    }}>
                    State
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    alignItems: 'flex-end',
                    marginEnd: responsiveWidth(5),
                  }}>
                  <TextInput
                    value={intialState.property_address.state}
                    onChangeText={text =>
                      setIntialState({
                        ...intialState,
                        property_address: {
                          ...intialState.property_address,
                          state: text,
                        },
                      })
                    }
                    style={{
                      width: '90%',
                      borderColor: Colors.CARD_GREY,
                      borderWidth: 0.5,
                      height: 40,
                      paddingLeft: 10,
                      color: Colors.BLACK,
                    }}
                    // onChangeText={(text) => setPropertyAddress({ ...property_address, suburb: text })}
                    placeholder=""
                  />
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginStart: responsiveWidth(7),
                  marginTop: responsiveHeight(2),
                }}>
                <View
                  style={{
                    flex: 0.3,
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: responsiveFontSize(1.2),
                      fontFamily: FontFamily.POPPINS_REGULAR,
                      color: Colors.BLACK,
                    }}>
                    Pincode
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    alignItems: 'flex-end',
                    marginEnd: responsiveWidth(5),
                  }}>
                  <TextInput
                    value={intialState.property_address.pincode}
                    onChangeText={text =>
                      setIntialState({
                        ...intialState,
                        property_address: {
                          ...intialState.property_address,
                          pincode: text,
                        },
                      })
                    }
                    style={{
                      width: '90%',
                      borderColor: Colors.CARD_GREY,
                      borderWidth: 0.5,
                      height: 40,
                      paddingLeft: 10,
                      color: Colors.BLACK,
                    }}
                    // onChangeText={(text) => setPropertyAddress({ ...property_address, pincode: text })}
                    placeholder=""
                  />
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginStart: responsiveWidth(7),
                  marginTop: responsiveHeight(2),
                }}>
                <View
                  style={{
                    flex: 0.3,
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: responsiveFontSize(1.2),
                      fontFamily: FontFamily.POPPINS_REGULAR,
                      color: Colors.BLACK,
                    }}>
                    LGA
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    alignItems: 'flex-end',
                    marginEnd: responsiveWidth(5),
                  }}>
                  <TextInput
                    value={intialState.property_address.lga}
                    onChangeText={text =>
                      setIntialState({
                        ...intialState,
                        property_address: {
                          ...intialState.property_address,
                          lga: text,
                        },
                      })
                    }
                    style={{
                      width: '90%',
                      borderColor: Colors.CARD_GREY,
                      borderWidth: 0.5,
                      height: 40,
                      paddingLeft: 10,
                      color: Colors.BLACK,
                    }}
                    // onChangeText={(text) => { setPropertyAddress({ ...property_address, LGA: text }) }}r
                    placeholder=""
                  />
                </View>
              </View>
            </View>
            <View
              style={{
                backgroundColor: Colors.CARD_GREY,
                borderTopLeftRadius: responsiveWidth(2),
                borderTopRightRadius: responsiveWidth(2),
                width: '92%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: responsiveWidth(4),
                marginTop: responsiveHeight(1),
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontFamily: FontFamily.POPPINS_MEDIUM,
                  color: Colors.BLACK,
                  fontSize: responsiveFontSize(1.4),
                  marginStart: responsiveWidth(2),
                }}>
                Billing Address
              </Text>
              <View
                style={{
                  marginEnd: responsiveWidth(2),
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Checkbox
                  color="black"
                  status={showBusinessForm ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setShowBusinessForm(!showBusinessForm);
                  }}
                />
                <Text
                  style={{
                    color: Colors.BLACK,
                    fontSize: responsiveFontSize(1.4),
                  }}>
                  Same as property address
                </Text>
              </View>
            </View>

            {!showBusinessForm && (
              <>
                <BusinessAddForm
                  autoComplete={fillInPrimaryAddress}
                  intialState={intialState}
                  setIntialState={setIntialState}
                />
              </>
            )}

            <ButtonAtom
              onPress={() => {
                handleSubmit();
              }}
              style={{
                width: responsiveWidth(100),
                marginVertical: responsiveHeight(2),
              }}
              title={'Create Job'}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
      <Modal
        visible={customerSearchVisible}
        onDismiss={() => setCustomerSearchVisible(false)}
        contentContainerStyle={{
          backgroundColor: 'white',
          padding: 20,
        }}>
        <View
          style={{
            alignItems: 'flex-end',
          }}>
          <TextInput
            value={searchText}
            onChangeText={text => handleSearchCustomer(text)}
            placeholder="Search Customer..."
            style={{
              width: '100%',
              borderColor: Colors.BLACK,
              borderWidth: 0.5,
              height: 40,
              padding: 10,
              borderRadius: 20,
            }}
          />
        </View>
        <ScrollView>
          <List.Section style={{marginTop: 40}}>
            {list.map(obj => {
              return (
                <List.Item
                  onPress={() => handleSelectCustumer(obj)}
                  title={obj.first_name + ' ' + obj.last_name}
                  description={obj.email}
                />
              );
            })}
          </List.Section>
        </ScrollView>
      </Modal>
    </>
  );
};

export default CreateJob;
