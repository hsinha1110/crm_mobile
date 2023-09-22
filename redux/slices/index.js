import { combineReducers } from "redux";
import  AppointmentSlice  from "./appointment.slice";
import AuthSlice from "./auth.slice";

export default combineReducers({
  auth: AuthSlice,
  appointment:AppointmentSlice,
  
});