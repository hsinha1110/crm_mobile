import {View, Text, SafeAreaView, FlatList} from 'react-native';
import React from 'react'; 
  import { useNavigation } from '@react-navigation/native';
import Card2 from '../../../../components/atoms/Card/Card2';
import Card from '../../../../components/atoms/Card/Card';
import Colors from '../../../../styles/colors';
import imagePath from '../../../../constants/imagePath';
import { horizontalScale, moderateScale } from '../../../../utils/Dimensions';
import Header from '../../../../components/atoms/Header/Header';
import { upload } from '../../../../constants/listData';
import navigationPath from '../../../../constants/navigationPath';
const Details = () => {
  const navigation = useNavigation()
  return (
    <SafeAreaView style={{backgroundColor: Colors.WHITE, flex: 1}}>
      <View>
        <Header onPress={()=>{navigation.navigate('JobDetails')}}
          image={imagePath.LEFT}
          title="Base Price & Photos"
          notification={imagePath.NOTIFICATION}
        />
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            marginHorizontal: horizontalScale(10),
            padding: 10,
          }}>
          <Text
            style={{
              color: Colors.BLACK,
              fontWeight: 'bold',
              fontSize: moderateScale(16),
            }}>
            Heat Pump Assesment
          </Text>
          <Text
            style={{
              color: Colors.BLUE,
              fontWeight: 'bold',
              fontSize: moderateScale(16),
            }}>
            APPT ID:8525
          </Text>
        </View>
        <View style={{backgroundColor: Colors.WHITE, justifyContent: 'center'}}>
          <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 180}}
            data={upload}
            renderItem={({item, index}) => {
              if (index === 0) {
                return <Card2 title={item.title} basePrice={item.basePrice} />;
              } else {
                return <Card title={item.title}  onPress={()=>{navigation.navigate(navigationPath.DETAILS)}}/>;
              }
            }}
          />

        </View>
      </View>
    </SafeAreaView>
  );
};

export default Details;
