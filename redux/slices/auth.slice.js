import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice} from '@reduxjs/toolkit';
import {THUNK_STATUS} from '../../redux/constants/redux.constants';
import {
  getAppointmentUploadedDocuments,
  getAppointmentUploadedDocumentsByCustomer,
  getDashboardData,
  getDashboardDataForCustomer,
  getDetailsByLatLong,
  getProfileQuestions,
  getUplodedDocuments,
  getUserProfile,
  loginAsync,
  registerAsync,
  registerOtpAsync,
  sendOtpAsync,
} from '../asyncThunk';
import _ from 'lodash';
const initialState = {
  user: null,
  phoneNumber: '',
  otp: 123456,
  tokenDetails: null,
  loginStatus: null,
  registorStatus: null,
  registorOtpStatus: null,
  sendOtpStatus: null,
  accessToken: null,
  otpType: 2,
  role: null,
  primaryQuestions: [],
  secondaryQuestions: [],
  getUplodedDocumentStatus: null,
  uplodedDocuments: [],
  dashboardData: [],
};

export const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    addToken: (state, action) => {
      state.accessToken = AsyncStorage.getItem('accessToken');
    },

    logout: (state, action) => {
      state.accessToken = '';
      state = initialState;
      AsyncStorage.removeItem('accessToken');
    },
  },
  extraReducers: builder => {
    builder.addCase(loginAsync.pending, (state, action) => {
      state.loginStatus = THUNK_STATUS.LOADING;
    });
    builder.addCase(loginAsync.fulfilled, (state, action) => {
      state.loginStatus = THUNK_STATUS.SUCCESS;
      state.user = {...action.payload.data};
      state.accessToken = action.payload.data.auth_token;
      state.role = action.payload.data.role_type;
    });
    builder.addCase(loginAsync.rejected, (state, action) => {
      state.loginStatus = THUNK_STATUS.FAILED;
    });

    builder.addCase(registerAsync.pending, (state, action) => {
      state.registorStatus = THUNK_STATUS.LOADING;
    });
    builder.addCase(registerAsync.fulfilled, (state, action) => {
      state.registorStatus = THUNK_STATUS.SUCCESS;
    });
    builder.addCase(registerAsync.rejected, (state, action) => {
      state.registorStatus = THUNK_STATUS.FAILED;
    });

    builder.addCase(registerOtpAsync.pending, (state, action) => {
      state.registorOtpStatus = THUNK_STATUS.LOADING;
    });
    builder.addCase(registerOtpAsync.fulfilled, (state, action) => {
      state.registorOtpStatus = THUNK_STATUS.SUCCESS;
      state.user = {...action.payload.data};
      state.accessToken = action.payload.data.auth_token;
      state.role = action.payload.data.role_type;
    });
    builder.addCase(registerOtpAsync.rejected, (state, action) => {
      state.registorOtpStatus = THUNK_STATUS.FAILED;
    });
    //Get Questions
    builder.addCase(getProfileQuestions.fulfilled, (state, action) => {
      let groups = _.groupBy(action.payload.data.data, 'group');
      if (groups.primary) {
        state.primaryQuestions = groups.primary;
      }
      if (groups.secondary) {
        state.secondaryQuestions = groups.secondary;
      }
      if (state.uplodedDocuments.length) {
        state.primaryQuestions = groups.primary.map(o => {
          if (data.filter(i => i.question.id === o.id).length) {
            return {...o, uploaded: true};
          } else {
            return {...o, uploaded: false};
          }
        });
        state.secondaryQuestions = groups.secondary.map(o => {
          if (data.filter(i => i.question.id === o.id).length) {
            return {...o, uploaded: true};
          } else {
            return {...o, uploaded: false};
          }
        });
      }
    });
    //Login
    builder.addCase(sendOtpAsync.pending, (state, action) => {
      state.sendOtpStatus = THUNK_STATUS.LOADING;
    });
    builder.addCase(sendOtpAsync.fulfilled, (state, action) => {
      state.sendOtpStatus = THUNK_STATUS.SUCCESS;
    });
    builder.addCase(sendOtpAsync.rejected, (state, action) => {
      state.sendOtpStatus = THUNK_STATUS.FAILED;
    });
    //Get Uploaded Documents
    builder.addCase(getUplodedDocuments.fulfilled, (state, action) => {
      state.getUplodedDocumentStatus = THUNK_STATUS.SUCCESS;
      let data = action.payload.data.data;
      state.primaryQuestions = state.primaryQuestions.map(o => {
        if (data.filter(i => i.question.id === o.id).length) {
          return {...o, uploaded: true};
        } else {
          return {...o, uploaded: false};
        }
      });
      state.secondaryQuestions = state.secondaryQuestions.map(o => {
        if (data.filter(i => i.question.id === o.id).length) {
          return {...o, uploaded: true};
        } else {
          return {...o, uploaded: false};
        }
      });
      state.uplodedDocuments = action.payload.data.data;
    });

    //update Profile Data
    builder.addCase(getUserProfile.fulfilled, (state, action) => {
      state.getUplodedDocumentStatus = THUNK_STATUS.SUCCESS;
      state.user = action.payload.data;
    });

    //Get Dashboard Data
    builder.addCase(getDashboardData.fulfilled, (state, action) => {
      state.dashboardData = action.payload.data.counters;
    });

    //Get Dashboard Data For Customer
    builder.addCase(getDashboardDataForCustomer.fulfilled, (state, action) => {
      state.dashboardData = action.payload.data.counters;
    });
    builder.addCase(getDetailsByLatLong.pending, (state, action) => {
      state.lstatus = THUNK_STATUS.LOADING;
    });
    builder.addCase(getDetailsByLatLong.rejected, (state, action) => {
      state.lstatus = THUNK_STATUS.FAILED;
    });
    builder.addCase(getDetailsByLatLong.fulfilled, (state, action) => {
      state.lstatus = THUNK_STATUS.SUCCESS;
    });
  },
});

export const {setToken, addToken, logout} = AuthSlice.actions;

export const authState = state => state.authState;

export default AuthSlice.reducer;
