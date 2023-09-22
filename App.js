import React from 'react';
// import {Provider, useSelector} from 'react-redux';
// import {persistor, store} from './redux/store';
import AuthNavigator from './app/navigators/AuthNavigator';
import Axios from 'axios';
import {PersistGate} from 'redux-persist/es/integration/react';
import FieldWorkerStack from './app/navigators/FieldWorkerStack';
import CustomerStack from './app/navigators/CustomerStack';
import CheckPointStack from './app/navigators/CheckPointStack';
import {Provider, useSelector} from 'react-redux';
import {persistor, store} from './redux/store';
//import { store } from './redux/store';
import {LogBox} from 'react-native';
import Toast from 'react-native-toast-message';

LogBox.ignoreAllLogs(true);

const RoutesComponent = () => {
  const {accessToken, role, user} = useSelector(state => state.auth);

  if (accessToken) {
    Axios.defaults.headers.common['Authorization'] = 'Token ' + accessToken;
    if (role === 'customer') {
      return <CustomerStack />;
    } else if (role === 'field_worker') {
      if (user && user.points < 100) {
        return <CheckPointStack />;
      }
      return <FieldWorkerStack />;
    }
  } else {
    return <AuthNavigator />;
  }
};

const App = () => {
  Axios.defaults.baseURL = 'https://api.buildblog.in/api/v1/';
  // Axios.defaults.baseURL = 'http://api.buildblog.in:8000/api/v1/';
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RoutesComponent />
        <Toast />
      </PersistGate>
    </Provider>
  );
};

export default App;
