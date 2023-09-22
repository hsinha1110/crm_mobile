import { createAsyncThunk } from "@reduxjs/toolkit";
import { ASYNC_ROUTES } from "../constants/redux.constants";
import { CreateJobServiceByCustomer } from "../services";
import { CreateJobService } from "../services/job.services";


export const createJobThunkByCustomer = createAsyncThunk(
    ASYNC_ROUTES.CREATE_JOB_BY_CUSTOMER,
    async (payload, { rejectWithValue }) => {
      try {
        const response = await CreateJobServiceByCustomer(payload);
        
        return response;
      } catch (err) {
        return rejectWithValue(err);
      }
    }
  );
