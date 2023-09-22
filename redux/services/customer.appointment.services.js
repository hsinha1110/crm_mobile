import Axios from 'axios';
import {replaceUrl} from '../../app/helpers';
import {METHODS, SERVICE_ROUTES} from '../constants/services.constant';

export function GetAppointmentServiceByCustomer(params) {
  return new Promise((resolve, reject) => {
    let config = {
      url: SERVICE_ROUTES.GET_APPOINTMENT_FOR_CUSTOMER,
      method: METHODS.GET,
      params,
    };

    Axios.request(config)
      .then(response => {
        console.log('respon', response);
        return resolve(response);
      })
      .catch(error => {
        return reject(error);
      });
  });
}
export function GetAppointmentByIDServiceByCustomer(payload) {
  const {id, company_id} = payload;
  return new Promise((resolve, reject) => {
    let config = {
      url: replaceUrl(SERVICE_ROUTES.GET_APPOINTMENT_BY_ID_FOR_CUSTOMER, {id}),
      method: METHODS.GET,
    };

    Axios.request(config)
      .then(response => {
        return resolve(response);
      })
      .catch(error => {
        return reject(error);
      });
  });
}

export function CreateAppointmentServiceByCustomer(data) {
  const {company_id} = data;

  return new Promise((resolve, reject) => {
    let config = {
      url: SERVICE_ROUTES.CREATE_APPOINTMENT_FOR_CUSTOMER,
      method: METHODS.POST,
      data,
    };
    Axios.request(config)
      .then(response => {
        return resolve(response);
      })
      .catch(error => {
        return reject(error);
      });
  });
}

export function UpdateAppointmentServiceByCustomer(data, id) {
  return new Promise((resolve, reject) => {
    let config = {
      url: replaceUrl(SERVICE_ROUTES.UPDATE_APPOINTMENT_FOR_CUSTOMER, {id}),
      method: METHODS.PATCH,
      data,
    };
    Axios.request(config)
      .then(response => {
        return resolve(response);
      })
      .catch(error => {
        return reject(error);
      });
  });
}

export function DeleteAppointmentServiceByCustomer(data) {
  const {id, company_id} = data;
  return new Promise((resolve, reject) => {
    let config = {
      url: SERVICE_ROUTES.DELETE_APPOINTMENT,
      method: METHODS.DELETE,
      data,
    };
    Axios.request(config)
      .then(response => {
        return resolve(response);
      })
      .catch(error => {
        return reject(error);
      });
  });
}

export function GetAppointmentWorkTypeServiceByCustomer(company_id) {
  return new Promise((resolve, reject) => {
    let config = {
      url: replaceUrl(SERVICE_ROUTES.APOINTMENT_WORK_TYPE, company_id),
      method: METHODS.GET,
    };
    Axios.request(config)
      .then(response => {
        return resolve(response);
      })
      .catch(error => {
        return reject(error);
      });
  });
}

export function SheduledAppointmentServiceByCustomer(data) {
  const {id, company_id} = data;
  return new Promise((resolve, reject) => {
    let config = {
      url: replaceUrl(SERVICE_ROUTES.SECHDULE_APPOINTMENT, {id, company_id}),
      method: METHODS.PATCH,
      data,
    };
    Axios.request(config)
      .then(response => {
        return resolve(response);
      })
      .catch(error => {
        return reject(error);
      });
  });
}

//////////////   sheduledd appointment update Status

export function UpdateSheduledAppointmentByCustomer(data) {
  const {company_id, id} = data;
  return new Promise((resolve, reject) => {
    let config = {
      url: replaceUrl(SERVICE_ROUTES.UPDATE_APPOINTMENT_STATUS, {
        company_id,
        id,
      }),
      method: METHODS.PATCH,
      data,
    };
    Axios.request(config)
      .then(response => {
        return resolve(response);
      })
      .catch(error => {
        return reject(error);
      });
  });
}

// function got fetch appintment Status list

export function AppointmentStatusListServiceByCustomer({company_id}) {
  console.log('com', company_id);
  return new Promise((resolve, reject) => {
    let config = {
      url: replaceUrl(SERVICE_ROUTES.APPOINTMENT_STATUS_LIST, {
        company_id,
      }),
      method: METHODS.GET,
    };

    Axios.request(config)
      .then(response => {
        console.log('resss', response);
        return resolve(response);
      })
      .catch(error => {
        console.log('error', error);
        return reject(error);
      });
  });
}
