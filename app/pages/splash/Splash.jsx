import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View, SafeAreaView, Image, Text} from 'react-native';
import imagePath from '../../constants/imagePath';
import navigationPath from '../../constants/navigationPath';
import Colors from '../../styles/colors';
import styles from './styles';

const Splash = () => {
  const [timePassed, setTimePassed] = useState(false);
  const navigation = useNavigation();
  setTimeout(function () {
    setTimePassed(true);
  }, 2000);

  if (!timePassed) {
    return (
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <Image
              resizeMode={'cover'}
              style={styles.logo}
              source={imagePath.LOGO}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
  navigation.navigate(navigationPath.ONBOARDING);
  return null;
};

export default Splash;
