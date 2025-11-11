export type Project = {
  id: string
  name: string
  state: string
  property_count: number
}

export type Property = {
  id: string
  code: string
  address: string
  project: string
  type: string
  status: 'Occupied' | 'Under Preparation' | 'Pending Inspection' | 'Vacant'
}

export type Room = {
  id: string
  title: string
  property: string
  status:
    | 'Occupied'
    | 'Under Preparation'
    | 'Pending Inspection'
    | 'Vacant'
    | 'Property Rented'
}

export type Payment = {
  id: string
  type: string
  property: string
  room: string | 'Whole unit'
  due_date?: Date | null
  recurring_pattern: 'Recurring' | 'One-time'
  recurring_pattern_description: string
  amount: number
  status: 'Paid' | 'Paid Late' | 'Pending' | 'Overdue'
  payment_percentage: number
  tenant_name: string
  tenant_picture: string
  tenant_color: string
  latest_payment_timestamp: string, // ISO timestamp
}
