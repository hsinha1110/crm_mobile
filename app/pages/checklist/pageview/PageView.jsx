import {Image, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import Header from '../../../components/atoms/Header/Header';
import imagePath from '../../../constants/imagePath';
import styles from '../../../pages/checklist/pageview/styles';
import HeaderNote from '../../../components/atoms/HeaderNote/HeaderNote';
import navigationPath from '../../../constants/navigationPath';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../utils/Dimensions';
import Colors from '../../../styles/colors';
import { useNavigation } from '@react-navigation/native';

const PageView = () => {
  const navigation = useNavigation()
  const onSuccess = e => {
    try {
       alert(Object.values(e))
    } catch (error) {
      alert(error)
     }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <Header image={imagePath.LEFT} title="NPC 100 Point Checklist" />
      <HeaderNote
        note="Note : "
        title={
          'A minimum of 100 points of identification has to be provided with an application.'
        }
      />
      <QRCodeScanner
        cameraContainerStyle={{
          marginTop: verticalScale(50),
        }}
        onRead={onSuccess}
        flashMode={RNCamera.Constants.FlashMode.off}
      />
      <View style={{flex: 1}}></View>
      <View style={styles.bottomView}>
        <View
          style={{
            backgroundColor: Colors.BLUE,
            height: verticalScale(35),
            borderTopLeftRadius: horizontalScale(5),
            justifyContent: 'space-between',
            flexDirection: 'row',
            paddingHorizontal: horizontalScale(10),
            marginHorizontal: horizontalScale(10),
            alignItems: 'center',
            borderTopRightRadius: horizontalScale(5),
          }}>
          <Text style={{color: Colors.WHITE}}>Document List</Text>
          <Text style={{color: Colors.WHITE}}>Document List</Text>
        </View>

        <View
          style={{
            backgroundColor: Colors.WHITE,
            height: verticalScale(35),
            borderWidth: 0.5,
            borderColor: Colors.DARK_GREY,
            justifyContent: 'space-between',
            flexDirection: 'row',
            paddingHorizontal: horizontalScale(10),
            marginHorizontal: horizontalScale(10),
            alignItems: 'center',
            marginBottom: verticalScale(8),
          }}>
          <Text style={{color: Colors.BLACK}}>Foreign Passport (Current)</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{color: Colors.BLUE, marginEnd: moderateScale(10)}}>
              70 Pts
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigationPath.POINT_CHECK_LIST;
              }}>
              <Image
                source={imagePath.BIN}
                style={{
                  marginEnd: moderateScale(10),
                  width: moderateScale(15),
                  height: moderateScale(15),
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate(navigationPath.APPOINTMENT_DETAILS)}>
              <Image
                source={imagePath.EDIT}
                style={{
                  marginEnd: moderateScale(10),
                  width: moderateScale(15),
                  height: moderateScale(15),
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{navigation.navigate(navigationPath.JOB_DETAILS)}}>
              <Image
                source={imagePath.VIEW}
                style={{width: moderateScale(15), height: moderateScale(15)}}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default PageView;
