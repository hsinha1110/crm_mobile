export const ASYNC_ROUTES = {
  //Auth
  REGISTER: '/auth-resgistration',
  REGISTER_OTP_VERIFY: '/auth-resgistration-otp',
  OTP_VERIFY: '/auth-otp-verify',
  AUTH_OTP_LOGIN: '/auth-otp-login',
  GET_PROFILE_QUESTIONS: '/get-profile-questions',
  UPLOAD_QUESTION_DOCUMENTS: '/upload-question-documents',
  UPLOAD_APPOINTMENT_DOCUMENTS: '/upload-appointment-documents',
  GET_ADDRESS_DETAILS: '/get-address-details-by-lat-lng',
  GET_UPLOADED_DOCUMENTS: '/get-uploded-documents',
  GET_APPOINTMENT_UPLOADED_DOCUMENTS: '/get-appointment-uploaded-documents',
  GET_APPOINTMENT_UPLOADED_DOCUMENTS_BY_CUSTOMER:
    '/get-appointment-uploaded-documents-by-customer',
  GET_USER_PROFILE: '/get-user-profile',
  //-------------- Appointment Related Api ----------->>.
  GET_APPOINTMENT: 'get-appointment',
  GET_APPOINTMENT_BY_ID: 'get-appointmentById',
  CREATE_APPOINTMENT: 'create-appointment',
  GET_APPOINTMENT_QUESTIONS: 'get-appointment-questions',
  GET_APPOINTMENT_BY_CUSTOMER: 'customer/get-appointment',
  GET_APPOINTMENT_BY_ID_BY_CUSTOMER: 'customer/get-appointmentById',
  CREATE_APPOINTMENT_BY_CUSTOMER: 'customer/create-appointment',
  UPDATE_APPOINTMENT: 'update-appointment',
  DELETE_APPOINTMENT: 'delete-appointment',
  APOINTMENT_WORK_TYPE: 'appointment-workType',
  APPOINTMENT_STATUS_LIST: 'appointment-status-list',
  CREATE_JOB: 'create-job',
  CREATE_JOB_BY_CUSTOMER: 'customer/create-job',
  GET_CUSTOMERS: 'customers/get-all',
  CUSTOMER_ASSESTMENT_UPLOAD: '/upload-appointment-documents',
  GET_DASHBOARD_DATA: 'dashboard/data',
  GET_DASHBOARD_DATA_FOR_CUSTOMER: 'dashboard/data-customer',

  // comment Api End Point
  CREATE_COMMENT: '/createCommentForAppt',
  GET_COMMENT: '/getCommentList',
  DELETE_COMMENT: '/deleteCommentFromList',
};

export const THUNK_STATUS = {
  LOADING: 'loading',
  SUCCESS: 'success',
  FAILED: 'failed',
};
