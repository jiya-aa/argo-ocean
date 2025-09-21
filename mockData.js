// Mock data for ARGO oceanographic platform development and testing

// Mock ARGO float data for map visualization
export const mockFloats = [
  {
    id: 'WMO_4901234',
    lat: 45.2,
    lng: -30.5,
    status: 'active',
    lastUpdate: '2024-01-15',
    temperature: 12.5,
    salinity: 35.2,
    depth: 2000,
    region: 'North Atlantic'
  },
  {
    id: 'WMO_4901235',
    lat: 35.8,
    lng: -25.1,
    status: 'active',
    lastUpdate: '2024-01-14',
    temperature: 18.3,
    salinity: 36.1,
    depth: 1500,
    region: 'North Atlantic'
  },
  {
    id: 'WMO_4901236',
    lat: 25.4,
    lng: -40.2,
    status: 'active',
    lastUpdate: '2024-01-13',
    temperature: 22.1,
    salinity: 36.8,
    depth: 1800,
    region: 'Tropical Atlantic'
  },
  {
    id: 'WMO_4901237',
    lat: -15.6,
    lng: -35.7,
    status: 'active',
    lastUpdate: '2024-01-12',
    temperature: 25.7,
    salinity: 37.2,
    depth: 2200,
    region: 'South Atlantic'
  },
  {
    id: 'WMO_4901238',
    lat: 55.1,
    lng: 15.3,
    status: 'active',
    lastUpdate: '2024-01-11',
    temperature: 8.9,
    salinity: 34.8,
    depth: 1900,
    region: 'North Sea'
  },
  {
    id: 'WMO_4901239',
    lat: 40.7,
    lng: 25.4,
    status: 'active',
    lastUpdate: '2024-01-10',
    temperature: 16.2,
    salinity: 38.5,
    depth: 1600,
    region: 'Mediterranean'
  },
  {
    id: 'WMO_4901240',
    lat: 20.1,
    lng: 65.8,
    status: 'active',
    lastUpdate: '2024-01-09',
    temperature: 28.4,
    salinity: 36.9,
    depth: 2100,
    region: 'Arabian Sea'
  },
  {
    id: 'WMO_4901241',
    lat: -25.3,
    lng: 45.2,
    status: 'active',
    lastUpdate: '2024-01-08',
    temperature: 24.1,
    salinity: 35.4,
    depth: 1750,
    region: 'Indian Ocean'
  },
  {
    id: 'WMO_4901242',
    lat: 35.6,
    lng: 140.1,
    status: 'active',
    lastUpdate: '2024-01-07',
    temperature: 19.8,
    salinity: 34.6,
    depth: 1950,
    region: 'North Pacific'
  },
  {
    id: 'WMO_4901243',
    lat: -10.4,
    lng: -120.7,
    status: 'active',
    lastUpdate: '2024-01-06',
    temperature: 26.3,
    salinity: 35.1,
    depth: 2050,
    region: 'Tropical Pacific'
  }
];

// Mock time series data for dashboard charts
export const mockTimeSeriesData = [
  { date: '2024-01-01', temperature: 12.1, salinity: 35.0, depth: 2000 },
  { date: '2024-01-02', temperature: 12.3, salinity: 35.1, depth: 1980 },
  { date: '2024-01-03', temperature: 12.0, salinity: 35.2, depth: 2020 },
  { date: '2024-01-04', temperature: 11.8, salinity: 35.0, depth: 2010 },
  { date: '2024-01-05', temperature: 12.2, salinity: 35.3, depth: 1990 },
  { date: '2024-01-06', temperature: 12.4, salinity: 35.1, depth: 2005 },
  { date: '2024-01-07', temperature: 12.1, salinity: 35.2, depth: 2015 },
  { date: '2024-01-08', temperature: 11.9, salinity: 35.0, depth: 1995 },
  { date: '2024-01-09', temperature: 12.3, salinity: 35.4, depth: 2025 },
  { date: '2024-01-10', temperature: 12.5, salinity: 35.2, depth: 2000 },
  { date: '2024-01-11', temperature: 12.2, salinity: 35.1, depth: 1985 },
  { date: '2024-01-12', temperature: 12.0, salinity: 35.3, depth: 2010 },
  { date: '2024-01-13', temperature: 12.4, salinity: 35.0, depth: 2020 },
  { date: '2024-01-14', temperature: 12.1, salinity: 35.2, depth: 1990 },
  { date: '2024-01-15', temperature: 12.3, salinity: 35.1, depth: 2005 }
];

// Mock profile data for depth charts
export const mockProfileData = [
  { depth: 0, temperature: 24.5, salinity: 35.8 },
  { depth: 50, temperature: 23.2, salinity: 35.9 },
  { depth: 100, temperature: 21.8, salinity: 36.0 },
  { depth: 200, temperature: 19.4, salinity: 36.2 },
  { depth: 300, temperature: 17.1, salinity: 36.1 },
  { depth: 500, temperature: 14.8, salinity: 35.8 },
  { depth: 750, temperature: 12.5, salinity: 35.4 },
  { depth: 1000, temperature: 10.2, salinity: 35.0 },
  { depth: 1250, temperature: 8.9, salinity: 34.8 },
  { depth: 1500, temperature: 7.6, salinity: 34.6 },
  { depth: 1750, temperature: 6.3, salinity: 34.5 },
  { depth: 2000, temperature: 5.0, salinity: 34.4 }
];

// Mock statistics for dashboard
export const mockStatistics = {
  totalFloats: 4127,
  activeFloats: 3984,
  totalProfiles: 2547832,
  regionsMonitored: 12,
  averageTemperature: 15.2,
  averageSalinity: 35.4,
  dataQuality: 98.7,
  lastUpdate: '2024-01-15T14:30:00Z'
};

// Mock regional data
export const mockRegionalData = {
  'North Atlantic': {
    floats: 847,
    avgTemp: 12.3,
    avgSalinity: 35.1,
    profiles: 425600
  },
  'South Atlantic': {
    floats: 623,
    avgTemp: 18.7,
    avgSalinity: 35.8,
    profiles: 312400
  },
  'North Pacific': {
    floats: 1245,
    avgTemp: 14.9,
    avgSalinity: 34.6,
    profiles: 624800
  },
  'South Pacific': {
    floats: 892,
    avgTemp: 16.2,
    avgSalinity: 34.9,
    profiles: 447200
  },
  'Indian Ocean': {
    floats: 734,
    avgTemp: 19.4,
    avgSalinity: 35.2,
    profiles: 368400
  },
  'Arctic Ocean': {
    floats: 156,
    avgTemp: 2.1,
    avgSalinity: 33.8,
    profiles: 78200
  },
  'Southern Ocean': {
    floats: 487,
    avgTemp: 4.8,
    avgSalinity: 34.1,
    profiles: 244200
  },
  'Mediterranean': {
    floats: 89,
    avgTemp: 17.6,
    avgSalinity: 38.4,
    profiles: 44600
  },
  'Arabian Sea': {
    floats: 54,
    avgTemp: 24.3,
    avgSalinity: 36.7,
    profiles: 27100
  }
};

// Mock export formats
export const mockExportFormats = [
  {
    id: 'csv',
    name: 'CSV',
    description: 'Comma-separated values for spreadsheet applications',
    extension: '.csv',
    mimeType: 'text/csv'
  },
  {
    id: 'netcdf',
    name: 'NetCDF',
    description: 'Network Common Data Form for scientific data',
    extension: '.nc',
    mimeType: 'application/x-netcdf'
  },
  {
    id: 'json',
    name: 'JSON',
    description: 'JavaScript Object Notation for web applications',
    extension: '.json',
    mimeType: 'application/json'
  },
  {
    id: 'png',
    name: 'PNG Image',
    description: 'Portable Network Graphics for chart visualization',
    extension: '.png',
    mimeType: 'image/png'
  },
  {
    id: 'pdf',
    name: 'PDF Report',
    description: 'Portable Document Format for comprehensive reports',
    extension: '.pdf',
    mimeType: 'application/pdf'
  }
];

// Mock chat responses for conversational interface
export const mockChatResponses = {
  temperature: {
    query: "temperature profile north atlantic",
    response: "I found temperature data for the North Atlantic region. The average temperature ranges from 24.5°C at the surface to 5.0°C at 2000m depth. Would you like me to show you a specific depth range or time period?",
    data: mockProfileData
  },
  salinity: {
    query: "salinity trends mediterranean",
    response: "Mediterranean Sea salinity data shows consistently high values averaging 38.4 PSU, which is typical for this enclosed sea with high evaporation rates. The salinity remains relatively stable with depth.",
    data: mockProfileData
  },
  floats: {
    query: "active floats pacific ocean",
    response: "There are currently 2,137 active ARGO floats in the Pacific Ocean (North and South Pacific combined). The North Pacific has 1,245 floats while the South Pacific has 892 active floats providing real-time oceanographic data.",
    data: mockFloats.filter(f => f.region.includes('Pacific'))
  }
};

// Mock data quality indicators
export const mockDataQuality = {
  overall: 98.7,
  byParameter: {
    temperature: 99.2,
    salinity: 98.8,
    pressure: 99.5,
    oxygen: 96.3,
    ph: 94.7,
    nitrate: 92.1
  },
  byRegion: {
    'North Atlantic': 99.1,
    'South Atlantic': 98.3,
    'North Pacific': 98.9,
    'South Pacific': 98.2,
    'Indian Ocean': 97.8,
    'Arctic Ocean': 96.4,
    'Southern Ocean': 97.1,
    'Mediterranean': 99.3,
    'Arabian Sea': 98.0
  },
  qualityFlags: {
    good: 87.2,
    probablyGood: 11.5,
    probablyBad: 1.1,
    bad: 0.2
  }
};