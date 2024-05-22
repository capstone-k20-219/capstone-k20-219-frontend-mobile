export interface SlotBookingInfo {
  slotId: string
  vehicleId: number
  arrivalTime: Date
}

export interface ServiceBookingInfo {
  ticketId?: string
  serviceId: string[]
  vehicleId?: number
}
