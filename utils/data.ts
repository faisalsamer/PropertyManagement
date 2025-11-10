import { Project, Property } from '@/types'

export const projectsData: Project[] = [
  {
    id: '1',
    name: 'Heights Residence Condominium',
    state: 'Melaka',
    property_count: 4
  },
  {
    id: '2',
    name: 'Serene Park Villas',
    state: 'Selangor',
    property_count: 12
  },
  {
    id: '3',
    name: 'Bayview Residences',
    state: 'Penang',
    property_count: 8
  },
  {
    id: '4',
    name: 'Eco Horizon Apartments',
    state: 'Kedah',
    property_count: 5
  },
  {
    id: '5',
    name: 'Sunrise Heights',
    state: 'Johor',
    property_count: 10
  },
  {
    id: '6',
    name: 'Palm Grove Residences',
    state: 'Negeri Sembilan',
    property_count: 6
  },
  {
    id: '7',
    name: 'Lakefront City Towers',
    state: 'Selangor',
    property_count: 9
  },
  {
    id: '8',
    name: 'Horizon Bay Condos',
    state: 'Penang',
    property_count: 11
  },
  {
    id: '9',
    name: 'Vista Verde Apartments',
    state: 'Perak',
    property_count: 7
  },
  {
    id: '10',
    name: 'The Garden Suites',
    state: 'Kuala Lumpur',
    property_count: 14
  },
  {
    id: '11',
    name: 'Oceanview Residences',
    state: 'Sabah',
    property_count: 5
  },
  {
    id: '12',
    name: 'Greenwood Terrace',
    state: 'Pahang',
    property_count: 6
  },
  {
    id: '13',
    name: 'City Central Loft',
    state: 'Kuala Lumpur',
    property_count: 13
  },
  {
    id: '14',
    name: 'Riverside Apartments',
    state: 'Sarawak',
    property_count: 7
  },
  {
    id: '15',
    name: 'The Maple Residences',
    state: 'Selangor',
    property_count: 15
  },
  {
    id: '16',
    name: 'Amber Hill Villas',
    state: 'Perlis',
    property_count: 3
  },
  {
    id: '17',
    name: 'Palm Springs Condominiums',
    state: 'Johor',
    property_count: 9
  },
  {
    id: '18',
    name: 'Marina Bay Suites',
    state: 'Penang',
    property_count: 10
  },
  {
    id: '19',
    name: 'Aspen Residences',
    state: 'Melaka',
    property_count: 6
  },
  {
    id: '20',
    name: 'Emerald Court Apartments',
    state: 'Negeri Sembilan',
    property_count: 8
  },
  {
    id: '21',
    name: 'Golden Palm Residences',
    state: 'Selangor',
    property_count: 12
  }
]

export const propertiesData: Property[] = [
  {
    id: '1',
    code: 'PR001',
    address: '12 Jalan Merpati, Melaka',
    project: 'Heights Residence Condominium',
    type: 'Condo',
    status: 'Occupied'
  },
  {
    id: '2',
    code: 'PR002',
    address: '24 Jalan Kenari, Selangor',
    project: 'Serene Park Villas',
    type: 'Villa',
    status: 'Vacant'
  },
  {
    id: '3',
    code: 'PR003',
    address: '36 Jalan Mawar, Penang',
    project: 'Bayview Residences',
    type: 'Apartment',
    status: 'Under Preparation'
  },
  {
    id: '4',
    code: 'PR004',
    address: '48 Jalan Dahlia, Kedah',
    project: 'Eco Horizon Apartments',
    type: 'Apartment',
    status: 'Pending Inspection'
  },

  {
    id: '6',
    code: 'PR006',
    address: '72 Jalan Cempaka, Negeri Sembilan',
    project: 'Palm Grove Residences',
    type: 'Condo',
    status: 'Occupied'
  },
  {
    id: '7',
    code: 'PR007',
    address: '84 Jalan Kasturi, Selangor',
    project: 'Lakefront City Towers',
    type: 'Apartment',
    status: 'Vacant'
  },
  {
    id: '8',
    code: 'PR008',
    address: '96 Jalan Teratai, Penang',
    project: 'Horizon Bay Condos',
    type: 'Condo',
    status: 'Under Preparation'
  },
  {
    id: '9',
    code: 'PR009',
    address: '108 Jalan Bunga Raya, Perak',
    project: 'Vista Verde Apartments',
    type: 'Apartment',
    status: 'Occupied'
  },
  {
    id: '10',
    code: 'PR010',
    address: '120 Jalan Melati, Kuala Lumpur',
    project: 'The Garden Suites',
    type: 'Condo',
    status: 'Pending Inspection'
  },
  {
    id: '11',
    code: 'PR011',
    address: '132 Jalan Angsana, Sabah',
    project: 'Oceanview Residences',
    type: 'Condo',
    status: 'Vacant'
  },

  {
    id: '13',
    code: 'PR013',
    address: '156 Jalan Merak, Kuala Lumpur',
    project: 'City Central Loft',
    type: 'Apartment',
    status: 'Occupied'
  },
  {
    id: '14',
    code: 'PR014',
    address: '168 Jalan Rumbia, Sarawak',
    project: 'Riverside Apartments',
    type: 'Apartment',
    status: 'Under Preparation'
  },
  {
    id: '15',
    code: 'PR015',
    address: '180 Jalan Jati, Selangor',
    project: 'The Maple Residences',
    type: 'Condo',
    status: 'Vacant'
  },
  {
    id: '16',
    code: 'PR016',
    address: '192 Jalan Pinang, Perlis',
    project: 'Amber Hill Villas',
    type: 'Villa',
    status: 'Occupied'
  },
  {
    id: '17',
    code: 'PR017',
    address: '204 Jalan Meranti, Johor',
    project: 'Palm Springs Condominiums',
    type: 'Condo',
    status: 'Pending Inspection'
  },

  {
    id: '19',
    code: 'PR019',
    address: '228 Jalan Orkid, Melaka',
    project: 'Aspen Residences',
    type: 'Apartment',
    status: 'Occupied'
  },
  {
    id: '20',
    code: 'PR020',
    address: '240 Jalan Bakawali, Negeri Sembilan',
    project: 'Emerald Court Apartments',
    type: 'Condo',
    status: 'Vacant'
  }
]
