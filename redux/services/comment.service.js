import Axios from 'axios';
import {replaceUrl} from '../../app/helpers';
import {METHODS, SERVICE_ROUTES} from '../constants/services.constant';

export function CreateCommentService(data) {
  const {company_id} = data;
  return new Promise((resolve, reject) => {
    let config = {
      url: replaceUrl(SERVICE_ROUTES.CREATE_COMMENT, {
        company_id,
      }),
      method: METHODS.POST,
      data,
    };
    console.log('config', config);
    Axios.request(config)
      .then(response => {
        return resolve(response);
      })
      .catch(error => {
        return reject(error);
      });
  });
}
