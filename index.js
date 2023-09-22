/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import 'moment'; // language must match config
import {name as appName} from './app.json';
import 'react-native-gesture-handler';
import Axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

Axios.interceptors.response.use(
  res => {
    return res.data;
  },
  err => {
    if (err.response.status === 401) {
      AsyncStorage.clear();
    }
    if (err.response.status === 400) {
      return Promise.reject({
        errorType: 'fieldError',
        error: err.response.data,
      });
    }
    return Promise.reject(err);
  },
);

AppRegistry.registerComponent(appName, () => App);
