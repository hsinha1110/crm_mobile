import {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import imagePath from '../../../constants/imagePath';
import Colors from '../../../styles/colors';

const DropDown = ({onPress, data = []}) => {
  const [showOptions, setShowOptions] = useState(false);
  return (
    <View>
      <TouchableOpacity
        onPress={() => setShowOptions(!showOptions)}
        activeOpacity={0.8}
        style={styles.dropDownStyle}>
        <Text>Choose an option</Text>

        <Image
          style={{
            width: 20,
            height: 20,
            transform: [{rotate: showOptions ? '180deg' : '0deg'}],
          }}
          source={imagePath.DROPDOWN}
        />
      </TouchableOpacity>
      <View>
        {showOptions && (
          <View>
            {data.map((val, i) => {
              return (
                <TouchableOpacity
                  onPress={onPress}
                  style={{
                    padding: 10,
                    borderWidth: 1,
                    borderColor: '#cfcfcf',
                  }}>
                  <Text key={String(i)}>{val.name}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  dropDownStyle: {
    marginHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 5,
    elevation: 1000 ,
    zIndex: 1000,
    backgroundColor: Colors.WHITE,
  },
});
export default DropDown;
