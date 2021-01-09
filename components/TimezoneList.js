import React from 'react';
import {StyleSheet, ScrollView, View} from 'react-native';
import {Text} from 'react-native-elements';
import moment from 'moment';
import _ from 'lodash';

const TimezoneList = (props) => {
  const {allTimezonesArray, timezonesByColumn} = props;

  const iterateBetweenRowTitles = allTimezonesArray.map((item, index) => {
    const rowTitle = !index
      ? 'Coordinated Universal Time'
      : index === 1
      ? 'Your Current Timezone'
      : `${item.friendName}`;

    return (
      <View style={styles.rowSubContainer}>
        <Text style={styles.rowTitle}>{rowTitle}</Text>
        <Text>{item.timezone}</Text>
        <Text>{item.abbreviation}</Text>
      </View>
    );
  });

  const renderListItem = (item, hour, upperIndex) => {
    return (
      <View
        style={[
          styles.squareItem,
          {
            backgroundColor:
              upperIndex === 0 ? '#3c6382' : hour === 0 ? '#60a3bc' : '#82ccdd',
          },
        ]}>
        <Text style={{textAlign: 'center'}}>
          {hour === 0 || upperIndex === 0
            ? `${moment(item).format('MMM Do')} ${hour}:00`
            : `${hour}:00`}
        </Text>
      </View>
    );
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{marginTop: 40}}>
      <View
        style={[
          styles.rowTitleContainer,
          {height: allTimezonesArray.length * 70 - 10},
        ]}>
        {iterateBetweenRowTitles}
      </View>
      {timezonesByColumn.map((timezoneArray, upperIndex) => {
        return (
          <View style={{flexDirection: 'column', marginTop: 0}}>
            {timezoneArray.map((item, lowerIndex) => {
              const hour = item.getHours();
              return renderListItem(item, hour, upperIndex);
            })}
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  rowTitleContainer: {
    marginLeft: 20,
    marginRight: 10,
    justifyContent: 'space-around',
  },
  rowSubContainer: {alignItems: 'center'},
  rowTitle: {fontWeight: 'bold', color: '#3c6382'},
  squareItem: {
    borderRadius: 20,
    height: 60,
    width: 60,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
});

export default TimezoneList;
