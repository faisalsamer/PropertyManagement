export type Project = {
  id: string
  name: string
  state: string
  property_count: number
};

export type Property = {
  id: string
  code: string
  address: string
  project: string
  type: string
  status: 'Occupied' | 'Under Preparation' | 'Pending Inspection' | 'Vacant'
}