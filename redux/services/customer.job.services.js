// import Axios from 'axios';
import {METHODS, SERVICE_ROUTES} from '../constants/services.constant';
import {replaceUrl} from '../../app/helpers';
import {useSelector} from 'react-redux';
import {composeWithDevToolsDevelopmentOnly} from '@redux-devtools/extension';
import Axios from 'axios';

export function CreateJobServiceByCustomer({data}) {
  return new Promise((resolve, reject) => {
    let config = {
      url: SERVICE_ROUTES.CREATE_JOB_FOR_CUSTOMER,
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
