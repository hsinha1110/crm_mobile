import React, {useEffect, useState} from 'react';
import {View, Text, TabBarIOSItem, TextInput} from 'react-native';
import {RadioButton} from 'react-native-paper';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {useDispatch, useSelector} from 'react-redux';
import {
  appointmentStatusListThunk,
  getAppointmentWorkType,
} from '../../../../redux/asyncThunk/appointment.Thunk';

import FontFamily from '../../../constants/FontFamily';
import Colors from '../../../styles/colors';
import {moderateScale, verticalScale} from '../../../utils/Dimensions';
import InnerCard from '../../molecules/InnerCard/InnerCard';
import Card2 from '../Card/Card2';
const RadioButtonComp = ({setInitialValues, initialValues}) => {
  const [checked, setChecked] = React.useState('Published');
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.auth);

  const [data, setData] = useState('');

  // const userData = data.map(e => {l

  //   return (
  //     <View>
  //     <RadioButton color="black" value= {e.label}/>
  //     </View>
  //   );
  // });

  useEffect(() => {
    // const id = { x?y:z}
    dispatch(getAppointmentWorkType({company_id: user.company_id?user.company_id:1  }))
      .unwrap()
      .then(res => {
      })
      .catch(err => {
      });
  }, []);
  const {appointmentWorkType} = useSelector(state => state.appointment);

  const handleClick = text => {
    setData(text);
    setInitialValues({...initialValues, work_type: text});
  };

  return (
    <View style={{width: '100%'}}>
      {/*Create first radio button */}
      <View style={{flexDirection: 'column', alignContent: 'center'}}>
        {appointmentWorkType?.map((item, index) => (
          <View key={index} style={{flexDirection: 'row'}}>
            <RadioButton
              value={item?.id}
              color="black"
              status={item?.id === data ? 'checked' : 'unchecked'}
              onPress={() => handleClick(item?.id)}
            />

            <Text
              style={{
                marginTop: verticalScale(7),
                fontSize: responsiveFontSize(1.4),
                fontFamily: FontFamily.POPPINS_MEDIUM,
                color : Colors.BLACK
              }}>
              {item.title}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};
export default RadioButtonComp;
