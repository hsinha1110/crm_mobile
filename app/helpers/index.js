import axios from 'axios';
import moment from 'moment';
const gmapUrl = `https://maps.googleapis.com/maps/api/geocode/json?`;
export const key = `AIzaSyBO-6AKRGl3NxAyPB3g4ns9mb_qHdirGq0`;
export const formateServiceErrors = errorData => {
  let errorObj = Object.keys(errorData);
  let errors = {};
  errorObj.forEach(obj => {
    errors[obj] = errorData[obj][0];
  });
  return errors;
};

export const replaceUrl = (url, data) => {
  var regex = new RegExp(':(' + Object.keys(data).join('|') + ')', 'g');
  return url?.replace(regex, (m, $1) => data[$1] || m);
};

export const appointmentStatus = (arr, id) => {
  return arr?.filter(obj => obj.id === id)[0].title;
};

export const getStatusColor = status => {
  // console.log('status', status);
  switch (status) {
    case 'Published' | 5:
      return '#0c1559' || 1;
    case 'Audited' | 4:
      return '#0a84ff';
    case 'Assessment Complete' | 3:
      return '#97DC21';
    case 'Confirmed' | 2:
      return '#0dc678';
    case 'Waiting' | 1:
      return '#666666';
    case 'Failed' | 6:
      return '#ccc';
  }
};

export const formateDate = date => {
  return moment(date).format('  h:mm a,dddd Do of MMMM YYYY');
};
const urlEncodedFunc = (intialState, type) => {
  const business_map_address = encodeURI(
    Object.values(intialState.business_address).filter(Boolean).join(' '),
  );
  const property_map_address = encodeURI(
    Object.values(intialState.property_address).filter(Boolean).join(' '),
  );

  const addressArr = [
    {
      key: 'business_address',
      value: `${gmapUrl}address=${business_map_address}&key=${key}`,
    },
    {
      key: 'property_address',
      value: `${gmapUrl}address=${property_map_address}&key=${key}`,
    },
  ];
  if (type === 'business') {
    return addressArr[0];
  } else {
    return addressArr[1];
  }
};

export const addressDetailsByLatLng = async (lat, lng) => {
  const url = `${gmapUrl}latlng=${lat},${lng}&key=${key}`;

  return await axios.get(url).then(response => {
    const postFIllData = {
      place_id: response.results[0].place_id,
      lat: response.results[0].geometry.location.lat,
      long: response.results[0].geometry.location.lng,
      formatted_address: response.results[0].formatted_address,
    };
    return postFIllData;
  });
};

export const getAddressDetails = async (intialState, key) => {
  let config = await urlEncodedFunc(intialState, key);
  return axios.get(config.value).then(response => {
    const postFIllData = {
      place_id: response.results[0].place_id,
      lat: response.results[0].geometry.location.lat,
      long: response.results[0].geometry.location.lng,
      formatted_address: response.results[0].formatted_address,
    };

    // const address1 =item.key:{...intialState.{item.key}, ...postFIllData}

    return {
      ...intialState,
      [config.key]: {...intialState[config.key], ...postFIllData},
    };
  });
};

export const truncateString = (string = '', maxLength = 20) =>
  string.length > maxLength ? `${string.substring(0, maxLength)}…` : string;

// export const chartState =(ids,arr)=>{
//   const a =ids.map(item=>arr?.filter(obj=>obj.id===item.id)[0].title)
// }
