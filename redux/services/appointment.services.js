import Axios from 'axios';
import {replaceUrl} from '../../app/helpers';
import {METHODS, SERVICE_ROUTES} from '../constants/services.constant';

export function GetAppointmentService(params) {
  const {company_id} = params;

  return new Promise((resolve, reject) => {
    let config = {
      url: replaceUrl(SERVICE_ROUTES.GET_APPOINTMENT, {company_id}),
      method: METHODS.GET,
      params,
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
export function GetAppointmentQuestionsService(params) {
  const {company_id} = params;

  return new Promise((resolve, reject) => {
    let config = {
      url: replaceUrl(SERVICE_ROUTES.GET_APPOINTMENT_QUESTIONS, {company_id}),
      method: METHODS.GET,
      params,
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

export function GetAppointmentByIDService(payload) {
  const {id, company_id} = payload;
  return new Promise((resolve, reject) => {
    let config = {
      url: replaceUrl(SERVICE_ROUTES.GET_APPOINTMENT_BY_ID, {id, company_id}),
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

export function CreateAppointmentService(data) {
  const {company_id} = data;

  return new Promise((resolve, reject) => {
    let config = {
      url: replaceUrl(SERVICE_ROUTES.CREATE_APPOINTMENT, {company_id}),
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

export function UpdateAppointmentService(params) {
  return new Promise((resolve, reject) => {
    let config = {
      url: SERVICE_ROUTES.GET_APPOINTMENT_BY_ID,
      method: METHODS.GET,
      params,
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

export function DeleteAppointmentService(data) {
  const {id, company_id} = data;
  return new Promise((resolve, reject) => {
    let config = {
      url: replaceUrl(SERVICE_ROUTES.DELETE_APPOINTMENT, {id, company_id}),
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

export function GetAppointmentWorkTypeService(company_id) {
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

export function SheduledAppointmentService(data) {
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

export function UpdateSheduledAppointment(company_id, id, data) {
  return new Promise((resolve, reject) => {
    let config = {
      url: replaceUrl(SERVICE_ROUTES.UPDATE_APPOINTMENT, {
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

export function AppointmentStatusListService({company_id}) {
  return new Promise((resolve, reject) => {
    let config = {
      url: replaceUrl(SERVICE_ROUTES.APPOINTMENT_STATUS_LIST, {
        company_id,
      }),
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
