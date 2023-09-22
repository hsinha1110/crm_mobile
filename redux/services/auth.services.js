import Axios from 'axios';
import {replaceUrl} from '../../app/helpers';
import {METHODS, SERVICE_ROUTES} from '../constants/services.constant';

export function loginService(data) {
  return new Promise((resolve, reject) => {
    let config = {
      url: SERVICE_ROUTES.OTP_VERIFY,
      method: METHODS.POST,
      data,
    };
    Axios.request(config)
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export function registorService(data) {
  return new Promise((resolve, reject) => {
    let config = {
      url: SERVICE_ROUTES.REGISTOR,
      method: METHODS.POST,
      data,
    };
    console.log('config', config);
    Axios.request(config)
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
}
export function sendOtpService(data) {
  return new Promise((resolve, reject) => {
    let config = {
      url: SERVICE_ROUTES.AUTH_OTP_LOGIN,
      method: METHODS.POST,
      data,
    };
    Axios.request(config)
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
}
export function registerOtpService(data) {
  return new Promise((resolve, reject) => {
    let config = {
      url: SERVICE_ROUTES.REGISTOR_OTP_VERIFY,
      method: METHODS.POST,
      data,
    };
    Axios.request(config)
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export const GetDetailsByLatLong = payload => {
  return new Promise((resolve, reject) => {
    let config = {
      url: `https://maps.googleapis.com/maps/api/geocode/json?latlng=${payload.lat},${payload.lng}&key=${payload.key}`,
      method: METHODS.GET,
    };

    Axios.request(config)
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const GetProfileQuestions = (params, companyId) => {
  return new Promise((resolve, reject) => {
    let config = {
      url: replaceUrl(SERVICE_ROUTES.GET_PROFILE_QUESTIONS, {companyId}),
      method: METHODS.GET,
      params,
    };
    Axios.request(config)
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
};
export const UploadProfileQuestionsDocument = (data, companyId) => {
  return new Promise((resolve, reject) => {
    let config = {
      url: replaceUrl(SERVICE_ROUTES.UPLOAD_QUESTION_DOCUMENTS, {companyId}),
      method: METHODS.POST,
      headers: {'Content-Type': 'multipart/form-data'},
      data,
    };
    setTimeout(() => {
      Axios.request(config, {})
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    }, 5000);
  });
};
export const UploadAppointmentDocument = (data, companyId) => {
  return new Promise((resolve, reject) => {
    let config = {
      url: replaceUrl(SERVICE_ROUTES.UPLOAD_APPOINTMENT_DOCUMENTS, {companyId}),
      method: METHODS.POST,
      headers: {'Content-Type': 'multipart/form-data'},
      data,
    };
    setTimeout(() => {
      Axios.request(config)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    }, 5000);
  });
};
export const UploadAppointmentDocumentByCustomer = data => {
  return new Promise((resolve, reject) => {
    let config = {
      url: SERVICE_ROUTES.CUSTOMER_ASSESTMENT_UPLOAD,
      method: METHODS.POST,
      headers: {'Content-Type': 'multipart/form-data'},
      data,
    };
    setTimeout(() => {
      Axios.request(config)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    }, 5000);
  });
};

export const GetUplodedDocuments = (params, companyId) => {
  return new Promise((resolve, reject) => {
    let config = {
      url: replaceUrl(SERVICE_ROUTES.GET_UPLOADED_DOCUMENTS, {companyId}),
      method: METHODS.GET,
      params,
    };

    Axios.request(config)
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const GetUserProfile = (companyId, userId) => {
  return new Promise((resolve, reject) => {
    let config = {
      url: SERVICE_ROUTES.GET_USER_PROFILE,
      method: METHODS.GET,
    };
    Axios.request(config)
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
};
export const GetAppointmentUploadedDocumentsByCustomer = params => {
  return new Promise((resolve, reject) => {
    let config = {
      url: SERVICE_ROUTES.GET_APPOINTMENT_UPLOADED_DOCUMENTS_BY_CUSTOMER,
      method: METHODS.GET,
      params,
    };
    console.log('config', config);
    Axios.request(config)
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
};
export const GetAppointmentUploadedDocuments = data => {
  const {appointment, companyId} = data;
  const params = {appointment: appointment};

  return new Promise((resolve, reject) => {
    let config = {
      url: replaceUrl(SERVICE_ROUTES.GET_APPOINTMENT_UPLOADED_DOCUMENTS, {
        companyId: companyId,
      }),
      method: METHODS.GET,
      params,
    };
    Axios.request(config)
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
};
export const GetDashboardData = company_id => {
  return new Promise((resolve, reject) => {
    let config = {
      url: replaceUrl(SERVICE_ROUTES.GET_DASHBOARD_DATA, {company_id}),
      method: METHODS.GET,
    };

    Axios.request(config)
      .then(response => {
        resolve(response);
      })

      .catch(error => {
        reject(error);
      });
  });
};

export const GetDashboardDataForCustomer = () => {
  return new Promise((resolve, reject) => {
    let config = {
      url: SERVICE_ROUTES.GET_DASHBOARD_DATA_FOR_CUSTOMER,
      method: METHODS.GET,
    };
    Axios.request(config)
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
};
