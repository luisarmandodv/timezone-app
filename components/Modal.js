import React, {useState, useEffect, useRef, useReducer} from 'react';
import {
  TextInput,
  StyleSheet,
  View,
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView,
} from 'react-native';
import {Text} from 'react-native-elements';
import {createStackNavigator} from '@react-navigation/stack';
import Swiper from 'react-native-swiper';
import Entypo from 'react-native-vector-icons/Entypo';
import _ from 'lodash';
import SearchModal from './SearchModal';

const Stack = createStackNavigator();

const renderModalHeader = ({
  leftText = null,
  centerText,
  rightText,
  onLeftTextPress,
  onRightTextPress,
}) => {
  const leftButton = leftText ? (
    <TouchableOpacity
      style={[styles.cancelContainer, {alignSelf: 'flex-start'}]}
      onPress={onLeftTextPress}>
      <Text style={{color: '#3c6382', fontWeight: 'bold'}}>{leftText}</Text>
    </TouchableOpacity>
  ) : (
    <View style={{justifyContent: 'center', alignSelf: 'center'}}>
      <Entypo
        name="chevron-left"
        size={30}
        color="#3c6382"
        onPress={onLeftTextPress}
      />
    </View>
  );
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        backgroundColor: 'white',
        paddingHorizontal: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowOpacity: 0.1,
        shadowRadius: 1,
        shadowOffset: {
          height: 0,
          width: 0,
        },
        elevation: 1,
      }}>
      {leftButton}
      <Text style={{padding: 20, fontWeight: 'bold'}}>{centerText}</Text>
      <TouchableOpacity
        style={styles.cancelContainer}
        onPress={onRightTextPress}>
        <Text style={{color: '#3c6382', fontWeight: 'bold'}}>{rightText}</Text>
      </TouchableOpacity>
    </View>
  );
};

const ModalComponent = (props) => {
  const [selectedTimeZone, setSelectedTimeZone] = useState();
  const [friendName, setFriendName] = useState();
  const {isModalVisible, onCloseModal, onPress, allTimezones} = props;
  const SwiperRef = useRef(null);

  return (
    <Modal
      animationType="slide"
      visible={isModalVisible}
      presentationStyle={'pageSheet'}
      transparent>
      <Swiper
        ref={SwiperRef}
        style={{}}
        showsPagination={false}
        scrollEnabled={false}
        showsButtons={false}>
        <KeyboardAvoidingView
          keyboardVerticalOffset={-100}
          behavior={'height'}
          style={styles.modalContainer}>
          <View style={styles.container}>
            {renderModalHeader({
              leftText: 'Cancel',
              centerText: 'Add Timezone',
              rightText: 'Save',
              onLeftTextPress: () => {
                setSelectedTimeZone(undefined);
                setFriendName(undefined);
                onCloseModal();
              },
              onRightTextPress: () => {
                onPress(friendName, selectedTimeZone);
              },
            })}
            <View
              style={{
                paddingTop: 20,
                flex: 1,
                alignSelf: 'stretch',
              }}>
              <View
                style={{
                  alignSelf: 'stretch',
                  backgroundColor: 'white',
                }}>
                <View
                  style={{
                    height: 40,
                    justifyContent: 'center',
                    paddingHorizontal: 25,
                  }}>
                  <TextInput
                    placeholder="Name"
                    onEndEditing={(value) => {
                      setFriendName(value.nativeEvent.text);
                    }}
                    placeholderTextColor={'#C7C7CD'}
                  />
                </View>
                <View
                  style={{
                    marginLeft: 25,
                    height: StyleSheet.hairlineWidth,
                    width: '100%',
                    backgroundColor: '#e1e8ee',
                  }}
                />
                <View
                  style={{
                    alignSelf: 'stretch',
                    backgroundColor: 'white',
                    height: 40,
                    justifyContent: 'center',
                    paddingHorizontal: 25,
                  }}>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                    onPress={() => SwiperRef.current.scrollBy(1, true)}>
                    {selectedTimeZone ? (
                      <Text>{selectedTimeZone}</Text>
                    ) : (
                      <Text style={{color: '#C7C7CD'}}>Search Timezone</Text>
                    )}
                    <Entypo name="chevron-right" size={20} color="#3c6382" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
        <View style={styles.container}>
          {renderModalHeader({
            centerText: 'Search Timezone',
            rightText: '',
            onLeftTextPress: () => {
              SwiperRef.current.scrollBy(1, false);
            },
            onRightTextPress: () => {},
          })}
          <SearchModal
            allTimezones={allTimezones}
            onPress={(value) => {
              setSelectedTimeZone(value);
              SwiperRef.current.scrollBy(1, false);
            }}
          />
        </View>
      </Swiper>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {flex: 1},
  container: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flex: 1,
    backgroundColor: '#F3F3F3',
    alignItems: 'center',
  },
  cancelContainer: {
    borderRadius: 20,
    padding: 20,
    elevation: 2,
    alignSelf: 'flex-end',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
  },
});

export default ModalComponent;
