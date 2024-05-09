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
    try {
      const response: ApiResponse<any> = await this.api.post(`/slot-bookings`, payload)
      if (response.ok) {
        return { kind: "ok", data: response.data }
      }
      throw new Error(JSON.stringify(getGeneralApiProblem(response)))
    } catch (e) {
      console.log(e)
      return { kind: "unknown", temporary: true }
    }
  }

  async postServiceBooking(
    payload: ServiceBookingInfo,
  ): Promise<{ kind: "ok"; data: any } | GeneralApiProblem> {
    try {
      const response: ApiResponse<any> = await this.api.post(`/service-bookings`, payload)
      if (response.ok) {
        return { kind: "ok", data: response.data }
      }
      throw new Error(JSON.stringify(getGeneralApiProblem(response)))
    } catch (e) {
      console.log(e)
      return { kind: "unknown", temporary: true }
    }
  }
}
