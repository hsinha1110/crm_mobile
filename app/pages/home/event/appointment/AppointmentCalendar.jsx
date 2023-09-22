import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import React from 'react';
import imagePath from '../../../../constants/imagePath';
import FontFamily from '../../../../constants/FontFamily';
import Colors from '../../../../styles/colors';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Header from '../../../../components/atoms/Header/Header';
import styles from './styles';
import {appointmentDetails} from '../../../../constants/listData';
import {moderateScale, verticalScale} from '../../../../utils/Dimensions';
import navigationPath from '../../../../constants/navigationPath';
import {useNavigation} from '@react-navigation/native';

const AppointmentCalendar = () => {
  let customDatesStyles = [];
  let startDate = moment();
  for (let i=0; i<6; i++) {
    customDatesStyles.push({
        startDate: startDate.clone().add(i, 'days'), // Single date since no endDate provided
        dateNameStyle: styles.dateNameStyle,
        dateNumberStyle: styles.dateNumberStyle,
        // Random color...
        dateContainerStyle: { backgroundColor: `#${(`#00000${(Math.random() * (1 << 24) | 0).toString(16)}`).slice(-6)}` },
      });
  }
  const navigation = useNavigation();
  const _renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate(navigationPath.UPLOAD_PHOTOS)}>
        <View
          style={{
            borderColor: Colors.CARD_GREY,
            borderTopLeftRadius: moderateScale(5),
            borderTopRightRadius: moderateScale(5),
            borderWidth: 1,
            marginHorizontal: 10,
          }}>
          <View
            style={{
              height: moderateScale(35),
              backgroundColor: Colors.CARD_GREY,
              justifyContent: 'center',
              alignItems: 'center',
              borderTopLeftRadius: moderateScale(5),
              borderTopRightRadius: moderateScale(5),
            }}>
            <Text
              style={{
                fontFamily: FontFamily.POPPINS_SEMIBOLD,
                fontSize: responsiveFontSize(1.2),
                color: Colors.BLACK,
              }}>
              {item.job_details}
            </Text>
          </View>
          <View
            style={{
              marginHorizontal: moderateScale(11),
              flex: 1,
            }}>
            <View
              style={{
                flexDirection: 'row',
                marginTop: verticalScale(5),
                flex: 0.7,
              }}>
              <Text
                style={{
                  fontFamily: FontFamily.POPPINS_REGULAR,
                  color: Colors.BLACK,
                  fontSize: responsiveFontSize(1.2),
                }}>
                Job ID :
              </Text>
              <View style={{flex: 0.62, alignItems: 'center'}}>
                <Text
                  style={{
                    
                    fontFamily: FontFamily.POPPINS_MEDIUM,
                    color: Colors.DARK_GREY,
                    fontSize: responsiveFontSize(1.2),
                  }}>
                  {item.jobId}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              marginHorizontal: moderateScale(11),
              flex: 1,
            }}>
            <View
              style={{
                flexDirection: 'row',
                marginTop:responsiveHeight(1)
              }}>
              <Text
                style={{
                  fontFamily: FontFamily.POPPINS_REGULAR,
                  color: Colors.BLACK,
                  fontSize: responsiveFontSize(1.2),
                }}>
                Status:
              </Text>
              <View style={{flex: 0.85, alignItems: 'center'}}>
                <View
                  style={{
                    flex: 0.66,
                    width: 100,
                    alignItems: 'center',
                    backgroundColor: Colors.DARK_GREY,
                  }}>
                  <Text
                    style={{
                      fontFamily: FontFamily.POPPINS_MEDIUM,
                      color: Colors.WHITE,

                      fontSize: responsiveFontSize(1.2),
                    }}>
                    {item.status}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View
            style={{
              marginHorizontal: moderateScale(11),
              flex: 1,
            }}>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <Text
                style={{
                  fontFamily: FontFamily.POPPINS_REGULAR,
                  color: Colors.BLACK,
                  marginTop:responsiveHeight(1),
                  fontSize: responsiveFontSize(1.2),
                }}>
                {`Scheduled Date \n& Time:
              `}
              </Text>
              <View style={{flex: 0.95, alignItems: 'center'}}>
                <View
                  style={{
                    flex: 1,
                     alignItems: 'center',
                     marginTop:responsiveHeight(1)
                   }}>
                  <Text
                    style={{
                      fontFamily: FontFamily.POPPINS_MEDIUM,
                      color: Colors.DARK_GREY,

                      fontSize: responsiveFontSize(1.2),
                    }}>
                    {item.scheduled}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View
          style={{
            marginHorizontal: moderateScale(11),
            flex: 1,
          }}>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <Text
              style={{
                fontFamily: FontFamily.POPPINS_REGULAR,
                color: Colors.BLACK,
                 fontSize: responsiveFontSize(1.2),
              }}>
              {`Duration:
            `}
            </Text>
            <View style={{flex: 1.7, alignItems: 'center'}}>
              <View
                style={{ 
                   marginStart:responsiveWidth(5),
                   alignItems: 'center',
                   justifyContent:'center'
                  }}>
                <Text
                  style={{
                    fontFamily: FontFamily.POPPINS_MEDIUM,
                    color: Colors.DARK_GREY,
                     
                    fontSize: responsiveFontSize(1.2),
                  }}>
                  {item.duratiion}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View
        style={{
          marginHorizontal: moderateScale(11),
          flex: 1,
        }}>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <Text
            style={{
              fontFamily: FontFamily.POPPINS_REGULAR,
              color: Colors.BLACK,
               fontSize: responsiveFontSize(1.2),
            }}>
            {`Job Instructions:
          `}
          </Text>
          <View style={{flex: 1.1, alignItems: 'center'}}>
            <View
              style={{ 
                  alignItems: 'center',
                  justifyContent:'center'
                }}>
              <Text
                style={{
                  fontFamily: FontFamily.POPPINS_MEDIUM,
                  color: Colors.DARK_GREY,
                   
                  fontSize: responsiveFontSize(1.2),
                }}>
                {item.duratiion}
              </Text>
            </View>
          </View>
        </View>
      </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View
        style={{
          width: '100%',
          backgroundColor: Colors.WHITE,
          height: responsiveHeight(6),
          justifyContent: 'center',
        }}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Image
            source={imagePath.LEFT}
            style={{height: 23, width: 23, marginStart: responsiveWidth(4)}}
          />
          <Text
            style={{
              fontFamily: FontFamily.POPPINS_REGULAR,
              flex: 1,
              marginStart: responsiveWidth(5),
              fontSize: responsiveFontSize(2),
              color: Colors.BLACK,
            }}>
            Appointment Calendar
          </Text>
          <Image
            source={imagePath.NOTIFICATION}
            style={{height: 20, width: 20, marginEnd: responsiveWidth(4)}}
          />
          <Image
            source={imagePath.LEFT}
            style={{height: 23, width: 23, marginEnd: responsiveWidth(4)}}
          />
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          height: responsiveHeight(5),
          alignItems: 'center',
          backgroundColor: Colors.WHITE,
          marginHorizontal: responsiveWidth(3),
        }}>
        <Text
          style={{
            color: Colors.BLACK,
            fontFamily: FontFamily.POPPINS_MEDIUM,
            fontSize: responsiveFontSize(1.6),
          }}>
          Head Pump Assessment
        </Text>
        <Text
          style={{
            color: Colors.BLUE,
            fontFamily: FontFamily.POPPINS_MEDIUM,
            fontSize: responsiveFontSize(1.6),
          }}>
          APPT ID:8525
        </Text>
      </View>
      <View style={styles.containerMain}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={appointmentDetails}
          renderItem={_renderItem}
        />
        <View style={styles.bottomView}>
          <TouchableOpacity
            onPress={() => navigation.navigate(navigationPath.DETAILS)}
            style={{
              height: moderateScale(42),
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: Colors.BLUE,
            }}>
            <Text style={{color: Colors.WHITE, fontSize: moderateScale(14)}}>
              Enter Base Price & Upload Photos
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AppointmentCalendar;
