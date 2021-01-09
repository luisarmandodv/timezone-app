import AsyncStorage from '@react-native-async-storage/async-storage';
import {DateTime} from 'luxon';
import 'react-native-gesture-handler';
import React, {Component} from 'react';
import moment from 'moment';

export function createHourTimeline(startDate, hourCount, timezone) {
  const currentDate = DateTime.fromJSDate(startDate);
  const timeline = [];

  if (!currentDate.isValid) return null;
  for (let i = 0; i < hourCount; i++) {
    const time = currentDate.plus({hours: i});
    timeline.push(time.toJSDate());
  }
  const test = timeline.map(
    (t) => new Date(t.toLocaleString('en-US', {timeZone: timezone})),
  );
  return test;
}

export const getAllKeys = async () => {
  try {
    let keys = [];
    keys = await AsyncStorage.getAllKeys();
    return keys;
  } catch (e) {
    console.log(e);
  }
};

export const getMultiple = async () => {
  const allKeys = await getAllKeys();
  let values;
  try {
    values = await AsyncStorage.multiGet(allKeys);
    return values;
  } catch (e) {
    console.log(e);
  }
};

const removeValue = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.log(e);
  }

  console.log('Done.');
};

export const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      // value previously stored
    }
  } catch (e) {
    console.log(e);
  }
};

export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log(e);
  }
};

export const getTimezoneByColumn = (
  currentUTCTimezone,
  currentTimezone,
  requestAllStoredTimezones,
) => {
  let perfectArray = [];
  const momentUTCHour = moment.unix(currentUTCTimezone.data.unixtime).toDate();
  const momentCurrentHour = moment.unix(currentTimezone.data.unixtime).toDate();

  perfectArray[0] = createHourTimeline(
    momentUTCHour,
    24,
    currentUTCTimezone.data.timezone,
  );
  perfectArray[1] = createHourTimeline(
    momentCurrentHour,
    24,
    currentTimezone.data.timezone,
  );

  for (let i = 0; i < requestAllStoredTimezones.length; i++) {
    const momentUnixHour = moment
      .unix(requestAllStoredTimezones[i].unixtime)
      .toDate();

    perfectArray[i + 2] = createHourTimeline(
      momentUnixHour,
      24,
      requestAllStoredTimezones[i].timezone,
    );
  }

  let perfectArrayAgain = [];
  for (let i = 0; i < 24; i++) {
    perfectArrayAgain[i] = perfectArray.map((item) => item[i]);
  }

  return perfectArrayAgain;
};
