import { createAsyncThunk } from "@reduxjs/toolkit";
import { ASYNC_ROUTES } from "../constants/redux.constants";
import { CreateJobService, GetCustomers } from "../services/job.services";


export const createJobThunk = createAsyncThunk(
    'customerCreateJob/customer',
    async (payload, { rejectWithValue }) => {
       
      try {
        const response = await CreateJobService(payload);
        return response;
      } catch (err) {
        return rejectWithValue(err);
      }
    }
  );

  export const getCustomers = createAsyncThunk(
    ASYNC_ROUTES.GET_CUSTOMERS,
    async (payload, { rejectWithValue }) => {
      try {
        const response = await GetCustomers(payload, payload.company_id);
  
        return response;
      } catch (err) {
        return rejectWithValue(err);
      }
    }
  );