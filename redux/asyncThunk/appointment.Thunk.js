import {createAsyncThunk} from '@reduxjs/toolkit';
import {ASYNC_ROUTES} from '../constants/redux.constants';

import {
  AppointmentStatusListService,
  CreateAppointmentService,
  DeleteAppointmentService,
  GetAppointmentByIDService,
  GetAppointmentQuestionsService,
  GetAppointmentService,
  GetAppointmentWorkTypeService,
  SheduledAppointmentService,
  UpdateAppointmentService,
  UpdateSheduledAppointment,
} from '../services';

// thunk for get all appointment list

export const getAllAppointment = createAsyncThunk(
  'getAllAppointment',
  async (payload, {rejectWithValue}) => {
    try {
      const response = await GetAppointmentService(payload);

      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);
//  thunk for get single appointment by id
export const getAppointmentByID = createAsyncThunk(
  ASYNC_ROUTES.GET_APPOINTMENT_BY_ID,
  async (payload, {rejectWithValue}) => {
    try {
      const response = await GetAppointmentByIDService(payload);

      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

//  ----- create new appointment ---------->>>

export const createAppointmentThunk = createAsyncThunk(
  ASYNC_ROUTES.CREATE_APPOINTMENT,
  async (payload, {rejectWithValue}) => {
    try {
      const response = await CreateAppointmentService(payload);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

// ---------  update appointment--->>>>>>>>>

export const updateAppointmentThunk = createAsyncThunk(
  ASYNC_ROUTES.GET_APPOINTMENT_BY_ID,
  async (payload, {rejectWithValue}) => {
    try {
      const response = await UpdateAppointmentService(payload);

      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

//--------------- Delete Appointment ----------->>>

export const deleteAppointmentThunk = createAsyncThunk(
  ASYNC_ROUTES.DELETE_APPOINTMENT,
  async (payload, {rejectWithValue}) => {
    try {
      const response = await DeleteAppointmentService(payload);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

//  get appointment work type

export const getAppointmentWorkType = createAsyncThunk(
  ASYNC_ROUTES.APOINTMENT_WORK_TYPE,
  async (payload, {rejectWithValue}) => {
    try {
      const response = await GetAppointmentWorkTypeService(payload);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

///////////  Sheduled Appointment APi

export const sheduledAppointmentThunk = createAsyncThunk(
  ASYNC_ROUTES.SECHDULE_APPOINTMENT,
  async (payload, {rejectWithValue}) => {
    try {
      const response = await SheduledAppointmentService(payload);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);
export const getAppointmentQuestions = createAsyncThunk(
  ASYNC_ROUTES.GET_APPOINTMENT_QUESTIONS,
  async (payload, {rejectWithValue}) => {
    try {
      const response = await GetAppointmentQuestionsService(payload);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);
//------------->>>  Sheduled Appointment Update on id --------->>>

export const updateSheduledAppointment = createAsyncThunk(
  ASYNC_ROUTES.UPDATE_APPOINTMENT,
  async ({company_id, id, data}, {rejectWithValue}) => {
    try {
      const response = await UpdateSheduledAppointment(company_id, id, data);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const appointmentStatusListThunk = createAsyncThunk(
  ASYNC_ROUTES.APPOINTMENT_STATUS_LIST,
  async (payload, {rejectWithValue}) => {
    try {
      const response = await AppointmentStatusListService(payload);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);
