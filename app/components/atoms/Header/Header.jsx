import {Image, Text, TouchableOpacity, View} from 'react-native';
import {
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import FontFamily from '../../../constants/FontFamily';
import imagePath from '../../../constants/imagePath';
import Colors from '../../../styles/colors';
import {horizontalScale, moderateScale} from '../../../utils/Dimensions';
import styles from '../Header/styles';

const Header = ({
  image,
  title,
  titleTwo,
  toggle = {},
  notification = {},
  onPress,
}) => {
  return (
    <View style={styles.container}>
      <View
        style={{flex: 1, justifyContent: 'space-between', height: 40}}>
        <View style={styles.logoContainer}>
          <TouchableOpacity onPress={onPress}>
            <Image
              source={image}
              resizeMode={'cover'}
              style={styles.backIcon}
            />
          </TouchableOpacity>
          <View style={{flex:1, marginStart:responsiveWidth(2)}}>
            <Text
              style={{
                fontSize: responsiveFontSize(2),
                 color: Colors.BLACK,
                 fontFamily: FontFamily.POPPINS_REGULAR,
              }}>
              {title}
            </Text>
          </View>
          <View>
            {!!titleTwo ? (
              <View style={{marginHorizontal: responsiveWidth(4)}}>
                <Text
                  style={{
                    fontSize: responsiveFontSize(2),
                    alignSelf: 'center',
                    color: Colors.BLACK,
                    marginRight: responsiveWidth(2),
                    fontFamily: FontFamily.POPPINS_REGULAR,
                  }}>
                  {title}
                </Text>
              </View>
            ) : null}
          </View>
          <TouchableOpacity>
            {!!notification ? (
              <Image
                resizeMode={'cover'}
                source={notification}
                style={[styles.backIcon]}
              />
            ) : null}
          </TouchableOpacity>
          {/* <TouchableOpacity onPress={onPress}>
          {!!toggle? (
            <Image
              resizeMode={'cover'}
              source={notification}
              style={[styles.backIcon]}
            />
          ) : null}
        </TouchableOpacity> */}
        </View>
      </View>
    </View>
  );
};
export default Header;
