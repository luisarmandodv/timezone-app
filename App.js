import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import {Text, Input, Button} from 'react-native-elements';
import ActionButton from 'react-native-action-button';
import axios from 'axios';
import _ from 'lodash';
import Modal from './components/Modal';
import TimezoneList from './components/TimezoneList';
import {getMultiple, storeData, getTimezoneByColumn} from './utils';

const WorldTimeAPI = `http://worldtimeapi.org/api/`;

class App extends Component {
  state = {
    loadingScreen: true,
    modalVisible: false,
    allTimezones: undefined,
    allStoredKeys: undefined,
  };

  async componentDidMount() {
    try {
      const response = await axios.get(`${WorldTimeAPI}timezone`);
      const allTimezones = response.data.map((zone) => ({
        label: zone,
        value: zone,
      }));
      await this.requestTimezones();

      this.setState({
        allTimezones,
        loadingScreen: false,
      });
    } catch (error) {
      console.log(error.response);
    }
  }

  requestTimezones = async () => {
    const currentUTCTimezone = await axios.get(
      `${WorldTimeAPI}timezone/Etc/UTC`,
    );
    const currentTimezone = await axios.get(`${WorldTimeAPI}ip`);
    const allStoredKeys = await getMultiple();
    const parsedKeys = allStoredKeys.map((key) => ({
      id: key[0],
      ...JSON.parse(key[1]),
    }));
    const requestAllStoredTimezones = await Promise.all(
      parsedKeys.map(async (item) => {
        const response = await axios.get(
          `${WorldTimeAPI}timezone/${item.timezone}`,
        );
        return {
          ...item,
          ...response.data,
        };
      }),
    );
    const timezonesByColumn = getTimezoneByColumn(
      currentUTCTimezone,
      currentTimezone,
      requestAllStoredTimezones,
    );
    const allTimezonesArray = [
      currentUTCTimezone.data,
      currentTimezone.data,
      ...requestAllStoredTimezones,
    ];
    this.setState({
      allStoredKeys: parsedKeys,
      timezonesByColumn,
      allTimezonesArray,
    });
  };

  onModalButtonPress = async (friendName, selectedTimeZone) => {
    if (selectedTimeZone && friendName) {
      this.setState({loadingScreen: true});
      const stringifyObject = JSON.stringify({
        timezone: selectedTimeZone,
        friendName,
      });
      await storeData(
        `${this.state.allStoredKeys.length + 1}`,
        stringifyObject,
      );
      this.setModalVisible(false);
      await this.requestTimezones();
      this.setState({
        friendName: undefined,
        selectedTimeZone: undefined,
        loadingScreen: false,
      });
    }
  }

  setModalVisible = (visible) => {
    this.setState({modalVisible: visible});
  };

  renderModal = () => {
    return (
      <Modal
        modalVisible={this.state.modalVisible}
        allTimezones={this.state.allTimezones}
        onCloseModal={() => {
          this.setModalVisible(false);
        }}
        onPress={this.onModalButtonPress}
      />
    );
  };

  renderList = () => {
    const {timezonesByColumn, allTimezonesArray} = this.state;
    if (timezonesByColumn && timezonesByColumn.length > 0) {
      return (
        <TimezoneList
          allTimezonesArray={allTimezonesArray}
          timezonesByColumn={timezonesByColumn}
        />
      );
    }
  };

  renderLoader = () => {
    return (
      <ActivityIndicator
        hidesWhenStopped
        size="large"
        animating={this.state.loadingScreen}
        style={styles.activityIndicator}
      />
    );
  };

  render() {
    console.disableYellowBox = true;
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        {this.renderModal()}
        <Text
          h2
          style={styles.header}>
          Team Timezones
        </Text>
        {this.renderLoader()}
        {this.renderList()}
        <ActionButton
          buttonColor="#60a3bc"
          onPress={() => {
            this.setModalVisible(true);
          }}
          position={'center'}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#f3f3f3'},
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  header: {
    alignSelf: 'center',
  },
  activityIndicator: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default App;
