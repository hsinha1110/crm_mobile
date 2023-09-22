import {createAsyncThunk} from '@reduxjs/toolkit';
import {ASYNC_ROUTES} from '../constants/redux.constants';
import {CreateCommentService} from '../services/comment.service';

export const createCommentThunk = createAsyncThunk(
  ASYNC_ROUTES.CREATE_COMMENT,
  async (payload, {rejectWithValue}) => {
    try {
      const response = await CreateCommentService(payload);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);
