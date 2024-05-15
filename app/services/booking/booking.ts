import { ApiResponse, ApisauceInstance } from "apisauce"

// services
import { GeneralApiProblem, getGeneralApiProblem } from "../api/apiProblem"

// interfaces
import { SlotBookingInfo, ServiceBookingInfo } from "./booking.types"

export class BookingApi {
  private api: ApisauceInstance

  constructor(api: ApisauceInstance) {
    this.api = api
  }

  async postSlotBooking(
    payload: SlotBookingInfo,
  ): Promise<{ kind: "ok"; data: any } | GeneralApiProblem> {
    const response: ApiResponse<any> = await this.api.post(`/slot-bookings`, payload)
    if (response.ok) {
      return { kind: "ok", data: response.data }
    } else {
      return getGeneralApiProblem(response)
    }
  }

  async getSlotBooking(): Promise<{ kind: "ok"; data: any } | GeneralApiProblem> {
    const response: ApiResponse<any> = await this.api.get(`/slot-bookings/my`)
    if (response.ok) {
      return { kind: "ok", data: response.data }
    } else {
      return getGeneralApiProblem(response)
    }
  }

  async postServiceBooking(
    payload: ServiceBookingInfo,
  ): Promise<{ kind: "ok"; data: any } | GeneralApiProblem> {
    const response: ApiResponse<any> = await this.api.post(`/service-bookings`, payload)
    if (response.ok) {
      return { kind: "ok", data: response.data }
    } else {
      return getGeneralApiProblem(response)
    }
  }
}
