import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
  AccordionList,
} from 'accordion-collapse-react-native';
import Colors from '../../../styles/colors';

import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import imagePath from '../../../constants/imagePath';
import FontFamily from '../../../constants/FontFamily';
import HeaderNote from '../../../components/atoms/HeaderNote/HeaderNote';
import Header from '../../../components/atoms/Header/Header';
import ModalComp from '../../../components/atoms/Modal/ModalComp';
import {useDispatch, useSelector} from 'react-redux';
import {
  getProfileQuestions,
  getUplodedDocuments,
  getUserProfile,
} from '../../../../redux/asyncThunk';
import {Card} from 'react-native-paper';
import {useMemo} from 'react';

const PointCheckList = () => {
  const {primaryQuestions, secondaryQuestions, uplodedDocuments, user} =
    useSelector(state => state.auth);

  const dispatch = useDispatch();
  const [showPrimary, setShowPrimary] = useState(false);
  const [showSecondary, setShowSecondary] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [showDocuments, setShowDocuments] = useState(false);
  const [currentDocId, setCurrentDocId] = useState(null);

  const showModal = props => {
    setModalVisible(true);
    setCurrentDocId(props);
  };
  const hideModal = () => {
    setModalVisible(false);
  };
  useEffect(() => {
    dispatch(
      getProfileQuestions({params: {limit: 30}, companyId: user?.company_id}),
    );
    dispatch(getUserProfile());
    dispatch(
      getUplodedDocuments({
        params: {expand: 'question'},
        companyId: user?.company_id,
      }),
    );
  }, []);

  const headPrimary = item => {
    return (
      <View
        bordered
        style={{
          backgroundColor: Colors.WHITE,
          justifyContent: 'center',
          padding: 10,
          borderBottomColor: Colors.CARD_GREY,
          borderBottomWidth: 1,
        }}>
        <View
          onStartShouldSetResponder={() => setShowPrimary(!showPrimary)}
          style={{
            backgroundColor: Colors.WHITE,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                justifyContent: 'center',
                fontFamily: FontFamily.POPPINS_LIGHT,
                fontSize: responsiveFontSize(1.2),
                color: Colors.BLACK,
              }}>
              {item.content}
            </Text>
          </View>
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            {item.uploaded && (
              <Image
                style={{width: 16, height: 16, marginRight: 5}}
                source={imagePath.TICK}
              />
            )}
            <Text
              style={{
                justifyContent: 'center',
                fontFamily: FontFamily.POPPINS_LIGHT,
                fontSize: responsiveFontSize(1.2),
              }}>
              {item.points} pts
            </Text>
            <Image
              style={{
                width: 20,
                height: 20,
                transform: [{rotate: showPrimary ? '180deg' : '0deg'}],
              }}
              source={imagePath.DROP_ARROW}
            />
          </View>
        </View>
      </View>
    );
  };
  const headSecondary = item => {
    return (
      <View
        bordered
        style={{
          backgroundColor: Colors.WHITE,
          justifyContent: 'center',
          padding: 10,
          borderBottomColor: Colors.CARD_GREY,
          borderBottomWidth: 1,
        }}>
        <View
          onStartShouldSetResponder={() => setShowSecondary(!showSecondary)}
          style={{
            backgroundColor: Colors.WHITE,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                justifyContent: 'center',
                fontFamily: FontFamily.POPPINS_LIGHT,
                fontSize: responsiveFontSize(1.2),
                color: Colors.BLACK,
              }}>
              {item.content}
            </Text>
          </View>
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            {item.uploaded && (
              <Image
                style={{width: 16, height: 16, marginRight: 5}}
                source={imagePath.TICK}
              />
            )}
            <Text
              style={{
                justifyContent: 'center',
                fontFamily: FontFamily.POPPINS_LIGHT,
                fontSize: responsiveFontSize(1.2),
                color: Colors.BLACK,
              }}>
              {item.points} pts
            </Text>
            <Image
              style={{
                width: 20,
                height: 20,
                transform: [{rotate: showSecondary ? '180deg' : '0deg'}],
              }}
              source={imagePath.DROP_ARROW}
            />
          </View>
        </View>
      </View>
    );
  };
  const headDocuments = item => {
    return (
      <View
        bordered
        style={{
          backgroundColor: Colors.WHITE,
          justifyContent: 'center',
          padding: 10,
          borderBottomColor: Colors.CARD_GREY,
          borderBottomWidth: 1,
        }}>
        <View
          onStartShouldSetResponder={() => setShowDocuments(!showDocuments)}
          style={{
            backgroundColor: Colors.WHITE,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flexDirection: 'column',
              flex: 1,
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                justifyContent: 'center',
                fontFamily: FontFamily.POPPINS_LIGHT,
                fontSize: responsiveFontSize(1.2),
                color: Colors.BLACK,
              }}>
              {item.question.content}
            </Text>
            <Text
              style={{
                justifyContent: 'center',
                fontFamily: FontFamily.POPPINS_LIGHT,
                fontSize: responsiveFontSize(1),
                color: 'red',
                marginTop: 2,
              }}>
              {item.question.group} Document
            </Text>
          </View>
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                justifyContent: 'center',
                fontFamily: FontFamily.POPPINS_LIGHT,
                fontSize: responsiveFontSize(1.2),
                color: Colors.BLACK,
              }}>
              {item.question.points} pts
            </Text>
            <Image
              style={{
                width: 20,
                height: 20,
                transform: [{rotate: showDocuments ? '180deg' : '0deg'}],
              }}
              source={imagePath.DROP_ARROW}
            />
          </View>
        </View>
      </View>
    );
  };
  const body = item => {
    return (
      <View style={{backgroundColor: Colors.WHITE}}>
        <View
          style={{
            height: responsiveHeight(4),
            backgroundColor: '#666666',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontFamily: FontFamily.POPPINS_SEMIBOLD,
              fontSize: responsiveFontSize(1.2),
              color: Colors.WHITE,
              marginStart: responsiveWidth(2),
            }}>
            Document requires name & photo*
          </Text>
        </View>
        <View
          style={{
            width: '100%',
            backgroundColor: Colors.WHITE,
            height: responsiveHeight(24),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Image
              source={imagePath.UPLOAD}
              style={{
                width: 20,
                height: 20,
                marginHorizontal: responsiveWidth(4),
              }}
            />
            <Image
              source={imagePath.PREVIEW}
              style={{
                width: 20,
                height: 20,
                marginHorizontal: responsiveWidth(4),
              }}
            />
          </View>
          <View style={{marginTop: responsiveHeight(2)}}>
            <Text
              style={{
                fontSize: responsiveFontSize(1.2),
                color: Colors.DARK_GREY,
              }}>
              DRAG & DROP OR BROWSE TO FOREIGN PASSPORT
            </Text>
          </View>
          <View
            style={{
              marginTop: responsiveHeight(3),
              width: '60%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              onPress={() => showModal(item.id)}
              style={{
                height: 35,
                backgroundColor: Colors.BLUE,
                width: '60%',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: responsiveWidth(1),
              }}>
              <Text
                style={{
                  fontFamily: FontFamily.POPPINS_REGULAR,
                  fontSize: responsiveFontSize(1.2),
                  color: Colors.WHITE,
                }}>
                Upload
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  const documentBody = item => {
    return (
      <Card>
        <Card.Cover source={{uri: item.attachment}} />
      </Card>
    );
  };
  const getPrimaryCount = useMemo(() => {
    let count = 0;
    primaryQuestions.forEach(o => {
      if (o.uploaded) {
        count += o.points;
      }
    });
    return count;
  }, [primaryQuestions]);

  console.log('question', primaryQuestions);

  const getSecondaryCount = useMemo(() => {
    let count = 0;
    secondaryQuestions.forEach(o => {
      if (o.uploaded) {
        count += o.points;
      }
    });
    return count;
  }, [secondaryQuestions]);
  const isPrimaryUploaded = useMemo(() => {
    return primaryQuestions.filter(o => o.uploaded).length ? true : false;
  }, [primaryQuestions]);
  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: Colors.WHITE, paddingBottom: 40}}>
      <ScrollView>
        <View style={{height: 40}}>
          <Header image={imagePath.LEFT} title="NPC 100 Point Checklist" />
        </View>
        <View
          style={{
            marginHorizontal: responsiveWidth(2),
            padding: 10,
            flexDirection: 'row',
          }}>
          <Text
            style={{
              fontSize: responsiveFontSize(1.2),
              fontFamily: FontFamily.POPPINS_REGULAR,
              color: Colors.RED,
            }}>
            NOTE :
            <Text
              style={{
                fontSize: responsiveFontSize(1.2),
                fontFamily: FontFamily.POPPINS_REGULAR,
                color: Colors.BLACK,
              }}>
              {`You must supply at least ONE Primary document. Foreign documents must be accompanied by an official translation.`}
            </Text>
          </Text>
        </View>
        <View
          style={{
            marginHorizontal: responsiveWidth(4),
            backgroundColor: Colors.WHITE,
          }}>
          <Collapse>
            <CollapseHeader>
              <View
                onStartShouldSetResponder={() => setShowPrimary(!showPrimary)}
                style={{
                  flexDirection: 'row',
                  height: 50,
                  alignItems: 'center',
                  borderColor: Colors.CARD_GREY,
                  borderWidth: 0.5,
                  backgroundColor: Colors.CARD_GREY,
                  borderTopLeftRadius: responsiveWidth(1),
                  borderTopRightRadius: responsiveWidth(1),
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    color: Colors.BLACK,
                    marginStart: responsiveWidth(4),
                    fontFamily: FontFamily.POPPINS_MEDIUM,
                    fontSize: responsiveFontSize(1.6),
                  }}>
                  Primary Documents
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginEnd: responsiveWidth(2),
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      backgroundColor: Colors.WHITE,
                      marginEnd: responsiveWidth(2),
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: responsiveWidth(20),
                      padding: 5,
                      borderRadius: responsiveWidth(1),
                    }}>
                    {getPrimaryCount >= 70 && (
                      <Image
                        style={{width: 16, height: 16}}
                        source={imagePath.TICK}
                      />
                    )}
                    <Text
                      style={{
                        top: 2,
                        marginHorizontal: responsiveWidth(2),
                        fontFamily: FontFamily.POPPINS_MEDIUM,
                        fontSize: responsiveFontSize(1.2),
                        color: Colors.BLACK,
                      }}>
                      70 Pts
                    </Text>
                  </View>

                  <Image
                    style={{
                      width: 30,
                      height: 30,
                      transform: [{rotate: showPrimary ? '180deg' : '360deg'}],
                    }}
                    source={imagePath.DROP_ARROW}
                  />
                </View>
              </View>
            </CollapseHeader>
            <CollapseBody
              style={{
                borderColor: Colors.CARD_GREY,
                borderWidth: 1,
                backgroundColor: Colors.CARD_GREY,
              }}>
              <AccordionList
                list={primaryQuestions}
                header={headPrimary}
                body={body}
                keyExtractor={item => `${item.id}`}
              />
            </CollapseBody>
          </Collapse>

          {/*................. Secondary........................ */}
          {isPrimaryUploaded && (
            <View style={{marginTop: responsiveHeight(1)}}>
              <Collapse>
                <CollapseHeader>
                  <View
                    onStartShouldSetResponder={() =>
                      setShowSecondary(!showSecondary)
                    }
                    style={{
                      flexDirection: 'row',
                      height: 50,
                      alignItems: 'center',
                      borderColor: Colors.CARD_GREY,
                      borderWidth: 0.5,
                      backgroundColor: Colors.CARD_GREY,
                      borderTopLeftRadius: responsiveWidth(1),
                      borderTopRightRadius: responsiveWidth(1),
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{
                        color: Colors.BLACK,
                        marginStart: responsiveWidth(4),
                        fontFamily: FontFamily.POPPINS_MEDIUM,
                        fontSize: responsiveFontSize(1.6),
                      }}>
                      Secondary Documents
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginEnd: responsiveWidth(2),
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          backgroundColor: Colors.WHITE,
                          marginEnd: responsiveWidth(2),
                          justifyContent: 'center',
                          alignItems: 'center',
                          width: responsiveWidth(20),
                          padding: 5,
                          borderRadius: responsiveWidth(1),
                        }}>
                        {getSecondaryCount >= 40 && (
                          <Image
                            style={{width: 16, height: 16}}
                            source={imagePath.TICK}
                          />
                        )}
                        <Text
                          style={{
                            top: 2,
                            marginHorizontal: responsiveWidth(2),
                            fontFamily: FontFamily.POPPINS_MEDIUM,
                            fontSize: responsiveFontSize(1.2),
                            color: Colors.BLACK,
                          }}>
                          40 Pts
                        </Text>
                      </View>

                      <Image
                        style={{
                          width: 30,
                          height: 30,
                          transform: [
                            {rotate: showSecondary ? '360deg' : '180deg'},
                          ],
                        }}
                        source={imagePath.DROP_ARROW}
                      />
                    </View>
                  </View>
                </CollapseHeader>
                <CollapseBody
                  style={{
                    borderColor: Colors.CARD_GREY,
                    borderWidth: 1,
                    backgroundColor: Colors.CARD_GREY,
                  }}>
                  <AccordionList
                    list={secondaryQuestions}
                    header={headSecondary}
                    body={body}
                    keyExtractor={item => `${item.id}`}
                  />
                </CollapseBody>
              </Collapse>
            </View>
          )}

          {/*................. Uploaded Document ........................ */}
          <View style={{marginTop: responsiveHeight(1)}}>
            <Collapse>
              <CollapseHeader>
                <View
                  onStartShouldSetResponder={() =>
                    setShowDocuments(!showDocuments)
                  }
                  style={{
                    flexDirection: 'row',
                    height: 50,
                    alignItems: 'center',
                    borderColor: Colors.BLUE,
                    borderWidth: 0.5,
                    backgroundColor: Colors.BLUE,
                    borderTopLeftRadius: responsiveWidth(1),
                    borderTopRightRadius: responsiveWidth(1),
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      color: Colors.WHITE,
                      marginStart: responsiveWidth(4),
                      fontFamily: FontFamily.POPPINS_MEDIUM,
                      fontSize: responsiveFontSize(1.6),
                    }}>
                    Documents List
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginEnd: responsiveWidth(2),
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        backgroundColor: Colors.WHITE,
                        marginEnd: responsiveWidth(2),
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: responsiveWidth(20),
                        padding: 5,
                        borderRadius: responsiveWidth(1),
                      }}>
                      {user?.points >= 100 && (
                        <Image
                          style={{width: 16, height: 16}}
                          source={imagePath.TICK}
                        />
                      )}
                      <Text
                        style={{
                          top: 2,
                          marginHorizontal: responsiveWidth(2),
                          fontFamily: FontFamily.POPPINS_MEDIUM,
                          fontSize: responsiveFontSize(1.2),
                          color: Colors.BLACK,
                        }}>
                        {user?.points || 0} pts
                      </Text>
                    </View>

                    <Image
                      style={{
                        width: 30,
                        height: 30,
                        transform: [
                          {rotate: showDocuments ? '360deg' : '180deg'},
                        ],
                      }}
                      source={imagePath.DROP_ARROW}
                    />
                  </View>
                </View>
              </CollapseHeader>
              <CollapseBody
                style={{
                  borderColor: Colors.CARD_GREY,
                  borderWidth: 1,
                  backgroundColor: Colors.CARD_GREY,
                }}>
                <AccordionList
                  list={uplodedDocuments}
                  header={headDocuments}
                  body={documentBody}
                  keyExtractor={item => `${item.id}`}
                />
              </CollapseBody>
            </Collapse>
          </View>

          <ModalComp
            visible={modalVisible}
            onCancel={hideModal}
            question={currentDocId}
            camera={'Choose from camera'}
            imgCamera={imagePath.CAMERA}
            imgGallery={imagePath.GALLERY}
            gallery={'Choose from gallery'}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PointCheckList;
