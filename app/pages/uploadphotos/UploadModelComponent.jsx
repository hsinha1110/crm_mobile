import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Image,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

// import ImagePicker from 'react-native-image-crop-picker';
import {useDispatch, useSelector} from 'react-redux';
import Colors from '../../styles/colors';
import imagePath from '../../constants/imagePath';
import FontFamily from '../../constants/FontFamily';
import {
  getAppointmentUploadedDocuments,
  getAppointmentUploadedDocumentsByCustomer,
  getDetailsByLatLong,
  getUplodedDocuments,
  uploadAppointmentQuestionsDocument,
  uploadAppointmentQuestionsDocumentByCustomer,
  uploadProfileQuestionsDocument,
} from '../../../redux/asyncThunk';
import ImagePicker from 'react-native-image-crop-picker';
import Toast from 'react-native-toast-message';
import {ActivityIndicator} from 'react-native-paper';
import {ROLE_TYPE} from '../../../redux/constants/services.constant';
import Geolocation from '@react-native-community/geolocation';
import {addressDetailsByLatLng} from '../../helpers';
import {Loader} from '../../components/atoms/Loader/Loader';

const UploadModel = props => {
  const {user} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [location, setLocation] = useState({});
  useEffect(() => {
    requestLocationPermission();
  }, []);
  const requestLocationPermission = async () => {
    Geolocation.getCurrentPosition(
      position => {
        const currentLongitude = JSON.stringify(position.coords.longitude);
        const currentLatitude = JSON.stringify(position.coords.latitude);
        const key = 'AIzaSyBO-6AKRGl3NxAyPB3g4ns9mb_qHdirGq0';

        dispatch(
          getDetailsByLatLong({
            lat: currentLatitude,
            lng: currentLongitude,
            key: key,
          }),
        )
          .unwrap()
          .then(response => {
            const postFIllData = {
              place_id: response.results[0].place_id,
              lat: response.results[0].geometry.location.lat,
              long: response.results[0].geometry.location.lng,
              formatted_address: response.results[0].formatted_address,
            };
            setLocation(postFIllData);
          });
      },
      error => {
        Alert.alert('Warning', 'Location permission denied', [
          {
            text: 'Cancel',
            style: 'cancel',
            onPress: () => props.navigation.goBack(),
          },
          {
            text: 'Give Permissions',
            onPress: () => requestLocationPermission(),
          },
        ]);
      },
    );
  };
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'App Camera Permission',
          message: 'App needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        camera();
      } else {
        Alert.alert('Warning', 'Camera permission denied', [
          {
            text: 'Cancel',
            style: 'cancel',
            onPress: () => props.onCancel(),
          },
          {text: 'Give Permissions', onPress: () => requestCameraPermission()},
        ]);
      }
    } catch (err) {
      props.onCancel();
    }
  };

  const camera = () => {
    ImagePicker.openCamera(
      props.question !== 5
        ? {
            width: 300,
            height: 300,
            cropping: true,
            compressImageQuality: 0.7,
          }
        : {mediaType: 'video'},
    )
      .then(image => {
        let data = new FormData();
        data.append('attachment', {
          type: image.mime,
          uri: image.path,
          name: image.path.split('/').pop(),
        });
        data.append('question', props.question);
        data.append('appointment', props.appointmentId);

        data.append('place_id', location.place_id);
        data.append('lat', '' + location.lat);
        data.append('long', '' + location.long);
        data.append('formatted_address', location.formatted_address);

        if (user.role_type === ROLE_TYPE.FIELD_WORKER) {
          handleUploadFieldWorker(data);
        } else {
          handleUploadCustomer(data);
        }
      })
      .catch(err => {
        if (err.code === 'E_PICKER_CANCELLED') {
          props.onCancel();
        }
      });
  };
  const handleUploadFieldWorker = data => {
    dispatch(
      uploadAppointmentQuestionsDocument({
        data,
        companyId: user.company_id,
      }),
    )
      .unwrap()
      .then(res => {
        dispatch(
          getAppointmentUploadedDocuments({
            appointment: props.appointmentId,
            companyId: user.company_id,
          }),
        );
        Toast.show({
          type: 'success',
          text1: 'Great!',
          text2: 'File Uploaded Successfully',
        });
        props.onCancel();
      })
      .catch(err => {
        Toast.show({
          type: 'error',
          text1: 'File Upload Failed',
          text2: 'Please Try Again',
        });
        props.onCancel();
      });
  };
  const handleUploadCustomer = data => {
    dispatch(
      uploadAppointmentQuestionsDocumentByCustomer({
        data,
      }),
    )
      .unwrap()
      .then(res => {
        dispatch(
          getAppointmentUploadedDocumentsByCustomer({
            appointment: props.appointmentId,
          }),
        );
        Toast.show({
          type: 'success',
          text1: 'Great!',
          text2: 'File Uploaded Successfully',
        });
        props.onCancel();
      })
      .catch(err => {
        Toast.show({
          type: 'error',
          text1: 'File Upload Failed',
          text2: 'Please Try Again',
        });
        props.onCancel();
      });
  };
  useEffect(() => {
    if (props.visible) {
      requestCameraPermission();
    }
  }, [props.visible]);

  return (
    <View>
      <Modal
        transparent={true}
        onRequestClose={props.onCancel}
        visible={props.visible}
        animationType="slide">
        <Loader visible={true} />
        {/* <View
          style={{
            justifyContent: 'center',
            height: responsiveHeight(10),
            marginHorizontal: responsiveWidth(8),
            marginTop: responsiveHeight(40),
            borderColor: Colors.DARK_GREY,
          }}>
          <ActivityIndicator size={'large'} />
          <View
            style={{
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
              marginTop: 20,
            }}>
            <Text>Please Wait</Text>
            <Text>File Is Uploading</Text>
          </View>
        </View> */}
      </Modal>
    </View>
  );
};

export default UploadModel;
