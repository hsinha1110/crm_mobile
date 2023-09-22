import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Image,
  PermissionsAndroid,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Colors from '../../../styles/colors';
import imagePath from '../../../constants/imagePath';
import FontFamily from '../../../constants/FontFamily';
import {useDispatch, useSelector} from 'react-redux';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {createCommentThunk} from '../../../../redux/asyncThunk/comment.Thunk';

const ModalComment = props => {
  const {user} = useSelector(state => state?.auth);
  const dispatch = useDispatch();
  const [description, setDescription] = useState('');
  const handleComment = () => {
    if (description) {
      // setLoading(true);
      dispatch(
        createCommentThunk({
          company_id: user?.company_id,
          comment: {
            description,
          },
          summary_type: 'comment',
          // user: user?.id,
          appointment: props?.details?.id,
        }),
      )
        .unwrap()
        .then(res => {
          props?.handlerefreshList();
          props?.onCancel();
          Toast.show({
            type: 'success',
            text1: 'Great!',
            text2: 'Comment Craete Successfully',
          });
        });
    }
  };

  return (
    <View>
      <Modal
        onRequestClose={props.onClose}
        visible={props.visible}
        transparent={true}
        animationType="slide">
        <View style={{backgroundColor: 'transparent', flex: 1}}>
          <View
            style={{
              justifyContent: 'center',
              backgroundColor: Colors.CARD_GREY,
              height: responsiveHeight(30),
              marginHorizontal: responsiveWidth(8),
              marginTop: responsiveHeight(31),
              borderColor: Colors.DARK_GREY,
            }}>
            <View
              style={{
                justifyContent: 'center',
                width: '100%',
                marginStart: responsiveWidth(10),
              }}>
              <View
                style={{
                  height: responsiveHeight(22),
                  backgroundColor: Colors.WHITE,
                  marginTop: responsiveHeight(5),
                  width: '77%',
                  borderRadius: responsiveWidth(2),
                }}>
                <TouchableOpacity
                  onPress={props.onCancel}
                  style={{
                    position: 'absolute',
                    bottom: responsiveHeight(23),
                    right: responsiveWidth(-6),
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
                  }}>
                  <Image
                    style={{width: 15, height: 15, tintColor: Colors.BLACK}}
                    source={imagePath.CLOSE}
                  />
                </TouchableOpacity>
                <Text
                  style={{
                    fontFamily: FontFamily.POPPINS_REGULAR,
                    fontSize: responsiveFontSize(1.4),
                    color: Colors.DARK_GREY,
                    padding: responsiveWidth(5),
                  }}>
                  Add Comments
                </Text>
                <TextInput
                  value={description}
                  onChangeText={e => setDescription(e)}
                  style={{
                    fontFamily: FontFamily.POPPINS_LIGHT,
                    fontSize: 12,
                    height: 63,
                    marginHorizontal: responsiveWidth(4),
                    textAlignVertical: 'top',
                    borderColor: Colors.CARD_GREY,
                    borderWidth: 1,
                    paddingStart: 11,
                  }}
                  numberOfLines={10}
                  multiline={true}
                  placeholder="Add a comment"
                />
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    onPress={() => handleComment()}
                    style={{
                      backgroundColor: Colors.BLUE,
                      width: 73,
                      borderRadius: responsiveWidth(1),
                      alignItems: 'center',
                      height: 25,
                      marginTop: responsiveHeight(3),
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        fontFamily: FontFamily.POPPINS_REGULAR,
                        fontSize: 10,
                        color: Colors.WHITE,
                      }}>
                      Add
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={{marginVertical: responsiveWidth(4)}}></View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ModalComment;
