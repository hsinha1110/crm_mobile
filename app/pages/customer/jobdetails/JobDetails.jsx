import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import Header from '../../../components/atoms/Header/Header';
import imagePath from '../../../constants/imagePath';
import Colors from '../../../styles/colors';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import FontFamily from '../../../constants/FontFamily';
import styles from '../services/styles';
import {Checkbox, RadioButton} from 'react-native-paper';
import {workTypeData} from '../../../constants/listData';

const JobDetails = () => {
  const [self, setSelf] = useState(true);
  const [selectedIndex, setSelectIndex] = useState(0);
  const _renderItem = ({item, index}) => {
    return (
      <View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <RadioButton
            innerColor={Colors.BLUE}
            outerColor={Colors.CARD_GREY}
            animation={'bounceIn'}
            isSelected={selectedIndex === index}
            onPress={() => {
              setSelectIndex(index);
            }}
          />
          <Text
            style={{
              fontSize: responsiveFontSize(1.4),
              color: Colors.BLACK,
              FontFamily: FontFamily.POPPINS_MEDIUM,
            }}>
            {item.title}
          </Text>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: responsiveWidth(8),
            backgroundColor: Colors.CARD_HEADER,
            height: 100,
            width: 100,
            borderRadius: responsiveWidth(2),
          }}>
          <View>
            <Image
              resizeMode="center"
              style={{width: 60, height: 60}}
              source={item.image}
            />
          </View>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={{height: 40, backgroundColor: Colors.WHITE}}>
        <Header
          onPress={() => navigation.goBack()}
          toggle={imagePath.LEFT}
          title="Job Details"
          image={imagePath.LEFT}
          notification={imagePath.NOTIFICATION}
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{flex: 1, backgroundColor: Colors.WHITE}}>
          <View style={styles.container}>
            <View
              style={{
                marginHorizontal: responsiveWidth(5),
                marginTop: responsiveHeight(1),
              }}>
              <Text
                style={{
                  color: Colors.BLACK,
                  fontSize: responsiveFontSize(1.4),
                  fontFamily: FontFamily.POPPINS_MEDIUM,
                }}>
                Do you want to self assess ?
              </Text>
            </View>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                marginHorizontal: responsiveWidth(2),
                alignItems: 'center',
              }}>
              <Checkbox
                color="black"
                status={setSelf ? 'checked' : 'unchecked'}
                onPress={() => {
                  setSelf(!self);
                }}
              />
              <Text
                style={{
                  fontSize: responsiveFontSize(1.4),
                  fontFamily: FontFamily.POPPINS_MEDIUM,
                  color: Colors.BLACK,
                }}>
                Self
              </Text>
            </View>
            <View
              style={{
                marginTop: responsiveHeight(2),
                width: '100%',
                flexDirection: 'row',
                marginHorizontal: responsiveWidth(4),
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: responsiveFontSize(2),
                  fontFamily: FontFamily.POPPINS_MEDIUM,
                  color: Colors.BLACK,
                }}>
                Select the Work Type
              </Text>
            </View>
            <View
              style={{
                padding: 5,
                backgroundColor: Colors.CARD_GREY,
                borderWidth: 1,
                marginTop: responsiveHeight(2),
                borderColor: Colors.CARD_GREY,
                borderTopLeftRadius: responsiveWidth(2),
                borderTopRightRadius: responsiveWidth(2),
                marginHorizontal: responsiveWidth(4),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontFamily: FontFamily.POPPINS_MEDIUM,
                  fontSize: responsiveFontSize(1.4),
                  color: Colors.BLACK,
                }}>
                Work Type
              </Text>
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginHorizontal: responsiveWidth(4),
                borderColor: Colors.CARD_GREY,
                borderWidth: 1,
              }}>
              <FlatList
                numColumns={2}
                data={workTypeData}
                renderItem={_renderItem}
              />
            </View>
            <View
              style={{
                marginTop: responsiveHeight(4),
                width: '100%',
                flexDirection: 'row',
                marginHorizontal: responsiveWidth(4),
                alignItems: 'center',
                bottom: 10,
              }}>
              <Text
                style={{
                  fontSize: responsiveFontSize(2),
                  fontFamily: FontFamily.POPPINS_MEDIUM,
                  color: Colors.BLACK,
                }}>
                Enter instructions
              </Text>
            </View>
            <View
              style={{
                padding: 5,
                backgroundColor: Colors.CARD_GREY,
                borderWidth: 1,
                borderColor: Colors.CARD_GREY,
                borderTopLeftRadius: responsiveWidth(2),
                borderTopRightRadius: responsiveWidth(2),
                marginHorizontal: responsiveWidth(4),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontFamily: FontFamily.POPPINS_MEDIUM,
                  fontSize: responsiveFontSize(1.4),
                  color: Colors.BLACK,
                }}>
                instructions
              </Text>
            </View>
            <View
              style={{
                marginHorizontal: responsiveWidth(4),
                borderColor: Colors.CARD_GREY,
                borderWidth: 1,
              }}>
              <View
                style={{
                  marginHorizontal: responsiveWidth(5),
                }}>
                <TextInput
                  style={{textAlignVertical: 'top'}}
                  placeholder="Enter instructions for the appointment"
                />
              </View>
            </View>
          </View>
          <View style={{marginTop: 10}}>
            <TouchableOpacity
              onPress={() => {}}
              style={{
                backgroundColor: Colors.BLUE,
                width: '100%',
                height: responsiveHeight(6),
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 10,
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

            <View>
              <TouchableOpacity
                onPress={() => {}}
                style={{
                  backgroundColor: Colors.CARD_GREY,
                  width: '100%',
                  height: responsiveHeight(6),
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 10,
                }}>
                <Text
                  style={{
                    color: Colors.BLACK,
                    fontFamily: FontFamily.POPPINS_MEDIUM,
                    fontSize: responsiveFontSize(1.4),
                  }}>
                  Start Assessment
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default JobDetails;
