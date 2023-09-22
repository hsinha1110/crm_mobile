// React Native App Intro Slider using AppIntroSlider
// https://aboutreact.com/react-native-app-intro-slider/
// Simple Intro Slider

// import React in our code
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
// import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  Button,
  Pressable,
} from 'react-native';

//import AppIntroSlider to use it
import AppIntroSlider from 'react-native-app-intro-slider';
import {slides} from '../../constants/listData';
import Colors from '../../styles/colors';
import {verticalScale} from '../../utils/Dimensions';
import FontFamily from '../../constants/FontFamily';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import navigationPath from '../../constants/navigationPath';
import imagePath from '../../constants/imagePath';

const Onboarding = () => {
  const navigation = useNavigation();
  const [showRealApp, setShowRealApp] = useState(false);

  const Dots = ({selected}) => {
    let backgroundColor;
    backgroundColor = selected ? '#0C1559' : '#707070';
    return (
      <View
        style={{
          width: 6,
          height: 6,
          marginHorizontal: 3,
          backgroundColor,
        }}
      />
    );
  };

  const _renderItem = ({item}) => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.WHITE,
          alignItems: 'center',
          paddingTop: verticalScale(10),
          justifyContent: 'space-around',
        }}>
        <Image
          style={styles.introImageStyle}
          source={item.image}
          resizeMode={'contain'}
        />

        <Text style={styles.introTitleStyle}>{item.title}</Text>
      </View>
    );
  };

  return (
    <>
      {/* */}
      {showRealApp ? (
        <SafeAreaView style={styles.container}>
          <View style={styles.container}>
            <Text style={styles.titleStyle}>{item.title}</Text>

            <Button
              title="Show Intro Slider again"
              onPress={() => setShowRealApp(false)}
            />
          </View>
        </SafeAreaView>
      ) : (
        <AppIntroSlider
          data={slides}
          renderItem={_renderItem}
          showSkipButton={false}
          showNextButton={true}
          showPrevButton={true}
          showDoneButton={true}
          renderNextButton={() => (
            <Image
              source={imagePath.LEFT}
              style={{
                width: 30,
                height: 30,
                marginTop: 10,
                transform: [{rotate: '180deg'}],
              }}
            />
          )}
          renderPrevButton={() => (
            <Image
              source={imagePath.LEFT}
              style={{
                width: 30,
                height: 30,
                marginTop: 10,
              }}
            />
          )}
          renderDoneButton={() => (
            <Text style={{fontSize: 20, marginTop: 15, marginRight: 5}}>
              Done
            </Text>
          )}
          activeDotStyle={{
            backgroundColor: Colors.NAVY_BLUE,
            width: 15,
            height: 15,
            borderRadius: 7,
          }}
          dotStyle={{
            borderColor: Colors.DOT_COLOR,
            borderWidth: 1,
            backgroundColor: Colors.WHITE,
          }}
          DotComponent={Dots}
          onSkip={() => navigation.replace(navigationPath.CATEGORIES)}
          onDone={() => navigation.navigate(navigationPath.CATEGORIES)}
        />
      )}
    </>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    justifyContent: 'center',
  },
  titleStyle: {
    padding: 10,
    textAlign: 'center',
  },
  paragraphStyle: {
    padding: 20,
    textAlign: 'center',
    fontFamily: FontFamily.POPPINS_REGULAR,
  },
  introImageStyle: {
    width: '80%',
    marginTop: verticalScale(50),
  },
  introTextStyle: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    paddingVertical: 30,
  },
  introTitleStyle: {
    fontSize: responsiveFontSize(1.8),
    color: Colors.NAVY_BLUE,
    textAlign: 'center',
    marginBottom: 300,
    fontFamily: FontFamily.POPPINS_REGULAR,
  },
});
