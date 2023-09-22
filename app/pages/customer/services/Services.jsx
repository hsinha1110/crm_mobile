import {
  View,
  Text,
  FlatList,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {categoryData} from '../../../constants/listData';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Colors from '../../../styles/colors';
import imagePath from '../../../constants/imagePath';
import FontFamily from '../../../constants/FontFamily';
import styles from './styles';
import navigationPath from '../../../constants/navigationPath';
import {useNavigation} from '@react-navigation/native';

const Services = () => {
  const navigation = useNavigation();
  const _renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={{
          width: '50%',
          marginTop: responsiveHeight(2),
          justifyContent: 'center',
          height: responsiveHeight(17),
          margin: responsiveWidth(0.5),
          alignItems: 'center',
          backgroundColor: Colors.CARD_GREY,
        }}>
        <Text>{item.name}</Text>

        <Image
          resizeMode={'cover'}
          style={{width: 60, height: 60, marginTop: responsiveHeight(2)}}
          source={item.image}
        />
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: responsiveHeight(6),
          marginHorizontal: responsiveWidth(2),
        }}>
        <TouchableOpacity>
          <Image style={{width: 20, height: 20}} source={imagePath.LEFT} />
        </TouchableOpacity>
        <View style={{flex: 1, marginHorizontal: responsiveWidth(2.6)}}>
          <Text
            style={{
              fontSize: responsiveFontSize(2),
              fontFamily: FontFamily.POPPINS_REGULAR,
            }}>
            Services
          </Text>
        </View>
        <TouchableOpacity>
          <Image
            style={{width: 20, height: 20, marginEnd: responsiveWidth(2)}}
            source={imagePath.NOTIFICATION}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.mainBody}>
        <View
          style={{
            marginTop: responsiveHeight(12),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontFamily: FontFamily.POPPINS_SEMIBOLD,
              fontSize: responsiveFontSize(1.6),
              color: Colors.BLACK,
            }}>
            Select a service
          </Text>
        </View>
        <View>
          <FlatList
            contentContainerStyle={{marginHorizontal: responsiveWidth(4)}}
            numColumns={2}
            data={categoryData}
            renderItem={_renderItem}
          />
        </View>
      </View>
      <View style={styles.bottomView}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(navigationPath.DASHBOARD);
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
            Next
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Services;
