import { createSlice } from "@reduxjs/toolkit";

import {
  appointmentStatusListThunk,
  createJobThunk,
  getAllAppointment,
  getAllAppointmentByCustomer,
  getAppointmentQuestions,
  getAppointmentUploadedDocuments,
  getAppointmentUploadedDocumentsByCustomer,
  getAppointmentWorkType,
} from "../asyncThunk";
import { THUNK_STATUS } from "../constants/redux.constants";

const initialState = {
  appointmentList: [],
  customerAppointmentList: [],
  appointmentCurrentPage: null,
  appointmentTotalCounts: null,
  status: false,
  appointmentStatusList: null,
  appointmentWorkType: null,
  Allstatus:false,
  customerAppointmentTotalCounts:null,
  appointmentQuestionsList:[],
  apptUplodedDocuments : []
};

export const AppointmentSlice = createSlice({
  name: "appointment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllAppointment, (state, action) => {
      
      state.status = THUNK_STATUS.LOADING;
    });
    builder.addCase(getAllAppointment.fulfilled, (state, action) => {
      state.Allstatus = THUNK_STATUS.SUCCESS;
      state.appointmentList = action.payload.data.data;
      state.appointmentTotalCounts = action.payload.data.count;
      
    });
    builder.addCase(getAllAppointment.rejected, (state, action) => {
      state.status = THUNK_STATUS.FAILED;

     
    });
  
    builder.addCase(getAllAppointmentByCustomer.fulfilled, (state, action) => {
      state.appointmentByCustomerStatus = THUNK_STATUS.SUCCESS;
      state.appointmentList = action.payload.data.data;
      state.customerAppointmentTotalCounts = action.payload.data.count;
      
    });
    builder.addCase(getAllAppointmentByCustomer.rejected, (state, action) => {
      state.appointmentByCustomerStatus = THUNK_STATUS.FAILED;

     
    });
    ///      status List builder function

    builder.addCase(appointmentStatusListThunk.fulfilled, (state, action) => {
      state.appointmentStatusList = action?.payload?.data?.data;
     
    });
    // appointmentWorkTypeDetails
    builder.addCase(getAppointmentWorkType.fulfilled, (state, action) => {
      state.appointmentWorkType = action?.payload?.data?.data;
    });

    
    builder.addCase(getAppointmentQuestions.fulfilled, (state, action) => {
      state.appointmentQuestionsList = action?.payload?.data?.data;
    });
    
     //get Appt Uploded Documents
     builder.addCase(getAppointmentUploadedDocuments.fulfilled, (state, action) => {
      state.apptUplodedDocuments = action.payload.data.data
    });
    //Get Uploaded Documents By Customer
    builder.addCase(getAppointmentUploadedDocumentsByCustomer.fulfilled, (state, action) => {
      state.apptUplodedDocuments = action.payload.data.data
    });
  },
});

export const appointmentState = (state) => state.appointmentState;

export default AppointmentSlice.reducer;
