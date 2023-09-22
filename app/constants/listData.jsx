import imagePath from './imagePath';

// Onboarding
export const slides = [
  {
    key: '1',
    title: 'List of Appointments',
    image: imagePath.SLIDE_1,
  },
  {
    key: '2',
    title: 'Create a Job and get started \nwith work',
    image: imagePath.SLIDE_2,
  },
  {
    key: '3',
    title: 'Check your calender for \nappointments',
    image: imagePath.SLIDE_3,
  },
];
// Upload

export const upload = [
  {
    key: '0',
    title: 'Enter Base Price',
    basePrice: 'Base Price',
  },
  {
    key: '1',
    title: 'A clear photo of your current switch board',
  },
  {
    key: '2',
    title: `A clear photo of current system with atleast 
      1m space on either sides`,
  },
  {
    key: '3',
    title: `A clear photo of current system with atleast 1m space \non either sides`,
  },
  {
    key: '4',
    title: 'A clear photo of complaince plate on current system ',
  },
  {
    key: '5',
    title: 'A clear photo of Signature (FieldWorker)',
  },
  {
    key: '6',
    title: 'A clear video pre-installation',
  },
];

// create job radio button
export const smsConsentType = [
  {
    id: '1', // acts as primary key, should be unique and non-empty string
    label: 'Interested',
    value: 'Interested',
  },
  {
    id: '2',
    label: 'Expressed',
    value: 'Expressed',
  },
  {
    id: '3',
    label: 'No',
    value: 'No',
  },
];
// create job details radio button
export const users = [
  {
    id: '1', // acts as primary key, should be unique and non-empty string
    label: 'Fieldworker',
    value: 'Fieldworker',
  },
  {
    id: '2',
    label: 'Customer',
    value: 'Customer',
  },
];
export const workType = [
  {
    id: '1',
    label: 'CLU Assesment',
    value: 'CLU Assesment',
  },
  {
    id: '2',
    label: 'Heat Pump Assesment',
    value: 'Heat Pump Assesment',
  },
  {
    id: '3',
    label: 'A/C Assesment',
    value: 'A/C Assesment',
  },
  {
    id: '4',
    label: 'Heat Pump Lead(To External)',
    value: 'Heat Pump Lead(To External)',
  },
  {
    id: '5',
    label: 'Cold Room Assesment',
    value: 'Cold Room Assesment',
  },
  {
    id: '6',
    label: 'Sales Lead',
    value: 'Sales Lead',
  },
  {
    id: '7',
    label: 'CLU Assesment(35 Act)',
    value: 'CLU Assesment(35 Act)',
  },
  {
    id: '8',
    label: 'CLU Assesment (34 & 35 Act)',
    value: 'CLU Assesment (34 & 35 Act)',
  },
]; 
export const appointmentDetails = [
  {
    id: '1',
    title:'Job Details',
    jobId: '78956',
    status: 'Waiting',
    scheduled: '10:25AM, Monday 31st of October 2022',
    duratiion: '10:25AM, Monday 31st of October 2022',
    instructions:'HP,Kajol Adkar,C3S_UBL,Owner, MMS-No,NLED-,EHW-1, IHD-NP,SH-NP,OTHER-NP',
    comments:'no comments available' 
  },
  {
    id: '2',
    title:'Customer Details',
    jobId: '78956',
    status: 'Waiting',
    scheduled: '10:25AM, Monday 31st of October 2022',
    duratiion: '10:25AM, Monday 31st of October 2022',
    instructions:
      'HP,Kajol Adkar,C3S_UBL,Owner, MMS-No,NLED-,EHW-1, IHD-NP,SH-NP,OTHER-NP',
  },
];

export const createJob = [
  {
    id: '1', // acts as primary key, should be unique and non-empty string
    label: 'Residential',
    value: 'Residential',
  },
  {
    id: '2',
    label: 'Business',
    value: 'Business',
  },
];

// Dashboard
export const dashboard = [
  {
    id: '1',
    title: 'Heat Pump assessment',
    customerName: 'Darren Luis',
    MobileNumber: '0419517237',
    ScheduledDate: '10:25AM, Monday 31st of October 2022',
    Status: 'Waiting',
  },
  {
    id: '2',
    title: 'Heat Pump assessment',

    customerName: 'Darren Luis',
    MobileNumber: '0419517237',
    ScheduledDate: '10:25AM, Monday 31st of October 2022',
    Status: 'Waiting',
  },
  {
    id: '3',
    title: 'Heat Pump assessment',

    customerName: 'Darren Luis',
    MobileNumber: '0419517237',
    ScheduledDate: '10:25AM, Monday 31st of October 2022',
    Status: 'Waiting',
  },
  {
    id: '4',
    title: 'Heat Pump assessment',

    customerName: 'Darren Luis',
    MobileNumber: '0419517237',
    ScheduledDate: '10:25AM, Monday 31st of October 2022',
    Status: 'Waiting',
  },
  {
    id: '5',
    title: 'Heat Pump assessment',

    customerName: 'Darren Luis',
    MobileNumber: '0419517237',
    ScheduledDate: '10:25AM, Monday 31st of October 2022',
    Status: 'Waiting',
  },
];

export const options = [
  {id: 1, name: 'Select'},
  {id: 2, name: 'option 1'},
  {id: 3, name: 'option 2'},
  {id: 4, name: 'option 3'},
];

export const listMap = [
  {
    id: '1',
    time: '9 30 \nam',
    title: 'Head Pump Assesment',
    appId: 'APPT ID : 8526',
    time_am: '9:30 10:00',
    address: '10 LEMNOS NORTH ROAD ,\nLEMNOS, VIC',
    status: 'Waiting',
  },
];

export const categoryData = [
  {
    key: 0,
    name: 'Energy Efficiency',
    image: imagePath.IDEA,
  },

  {
    key: 1,
    name: 'Electrical',
    image: imagePath.ENERGY,
  },
  {
    key: 2,
    name: 'Plumbing',
    image: imagePath.PLUMBING,
  },
  {
    key: 3,
    name: 'Medical',
    image: imagePath.PLUMBING,
  },
  {
    key: 4,
    name: 'Shopping',
    image: imagePath.CONSTRUCTION,
  },
  {
    key: 5,
    name: 'Electrical',
    image: imagePath.ENERGY,
  },
];

export const workTypeData = [
  {
    id: '1',
    title: 'CLU Assesment',
    image: imagePath.IDEA,
  },

  {
    id: '2',
    title: 'Heat Pump Assesment',
    image: imagePath.HEATER,
  },

  {
    id: '3',
    title: 'A/C Assesment',
    image: imagePath.OUTDOOR,
  },

  {
    id: '4',
    title: 'Cold Room Assesment',
    image: imagePath.FRIDGER,
  },
];
