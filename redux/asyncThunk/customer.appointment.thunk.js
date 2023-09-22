import {createAsyncThunk} from '@reduxjs/toolkit';
import {ASYNC_ROUTES} from '../constants/redux.constants';

import {
  AppointmentStatusListServiceByCustomer,
  CreateAppointmentServiceByCustomer,
  DeleteAppointmentServiceByCustomer,
  GetAppointmentByIDServiceByCustomer,
  GetAppointmentServiceByCustomer,
  GetAppointmentWorkTypeServiceByCustomer,
  SheduledAppointmentServiceByCustomer,
  UpdateAppointmentServiceByCustomer,
  UpdateSheduledAppointmentByCustomer,
} from '../services';

// thunk for get all appointment list

export const getAllAppointmentByCustomer = createAsyncThunk(
  'getAllAppointmentByCustomer',
  async (payload, {rejectWithValue}) => {
    try {
      const response = await GetAppointmentServiceByCustomer();
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);
//  thunk for get single appointment by id
export const getAppointmentByIDByCustomer = createAsyncThunk(
  ASYNC_ROUTES.GET_APPOINTMENT_BY_ID_BY_CUSTOMER,
  async (payload, {rejectWithValue}) => {
    try {
      const response = await GetAppointmentByIDServiceByCustomer(payload);

      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

//  ----- create new appointment ---------->>>

export const createAppointmentThunkByCustomer = createAsyncThunk(
  ASYNC_ROUTES.CREATE_APPOINTMENT_BY_CUSTOMER,
  async (payload, {rejectWithValue}) => {
    try {
      const response = await CreateAppointmentServiceByCustomer(payload);

      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

// ---------  update appointment--->>>>>>>>>

export const updateAppointmentThunkByCustomer = createAsyncThunk(
  ASYNC_ROUTES.GET_APPOINTMENT_BY_ID,
  async ({data, id}, {rejectWithValue}) => {
    try {
      const response = await UpdateAppointmentServiceByCustomer(data, id);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

//--------------- Delete Appointment ----------->>>

export const deleteAppointmentThunkByCustomer = createAsyncThunk(
  ASYNC_ROUTES.DELETE_APPOINTMENT,
  async (payload, {rejectWithValue}) => {
    try {
      const response = await DeleteAppointmentServiceByCustomer(payload);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

//  get appointment work type

export const getAppointmentWorkTypeByCustomer = createAsyncThunk(
  ASYNC_ROUTES.APOINTMENT_WORK_TYPE,
  async (payload, {rejectWithValue}) => {
    try {
      const response = await GetAppointmentWorkTypeServiceByCustomer(payload);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

///////////  Sheduled Appointment APi

export const sheduledAppointmentThunkByCustomer = createAsyncThunk(
  ASYNC_ROUTES.SECHDULE_APPOINTMENT,
  async (payload, {rejectWithValue}) => {
    try {
      const response = await SheduledAppointmentServiceByCustomer(payload);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

//------------->>>  Sheduled Appointment Update on id --------->>>

export const updateSheduledAppointmentByCustomer = createAsyncThunk(
  ASYNC_ROUTES.UPDATE_APPOINTMENT_STATUS,
  async (payload, {rejectWithValue}) => {
    try {
      const response = await UpdateSheduledAppointmentByCustomer(payload);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const appointmentStatusListThunkByCustomer = createAsyncThunk(
  ASYNC_ROUTES.APPOINTMENT_STATUS_LIST,

  async (payload, {rejectWithValue}) => {
    console.log('thunkCall', payload);
    try {
      const response = await AppointmentStatusListServiceByCustomer(payload);
      return response;
    } catch (err) {
      console.log('error', err);
      return rejectWithValue(err);
    }
  },
);
