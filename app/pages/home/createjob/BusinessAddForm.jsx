import React from 'react';
import {Text, TextInput, View} from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {Checkbox} from 'react-native-paper';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Search from '../../../components/molecules/Search/Search';
import FontFamily from '../../../constants/FontFamily';
import Colors from '../../../styles/colors';

const BusinessAddForm = ({intialState, setIntialState,autoComplete}) => {
  return (
    <>
      <View
        style={{
          borderColor: Colors.CARD_GREY,
          borderWidth: 1,
          marginHorizontal: responsiveWidth(4),
        }}>
        <View style={{flex: 1, backgroundColor: Colors.WHITE}}>
          <View
            style={{
              marginTop: responsiveHeight(1),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
           
          </View>
          <View>
          <GooglePlacesAutocomplete
                placeholder="Search Address"
                fetchDetails={true}
                onPress={(data, details) => {
                  autoComplete(details.address_components,"business");
                 
                }}
                styles={{
                  container: {
                    color: Colors.BLACK,
                  },
                  listView: {
                    color: Colors.BLACK,
                  },
                  textInputContainer: {
                    marginTop: responsiveHeight(1),
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginHorizontal: responsiveWidth(4),
                    color: Colors.BLACK,
                  },
                  textInput: {
                    width: '90%',
                    borderColor: Colors.CARD_GREY,
                    borderWidth: 0.5,
                    height: 40,
                    color: Colors.BLACK,
                  },
                }}
                currentLocation={true}
                GooglePlacesDetailsQuery={{
                  types: ['route', 'geocode', 'address'],
                }}
                query={{
                  key: 'AIzaSyBO-6AKRGl3NxAyPB3g4ns9mb_qHdirGq0',
                  language: 'en',
                  types: ['address', 'route', 'geocode'],
                }}
              />
            <View
              style={{
                flexDirection: 'row',
                marginStart: responsiveWidth(7),
                marginTop: responsiveHeight(2),
              }}>
              <View
                style={{
                  flex: 0.3,
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontSize: responsiveFontSize(1.2),
                    fontFamily: FontFamily.POPPINS_REGULAR,
                    color: Colors.BLACK,
                  }}>
                  Building Name
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: 'flex-end',
                  marginEnd: responsiveWidth(5),
                }}>
                <TextInput
                  value={intialState.business_address.building_number}
                  onChangeText={text =>
                    setIntialState({
                      ...intialState,
                      business_address: {
                        ...intialState.business_address,
                        building_number: text,
                      },
                    })
                  }
                  style={{
                    width: '90%',
                    borderColor: Colors.CARD_GREY,
                    borderWidth: 0.5,
                    height: 40,
                    paddingLeft: 10,
                    color: Colors.BLACK,
                  }}
                  // onChangeText={(text) => setPropertyAddress({ ...business_address, building_name: text })}
                  placeholder=""
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginStart: responsiveWidth(7),
                marginTop: responsiveHeight(2),
              }}>
              <View
                style={{
                  flex: 0.3,
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontSize: responsiveFontSize(1.2),
                    fontFamily: FontFamily.POPPINS_REGULAR,
                    color: Colors.BLACK,
                  }}>
                  Level No.
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: 'flex-end',
                  marginEnd: responsiveWidth(5),
                }}>
                <TextInput
                  value={intialState.business_address.level_number}
                  onChangeText={text =>
                    setIntialState({
                      ...intialState,
                      business_address: {
                        ...intialState.business_address,
                        level_number: text,
                      },
                    })
                  }
                  style={{
                    width: '90%',
                    borderColor: Colors.CARD_GREY,
                    borderWidth: 0.5,
                    height: 40,
                    paddingLeft: 10,
                    color: Colors.BLACK,
                  }}
                  // onChangeText={(text) => { setPropertyAddress({ ...business_address, level_no: text }) }}
                  placeholder=""
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginStart: responsiveWidth(7),
                marginTop: responsiveHeight(2),
              }}>
              <View
                style={{
                  flex: 0.3,
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontSize: responsiveFontSize(1.2),
                    fontFamily: FontFamily.POPPINS_REGULAR,
                    color: Colors.BLACK,
                  }}>
                  Unit Type
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: 'flex-end',
                  marginEnd: responsiveWidth(5),
                }}>
                <TextInput
                  value={intialState.business_address.unit_type}
                  onChangeText={text =>
                    setIntialState({
                      ...intialState,
                      business_address: {
                        ...intialState.business_address,
                        unit_type: text,
                      },
                    })
                  }
                  style={{
                    width: '90%',
                    borderColor: Colors.CARD_GREY,
                    borderWidth: 0.5,
                    height: 40,
                    paddingLeft: 10,
                    color: Colors.BLACK,
                  }}
                  // onChangeText={(text) => setPropertyAddress({ ...business_address, unit_type: text })}
                  placeholder=""
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginStart: responsiveWidth(7),
                marginTop: responsiveHeight(2),
              }}>
              <View
                style={{
                  flex: 0.3,
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontSize: responsiveFontSize(1.2),
                    fontFamily: FontFamily.POPPINS_REGULAR,
                    color: Colors.BLACK,
                  }}>
                  Unit No
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: 'flex-end',
                  marginEnd: responsiveWidth(5),
                }}>
                <TextInput
                  value={intialState.business_address.unit_number}
                  onChangeText={text =>
                    setIntialState({
                      ...intialState,
                      business_address: {
                        ...intialState.business_address,
                        unit_number: text,
                      },
                    })
                  }
                  style={{
                    width: '90%',
                    borderColor: Colors.CARD_GREY,
                    borderWidth: 0.5,
                    height: 40,
                    paddingLeft: 10,
                    color : Colors.BLACK
                  }}
                  // onChangeText={(text) => setPropertyAddress({ ...business_address, unit_no: text })}
                  placeholder=""
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginStart: responsiveWidth(7),
                marginTop: responsiveHeight(2),
              }}>
              <View
                style={{
                  flex: 0.3,
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontSize: responsiveFontSize(1.2),
                    fontFamily: FontFamily.POPPINS_REGULAR,
                    color: Colors.BLACK,
                  }}>
                  Lot No
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: 'flex-end',
                  marginEnd: responsiveWidth(5),
                }}>
                <TextInput
                  value={intialState.business_address.lot_number}
                  onChangeText={text =>
                    setIntialState({
                      ...intialState,
                      business_address: {
                        ...intialState.business_address,
                        lot_number: text,
                      },
                    })
                  }
                  style={{
                    width: '90%',
                    borderColor: Colors.CARD_GREY,
                    borderWidth: 0.5,
                    height: 40,
                    paddingLeft: 10,
                    color : Colors.BLACK
                  }}
                  // onChangeText={(text) => setPropertyAddress({ ...business_address, lot_no: text })}
                  placeholder=""
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginStart: responsiveWidth(7),
                marginTop: responsiveHeight(2),
              }}>
              <View
                style={{
                  flex: 0.3,
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontSize: responsiveFontSize(1.2),
                    fontFamily: FontFamily.POPPINS_REGULAR,
                    color: Colors.BLACK,
                  }}>
                  Street No
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: 'flex-end',
                  marginEnd: responsiveWidth(5),
                }}>
                <TextInput
                  value={intialState.business_address.street_number}
                  onChangeText={text =>
                    setIntialState({
                      ...intialState,
                      business_address: {
                        ...intialState.business_address,
                        street_number: text,
                      },
                    })
                  }
                  style={{
                    width: '90%',
                    borderColor: Colors.CARD_GREY,
                    borderWidth: 0.5,
                    height: 40,
                    paddingLeft: 10,
                    color : Colors.BLACK
                  }}
                  // onChangeText={(text) => setPropertyAddress({ ...business_address, street_no: text })}
                  placeholder=""
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginStart: responsiveWidth(7),
                marginTop: responsiveHeight(2),
              }}>
              <View
                style={{
                  flex: 0.3,
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontSize: responsiveFontSize(1.2),
                    fontFamily: FontFamily.POPPINS_REGULAR,
                    color: Colors.BLACK,
                  }}>
                  Street Name
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: 'flex-end',
                  marginEnd: responsiveWidth(5),
                }}>
                <TextInput
                  value={intialState.business_address.street_name}
                  onChangeText={text =>
                    setIntialState({
                      ...intialState,
                      business_address: {
                        ...intialState.business_address,
                        street_name: text,
                      },
                    })
                  }
                  style={{
                    width: '90%',
                    borderColor: Colors.CARD_GREY,
                    borderWidth: 0.5,
                    height: 40,
                    paddingLeft: 10,
                    color : Colors.BLACK
                  }}
                  // onChangeText={(text) => setPropertyAddress({ ...business_address, street_name: text })}
                  placeholder=""
                />
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginStart: responsiveWidth(7),
                marginTop: responsiveHeight(2),
              }}>
              <View
                style={{
                  flex: 0.3,
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontSize: responsiveFontSize(1.2),
                    fontFamily: FontFamily.POPPINS_REGULAR,
                    color: Colors.BLACK,
                  }}>
                  Street Type
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: 'flex-end',
                  marginEnd: responsiveWidth(5),
                }}>
                <TextInput
                  value={intialState.business_address.street_type}
                  onChangeText={text =>
                    setIntialState({
                      ...intialState,
                      business_address: {
                        ...intialState.business_address,
                        street_type: text,
                      },
                    })
                  }
                  style={{
                    width: '90%',
                    borderColor: Colors.CARD_GREY,
                    borderWidth: 0.5,
                    height: 40,
                    paddingLeft: 10,
                    color : Colors.BLACK
                  }}
                  placeholder=""
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginStart: responsiveWidth(7),
                marginTop: responsiveHeight(2),
              }}></View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginStart: responsiveWidth(7),
              marginTop: responsiveHeight(2),
            }}>
            <View
              style={{
                flex: 0.3,
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontSize: responsiveFontSize(1.2),
                  fontFamily: FontFamily.POPPINS_REGULAR,
                  color: Colors.BLACK,
                }}>
                Suffix
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: 'flex-end',
                marginEnd: responsiveWidth(5),
              }}>
              <TextInput
                value={intialState.business_address.suffix}
                onChangeText={text =>
                  setIntialState({
                    ...intialState,
                    business_address: {
                      ...intialState.business_address,
                      suffix: text,
                    },
                  })
                }
                style={{
                  width: '90%',
                  borderColor: Colors.CARD_GREY,
                  borderWidth: 0.5,
                  height: 40,
                  paddingLeft: 10,
                  color : Colors.BLACK
                }}
                // onChangeText={(text) => setPropertyAddress({ ...business_address, suffix: text })}
                placeholder=""
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginStart: responsiveWidth(7),
              marginTop: responsiveHeight(2),
            }}>
            <View
              style={{
                flex: 0.3,
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontSize: responsiveFontSize(1.2),
                  fontFamily: FontFamily.POPPINS_REGULAR,
                  color: Colors.BLACK,
                }}>
                Suburb
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: 'flex-end',
                marginEnd: responsiveWidth(5),
              }}>
              <TextInput
                value={intialState.suburb}
                onChangeText={text =>
                  setIntialState({
                    ...intialState,
                    business_address: {
                      ...intialState.business_address,
                      suburb: text,
                    },
                  })
                }
                style={{
                  width: '90%',
                  borderColor: Colors.CARD_GREY,
                  borderWidth: 0.5,
                  height: 40,
                  paddingLeft: 10,
                  color : Colors.BLACK
                }}
                // onChangeText={(text) => setPropertyAddress({ ...business_address, suburb: text })}
                placeholder=""
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginStart: responsiveWidth(7),
              marginTop: responsiveHeight(2),
            }}>
            <View
              style={{
                flex: 0.3,
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontSize: responsiveFontSize(1.2),
                  fontFamily: FontFamily.POPPINS_REGULAR,
                  color: Colors.BLACK,
                  
                }}>
                State
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: 'flex-end',
                marginEnd: responsiveWidth(5),
              }}>
              <TextInput
                value={intialState.business_address.state}
                onChangeText={text =>
                  setIntialState({
                    ...intialState,
                    business_address: {
                      ...intialState.business_address,
                      state: text,
                    },
                  })
                }
                style={{
                  width: '90%',
                  borderColor: Colors.CARD_GREY,
                  borderWidth: 0.5,
                  height: 40,
                  paddingLeft: 10,
                  color : Colors.BLACK
                }}
                placeholder=""
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginStart: responsiveWidth(7),
              marginTop: responsiveHeight(2),
            }}>
            <View
              style={{
                flex: 0.3,
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontSize: responsiveFontSize(1.2),
                  fontFamily: FontFamily.POPPINS_REGULAR,
                  color: Colors.BLACK,
                }}>
                Pincode
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: 'flex-end',
                marginEnd: responsiveWidth(5),
              }}>
              <TextInput
                value={intialState.business_address.pincode}
                onChangeText={text =>
                  setIntialState({
                    ...intialState,
                    business_address: {
                      ...intialState.business_address,
                      pincode: text,
                    },
                  })
                }
                style={{
                  width: '90%',
                  borderColor: Colors.CARD_GREY,
                  borderWidth: 0.5,
                  height: 40,
                  paddingLeft: 10,
                  color : Colors.BLACK
                }}
                placeholder=""
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginStart: responsiveWidth(7),
              marginTop: responsiveHeight(2),
            }}>
            <View
              style={{
                flex: 0.3,
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontSize: responsiveFontSize(1.2),
                  fontFamily: FontFamily.POPPINS_REGULAR,
                  color: Colors.BLACK,
                }}>
                LGA
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: 'flex-end',
                marginEnd: responsiveWidth(5),
              }}>
              <TextInput
                value={intialState.business_address.lga}
                onChangeText={text =>
                  setIntialState({
                    ...intialState,
                    business_address: {
                      ...intialState.business_address,
                      lga: text,
                    },
                  })
                }
                style={{
                  width: '90%',
                  borderColor: Colors.CARD_GREY,
                  borderWidth: 0.5,
                  height: 40,
                  paddingLeft: 10,
                  color : Colors.BLACK
                }}
                // onChangeText={(text) => { setPropertyAddress({ ...business_address, LGA: text }) }}r
                placeholder=""
              />
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default BusinessAddForm;
