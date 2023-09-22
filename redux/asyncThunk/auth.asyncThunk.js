import {createAsyncThunk} from '@reduxjs/toolkit';
import {ASYNC_ROUTES} from '../constants/redux.constants';
import {
  GetAppointmentUploadedDocuments,
  GetAppointmentUploadedDocumentsByCustomer,
  GetDashboardData,
  GetDashboardDataForCustomer,
  GetDetailsByLatLong,
  GetProfileQuestions,
  GetUplodedDocuments,
  GetUserProfile,
  loginService,
  registerOtpService,
  registorService,
  sendOtpService,
  UploadAppointmentDocument,
  UploadAppointmentDocumentByCustomer,
  UploadProfileQuestionsDocument,
} from '../services';

export const loginAsync = createAsyncThunk(
  ASYNC_ROUTES.OTP_VERIFY,
  async (payload, {rejectWithValue}) => {
    try {
      const response = await loginService(payload);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const registerAsync = createAsyncThunk(
  ASYNC_ROUTES.REGISTER,
  async (payload, {rejectWithValue}) => {
    try {
      const response = await registorService(payload);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const sendOtpAsync = createAsyncThunk(
  ASYNC_ROUTES.AUTH_OTP_LOGIN,
  async (payload, {rejectWithValue}) => {
    try {
      const response = await sendOtpService(payload);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);
export const registerOtpAsync= createAsyncThunk(
  ASYNC_ROUTES.REGISTER_OTP_VERIFY,
  async (payload, {rejectWithValue}) => {
    try {
      const response = await registerOtpService(payload);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);
export const getDetailsByLatLong= createAsyncThunk(
  ASYNC_ROUTES.GET_ADDRESS_DETAILS,
  async (payload, {rejectWithValue}) => {
  
    try {
      const response = await GetDetailsByLatLong(payload);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);
export const getProfileQuestions = createAsyncThunk(
  ASYNC_ROUTES.GET_PROFILE_QUESTIONS,
  async ({params, companyId}, {rejectWithValue}) => {
    try {
      const response = await GetProfileQuestions(params, companyId);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const uploadProfileQuestionsDocument = createAsyncThunk(
  ASYNC_ROUTES.UPLOAD_QUESTION_DOCUMENTS,
  async ({data, companyId}, {rejectWithValue}) => {
    try {
      const response = await UploadProfileQuestionsDocument(data, companyId);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);
export const uploadAppointmentQuestionsDocument = createAsyncThunk(
  ASYNC_ROUTES.UPLOAD_APPOINTMENT_DOCUMENTS,
  async ({data, companyId}, {rejectWithValue}) => {
    try {
      const response = await UploadAppointmentDocument(data, companyId);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const uploadAppointmentQuestionsDocumentByCustomer = createAsyncThunk(
  ASYNC_ROUTES.CUSTOMER_ASSESTMENT_UPLOAD,
  async ({data}, {rejectWithValue}) => {
    try {
      const response = await UploadAppointmentDocumentByCustomer(data);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const getUplodedDocuments = createAsyncThunk(
  ASYNC_ROUTES.GET_UPLOADED_DOCUMENTS,
  async ({params, companyId}, {rejectWithValue}) => {
    try {
      const response = await GetUplodedDocuments(params, companyId);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const getUserProfile = createAsyncThunk(
  ASYNC_ROUTES.GET_USER_PROFILE,
  async (payload, {rejectWithValue}) => {
    try {
      const response = await GetUserProfile();
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const getAppointmentUploadedDocuments = createAsyncThunk(
  ASYNC_ROUTES.GET_APPOINTMENT_UPLOADED_DOCUMENTS,
  async (data, {rejectWithValue}) => {
    
    try {
     
      const response = await GetAppointmentUploadedDocuments(
        data
      );
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const getAppointmentUploadedDocumentsByCustomer = createAsyncThunk(
  ASYNC_ROUTES.GET_APPOINTMENT_UPLOADED_DOCUMENTS_BY_CUSTOMER,
  async ({appointment}, {rejectWithValue}) => {
    try {
      const response = await GetAppointmentUploadedDocumentsByCustomer({
        appointment,
      });
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const getDashboardData = createAsyncThunk(
  ASYNC_ROUTES.GET_DASHBOARD_DATA,
  async ({company_id}, {rejectWithValue}) => {
    try {
      const response = await GetDashboardData(company_id);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const getDashboardDataForCustomer = createAsyncThunk(
  ASYNC_ROUTES.GET_DASHBOARD_DATA_FOR_CUSTOMER,
  async (payload, {rejectWithValue}) => {
    try {
      const response = await GetDashboardDataForCustomer();
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);
