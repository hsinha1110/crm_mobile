export const SERVICE_ROUTES = {
  //auth
  OTP_VERIFY: 'auth/otp/verify/',
  AUTH_OTP_LOGIN: 'auth/otp/login/',
  REGISTOR: 'customers/sign-up/',
  REGISTOR_OTP_VERIFY: 'customers/sign-up/verify-otp/',
  GET_PROFILE_QUESTIONS: 'companies/:companyId/profiles/questions/',
  UPLOAD_QUESTION_DOCUMENTS: 'companies/:companyId/profiles/documents/',
  GET_UPLOADED_DOCUMENTS: 'companies/:companyId/profiles/documents/',
  GET_USER_PROFILE: 'auth/profile/',
  //-------------- Appointment Related Api ----------->>.
  GET_APPOINTMENT:
    'companies/:company_id/appointments/?expand=job,work_type,company',
  GET_APPOINTMENT_QUESTIONS: 'companies/:company_id/appointments/questions/',
  UPLOAD_APPOINTMENT_DOCUMENTS: 'companies/:companyId/appointments/documents/',
  GET_APPOINTMENT_UPLOADED_DOCUMENTS:
    'companies/:companyId/appointments/documents/',
  GET_APPOINTMENT_BY_ID:
    'companies/:company_id/appointments/:id/?expand=job,work_type,company,latest_comment',
  CREATE_APPOINTMENT: 'companies/:company_id/appointments/',
  UPDATE_APPOINTMENT: 'companies/:company_id/appointments/:id/',
  DELETE_APPOINTMENT: 'companies/:company_id/appointments/:id/',
  APOINTMENT_WORK_TYPE: 'companies/:company_id/appointments/work-types/',
  APPOINTMENT_STATUS_LIST:
    'companies/:company_id/appointments/appointment-status/',
  CREATE_JOB: 'companies/:company_id/jobs/',

  GET_APPOINTMENT_FOR_CUSTOMER: 'customers/appointments/?expand=job,work_type',
  GET_APPOINTMENT_BY_ID_FOR_CUSTOMER:
    'customers/appointments/:id/?expand=job,work_type,company,latest_comment',
  CREATE_APPOINTMENT_FOR_CUSTOMER: 'customers/appointments/',
  UPDATE_APPOINTMENT_FOR_CUSTOMER: 'customers/appointments/:id/',
  DELETE_APPOINTMENT_FOR_CUSTOMER: 'customers/appointments/:id/',
  APOINTMENT_WORK_TYPE_FOR_CUSTOMER:
    'companies/:company_id/appointments/work-types/',
  APPOINTMENT_STATUS_LIST_FOR_CUSTOMER:
    'customers/appointments/appointment-status/',
  CREATE_JOB_FOR_CUSTOMER: 'customers/jobs/',
  GET_CUSTOMERS: 'companies/:company_id/customers/',
  CUSTOMER_ASSESTMENT_UPLOAD: 'customers/appointments/documents/',
  GET_APPOINTMENT_UPLOADED_DOCUMENTS_BY_CUSTOMER:
    'customers/appointments/documents/',
  GET_DASHBOARD_DATA: 'companies/:company_id/profiles/dashboard/',
  GET_DASHBOARD_DATA_FOR_CUSTOMER: 'customers/dashboard',

  // comment Api End Point
  CREATE_COMMENT: '/companies/:company_id/appointments/appointment-summary/',
  GET_COMMENT: '/companies/:company_id/appointments/appointment-summary/',
  GET_SINGLE_COMMENT:
    '/companies/:company_id/appointments/appointment-summary/:id',
  DELETE_COMMENT: '/companies/:company_id/appointments/appointment-summary/:id',
  UPDATE_COMMENT: '/companies/:company_id/appointments/appointment-summary/:id',
};

export const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  PATCH: 'PATCH',
};

export const ROLE_TYPE = {
  FIELD_WORKER: 'field_worker',
  CUSTOMER: 'customer',
};
