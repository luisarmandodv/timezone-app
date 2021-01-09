import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView,
} from 'react-native';
import {Text, Input, Button} from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';
import _ from 'lodash';

const ModalComponent = (props) => {
  const [selectedTimeZone, setSelectedTimeZone] = useState();
  const [friendName, setFriendName] = useState();
  const {modalVisible, onCloseModal, onPress, allTimezones} = props;

  return (
    <Modal
      animationType="slide"
      visible={modalVisible}
      presentationStyle={'pageSheet'}
      transparent>
      <KeyboardAvoidingView
        keyboardVerticalOffset={-100}
        behavior={'height'}
        style={styles.modalContainer}>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.cancelContainer}
            onPress={() => {
              setSelectedTimeZone(undefined);
              setFriendName(undefined);
              onCloseModal();
            }}>
            <Text style={{color: '#82ccdd', fontWeight: 'bold'}}>Cancel</Text>
          </TouchableOpacity>
          <Input
            placeholder="Name"
            onChangeText={(value) => {
              setFriendName(value);
            }}
          />
          <RNPickerSelect
            items={allTimezones}
            onValueChange={(value) => {
              setSelectedTimeZone(value);
            }}
            style={{
              ...pickerSelectStyles,
            }}
            value={selectedTimeZone}
          />
          <Button
            title="Add New Member"
            onPress={() => onPress(friendName, selectedTimeZone)}
            containerStyle={styles.buttonContainerStyle}
          />
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {flex: 1},
  container: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: 400,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  cancelContainer: {
    borderRadius: 20,
    padding: 20,
    elevation: 2,
    alignSelf: 'flex-end',
  },
  buttonContainerStyle: {
    position: 'absolute',
    bottom: 100,
    marginTop: 20,
    width: '60%',
    marginHorizontal: 20,
    borderRadius: 20,
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
