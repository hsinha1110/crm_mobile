import Axios from 'axios';
import {METHODS, SERVICE_ROUTES} from '../constants/services.constant';
import {replaceUrl} from '../../app/helpers';
import {useSelector} from 'react-redux';
import {composeWithDevToolsDevelopmentOnly} from '@redux-devtools/extension';

export function CreateJobService({data, company_id}) {
  return new Promise((resolve, reject) => {
    let config = {
      url: replaceUrl(SERVICE_ROUTES.CREATE_JOB, {company_id}),
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

export function GetCustomers(params, company_id) {
  return new Promise((resolve, reject) => {
    let config = {
      url: replaceUrl(SERVICE_ROUTES.GET_CUSTOMERS, { company_id }),
      method: METHODS.GET,
      params,
    };
    Axios.request(config)
      .then((response) => {
        return resolve(response);
      })
      .catch((error) => {
        return reject(error);
      });
  });
}