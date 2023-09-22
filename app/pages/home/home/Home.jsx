import {
  View,
  Text,
  SafeAreaView, 
  FlatList,TouchableOpacity
  T
 } from 'react-native';
import React from 'react';
import Header from '../../../components/atoms/Header/Header';
import imagePath from '../../../constants/imagePath';
import Colors from '../../../styles/colors';
import {moderateScale, verticalScale} from '../../../utils/Dimensions';
import {dashboard} from '../../../constants/listData';
 
const Home = () => {
  const data = {
    labels: ["Swim", "Bike", "Run"], // optional
    data: [0.4, 0.6, 0.8]
  };
 
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.WHITE}}>
      <Header
        image={imagePath.LEFT}
        title="Dashboard"
        notification={imagePath.NOTIFICATION}
      />
      <View style={{flex: 1, backgroundColor: Colors.WHITE}}>
        <View
          style={{
            width: 350,
            flexDirection: 'row',
            backgroundColor: 'white',
            marginTop: 20,
            marginHorizontal: moderateScale(20),
          }}>
     
         
        </View>

        <View style={{flex: 1, marginVertical: 10}}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={dashboard}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity>
                  <View
                    style={{
                      height: moderateScale(35),
                      backgroundColor: Colors.CARD_HEADER,
                      marginHorizontal: moderateScale(10),
                      marginTop: moderateScale(20),
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderTopLeftRadius: moderateScale(5),
                      borderTopRightRadius: moderateScale(5),
                    }}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        fontSize: moderateScale(12),
                        color: Colors.BLACK,
                      }}>
                      Heat Pump Assessment
                    </Text>
                  </View>
                  <View
                    style={{
                      borderColor: Colors.GREY,
                      borderWidth: 1,
                      marginHorizontal: moderateScale(11),
                      paddingVertical: verticalScale(10),
                    }}>
                    <View
                      style={{
                        marginHorizontal: moderateScale(10),
                        flexDirection: 'row',
                        marginTop: verticalScale(17),
                        flex: 2,
                      }}>
                      <Text
                        style={{
                          marginStart: moderateScale(20),
                          fontWeight: 'bold',
                          fontSize: moderateScale(10),
                          color: Colors.DARK_GREY,
                        }}>
                        Customer Name :
                      </Text>
                      <Text
                        style={{
                          marginStart: moderateScale(20),
                          fontWeight: 'bold',
                          fontSize: moderateScale(10),
                          color: Colors.DARK_GREY,
                          flex: 1,
                        }}>
                        {item.customerName}
                      </Text>
                    </View>
                    <View
                      style={{
                        marginHorizontal: moderateScale(10),
                        flexDirection: 'row',
                        marginTop: verticalScale(4),
                        flex: 2,
                      }}>
                      <Text
                        style={{
                          marginStart: moderateScale(20),
                          fontWeight: 'bold',
                          fontSize: moderateScale(10),
                          color: Colors.DARK_GREY,
                        }}>
                        Mobile Number :
                      </Text>
                      <Text
                        style={{
                          marginStart: moderateScale(22),
                          fontWeight: 'bold',
                          fontSize: moderateScale(10),
                          color: Colors.DARK_GREY,
                          flex: 1,
                        }}>
                        {item.MobileNumber}
                      </Text>
                    </View>
                    <View
                      style={{
                        marginHorizontal: moderateScale(10),
                        flexDirection: 'row',
                        marginTop: verticalScale(4),
                        flex: 2,
                      }}>
                      <Text
                        style={{
                          marginStart: moderateScale(20),
                          fontWeight: 'bold',
                          fontSize: moderateScale(10),
                          color: Colors.DARK_GREY,
                        }}>
                        Scheduled Date :
                      </Text>
                      <Text
                        style={{
                          marginStart: moderateScale(20),
                          fontWeight: 'bold',
                          fontSize: moderateScale(10),
                          color: Colors.DARK_GREY,
                          flex: 1,
                        }}>
                        {item.ScheduledDate}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
export default Home;
